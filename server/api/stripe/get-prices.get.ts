export default defineEventHandler(async (event) => {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration Stripe manquante'
      })
    }

    // Récupérer les prix depuis Stripe
    const priceIds = [
      'price_1SuWomGYNUMkiUuZaMzourSX', // Première consultation
      'price_1SuWp0GYNUMkiUuZxMeoOr81', // Suivi consultation
      'price_1SuWpJGYNUMkiUuZLHC8M4oz'  // Entreprise/Groupe
    ]

    const prices = await Promise.all(
      priceIds.map(async (priceId) => {
        const response = await fetch(`https://api.stripe.com/v1/prices/${priceId}`, {
          headers: {
            'Authorization': `Bearer ${stripeSecretKey}`
          }
        })

        if (!response.ok) {
          console.error(`Erreur récupération prix ${priceId}`)
          return null
        }

        const price = await response.json()
        return {
          id: price.id,
          productId: price.product,
          amount: price.unit_amount / 100, // Convertir de centimes en euros
          currency: price.currency,
          recurring: price.recurring || null
        }
      })
    )

    return {
      success: true,
      prices: prices.filter(p => p !== null)
    }

  } catch (error) {
    console.error('❌ Erreur récupération prix Stripe:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des prix'
    })
  }
})
