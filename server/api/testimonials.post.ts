export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Création Témoignage appelée')
    
    // Récupérer le body de la requête
    const body = await readBody(event)
    console.log('Body reçu:', body)
    
    // Validation des données requises
    if (!body.name || !body.content) {
      return {
        success: false,
        message: 'Nom et contenu du témoignage sont requis',
        error: 'Données manquantes'
      }
    }
    
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
        published: true // Publier directement
        // Ne pas inclure createdAt et updatedAt - Strapi les gère automatiquement
      }
    }
    
    console.log('Données envoyées à Strapi:', testimonialData)
    
    // Test de connexion à Strapi d'abord
    try {
      console.log('Test de connexion à Strapi...')
      const testResponse = await $fetch('/api/testimonials', {
        baseURL: strapiUrl,
        method: 'GET',
        query: {
          populate: '*',
          sort: 'createdAt:desc'
        }
      })
      console.log('✅ Test de connexion Strapi réussi:', testResponse?.data?.length || 0, 'témoignages existants')
    } catch (testError) {
      console.error('❌ Test de connexion Strapi échoué:', testError)
      return {
        success: false,
        message: 'Test de connexion Strapi échoué',
        strapiUrl,
        error: testError.message,
        details: testError
      }
    }
    
    // Créer le témoignage dans Strapi
    const response = await $fetch('/api/testimonials', {
      baseURL: strapiUrl,
      method: 'POST',
      body: testimonialData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(async (fetchError: any) => {
      // Essayer de récupérer plus de détails sur l'erreur
      let errorDetails = fetchError.message
      if (fetchError.data) {
        try {
          const errorData = await fetchError.data.text()
          errorDetails = errorData
        } catch (e) {
          errorDetails = fetchError.data
        }
      }
      throw new Error(`Strapi Error: ${errorDetails}`)
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
    return {
      success: false,
      message: 'Erreur lors de la création du témoignage',
      strapiUrl: 'https://abundant-horse-f9e91a1796.strapiapp.com',
      error: error.message,
      errorType: error.name,
      errorStack: error.stack,
      fullError: error
    }
  }
})
