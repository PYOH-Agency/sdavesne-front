<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">SD</span>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Sophie Davesne</h1>
              <p class="text-sm text-indigo-600 font-medium">Hypnothérapeute</p>
            </div>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Accueil</NuxtLink>
            <NuxtLink to="/a-propos" class="text-gray-700 hover:text-indigo-600 font-medium transition-colors">À propos</NuxtLink>
            <NuxtLink to="/services" class="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Services</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Contact</NuxtLink>
            <button 
              @click="scrollToBooking"
              class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              Prendre RDV
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Retrouvez votre 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">équilibre</span>
              intérieur
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              Accompagnement personnalisé en hypnose thérapeutique pour surmonter vos défis 
              et révéler votre potentiel. Un espace sécurisé pour votre transformation.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                @click="scrollToBooking"
                class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Réserver une séance
              </button>
              <NuxtLink 
                to="/a-propos"
                class="border-2 border-indigo-500 text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-all duration-300"
              >
                En savoir plus
              </NuxtLink>
            </div>
          </div>
          
          <div class="relative">
            <div class="w-full h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl">
              <div class="text-center">
                <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Bienveillance</h3>
                <p class="text-gray-600">Un accompagnement dans la confiance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Mes domaines d'accompagnement</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            L'hypnose thérapeutique vous aide à dépasser vos blocages et atteindre vos objectifs
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Arrêt du tabac</h3>
            <p class="text-gray-600">Libérez-vous de la dépendance tabagique grâce à l'hypnose, une méthode douce et efficace.</p>
          </div>

          <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Gestion du stress</h3>
            <p class="text-gray-600">Apprenez à gérer votre stress et retrouvez sérénité et équilibre dans votre quotidien.</p>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Confiance en soi</h3>
            <p class="text-gray-600">Développez votre confiance et révélez votre plein potentiel pour atteindre vos objectifs.</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink 
            to="/services" 
            class="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
          >
            Découvrir tous mes services
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Booking Section -->
    <section id="booking" class="bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">Prêt(e) à commencer votre transformation ?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Réservez votre séance de découverte et faites le premier pas vers un mieux-être durable.
        </p>
        
        <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 class="text-2xl font-semibold text-gray-900 mb-6">Réserver un rendez-vous</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="openBooking"
              class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              📅 Choisir un créneau
            </button>
            <NuxtLink 
              to="/contact"
              class="border-2 border-indigo-500 text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-all duration-300"
            >
              💬 Me contacter
            </NuxtLink>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Première séance découverte</span>
          </div>
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Réservation en ligne facile</span>
          </div>
          <div class="flex items-center justify-center space-x-2">
            <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>Accompagnement personnalisé</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-lg">SD</span>
              </div>
              <div>
                <h3 class="text-xl font-bold">Sophie Davesne</h3>
                <p class="text-indigo-300">Hypnothérapeute</p>
              </div>
            </div>
            <p class="text-gray-300">
              Accompagnement bienveillant en hypnose thérapeutique pour votre mieux-être.
            </p>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Navigation</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors">Accueil</NuxtLink></li>
              <li><NuxtLink to="/a-propos" class="text-gray-300 hover:text-white transition-colors">À propos</NuxtLink></li>
              <li><NuxtLink to="/services" class="text-gray-300 hover:text-white transition-colors">Services</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4">Contact</h4>
            <div class="space-y-2 text-gray-300">
              <p>📧 contact@sophie-davesne.fr</p>
              <p>📞 06 XX XX XX XX</p>
              <p>📍 Votre ville, France</p>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Sophie Davesne - Hypnothérapeute. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCal } from '../composables/useCal'

// Configuration de la page
useHead({
  title: 'Sophie Davesne - Hypnothérapeute | Accompagnement bienveillant en hypnose',
  meta: [
    { name: 'description', content: 'Sophie Davesne, hypnothérapeute. Accompagnement personnalisé pour arrêt du tabac, gestion du stress, confiance en soi. Prenez rendez-vous en ligne.' },
    { name: 'keywords', content: 'hypnose, hypnothérapeute, arrêt tabac, stress, confiance en soi, thérapie, bien-être' }
  ]
})

// Configuration et composables
const config = useRuntimeConfig()
const { openCalPopup } = useCal()

// Fonction pour scroll vers la section booking
const scrollToBooking = () => {
  const element = document.getElementById('booking')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Fonction pour ouvrir Cal.com (à adapter selon votre configuration)
const openBooking = () => {
  // Remplacez 'sophie-davesne' par votre nom d'utilisateur Cal.com
  // et 'consultation' par votre type d'événement
  openCalPopup('sophie-davesne', 'consultation')
}
</script>