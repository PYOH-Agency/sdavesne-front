export default defineEventHandler(async (event) => {
  try {
    console.log('🔍 API Articles appelée')
    
    // Utiliser directement les variables d'environnement
    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
    console.log('URL Strapi:', strapiUrl)
    
    // Récupérer le slug depuis la query si présent
    const query = getQuery(event)
    const slug = query.slug as string | undefined
    
    // Appel direct vers Strapi
    const response = await $fetch('/api/articles', {
      baseURL: strapiUrl,
      query: {
        ...(slug ? { 'filters[slug][$eq]': slug } : {}),
        populate: '*',
        sort: 'publishedAt:desc',
        'publicationState': 'live'
      }
    })
    
    console.log('✅ Articles récupérés depuis Strapi:', response?.data?.length || 0)
    return response
    
  } catch (error) {
    console.error('❌ Erreur récupération articles:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de la récupération des articles',
      data: error
    })
  }
})
