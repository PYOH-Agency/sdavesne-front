<template>
  <header class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Logo/Titre -->
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold text-lg">SD</span>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">{{ title }}</h1>
            <p class="text-sm text-gray-600">{{ subtitle }}</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.path"
            :to="item.path"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-blue-600': $route.path === item.path }"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- CTA -->
        <div class="flex items-center space-x-4">
          <NuxtLink
            v-if="cta?.primary"
            :to="cta.primary.path"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {{ cta.primary.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Sophie Davesne'
  },
  subtitle: {
    type: String,
    default: 'Hypnothérapeute Certifiée'
  },
  navigation: {
    type: Array,
    default: () => [
      { path: '/', label: 'Accueil' },
      { path: '/a-propos', label: 'À propos' },
      { path: '/services', label: 'Services' },
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
</script>
