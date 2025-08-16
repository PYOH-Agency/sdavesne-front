export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Témoignages appelée')
    
    // URL Strapi hardcodée pour le test
    const strapiUrl = 'http://localhost:1337'
    console.log('URL Strapi:', strapiUrl)
    
    // Appel direct vers Strapi
    const response = await $fetch('/api/testimonials', {
      baseURL: strapiUrl,
      query: {
        populate: '*',
        sort: 'createdAt:desc'
      }
    })
    
    console.log('✅ Témoignages récupérés depuis Strapi:', response?.data?.length || 0)
    return response
    
  } catch (error) {
    console.error('❌ Erreur récupération témoignages:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des témoignages',
      data: error
    })
  }
})
