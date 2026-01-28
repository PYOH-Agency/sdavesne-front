<template>
  <div class="min-h-screen bg-gradient-hero">
    <!-- Article -->
    <article class="py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Chargement -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-600 rounded-lg text-sm">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement de l'article...
          </div>
        </div>

        <!-- Article -->
        <div v-else-if="article">
          <!-- Bouton retour -->
          <NuxtLink
            to="/blog"
            class="inline-flex items-center text-primary hover:text-primary-600 mb-8 transition-colors duration-300"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Retour au blog
          </NuxtLink>

          <!-- Image -->
          <div v-if="articleImage" class="mb-8 rounded-2xl overflow-hidden shadow-xl">
            <img
              :src="articleImage"
              :alt="articleTitle"
              class="w-full h-auto object-cover"
            />
          </div>

          <!-- Titre -->
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {{ articleTitle }}
          </h1>

          <!-- Date -->
          <div v-if="articleDate" class="text-gray-600 mb-8 flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {{ formatDate(articleDate) }}
          </div>

          <!-- Contenu -->
          <div class="prose prose-lg max-w-none bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div v-html="articleContent"></div>
          </div>

          <!-- Bouton retour -->
          <div class="mt-12 text-center">
            <NuxtLink
              to="/blog"
              class="inline-flex items-center bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Retour au blog
            </NuxtLink>
          </div>
        </div>

        <!-- Article non trouvé -->
        <div v-else class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Article non trouvé</h3>
          <p class="text-gray-600 mb-6">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <NuxtLink
            to="/blog"
            class="inline-flex items-center bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300"
          >
            Retour au blog
          </NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  ssr: false
})

const route = useRoute()
const slug = route.params.slug as string

const article = ref(null)
const loading = ref(true)

const articleTitle = computed(() => {
  return article.value?.attributes?.title || article.value?.title || ''
})

const articleContent = computed(() => {
  const content = article.value?.attributes?.content || article.value?.content || ''
  // Si c'est du markdown ou du texte simple, on peut le convertir en HTML
  // Pour l'instant, on assume que c'est déjà du HTML depuis Strapi
  return content
})

const articleImage = computed(() => {
  if (!article.value) return null
  const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
  const imageData = article.value.attributes?.image?.data?.attributes || article.value.image
  if (imageData?.url) {
    return imageData.url.startsWith('http') ? imageData.url : `${strapiUrl}${imageData.url}`
  }
  return null
})

const articleDate = computed(() => {
  return article.value?.attributes?.publishedAt || article.value?.publishedAt || null
})

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const loadArticle = async () => {
  if (!process.client) return
  
  loading.value = true
  
  try {
    const response = await $fetch('/api/articles', {
      method: 'GET',
      query: {
        slug: slug
      }
    })
    
    if (response && response.data && response.data.length > 0) {
      article.value = response.data[0]
      useHead({
        title: `${articleTitle.value} - Blog Sophie Davesne`,
        meta: [
          { name: 'description', content: article.value?.attributes?.excerpt || article.value?.excerpt || '' }
        ]
      })
      console.log('✅ Article chargé:', article.value)
    } else {
      article.value = null
      console.log('Article non trouvé')
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement de l\'article:', error)
    article.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadArticle()
})
</script>

<style scoped>
/* Styles pour le contenu de l'article */
.prose {
  color: #374151;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  color: #111827;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
}

.prose h1 {
  font-size: 2.25em;
}

.prose h2 {
  font-size: 1.875em;
}

.prose h3 {
  font-size: 1.5em;
}

.prose p {
  margin-bottom: 1.5em;
  line-height: 1.75;
}

.prose ul,
.prose ol {
  margin-bottom: 1.5em;
  padding-left: 1.5em;
}

.prose li {
  margin-bottom: 0.5em;
}

.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:hover {
  color: #1d4ed8;
}

.prose img {
  border-radius: 0.5rem;
  margin: 2em 0;
}

.prose blockquote {
  border-left: 4px solid #3b82f6;
  padding-left: 1em;
  margin: 2em 0;
  font-style: italic;
  color: #6b7280;
}
</style>
