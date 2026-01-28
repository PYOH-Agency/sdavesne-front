# Flow Calendrier Inline avec Stripe - Configuration

## Flow utilisateur final

1. **Sélection du type de consultation** : L'utilisateur choisit parmi les 3 types (Première consultation, Suivi, Entreprise/Groupe)
2. **Calendrier Cal.com** : Le calendrier s'affiche avec l'événement spécifique sélectionné
3. **Sélection du créneau** : L'utilisateur choisit une date/heure dans le calendrier
4. **Redirection vers paiement** : Cal.com redirige vers `/booking/payment` avec les infos du créneau
5. **Formulaire client** : L'utilisateur remplit ses informations + texte explicatif sur l'empreinte bancaire
6. **Stripe Checkout** : Redirection vers Stripe pour enregistrer la carte (sans débit)
7. **Confirmation** : Page `/booking/confirm` avec texte explicatif
8. **Retour Cal.com** : Redirection vers Cal.com pour finaliser le rendez-vous

## Configuration Cal.com requise

Pour que Cal.com redirige vers votre page de paiement avant de finaliser le booking, vous devez configurer une **URL de redirection** dans chaque événement Cal.com.

### Option 1 : Via les paramètres d'événement (Recommandé)

1. Allez sur **Cal.com** → **Event Types** → Sélectionnez un événement (ex: "Première consultation")
2. Allez dans **Settings** → **Advanced**
3. Dans **Redirect after booking**, configurez :
   - **URL** : `https://votre-domaine.com/booking/payment?event=premiere-consultation&date={DATE}&time={TIME}`
   - Remplacez `premiere-consultation` par le slug de chaque événement

**Note** : Cal.com peut ne pas supporter les variables `{DATE}` et `{TIME}` directement. Dans ce cas, utilisez simplement :
```
https://votre-domaine.com/booking/payment?event=premiere-consultation
```

Et récupérez la date/heure depuis les webhooks Cal.com ou via l'API.

### Option 2 : Via Webhooks Cal.com

1. Configurez un webhook Cal.com qui écoute `BOOKING_CREATED`
2. Dans le webhook, avant de créer le booking, redirigez vers `/booking/payment`
3. Stockez temporairement les infos du booking en session/cookie
4. Après Stripe, créez le booking via l'API Cal.com

## Pages créées

### `/booking/payment`
- Page intermédiaire entre Cal.com et Stripe
- Affiche le formulaire client
- **Texte explicatif complet** sur :
  - Empreinte bancaire uniquement (pas de débit immédiat)
  - Paiement après le rendez-vous
  - Annulation/modification gratuite 48h avant
  - Paiement en cas d'annulation < 48h

### `/booking/confirm`
- Page de confirmation après Stripe
- Texte explicatif mis à jour avec les mêmes informations
- Bouton pour retourner sur Cal.com

## Texte explicatif ajouté

Le texte suivant est maintenant affiché sur les pages de paiement et de confirmation :

> **Informations importantes**
> 
> • **Empreinte bancaire uniquement** : Votre carte sera enregistrée mais **ne sera pas débitée** lors de la réservation
> 
> • Le paiement sera effectué **après votre rendez-vous**, une fois la séance confirmée
> 
> • Vous pouvez **annuler ou modifier** votre rendez-vous jusqu'à **48 heures avant** la date prévue, sans frais
> 
> • En cas d'annulation moins de 48h avant, le paiement sera effectué

## Configuration des slugs Cal.com

⚠️ **IMPORTANT** : Mettez à jour les slugs dans `config/cal-stripe-mapping.ts` pour qu'ils correspondent exactement à vos événements Cal.com.

Pour trouver vos slugs :
1. Allez sur votre Cal.com
2. Regardez l'URL de chaque événement : `cal.com/votre-username/nom-de-l-evenement`
3. Le slug est la partie après votre username

## Test du flow

1. Allez sur votre site → Section "Booking"
2. Sélectionnez un type de consultation
3. Le calendrier Cal.com s'affiche avec l'événement spécifique
4. Sélectionnez un créneau
5. Vérifiez que vous êtes redirigé vers `/booking/payment`
6. Remplissez le formulaire
7. Complétez Stripe avec une carte de test
8. Vérifiez la redirection vers `/booking/confirm`
9. Cliquez sur "Réserver" → Retour sur Cal.com

## Dépannage

### Le calendrier ne s'affiche pas
- Vérifiez que le slug de l'événement est correct
- Vérifiez la console du navigateur pour les erreurs

### La redirection vers `/booking/payment` ne fonctionne pas
- Vérifiez que Cal.com est configuré pour rediriger vers cette URL
- Vérifiez que l'URL est accessible publiquement

### Le prix ne s'affiche pas
- Vérifiez que l'API `/api/stripe/get-prices` fonctionne
- Vérifiez que les `stripePriceId` sont corrects dans le mapping
