export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { sessionId } = body

    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'sessionId requis'
      })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration Stripe manquante'
      })
    }

    // Vérifier la session Stripe
    const sessionResponse = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`
      }
    })

    if (!sessionResponse.ok) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Session Stripe invalide'
      })
    }

    const session = await sessionResponse.json()

    // Vérifier que la session est complétée
    if (session.status !== 'complete') {
      return {
        success: false,
        message: 'La session de paiement n\'est pas complète'
      }
    }

    return {
      success: true,
      session: {
        id: session.id,
        customer: session.customer,
        paymentStatus: session.payment_status
      }
    }

  } catch (error) {
    console.error('❌ Erreur vérification session Stripe:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la vérification de la session'
    })
  }
})
