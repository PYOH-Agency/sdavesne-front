<template>
  <header class="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <!-- Logo et Titre -->
        <NuxtLink to="/" class="flex items-center space-x-3">
          <!-- Avatar -->
          <div class="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
            <img 
              :src="avatar" 
              :alt="title"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
            <p class="text-sm font-medium text-secondary">{{ subtitle }}</p>
          </div>
        </NuxtLink>
        
        <!-- Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.path"
            :to="item.path"
            class="text-gray-700 hover:text-primary font-medium transition-colors"
            :class="{ 'text-primary': $route.path === item.path }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        
        <!-- CTA Button -->
        <div v-if="cta" class="flex items-center space-x-4">
          <NuxtLink 
            v-if="cta.secondary"
            :to="cta.secondary.path"
            class="text-gray-700 hover:text-primary font-medium transition-colors"
          >
            {{ cta.secondary.label }}
          </NuxtLink>
          
          <NuxtLink 
            v-if="cta.primary"
            :to="cta.primary.path"
            class="bg-gradient-primary text-gray-900 px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {{ cta.primary.label }}
          </NuxtLink>
        </div>

        <!-- Menu mobile -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-primary transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-100 py-4">
        <nav class="flex flex-col space-y-4">
          <NuxtLink 
            v-for="item in navigation" 
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="text-gray-700 hover:text-primary font-medium transition-colors py-2"
            :class="{ 'text-primary': $route.path === item.path }"
          >
            {{ item.label }}
          </NuxtLink>
          <div v-if="cta?.primary" class="pt-4">
            <NuxtLink 
              :to="cta.primary.path"
              @click="closeMobileMenu"
              class="block bg-gradient-primary text-gray-900 px-6 py-3 rounded-xl text-center font-semibold"
            >
              {{ cta.primary.label }}
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

// Props configurables
const props = defineProps({
  title: {
    type: String,
    default: 'Sophie Davesne'
  },
  subtitle: {
    type: String,
    default: 'Hypnothérapeute Certifiée'
  },
  avatar: {
    type: String,
    default: '/images/sophie-davesne-avatar.svg'
  },
  navigation: {
    type: Array,
    default: () => [
      { path: '/', label: 'Accueil' },
      { path: '/a-propos', label: 'À propos' },
      { path: '/services', label: 'Services' },
      { path: '/blog', label: 'Blog' },
      { path: '/contact', label: 'Contact' }
    ]
  },
  cta: {
    type: Object,
    default: () => ({
      primary: { path: '/#booking', label: 'Prendre RDV' }
    })
  }
})

// État du menu mobile
const isMobileMenuOpen = ref(false)

// Méthodes
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
/* Styles spécifiques au composant */
header {
  background-color: #ffffff !important;
  opacity: 1 !important;
}

/* Assurer que le header est complètement opaque */
.bg-white {
  background-color: #ffffff !important;
  opacity: 1 !important;
}
</style>
