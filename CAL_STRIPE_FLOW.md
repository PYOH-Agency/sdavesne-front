# Flow Cal.com → Stripe → Cal.com - Documentation

## Architecture du flow

Le flow fonctionne comme suit :

1. **Utilisateur sur Cal.com** : L'utilisateur choisit un événement (ex: "Première consultation")
2. **Redirection vers votre site** : Cal.com redirige vers `/booking/from-cal?event=premiere-consultation`
3. **Formulaire client** : L'utilisateur remplit ses informations
4. **Stripe Checkout** : Redirection vers Stripe pour capturer la méthode de paiement
5. **Confirmation** : Page `/booking/confirm` après succès Stripe
6. **Retour Cal.com** : Redirection automatique vers Cal.com pour finaliser le rendez-vous

## Configuration Cal.com

Pour que Cal.com redirige vers votre site, vous devez configurer un **webhook de redirection** ou utiliser les **paramètres d'événement**.

### Option 1 : Webhook Cal.com (Recommandé)

1. Allez dans **Settings > Developer > Webhooks** sur Cal.com
2. Créez un webhook avec :
   - **URL** : `https://votre-domaine.com/api/cal/webhook`
   - **Événements** : `BOOKING_CREATED`
3. Dans le webhook, redirigez vers votre page :
   ```javascript
   // Exemple de redirection dans le webhook
   redirect(`https://votre-domaine.com/booking/from-cal?event=${eventType}&bookingUid=${bookingUid}`)
   ```

### Option 2 : Paramètres d'événement Cal.com

Dans chaque événement Cal.com, configurez une **URL de redirection après réservation** :
- Allez dans l'événement > Settings > Advanced
- Ajoutez une URL de redirection : `https://votre-domaine.com/booking/from-cal?event=SLUG_DE_L_EVENEMENT`

## Configuration des slugs Cal.com

⚠️ **IMPORTANT** : Vous devez mettre à jour les slugs dans `config/cal-stripe-mapping.ts` pour qu'ils correspondent exactement à vos événements Cal.com.

Pour trouver les slugs de vos événements :
1. Allez sur votre page Cal.com
2. Regardez l'URL de chaque événement : `cal.com/votre-username/nom-de-l-evenement`
3. Le slug est la partie après votre username

Exemple :
- URL : `cal.com/paul-bugeon-el1oht/premiere-consultation`
- Slug : `premiere-consultation`

## Mapping Cal.com ↔ Stripe

Le fichier `config/cal-stripe-mapping.ts` contient l'objet central qui lie :
- Les événements Cal.com (par slug)
- Les produits Stripe (par priceId et productId)
- Les métadonnées (durée, description, etc.)

### Structure du mapping

```typescript
{
  calEventType: 'premiere-consultation', // Slug Cal.com
  stripeProductId: 'prod_TsHNw3I65b19ly',
  stripePriceId: 'price_1SuWomGYNUMkiUuZaMzourSX',
  label: 'Première consultation',
  description: '...',
  duration: 60
}
```

## Pages créées

### `/booking/from-cal`
- Page intermédiaire qui capture l'événement Cal.com sélectionné
- Affiche le formulaire client
- Redirige vers Stripe avec le bon produit

### `/booking/confirm`
- Page de confirmation après Stripe
- Redirige automatiquement vers Cal.com avec l'événement pré-sélectionné

## API Routes

### `POST /api/stripe/create-session`
Accepte maintenant :
- `calEventType` : Slug de l'événement Cal.com
- `calBookingId` : ID du booking Cal.com (si déjà créé)
- `priceId` : ID du prix Stripe (récupéré automatiquement via le mapping)

## Flow détaillé

```
1. Utilisateur sur Cal.com
   ↓
2. Sélectionne "Première consultation"
   ↓
3. Cal.com redirige vers : /booking/from-cal?event=premiere-consultation
   ↓
4. Page charge le mapping → trouve le produit Stripe associé
   ↓
5. Utilisateur remplit le formulaire
   ↓
6. Clic sur "Continuer" → Création session Stripe avec priceId
   ↓
7. Redirection vers Stripe Checkout
   ↓
8. Utilisateur enregistre sa carte (sans débit)
   ↓
9. Redirection vers /booking/confirm?session_id=xxx&cal_event=premiere-consultation
   ↓
10. Page de confirmation → Clic sur "Réserver mon rendez-vous"
    ↓
11. Redirection vers Cal.com/premiere-consultation avec sessionId
    ↓
12. Utilisateur choisit le créneau sur Cal.com
    ↓
13. Webhook Cal.com crée le booking dans Strapi
```

## Test du flow

1. **Testez avec un événement Cal.com** :
   - Allez sur votre Cal.com
   - Cliquez sur un événement
   - Vérifiez que vous êtes redirigé vers `/booking/from-cal?event=...`

2. **Vérifiez le mapping** :
   - Le slug dans l'URL doit correspondre à un `calEventType` dans `cal-stripe-mapping.ts`
   - Le prix doit être chargé depuis Stripe

3. **Testez le flow complet** :
   - Remplissez le formulaire
   - Complétez Stripe avec une carte de test
   - Vérifiez la redirection vers Cal.com

## Dépannage

### L'événement n'est pas reconnu
- Vérifiez que le slug dans l'URL correspond exactement au `calEventType` dans le mapping
- Les slugs sont sensibles à la casse

### Le prix ne s'affiche pas
- Vérifiez que l'API `/api/stripe/get-prices` fonctionne
- Vérifiez que le `stripePriceId` est correct dans le mapping

### La redirection vers Cal.com ne fonctionne pas
- Vérifiez que le `calEventType` est bien passé dans l'URL de confirmation
- Vérifiez que le slug Cal.com est correct
