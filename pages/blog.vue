<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Blog - Hypnothérapie</h1>
        <p class="text-xl text-blue-100 max-w-3xl">
          Découvrez des articles sur l'hypnose thérapeutique, le bien-être et la transformation personnelle
        </p>
      </div>
    </section>

    <!-- Articles Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Chargement -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement des articles...
          </div>
        </div>

        <!-- Liste des articles -->
        <div v-else-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in articles"
            :key="article.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
          >
            <!-- Image -->
            <NuxtLink :to="`/blog/${article.attributes?.slug || article.slug}`" class="block">
              <div class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-emerald-100">
                <img
                  v-if="article.attributes?.image?.data?.attributes?.url || article.image?.url"
                  :src="getImageUrl(article)"
                  :alt="article.attributes?.title || article.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </NuxtLink>

            <!-- Contenu -->
            <div class="p-6">
              <NuxtLink :to="`/blog/${article.attributes?.slug || article.slug}`">
                <h2 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {{ article.attributes?.title || article.title }}
                </h2>
              </NuxtLink>
              
              <p v-if="article.attributes?.excerpt || article.excerpt" class="text-gray-600 mb-4 line-clamp-3">
                {{ article.attributes?.excerpt || article.excerpt }}
              </p>
              
              <div v-if="article.attributes?.publishedAt || article.publishedAt" class="text-sm text-gray-500 mb-4">
                {{ formatDate(article.attributes?.publishedAt || article.publishedAt) }}
              </div>

              <NuxtLink
                :to="`/blog/${article.attributes?.slug || article.slug}`"
                class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
              >
                Lire la suite
                <svg class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </NuxtLink>
            </div>
          </article>
        </div>

        <!-- Aucun article -->
        <div v-else class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun article disponible</h3>
          <p class="text-gray-600">Les articles seront bientôt disponibles.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  ssr: false
})

useHead({
  title: 'Blog - Sophie Davesne | Articles sur l\'hypnothérapie',
  meta: [
    { name: 'description', content: 'Découvrez des articles sur l\'hypnose thérapeutique, le bien-être et la transformation personnelle avec Sophie Davesne.' }
  ]
})

const articles = ref([])
const loading = ref(true)

const getImageUrl = (article: any) => {
  const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
  const imageData = article.attributes?.image?.data?.attributes || article.image
  if (imageData?.url) {
    return imageData.url.startsWith('http') ? imageData.url : `${strapiUrl}${imageData.url}`
  }
  return null
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadArticles = async () => {
  if (!process.client) return
  
  loading.value = true
  
  try {
    const response = await $fetch('/api/articles', {
      method: 'GET'
    })
    
    if (response && response.data && response.data.length > 0) {
      articles.value = response.data
      console.log('✅ Articles chargés:', articles.value.length)
    } else {
      articles.value = []
      console.log('Aucun article trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement des articles:', error)
    articles.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadArticles()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
