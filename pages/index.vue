<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
    <!-- Navigation -->
    <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Sophie Davesne</h1>
              <p class="text-sm text-blue-600 font-medium">Hypnothérapeute Certifiée</p>
            </div>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Accueil</NuxtLink>
            <NuxtLink to="/a-propos" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">À propos</NuxtLink>
            <NuxtLink to="/services" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</NuxtLink>
            <button 
              @click="scrollToBooking"
              class="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🩺 Prendre RDV
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
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">bien-être</span>
              intérieur
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              Accompagnement personnalisé en hypnose thérapeutique pour surmonter vos défis 
              et révéler votre potentiel. Un espace sécurisé pour votre transformation.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                @click="scrollToBooking"
                class="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                🩺 Réserver une consultation
              </button>
              <NuxtLink 
                to="/a-propos"
                class="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                En savoir plus
              </NuxtLink>
            </div>
          </div>
          
          <div class="relative">
            <div class="w-full h-96 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-3xl flex items-center justify-center shadow-2xl border border-blue-200">
      <div class="text-center">
                <div class="w-28 h-28 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3">Approche Holistique</h3>
                <p class="text-gray-600">Corps, mental et émotions en harmonie</p>
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
          <div class="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Arrêt du tabac</h3>
            <p class="text-gray-600 mb-4">Libération définitive de la dépendance tabagique grâce à l'hypnose thérapeutique. Méthode douce et naturelle.</p>
            <div class="text-sm text-blue-600 font-medium">💊 Approche médicale</div>
          </div>

          <div class="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-200">
            <div class="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Gestion du stress</h3>
            <p class="text-gray-600 mb-4">Techniques de relaxation profonde et gestion émotionnelle pour retrouver sérénité et équilibre au quotidien.</p>
            <div class="text-sm text-emerald-600 font-medium">🌿 Bien-être naturel</div>
          </div>

          <div class="group bg-gradient-to-br from-blue-50 to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-200">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Confiance en soi</h3>
            <p class="text-gray-600 mb-4">Développement de l'estime personnelle et dépassement des blocages pour révéler votre plein potentiel.</p>
            <div class="text-sm text-blue-600 font-medium">⚡ Transformation personnelle</div>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink 
            to="/services" 
            class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
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
    <section id="booking" class="bg-gradient-to-br from-blue-50 to-emerald-50 py-20 border-t border-blue-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-6">Prêt(e) à commencer votre transformation ?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Réservez votre séance de découverte et faites le premier pas vers un mieux-être durable.
        </p>
        
                  <!-- Calendrier inline Cal.com -->
          <div class="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden mb-8">
            <div class="p-6 bg-gradient-to-r from-blue-600 to-emerald-600">
              <h3 class="text-xl font-semibold text-white mb-2">📅 Calendrier de consultation</h3>
              <p class="text-blue-100">Sélectionnez votre horaire préféré pour une séance d'hypnose thérapeutique</p>
            </div>
            
            <!-- Container pour le calendrier Cal.com -->
            <div class="p-6">
              <div 
                id="cal-inline-widget" 
                class="min-h-[600px] bg-gray-50 rounded-xl flex items-center justify-center"
              >
                <div class="text-center">
                  <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                  <p class="text-gray-600">Chargement du calendrier...</p>
                </div>
              </div>
            </div>
            
            <!-- Informations pratiques -->
            <div class="px-6 pb-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div class="flex items-center space-x-2 text-gray-600">
                  <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Consultation 60 minutes</span>
          </div>
                <div class="flex items-center space-x-2 text-gray-600">
                  <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Confirmation immédiate</span>
                </div>
                <div class="flex items-center space-x-2 text-gray-600">
                  <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Rappel automatique</span>
                </div>
              </div>
            </div>
          </div>

        <!-- Contact alternatif -->
        <div class="text-center">
          <p class="text-gray-600 mb-4">Vous préférez me contacter directement ?</p>
          <NuxtLink 
            to="/contact"
            class="inline-flex items-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            💬 Me contacter par email
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 border-t border-blue-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              <div>
                <h3 class="text-xl font-bold">Sophie Davesne</h3>
                <p class="text-blue-300">Hypnothérapeute Certifiée</p>
              </div>
            </div>
            <p class="text-gray-300">
              Accompagnement professionnel en hypnose thérapeutique pour votre bien-être et votre épanouissement.
            </p>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4 text-blue-300">Navigation</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors">Accueil</NuxtLink></li>
              <li><NuxtLink to="/a-propos" class="text-gray-300 hover:text-white transition-colors">À propos</NuxtLink></li>
              <li><NuxtLink to="/services" class="text-gray-300 hover:text-white transition-colors">Services</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold mb-4 text-emerald-300">Contact</h4>
            <div class="space-y-2 text-gray-300">
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>contact@sophie-davesne.fr</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>06 XX XX XX XX</span>
                </div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>Cabinet médical, Votre ville</span>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Sophie Davesne - Hypnothérapeute. Tous droits réservés. | Numéro ADELI : XXXXXXXXX</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Configuration de la page
useHead({
  title: 'Sophie Davesne - Hypnothérapeute | Cabinet médical d\'hypnose thérapeutique',
  meta: [
    { name: 'description', content: 'Sophie Davesne, hypnothérapeute certifiée. Consultation en cabinet pour arrêt du tabac, gestion du stress, confiance en soi. Prise de rendez-vous en ligne.' },
    { name: 'keywords', content: 'hypnothérapeute, hypnose médicale, arrêt tabac, stress, anxiété, confiance en soi, thérapie, cabinet médical' }
  ]
})

// Utilisation du composable useCal
const { initInlineCalendar } = useCal()

// Fonction pour scroll vers la section booking
const scrollToBooking = () => {
  const element = document.getElementById('booking')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Initialiser le calendrier Cal.com inline au montage
onMounted(() => {
  nextTick(() => {
    // Initialiser le calendrier inline
    initInlineCalendar('cal-inline-widget', 'paul-bugeon-el1oht')
  })
})
</script>