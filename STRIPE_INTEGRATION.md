# Intégration Stripe avec Cal.com - Guide de configuration

Ce guide explique comment configurer l'intégration Stripe avec Cal.com pour capturer une empreinte bancaire lors de la réservation et charger le paiement après le rendez-vous.

## Architecture

Le flow fonctionne comme suit :

1. **Réservation** : L'utilisateur clique sur "Réserver"
2. **Stripe Checkout** : Redirection vers Stripe Checkout en mode "setup" pour capturer la méthode de paiement (sans charger)
3. **Confirmation Stripe** : Après succès, redirection vers `/booking/confirm`
4. **Cal.com** : Redirection automatique vers Cal.com pour choisir le créneau
5. **Webhook Cal.com** : Quand le rendez-vous est confirmé, création/mise à jour du booking dans Strapi
6. **Validation** : Vous validez que le rendez-vous a eu lieu via l'interface admin
7. **Chargement** : Le paiement est chargé sur Stripe via l'API

## Configuration

### 1. Variables d'environnement

Ajoutez ces variables dans vos fichiers `.env` :

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_... # Clé secrète Stripe
STRIPE_WEBHOOK_SECRET=whsec_... # Secret du webhook Stripe
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Clé publique (si besoin côté client)

# Cal.com
CAL_WEBHOOK_SECRET=your_secret_here # Secret pour sécuriser les webhooks Cal.com

# App URL
NUXT_PUBLIC_APP_URL=https://votre-domaine.com # URL de votre application
```

### 2. Configuration Stripe

1. **Créer un compte Stripe** : https://stripe.com
2. **Récupérer vos clés API** :
   - Allez dans Developers > API keys
   - Copiez la "Secret key" (commence par `sk_test_` ou `sk_live_`)
   - Copiez la "Publishable key" (commence par `pk_test_` ou `pk_live_`)

3. **Configurer les webhooks** :
   - Allez dans Developers > Webhooks
   - Cliquez sur "Add endpoint"
   - URL : `https://votre-domaine.com/api/stripe/webhook`
   - Événements à écouter :
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
   - Copiez le "Signing secret" (commence par `whsec_`)

### 3. Configuration Cal.com

1. **Configurer les webhooks Cal.com** :
   - Allez dans Settings > Webhooks
   - Créez un nouveau webhook
   - URL : `https://votre-domaine.com/api/cal/webhook`
   - Événements à écouter :
     - `BOOKING_CREATED` ou `MEETING_BOOKED`
     - `BOOKING_CANCELLED` ou `MEETING_CANCELLED`
   - Notez le secret du webhook

### 4. Type de contenu Strapi

Le type de contenu "Booking" a été créé avec les champs suivants :
- `calBookingId` : ID du booking Cal.com
- `stripeSessionId` : ID de la session Stripe Checkout
- `stripePaymentIntentId` : ID du PaymentIntent (après chargement)
- `stripeCustomerId` : ID du client Stripe
- `customerEmail` : Email du client
- `customerName` : Nom du client
- `appointmentDate` : Date du rendez-vous
- `appointmentDuration` : Durée en minutes
- `status` : Statut du rendez-vous
- `paymentStatus` : Statut du paiement
- `amount` : Montant
- `currency` : Devise

## Utilisation

### Pour l'utilisateur final

1. L'utilisateur clique sur "Réserver un rendez-vous"
2. Il est redirigé vers Stripe Checkout pour enregistrer sa carte
3. Après succès, il est redirigé vers Cal.com pour choisir le créneau
4. Une fois le créneau choisi, le booking est créé dans Strapi

### Pour l'administrateur

1. Accédez à `/admin/bookings`
2. Consultez la liste des rendez-vous
3. Filtrez par statut ou paiement
4. Cliquez sur "Charger le paiement" pour un rendez-vous confirmé
5. Le paiement est chargé sur Stripe et le statut mis à jour

## API Routes créées

- `POST /api/stripe/create-session` : Créer une session Stripe Checkout
- `POST /api/stripe/webhook` : Webhook Stripe pour les événements
- `POST /api/stripe/verify-session` : Vérifier une session Stripe
- `POST /api/cal/webhook` : Webhook Cal.com pour les réservations
- `POST /api/bookings/charge` : Charger le paiement d'un booking

## Pages créées

- `/booking/confirm` : Page de confirmation après Stripe
- `/admin/bookings` : Interface admin pour gérer les bookings

## Sécurité

⚠️ **Important** : 
- Ne commitez jamais vos clés secrètes dans Git
- Utilisez des variables d'environnement pour toutes les clés
- Activez HTTPS en production
- Validez les signatures des webhooks en production (actuellement simplifié)

## Test en mode développement

1. Utilisez les clés de test Stripe (`sk_test_...`)
2. Utilisez Stripe CLI pour tester les webhooks localement :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Testez avec des cartes de test Stripe : https://stripe.com/docs/testing

## Dépannage

### Les webhooks ne fonctionnent pas
- Vérifiez que l'URL est accessible publiquement (utilisez ngrok en local)
- Vérifiez les logs du serveur
- Vérifiez que les secrets sont corrects

### Le paiement ne se charge pas
- Vérifiez que la session Stripe est complète
- Vérifiez que le booking a bien une méthode de paiement enregistrée
- Vérifiez les logs Stripe Dashboard

### Le booking n'est pas créé après Cal.com
- Vérifiez que le webhook Cal.com est bien configuré
- Vérifiez les logs du serveur
- Vérifiez que le secret du webhook est correct
