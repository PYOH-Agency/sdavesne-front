export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { bookingId } = body

    if (!bookingId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'bookingId requis'
      })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration Stripe manquante'
      })
    }

    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
    const strapiToken = process.env.NUXT_PUBLIC_STRAPI_TOKEN || ''

    // Récupérer le booking depuis Strapi
    const bookingResponse = await $fetch(`${strapiUrl}/api/bookings/${bookingId}`, {
      headers: {
        'Authorization': `Bearer ${strapiToken}`
      },
      query: {
        populate: '*'
      }
    })

    const booking = bookingResponse.data
    if (!booking) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Booking non trouvé'
      })
    }

    if (booking.paymentStatus === 'paid') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Le paiement a déjà été effectué'
      })
    }

    if (!booking.stripeCustomerId && !booking.stripeSessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Aucune méthode de paiement enregistrée pour ce booking'
      })
    }

    // Récupérer la méthode de paiement depuis la session Stripe
    let paymentMethodId = null
    let customerId = booking.stripeCustomerId

    if (booking.stripeSessionId) {
      // Récupérer la session Stripe pour obtenir la méthode de paiement
      const sessionResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${booking.stripeSessionId}`, {
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`
        }
      })

      if (sessionResponse.ok) {
        const session = await sessionResponse.json()
        paymentMethodId = session.setup_intent?.payment_method || session.payment_method
        customerId = session.customer || customerId
      }
    }

    if (!paymentMethodId && !customerId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Impossible de récupérer la méthode de paiement'
      })
    }

    // Créer un PaymentIntent pour charger le client
    const amountInCents = Math.round(parseFloat(booking.amount) * 100)
    
    const paymentIntentData: any = {
      amount: amountInCents,
      currency: booking.currency || 'eur',
      confirm: true,
      description: `Paiement consultation - ${booking.customerName}`,
      metadata: {
        bookingId: booking.id.toString(),
        calBookingId: booking.calBookingId
      }
    }

    if (paymentMethodId) {
      paymentIntentData.payment_method = paymentMethodId
    }

    if (customerId) {
      paymentIntentData.customer = customerId
    }

    // Créer le PaymentIntent
    const paymentIntentResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(
        Object.entries(paymentIntentData).flatMap(([key, value]) => {
          if (typeof value === 'object' && !Array.isArray(value)) {
            return Object.entries(value).map(([k, v]) => [`metadata[${k}]`, String(v)])
          }
          return [[key, String(value)]]
        })
      )
    })

    if (!paymentIntentResponse.ok) {
      const error = await paymentIntentResponse.text()
      console.error('Erreur Stripe PaymentIntent:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur lors du chargement du paiement'
      })
    }

    const paymentIntent = await paymentIntentResponse.json()

    // Mettre à jour le booking dans Strapi
    await $fetch(`${strapiUrl}/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${strapiToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        data: {
          stripePaymentIntentId: paymentIntent.id,
          paymentStatus: paymentIntent.status === 'succeeded' ? 'paid' : 'pending',
          status: paymentIntent.status === 'succeeded' ? 'completed' : booking.status
        }
      }
    })

    return {
      success: true,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      message: paymentIntent.status === 'succeeded' 
        ? 'Paiement effectué avec succès' 
        : 'Paiement en attente'
    }

  } catch (error) {
    console.error('❌ Erreur chargement paiement:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors du chargement du paiement'
    })
  }
})
