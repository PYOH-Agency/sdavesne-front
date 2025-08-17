<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
    <!-- Hero Section Services -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
            Mes accompagnements
          </div>
          
          <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Services d'
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">hypnose thérapeutique</span>
          </h1>
          
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Des solutions personnalisées pour votre bien-être, basées sur des méthodes éprouvées et une approche médicale professionnelle.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="pb-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Indicateur de chargement Strapi -->
        <div v-if="pending" class="text-center mb-8">
          <div class="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement des services depuis Strapi...
          </div>
        </div>

        <!-- Services -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            :class="getServiceColorClasses(service.attributes?.color || 'blue')"
          >
            <!-- Icône -->
            <div 
              class="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
              :class="getIconColorClasses(service.attributes?.color || 'blue')"
            >
              <component :is="getServiceIcon(service.attributes?.icon || 'heart')" class="w-8 h-8 text-white" />
            </div>

            <!-- Contenu -->
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ service.attributes?.title || service.title || 'Service' }}</h3>
            <p class="text-gray-600 mb-4">{{ service.attributes?.description || service.description || 'Description du service' }}</p>
            
            <!-- Métadonnées -->
            <div class="space-y-2 mb-6">
              <div v-if="service.attributes?.duration" class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ service.attributes.duration }}
              </div>
              
              <div v-if="service.attributes?.price" class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                {{ service.attributes.price }}
              </div>
            </div>

            <!-- Badge spécialisé -->
            <div 
              class="text-sm font-medium"
              :class="getTextColorClasses(service.attributes?.color || 'blue')"
            >
              {{ getServiceBadge(service.attributes?.color || 'blue') }}
            </div>
          </div>
        </div>

        <!-- Pas de services -->
        <div v-if="!pending && !error && (!services || services.length === 0)" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun service disponible</h3>
          <p class="text-gray-600">Les services seront bientôt disponibles.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-blue-50 to-emerald-50 py-20 border-t border-blue-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">Prêt(e) à commencer votre transformation ?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Choisissez le service qui vous correspond et réservez votre consultation personnalisée.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/#booking"
            class="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Réserver une consultation
          </NuxtLink>
          
          <NuxtLink 
            to="/contact"
            class="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            Me contacter
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
// Désactiver le SSR pour cette page
definePageMeta({
  ssr: false
})

// Configuration de la page
useHead({
  title: 'Services - Sophie Davesne | Hypnose thérapeutique professionnelle',
  meta: [
    { name: 'description', content: 'Découvrez tous les services d\'hypnose thérapeutique de Sophie Davesne : arrêt du tabac, gestion du stress, confiance en soi, et bien plus encore.' },
    { name: 'keywords', content: 'services hypnose, hypnothérapeute, arrêt tabac, stress, confiance en soi, thérapie, consultation' }
  ]
})

// Services dynamiques depuis Strapi uniquement
const services = ref([])

// États pour Strapi
const pending = ref(false)
const error = ref(null)
const strapiServices = ref([])

// Fonction pour charger les services depuis Strapi
const loadStrapiServices = async () => {
  if (!process.client) return
  
  pending.value = true
  error.value = null
  
  try {
    const response = await $fetch('/api/services', {
      query: {
        populate: '*',
        sort: 'createdAt:desc'
      }
    })
    
    if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
      // Mapper les données Strapi au format attendu
      const mappedServices = response.data.map(service => ({
        id: service.id,
        attributes: {
          title: service.title,
          description: service.description,
          icon: service.icon?.trim() || 'heart',
          color: service.color?.trim() || 'blue',
          duration: service.duration,
          price: service.price || '75€',
          featured: service.featured
        }
      }))
      
      strapiServices.value = mappedServices
      services.value = mappedServices
      console.log('Services Strapi chargés:', mappedServices.length)
    }
  } catch (err) {
    error.value = err
    console.log('Strapi non disponible, utilisation des services statiques')
  } finally {
    pending.value = false
  }
}

// Fonction de refresh
const refresh = () => {
  loadStrapiServices()
}

// Charger Strapi au montage
onMounted(() => {
  loadStrapiServices()
})

// Fonctions pour les icônes et couleurs
const getServiceIcon = (iconName: string) => {
  const icons = {
    'no-smoking': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636' })
    ]),
    'heart': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
    ]),
    'lightning': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
    ]),
    'check': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
  
  return icons[iconName] || icons.heart
}

const getServiceColorClasses = (color: string) => {
  const colors = {
    'blue': 'hover:border-blue-200',
    'emerald': 'hover:border-emerald-200', 
    'purple': 'hover:border-purple-200',
    'orange': 'hover:border-orange-200'
  }
  return colors[color] || colors.blue
}

const getIconColorClasses = (color: string) => {
  const colors = {
    'blue': 'bg-gradient-to-br from-blue-600 to-blue-700',
    'emerald': 'bg-gradient-to-br from-emerald-600 to-emerald-700',
    'purple': 'bg-gradient-to-br from-purple-600 to-purple-700',
    'orange': 'bg-gradient-to-br from-orange-600 to-orange-700'
  }
  return colors[color] || colors.blue
}

const getTextColorClasses = (color: string) => {
  const colors = {
    'blue': 'text-blue-600',
    'emerald': 'text-emerald-600',
    'purple': 'text-purple-600', 
    'orange': 'text-orange-600'
  }
  return colors[color] || colors.blue
}

const getServiceBadge = (color: string) => {
  const badges = {
    'blue': 'Approche médicale',
    'emerald': 'Bien-être naturel',
    'purple': 'Transformation personnelle',
    'orange': 'Développement personnel'
  }
  return badges[color] || badges.blue
}
</script>
