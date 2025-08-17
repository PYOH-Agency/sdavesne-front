export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Création Témoignage appelée')
    
    // Récupérer le body de la requête
    const body = await readBody(event)
    console.log('Body reçu:', body)
    
    // URL Strapi hardcodée pour forcer la production
    const strapiUrl = 'https://abundant-horse-f9e91a1796.strapiapp.com'
    console.log('URL Strapi utilisée (FORCÉE vers production):', strapiUrl)
    
    // Préparer les données pour Strapi
    const testimonialData = {
      data: {
        name: body.name,
        content: body.content,
        service: body.service || 'Patient',
        rating: body.rating || 5,
        published: true, // Publier directement
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
    
    console.log('Données envoyées à Strapi:', testimonialData)
    
    // Créer le témoignage dans Strapi
    const response = await $fetch('/api/testimonials', {
      baseURL: strapiUrl,
      method: 'POST',
      body: testimonialData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('✅ Témoignage créé dans Strapi PRODUCTION:', response)
    return {
      success: true,
      message: 'Témoignage créé avec succès dans Strapi PRODUCTION',
      strapiUrl,
      data: response
    }
    
  } catch (error) {
    console.error('❌ Erreur création témoignage:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création du témoignage',
      data: error
    })
  }
})
