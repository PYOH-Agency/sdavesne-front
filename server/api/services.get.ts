export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Services appelée')
    
    // URL Strapi hardcodée pour le test
    const strapiUrl = 'http://localhost:1337'
    console.log('URL Strapi:', strapiUrl)
    
    // Appel direct vers Strapi
    const response = await $fetch('/api/services', {
      baseURL: strapiUrl,
      query: {
        populate: '*',
        sort: 'createdAt:desc'
      }
    })
    
    console.log('✅ Services récupérés depuis Strapi:', response?.data?.length || 0)
    return response
    
  } catch (error) {
    console.error('❌ Erreur récupération services:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des services',
      data: error
    })
  }
})
