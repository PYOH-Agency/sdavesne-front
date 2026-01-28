export default defineEventHandler(async (event) => {
  try {
    const body = await readRawBody(event)
    const signature = getRequestHeader(event, 'stripe-signature')

    if (!signature) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Signature Stripe manquante'
      })
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!stripeSecretKey || !webhookSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration Stripe manquante'
      })
    }

    // Vérifier la signature du webhook (simplifié - en production, utiliser la lib Stripe)
    // Pour l'instant, on accepte tous les événements (à sécuriser en production)

    const stripeEvent = JSON.parse(body.toString())
    console.log('📥 Webhook Stripe reçu:', stripeEvent.type)

    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
    const strapiToken = process.env.NUXT_PUBLIC_STRAPI_TOKEN || ''

    // Gérer les différents types d'événements
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        // Session Checkout complétée (setup mode)
        const session = stripeEvent.data.object
        console.log('✅ Session Stripe complétée:', session.id)

        // Mettre à jour le booking dans Strapi si existe
        if (session.metadata) {
          try {
            // Chercher le booking par stripeSessionId
            const bookingsResponse = await $fetch(`${strapiUrl}/api/bookings`, {
              headers: {
                'Authorization': `Bearer ${strapiToken}`
              },
              query: {
                'filters[stripeSessionId][$eq]': session.id,
                populate: '*'
              }
            })

            if (bookingsResponse?.data?.length > 0) {
              const booking = bookingsResponse.data[0]
              
              // Mettre à jour le statut
              await $fetch(`${strapiUrl}/api/bookings/${booking.id}`, {
                method: 'PUT',
                headers: {
                  'Authorization': `Bearer ${strapiToken}`,
                  'Content-Type': 'application/json'
                },
                body: {
                  data: {
                    paymentStatus: 'setup_complete',
                    stripeCustomerId: session.customer || session.customer_email,
                    status: 'payment_captured'
                  }
                }
              })

              console.log('✅ Booking mis à jour:', booking.id)
            }
          } catch (err) {
            console.error('Erreur mise à jour booking:', err)
          }
        }
        break

      case 'payment_intent.succeeded':
        // Paiement réussi (après validation du rendez-vous)
        const paymentIntent = stripeEvent.data.object
        console.log('✅ Paiement réussi:', paymentIntent.id)

        // Mettre à jour le booking
        try {
          const bookingsResponse = await $fetch(`${strapiUrl}/api/bookings`, {
            headers: {
              'Authorization': `Bearer ${strapiToken}`
            },
            query: {
              'filters[stripePaymentIntentId][$eq]': paymentIntent.id,
              populate: '*'
            }
          })

          if (bookingsResponse?.data?.length > 0) {
            const booking = bookingsResponse.data[0]
            
            await $fetch(`${strapiUrl}/api/bookings/${booking.id}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${strapiToken}`,
                'Content-Type': 'application/json'
              },
              body: {
                data: {
                  paymentStatus: 'paid'
                }
              }
            })
          }
        } catch (err) {
          console.error('Erreur mise à jour paiement:', err)
        }
        break

      default:
        console.log('Événement non géré:', stripeEvent.type)
    }

    return { received: true }

  } catch (error) {
    console.error('❌ Erreur webhook Stripe:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur traitement webhook Stripe'
    })
  }
})
