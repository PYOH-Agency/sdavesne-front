export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Création Témoignage appelée')
    
    // Récupérer le body de la requête
    const body = await readBody(event)
    console.log('Body reçu:', body)
    
    // Essayer plusieurs méthodes pour récupérer l'URL Strapi
    let strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL
    
    // Si pas de variable d'environnement, utiliser l'URL de production par défaut
    if (!strapiUrl) {
      strapiUrl = 'https://abundant-horse-f9e91a1796.strapiapp.com'
      console.log('⚠️ Variable d\'environnement non trouvée, utilisation de l\'URL par défaut')
    }
    
    console.log('URL Strapi utilisée:', strapiUrl)
    
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
    
    console.log('✅ Témoignage créé dans Strapi:', response)
    return {
      success: true,
      message: 'Témoignage créé avec succès',
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
