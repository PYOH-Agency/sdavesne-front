export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Témoignages appelée')
    
    // Utiliser directement les variables d'environnement
    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
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
