export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Création Service appelée')
    
    // Récupérer le body de la requête
    const body = await readBody(event)
    console.log('Body reçu:', body)
    
    // Utiliser directement les variables d'environnement
    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
    console.log('URL Strapi:', strapiUrl)
    
    // Préparer les données pour Strapi
    const serviceData = {
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || 'default-icon',
        published: true, // Publier directement
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }
    
    console.log('Données envoyées à Strapi:', serviceData)
    
    // Créer le service dans Strapi
    const response = await $fetch('/api/services', {
      baseURL: strapiUrl,
      method: 'POST',
      body: serviceData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    console.log('✅ Service créé dans Strapi:', response)
    return {
      success: true,
      message: 'Service créé avec succès',
      data: response
    }
    
  } catch (error) {
    console.error('❌ Erreur création service:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la création du service',
      data: error
    })
  }
})


