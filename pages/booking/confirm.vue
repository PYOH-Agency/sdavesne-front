<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center py-20">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center">
        <div class="inline-flex items-center px-6 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm mb-8">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Vérification de votre paiement...
        </div>
      </div>

      <div v-else-if="success" class="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <!-- Icône de succès -->
        <div class="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-4">Méthode de paiement enregistrée !</h1>
        <p class="text-xl text-gray-600 mb-8">
          Votre méthode de paiement a été enregistrée avec succès. Vous pouvez maintenant réserver votre rendez-vous.
        </p>

          <!-- Informations importantes -->
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 text-left">
            <h3 class="font-semibold text-blue-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Informations importantes
            </h3>
            <ul class="space-y-2 text-blue-800 text-sm">
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span><strong>Empreinte bancaire uniquement</strong> : Votre carte a été enregistrée mais <strong>n'a pas été débitée</strong></span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Le paiement sera effectué <strong>après votre rendez-vous</strong>, une fois la séance confirmée</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Vous pouvez <strong>annuler ou modifier</strong> votre rendez-vous jusqu'à <strong>48 heures avant</strong> la date prévue, sans frais</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>En cas d'annulation moins de 48h avant, le paiement sera effectué</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span>Vous recevrez une confirmation par email avec tous les détails</span>
              </li>
            </ul>
          </div>

        <!-- Bouton pour continuer vers Cal.com -->
        <div class="space-y-4">
          <button
            @click="goToCal"
            class="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Réserver mon rendez-vous maintenant
          </button>
          
          <NuxtLink
            to="/"
            class="block text-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>

      <div v-else class="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <!-- Icône d'erreur -->
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <h1 class="text-3xl font-bold text-gray-900 mb-4">Erreur</h1>
        <p class="text-xl text-gray-600 mb-8">
          {{ errorMessage || 'Une erreur est survenue lors de la vérification de votre paiement.' }}
        </p>

        <div class="space-y-4">
          <NuxtLink
            to="/#booking"
            class="inline-block bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300"
          >
            Réessayer
          </NuxtLink>
          
          <NuxtLink
            to="/"
            class="block text-center text-gray-600 hover:text-gray-900 transition-colors duration-300 mt-4"
          >
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  ssr: false
})

useHead({
  title: 'Confirmation de paiement - Sophie Davesne'
})

const route = useRoute()
const sessionId = route.query.session_id as string
const calEventType = route.query.cal_event as string || ''

const loading = ref(true)
const success = ref(false)
const errorMessage = ref('')
const stripeSessionId = ref('')

const { getCalUrl } = useCal()

const verifySession = async () => {
  if (!sessionId) {
    loading.value = false
    errorMessage.value = 'Session ID manquant'
    return
  }

  try {
    // Vérifier la session Stripe côté serveur
    const response = await $fetch('/api/stripe/verify-session', {
      method: 'POST',
      body: {
        sessionId
      }
    })

    if (response.success) {
      success.value = true
      stripeSessionId.value = sessionId
    } else {
      errorMessage.value = response.message || 'Erreur de vérification'
    }
  } catch (error) {
    console.error('Erreur vérification session:', error)
    errorMessage.value = 'Erreur lors de la vérification de la session'
  } finally {
    loading.value = false
  }
}

const goToCal = () => {
  // Rediriger vers Cal.com avec l'événement spécifique si fourni
  const calUsername = 'paul-bugeon-el1oht'
  
  if (calEventType) {
    // Rediriger vers l'événement Cal.com spécifique avec le sessionId Stripe
    const calUrl = getCalUrl(calUsername, calEventType)
    window.location.href = `${calUrl}?stripe_session=${stripeSessionId.value}`
  } else {
    // Rediriger vers le calendrier général
    const calUrl = getCalUrl(calUsername)
    window.location.href = `${calUrl}?stripe_session=${stripeSessionId.value}`
  }
}

onMounted(() => {
  verifySession()
})
</script>
