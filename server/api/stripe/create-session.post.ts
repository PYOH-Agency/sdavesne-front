export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { 
      priceId, // ID du prix Stripe (prioritaire)
      calEventType, // Type d'événement Cal.com
      amount, // Montant (fallback si pas de priceId)
      currency = 'eur', 
      customerEmail, 
      customerName, 
      appointmentDate,
      calBookingId // ID du booking Cal.com (si déjà créé)
    } = body

    // Validation
    if (!customerEmail || !customerName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Champs requis manquants: customerEmail, customerName'
      })
    }

    // Si priceId ou calEventType fourni, utiliser le produit Stripe
    // Sinon, utiliser amount (ancien mode)
    let stripePriceId = priceId
    let stripeProductId = null

    if (calEventType && !priceId) {
      // Importer le mapping Cal.com ↔ Stripe
      const { getMappingByCalEventType } = await import('~/config/cal-stripe-mapping')
      const mapping = getMappingByCalEventType(calEventType)
      
      if (!mapping) {
        throw createError({
          statusCode: 400,
          statusMessage: `Type d'événement Cal.com non configuré: ${calEventType}`
        })
      }
      
      stripePriceId = mapping.stripePriceId
      stripeProductId = mapping.stripeProductId
    }

    if (!stripePriceId && !amount) {
      throw createError({
        statusCode: 400,
        statusMessage: 'priceId, calEventType ou amount requis'
      })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration Stripe manquante'
      })
    }

    // Import dynamique de Stripe (pas besoin de l'installer si on utilise l'API REST)
    const stripeUrl = 'https://api.stripe.com/v1/checkout/sessions'
    
    // Créer une session Stripe Checkout en mode "setup" pour capturer la méthode de paiement
    // sans charger immédiatement
    const sessionData: any = {
      mode: 'setup', // Mode setup pour capturer la méthode de paiement sans charger
      payment_method_types: ['card'],
      customer_email: customerEmail,
      metadata: {
        customerName,
        appointmentDate: appointmentDate || '',
        calEventType: calEventType || '',
        calBookingId: calBookingId || '',
        currency
      },
      success_url: `${process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'}/booking/confirm?session_id={CHECKOUT_SESSION_ID}&cal_event=${calEventType || ''}`,
      cancel_url: `${process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000'}/#booking?canceled=true`
    }

    // Si on a un priceId, l'ajouter aux metadata pour référence
    if (stripePriceId) {
      sessionData.metadata.stripePriceId = stripePriceId
      sessionData.metadata.stripeProductId = stripeProductId || ''
    } else {
      sessionData.metadata.amount = amount.toString()
    }

    // Appel à l'API Stripe
    const response = await fetch(stripeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(
        Object.entries(sessionData).flatMap(([key, value]) => {
          if (typeof value === 'object' && !Array.isArray(value)) {
            return Object.entries(value).map(([k, v]) => [`metadata[${k}]`, String(v)])
          }
          if (Array.isArray(value)) {
            return value.map((v, i) => [`${key}[${i}]`, String(v)])
          }
          return [[key, String(value)]]
        })
      )
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Erreur Stripe:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur lors de la création de la session Stripe'
      })
    }

    const session = await response.json()

    return {
      success: true,
      sessionId: session.id,
      url: session.url // URL de redirection vers Stripe Checkout
    }

  } catch (error) {
    console.error('❌ Erreur création session Stripe:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la création de la session de paiement'
    })
  }
})
