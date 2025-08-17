export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Debug appelée')
    
    // Vérifier les variables d'environnement
    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL
    const nodeEnv = process.env.NODE_ENV
    
    console.log('Variables d\'environnement:')
    console.log('- NUXT_PUBLIC_STRAPI_URL:', strapiUrl)
    console.log('- NODE_ENV:', nodeEnv)
    
    // Tester la connexion à Strapi
    if (strapiUrl) {
      try {
        console.log('Test de connexion à Strapi...')
        const response = await $fetch('/api/services', {
          baseURL: strapiUrl,
          query: {
            populate: '*',
            sort: 'createdAt:desc'
          }
        })
        console.log('✅ Connexion Strapi réussie:', response?.data?.length || 0, 'services')
        return {
          success: true,
          strapiUrl,
          nodeEnv,
          strapiConnection: 'success',
          servicesCount: response?.data?.length || 0
        }
      } catch (strapiError) {
        console.error('❌ Erreur connexion Strapi:', strapiError)
        return {
          success: false,
          strapiUrl,
          nodeEnv,
          strapiConnection: 'failed',
          error: strapiError.message
        }
      }
    } else {
      return {
        success: false,
        strapiUrl: 'undefined',
        nodeEnv,
        strapiConnection: 'no_url',
        error: 'NUXT_PUBLIC_STRAPI_URL non définie'
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur API Debug:', error)
    return {
      success: false,
      error: error.message,
      stack: error.stack
    }
  }
})
