<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
    <!-- Navigation -->
    <AppHeader
      title="Sophie Davesne"
      subtitle="Hypnothérapeute Certifiée"
      avatar="/images/sophie-davesne-avatar.svg"
      :navigation="[
        { path: '/', label: 'Accueil' },
        { path: '/a-propos', label: 'À propos' },
        { path: '/services', label: 'Services' },
        { path: '/contact', label: 'Contact' }
      ]"
      :cta="{
        primary: { path: '/#booking', label: '🩺 Prendre RDV' }
      }"
    />

    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left animate-fade-in-up">
            <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up animation-delay-200">
              Retrouvez votre 
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 animate-gradient-text">bien-être</span>
              intérieur
            </h1>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
              Accompagnement personnalisé en hypnose thérapeutique pour surmonter vos défis 
              et révéler votre potentiel. Un espace sécurisé pour votre transformation.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
              <button 
                @click="scrollToBooking"
                class="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Réserver une consultation
              </button>
              <NuxtLink 
                to="/a-propos"
                class="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5"
              >
                En savoir plus
              </NuxtLink>
            </div>
          </div>
          
          <div class="relative animate-fade-in-right animation-delay-300">
            <div class="w-full h-96 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-3xl flex items-center justify-center shadow-2xl border border-blue-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div class="text-center animate-fade-in animation-delay-800">
                <div class="w-28 h-28 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse-soft">
                  <svg class="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-3 animate-fade-in animation-delay-1000">Approche Holistique</h3>
                <p class="text-gray-600 animate-fade-in animation-delay-1200">Corps, mental et émotions en harmonie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="bg-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in-up animation-delay-300">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Mes domaines d'accompagnement</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            L'hypnose thérapeutique vous aide à dépasser vos blocages et atteindre vos objectifs
          </p>
        </div>

        <!-- Chargement services -->
        <div v-if="pendingServices" class="text-center py-12">
          <div class="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement des services...
          </div>
        </div>

        <!-- Services -->
        <div v-else-if="displayedServices.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(service, index) in displayedServices" 
            :key="service.id"
            class="group p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 border animate-fade-in-up"
            :class="[
              getServiceClasses(service.attributes?.color || 'blue'),
              `animation-delay-${(index + 1) * 200 + 500}`
            ]"
            :style="{ animationDelay: `${(index + 1) * 200 + 500}ms` }"
          >
            <!-- Icône -->
            <div 
              class="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl"
              :class="getIconClasses(service.attributes?.color || 'blue')"
            >
              <component :is="getIcon(service.attributes?.icon || 'heart')" class="w-8 h-8 text-white transition-transform duration-300" />
          </div>

            <!-- Contenu -->
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{{ service.attributes?.title || service.title }}</h3>
            <p class="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{{ service.attributes?.description || service.description }}</p>
            
            <!-- Badge -->
            <div 
              class="text-sm font-medium transition-all duration-300 transform group-hover:scale-105"
              :class="getTextClasses(service.attributes?.color || 'blue')"
            >
              {{ getBadge(service.attributes?.color || 'blue') }}
            </div>
          </div>
        </div>

        <!-- Aucun service -->
        <div v-else class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun service disponible</h3>
          <p class="text-gray-600">Les services seront bientôt disponibles.</p>
        </div>

        <div class="text-center mt-12 animate-fade-in-up animation-delay-1400">
          <NuxtLink 
            to="/services" 
            class="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-md px-6 py-3 rounded-lg hover:bg-blue-50"
          >
            Découvrir tous mes services
            <svg class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Témoignages Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 animate-fade-in-up animation-delay-200">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Ce que disent mes patients</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de personnes qui ont retrouvé leur bien-être grâce à l'hypnose thérapeutique
          </p>
        </div>

        <!-- Chargement témoignages -->
        <div v-if="loadingTestimonials" class="text-center py-12 animate-fade-in-up animation-delay-400">
          <div class="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Chargement des témoignages...
          </div>
        </div>

        <!-- Carrousel d'avis -->
        <div v-else-if="testimonials.length > 0" class="relative mb-12 animate-fade-in-up animation-delay-400">
          <!-- Navigation gauche -->
          <button 
            @click="previousTestimonial"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            :disabled="testimonials.length <= 1"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <!-- Témoignages -->
          <div class="overflow-hidden mx-16">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }"
            >
              <div 
                v-for="(testimonial, index) in testimonials" 
                :key="testimonial.id"
                class="w-full flex-shrink-0"
              >
                <div class="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
                  <div class="flex items-center mb-6">
                    <div class="flex text-yellow-400">
                      <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <blockquote class="text-lg text-gray-700 mb-6 leading-relaxed">
                    "{{ testimonial.content }}"
                  </blockquote>
                  
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {{ testimonial.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                      <div class="text-sm text-gray-500">{{ testimonial.service || 'Patient' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation droite -->
          <button 
            @click="nextTestimonial"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            :disabled="testimonials.length <= 1"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Indicateurs -->
          <div class="flex justify-center space-x-2 mt-8" v-if="testimonials.length > 1">
            <button 
              v-for="(testimonial, index) in testimonials" 
              :key="`dot-${index}`"
              @click="currentTestimonial = index"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="currentTestimonial === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'"
            ></button>
          </div>
        </div>

        <!-- Aucun témoignage -->
        <div v-else class="text-center py-12 animate-fade-in-up animation-delay-400">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Aucun témoignage disponible</h3>
          <p class="text-gray-600">Les témoignages patients seront bientôt disponibles.</p>
        </div>

        <!-- Bouton pour laisser un avis -->
        <div class="text-center animate-fade-in-up animation-delay-600">
          <button 
            @click="showTestimonialForm = true"
            class="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Laisser un témoignage
          </button>
        </div>

        <!-- Modal formulaire témoignage -->
        <div 
          v-if="showTestimonialForm" 
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click.self="showTestimonialForm = false"
        >
          <div class="bg-white rounded-2xl p-8 max-w-md w-full animate-fade-in">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-gray-900">Partager votre expérience</h3>
              <button 
                @click="showTestimonialForm = false"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form @submit.prevent="submitTestimonial" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Votre nom</label>
                <input 
                  v-model="testimonialForm.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Prénom ou initiales"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Service suivi (optionnel)</label>
                <input 
                  v-model="testimonialForm.service"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ex: Arrêt du tabac, Gestion du stress..."
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Note</label>
                <div class="flex space-x-1">
                  <button 
                    v-for="star in 5" 
                    :key="star"
                    type="button"
                    @click="testimonialForm.rating = star"
                    class="text-2xl transition-colors duration-200"
                    :class="star <= testimonialForm.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'"
                  >
                    ★
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Votre témoignage</label>
                <textarea 
                  v-model="testimonialForm.content"
                  required
                  rows="4"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Partagez votre expérience avec l'hypnose thérapeutique..."
                ></textarea>
              </div>

              <div class="flex space-x-4 pt-4">
                <button 
                  type="button"
                  @click="showTestimonialForm = false"
                  class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button 
                  type="submit"
                  :disabled="submittingTestimonial"
                  class="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50"
                >
                  {{ submittingTestimonial ? 'Envoi...' : 'Publier' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking Section -->
    <section id="booking" class="bg-gradient-to-br from-blue-50 to-emerald-50 py-20 border-t border-blue-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-6 animate-fade-in-up animation-delay-200">Prêt(e) à commencer votre transformation ?</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
          Réservez votre séance de découverte et faites le premier pas vers un mieux-être durable.
        </p>
        
                  <!-- Calendrier inline Cal.com -->
          <div class="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden mb-8">
            <div class="p-6 bg-gradient-to-r from-blue-600 to-emerald-600">
              <h3 class="text-xl font-semibold text-white mb-2">Calendrier de consultation</h3>
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
            Me contacter par email
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
// @ts-nocheck
// Configuration de la page
definePageMeta({
  ssr: false
})

// Import explicite du composant du kit
import { AppHeader } from '@pbugeon/nuxt-components-kit'

// Configuration de la page
useHead({
  title: 'Sophie Davesne - Hypnothérapeute | Cabinet médical d\'hypnose thérapeutique',
  meta: [
    { name: 'description', content: 'Sophie Davesne, hypnothérapeute certifiée. Consultation en cabinet pour arrêt du tabac, gestion du stress, confiance en soi. Prise de rendez-vous en ligne.' },
    { name: 'keywords', content: 'hypnothérapeute, hypnose médicale, arrêt tabac, stress, anxiété, confiance en soi, thérapie, cabinet médical' }
  ]
})

// Utilisation des composables
const { initInlineCalendar } = useCal()

// Import du composable Strapi
const { getFeaturedServices, getTestimonials } = useStrapiData()

// Services dynamiques depuis Strapi
const displayedServices = ref([])
const pendingServices = ref(false)

// Fonction pour charger les services en vedette depuis Strapi
const loadStrapiFeaturedServices = async () => {
  if (!process.client) return
  
  pendingServices.value = true
  
  try {
    const services = await getFeaturedServices()
    
    if (services && services.length > 0) {
      const mappedServices = services.map(service => ({
        id: service.id,
        attributes: {
          title: service.title,
          description: service.description,
          icon: service.icon?.trim() || 'heart',
          color: service.color?.trim() || 'blue',
          featured: service.featured
        }
      }))
      
      displayedServices.value = mappedServices.slice(0, 3)
      console.log('✅ Services en vedette chargés:', mappedServices.length)
    }
  } catch (err) {
    console.error('❌ Erreur lors du chargement des services:', err)
  } finally {
    pendingServices.value = false
  }
}

// Charger Strapi au montage
onMounted(() => {
  loadStrapiFeaturedServices()
  loadTestimonials()
  
  // Auto-rotate testimonials après un délai
  setTimeout(() => {
    if (testimonials.value.length > 1) {
      setInterval(() => {
        nextTestimonial()
      }, 8000) // Change toutes les 8 secondes
    }
  }, 2000)
})

// Gestion des témoignages - uniquement depuis Strapi
const testimonials = ref([])
const loadingTestimonials = ref(false)

const currentTestimonial = ref(0)
const showTestimonialForm = ref(false)
const submittingTestimonial = ref(false)

// Formulaire témoignage
const testimonialForm = ref({
  name: '',
  service: '',
  content: '',
  rating: 5
})

// Navigation carrousel
const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.value.length
}

const previousTestimonial = () => {
  currentTestimonial.value = currentTestimonial.value === 0 
    ? testimonials.value.length - 1 
    : currentTestimonial.value - 1
}

// Charger les témoignages depuis Strapi
const loadTestimonials = async () => {
  if (!process.client) return
  
  loadingTestimonials.value = true
  
  try {
    console.log('Chargement des témoignages depuis Strapi...')
    
    const response = await getTestimonials()
    
    if (response && response.length > 0) {
      // Filtrer côté client les témoignages publiés et exclure le test
      const validTestimonials = response.filter(testimonial => 
        testimonial.published && 
        testimonial.name !== 'Paul Bugeon' &&
        testimonial.service !== 'Test'
      )
      
      if (validTestimonials.length > 0) {
        const mappedTestimonials = validTestimonials.map(testimonial => ({
          id: testimonial.id,
          name: testimonial.name,
          content: testimonial.content,
          rating: testimonial.rating || 5,
          service: testimonial.service || 'Patient'
        }))
        
        console.log('Témoignages mappés:', mappedTestimonials)
        
        // Charger les témoignages Strapi
        testimonials.value = mappedTestimonials
        currentTestimonial.value = 0 // Reset à la première position
        
        console.log('Témoignages Strapi chargés avec succès:', mappedTestimonials.length)
        console.log('Témoignages actuels:', testimonials.value.map(t => t.name))
      } else {
        console.log('Aucun témoignage valide trouvé dans Strapi')
      }
    } else {
      console.log('Aucun témoignage trouvé dans Strapi')
    }
  } catch (err) {
    console.error('Erreur Strapi testimonials:', err)
    console.log('Aucun témoignage chargé')
  } finally {
    loadingTestimonials.value = false
  }
}

// Soumettre un nouveau témoignage
const submitTestimonial = async () => {
  if (!testimonialForm.value.name.trim() || !testimonialForm.value.content.trim()) {
    return
  }
  
  submittingTestimonial.value = true
  
  try {
    const response = await $fetch('/api/testimonials', {
      baseURL: 'http://localhost:1337',
      method: 'POST',
      body: {
        data: {
          name: testimonialForm.value.name.trim(),
          content: testimonialForm.value.content.trim(),
          service: testimonialForm.value.service.trim() || null,
          rating: testimonialForm.value.rating,
          published: false // En attente de modération
        }
      }
    })
    
    // Succès
    showTestimonialForm.value = false
    
    // Reset du formulaire
    testimonialForm.value = {
      name: '',
      service: '',
      content: '',
      rating: 5
    }
    
    // Notification de succès (simple alert pour le moment)
    alert('Merci pour votre témoignage ! Il sera publié après validation.')
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du témoignage:', error)
    alert('Erreur lors de l\'envoi. Veuillez réessayer.')
  } finally {
    submittingTestimonial.value = false
  }
}

// Fonctions pour les styles et icônes
const getServiceClasses = (color: string) => {
  const classes = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200',
    emerald: 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
  }
  return classes[color] || classes.blue
}

const getIconClasses = (color: string) => {
  const classes = {
    blue: 'bg-gradient-to-br from-blue-600 to-blue-700',
    emerald: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
    purple: 'bg-gradient-to-br from-purple-600 to-purple-700'
  }
  return classes[color] || classes.blue
}

const getTextClasses = (color: string) => {
  const classes = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    purple: 'text-purple-600'
  }
  return classes[color] || classes.blue
}

const getBadge = (color: string) => {
  const badges = {
    blue: 'Approche médicale',
    emerald: 'Bien-être naturel',
    purple: 'Transformation personnelle'
  }
  return badges[color] || badges.blue
}

const getIcon = (iconName: string) => {
  const icons = {
    'no-smoking': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636' })
    ]),
    'heart': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' })
    ]),
    'lightning': () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 10V3L4 14h7v7l9-11h-7z' })
    ])
  }
  return icons[iconName] || icons.heart
}

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

<style scoped>
/* Animations personnalisées */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes gradient-text {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulse-soft {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

/* Classes d'animation */
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fade-in-right 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

.animate-gradient-text {
  background-size: 200% 200%;
  animation: gradient-text 3s ease-in-out infinite;
}

.animate-pulse-soft {
  animation: pulse-soft 3s ease-in-out infinite;
}

/* Délais d'animation */
.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

.animation-delay-700 {
  animation-delay: 700ms;
}

.animation-delay-800 {
  animation-delay: 800ms;
}

.animation-delay-900 {
  animation-delay: 900ms;
}

.animation-delay-1000 {
  animation-delay: 1000ms;
}

.animation-delay-1200 {
  animation-delay: 1200ms;
}

.animation-delay-1400 {
  animation-delay: 1400ms;
}

/* Ombres personnalisées */
.hover\:shadow-3xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Animation au scroll (optionnel) */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up,
  .animate-fade-in-right,
  .animate-fade-in,
  .animate-gradient-text,
  .animate-pulse-soft {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>