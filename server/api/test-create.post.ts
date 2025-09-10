export default defineEventHandler(async (event) => {
  try {
    console.log('🧪 API Test Création Témoignage appelée')
    
    // Récupérer le body de la requête
    const body = await readBody(event)
    console.log('Body reçu:', body)
    
    // URL Strapi hardcodée pour le test
    const strapiUrl = 'https://abundant-horse-f9e91a1796.strapiapp.com'
    console.log('URL Strapi utilisée (hardcodée):', strapiUrl)
    
    // Préparer les données pour Strapi
    const testimonialData = {
      data: {
        name: body.name || 'Test User',
        content: body.content || 'Test content',
        service: body.service || 'Test Service',
        rating: body.rating || 5,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
    
    console.log('Données envoyées à Strapi:', testimonialData)
    
    // Test de connexion à Strapi
    try {
      console.log('Test de connexion à Strapi...')
      const response = await $fetch('/api/testimonials', {
        baseURL: strapiUrl,
        method: 'POST',
        body: testimonialData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      console.log('✅ Témoignage créé dans Strapi:', response)
      return {
        success: true,
        message: 'Témoignage de test créé avec succès dans Strapi PRODUCTION',
        strapiUrl,
        data: response
      }
      
    } catch (strapiError) {
      console.error('❌ Erreur connexion Strapi:', strapiError)
      return {
        success: false,
        message: 'Erreur lors de la création dans Strapi',
        strapiUrl,
        error: strapiError.message,
        details: strapiError
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur API Test:', error)
    return {
      success: false,
      error: error.message,
      stack: error.stack
    }
  }
})


