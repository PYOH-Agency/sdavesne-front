# Configuration Stripe - Guide rapide

## ✅ Clés Stripe configurées

Vos clés Stripe de test ont été ajoutées dans :
- `env.local` (développement)
- `env.production` (production)

**⚠️ Important** : Ces fichiers sont dans `.gitignore` et ne seront pas commités dans Git.

## Prochaines étapes

### 1. Configurer les webhooks Stripe

1. **Connectez-vous à votre dashboard Stripe** : https://dashboard.stripe.com/test/webhooks

2. **Créez un nouveau webhook** :
   - Cliquez sur "Add endpoint"
   - URL : `https://votre-domaine.com/api/stripe/webhook`
   - Pour le développement local, utilisez ngrok :
     ```bash
     ngrok http 3000
     # Utilisez l'URL https fournie par ngrok
     ```

3. **Sélectionnez les événements à écouter** :
   - `checkout.session.completed` ✅
   - `payment_intent.succeeded` ✅
   - `payment_intent.payment_failed` (optionnel)

4. **Copiez le "Signing secret"** :
   - Il commence par `whsec_...`
   - Ajoutez-le dans vos fichiers `.env` :
     ```env
     STRIPE_WEBHOOK_SECRET=whsec_votre_secret_ici
     ```

### 2. Configurer les webhooks Cal.com

1. **Connectez-vous à Cal.com** : https://app.cal.com/settings/developer/webhooks

2. **Créez un nouveau webhook** :
   - URL : `https://votre-domaine.com/api/cal/webhook`
   - Événements :
     - `BOOKING_CREATED` ou `MEETING_BOOKED` ✅
     - `BOOKING_CANCELLED` ou `MEETING_CANCELLED` ✅

3. **Notez le secret** et ajoutez-le dans vos fichiers `.env` :
   ```env
   CAL_WEBHOOK_SECRET=votre_secret_cal_ici
   ```

### 3. Configurer l'URL de l'application

Mettez à jour `NUXT_PUBLIC_APP_URL` dans vos fichiers `.env` :
- **Développement** : `http://localhost:3000`
- **Production** : `https://votre-domaine.com`

### 4. Tester l'intégration

#### Test en développement local

1. **Installez Stripe CLI** (optionnel mais recommandé) :
   ```bash
   # Windows (avec Chocolatey)
   choco install stripe
   
   # Ou téléchargez depuis https://stripe.com/docs/stripe-cli
   ```

2. **Écoutez les webhooks localement** :
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Cela vous donnera un secret de webhook temporaire à utiliser en local.

3. **Testez avec une carte de test Stripe** :
   - Numéro : `4242 4242 4242 4242`
   - Date : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres
   - Code postal : n'importe quel code postal

#### Test du flow complet

1. Démarrez votre application Nuxt
2. Allez sur la page de réservation
3. Utilisez `initBookingWithPayment()` pour démarrer le flow
4. Complétez le checkout Stripe avec une carte de test
5. Vérifiez que vous êtes redirigé vers `/booking/confirm`
6. Vérifiez que vous pouvez ensuite réserver sur Cal.com
7. Vérifiez dans `/admin/bookings` que le booking est créé

## Cartes de test Stripe

Pour tester différents scénarios :

- **Succès** : `4242 4242 4242 4242`
- **Échec** : `4000 0000 0000 0002`
- **3D Secure requis** : `4000 0025 0000 3155`

Plus d'infos : https://stripe.com/docs/testing

## Dépannage

### Les webhooks ne fonctionnent pas

1. **Vérifiez que l'URL est accessible publiquement**
   - En local, utilisez ngrok
   - En production, vérifiez que votre domaine est bien configuré

2. **Vérifiez les logs**
   - Dashboard Stripe > Webhooks > Voir les tentatives
   - Logs de votre application

3. **Vérifiez le secret du webhook**
   - Il doit correspondre exactement à celui dans votre `.env`

### Le paiement ne se charge pas

1. Vérifiez que la session Stripe est complète (`status: complete`)
2. Vérifiez que le booking a bien une `stripeSessionId`
3. Vérifiez les logs Stripe Dashboard pour les erreurs

### Le booking n'est pas créé après Cal.com

1. Vérifiez que le webhook Cal.com est bien configuré
2. Vérifiez les logs de votre serveur
3. Vérifiez que le secret du webhook Cal.com est correct

## Support

- Documentation Stripe : https://stripe.com/docs
- Documentation Cal.com : https://developer.cal.com
- Guide complet : Voir `STRIPE_INTEGRATION.md`
