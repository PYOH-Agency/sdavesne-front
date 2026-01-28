export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log('📥 Webhook Cal.com reçu:', body)

    // Vérifier le secret du webhook Cal.com (si configuré)
    const calWebhookSecret = process.env.CAL_WEBHOOK_SECRET
    if (calWebhookSecret && body.secret !== calWebhookSecret) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Secret webhook invalide'
      })
    }

    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
    const strapiToken = process.env.NUXT_PUBLIC_STRAPI_TOKEN || ''

    // Gérer les différents types d'événements Cal.com
    const eventType = body.triggerEvent || body.type

    switch (eventType) {
      case 'BOOKING_CREATED':
      case 'MEETING_BOOKED':
        // Nouvelle réservation créée
        const bookingData = body.payload || body
        const eventType = bookingData.eventType?.slug || bookingData.eventSlug
        
        // Si le booking vient du calendrier inline et n'a pas encore de session Stripe,
        // on doit rediriger vers Stripe avant de créer le booking
        // Pour l'instant, on crée le booking en "pending_payment"
        
        try {
          // Récupérer le mapping pour obtenir le montant
          let amount = 0
          let currency = 'eur'
          
          if (eventType) {
            const { getMappingByCalEventType } = await import('~/config/cal-stripe-mapping')
            const mapping = getMappingByCalEventType(eventType)
            if (mapping) {
              // Récupérer le prix depuis Stripe
              try {
                const stripeSecretKey = process.env.STRIPE_SECRET_KEY
                if (stripeSecretKey) {
                  const priceResponse = await fetch(`https://api.stripe.com/v1/prices/${mapping.stripePriceId}`, {
                    headers: { 'Authorization': `Bearer ${stripeSecretKey}` }
                  })
                  if (priceResponse.ok) {
                    const priceData = await priceResponse.json()
                    amount = priceData.unit_amount / 100
                    currency = priceData.currency
                  }
                }
              } catch (err) {
                console.error('Erreur récupération prix:', err)
              }
            }
          }
          
          // Créer ou mettre à jour le booking dans Strapi
          const bookingPayload = {
            data: {
              calBookingId: bookingData.id || bookingData.uid,
              customerEmail: bookingData.attendees?.[0]?.email || bookingData.email,
              customerName: bookingData.attendees?.[0]?.name || bookingData.name || '',
              appointmentDate: bookingData.startTime || bookingData.start,
              appointmentDuration: bookingData.duration || 60,
              status: 'pending_payment', // En attente de paiement Stripe
              paymentStatus: 'setup_complete', // Si une session Stripe existe déjà
              amount: amount || bookingData.metadata?.amount || 0,
              currency: currency || bookingData.metadata?.currency || 'eur',
              notes: bookingData.notes || bookingData.description || ''
            }
          }

          // Chercher si le booking existe déjà
          const existingBookings = await $fetch(`${strapiUrl}/api/bookings`, {
            headers: {
              'Authorization': `Bearer ${strapiToken}`
            },
            query: {
              'filters[calBookingId][$eq]': bookingPayload.data.calBookingId,
              populate: '*'
            }
          })

          if (existingBookings?.data?.length > 0) {
            // Mettre à jour
            await $fetch(`${strapiUrl}/api/bookings/${existingBookings.data[0].id}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${strapiToken}`,
                'Content-Type': 'application/json'
              },
              body: bookingPayload
            })
            console.log('✅ Booking mis à jour:', existingBookings.data[0].id)
          } else {
            // Créer
            const newBooking = await $fetch(`${strapiUrl}/api/bookings`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${strapiToken}`,
                'Content-Type': 'application/json'
              },
              body: bookingPayload
            })
            console.log('✅ Nouveau booking créé:', newBooking.data?.id)
          }
        } catch (err) {
          console.error('Erreur création/mise à jour booking:', err)
        }
        break

      case 'BOOKING_CANCELLED':
      case 'MEETING_CANCELLED':
        // Réservation annulée
        const cancelledBookingId = body.payload?.id || body.id
        
        try {
          const bookingsResponse = await $fetch(`${strapiUrl}/api/bookings`, {
            headers: {
              'Authorization': `Bearer ${strapiToken}`
            },
            query: {
              'filters[calBookingId][$eq]': cancelledBookingId,
              populate: '*'
            }
          })

          if (bookingsResponse?.data?.length > 0) {
            await $fetch(`${strapiUrl}/api/bookings/${bookingsResponse.data[0].id}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${strapiToken}`,
                'Content-Type': 'application/json'
              },
              body: {
                data: {
                  status: 'cancelled'
                }
              }
            })
            console.log('✅ Booking annulé:', bookingsResponse.data[0].id)
          }
        } catch (err) {
          console.error('Erreur annulation booking:', err)
        }
        break

      default:
        console.log('Événement Cal.com non géré:', eventType)
    }

    return { received: true }

  } catch (error) {
    console.error('❌ Erreur webhook Cal.com:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur traitement webhook Cal.com'
    })
  }
})
