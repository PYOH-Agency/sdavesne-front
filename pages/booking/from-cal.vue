<template>
  <div class="min-h-screen bg-gradient-hero flex items-center justify-center py-20">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Chargement -->
      <div v-if="loading" class="text-center">
        <div class="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-600 rounded-lg text-sm mb-8">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Vérification de votre sélection...
        </div>
      </div>

      <!-- Erreur -->
      <div v-else-if="error" class="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Erreur</h1>
        <p class="text-xl text-gray-600 mb-8">{{ error }}</p>
        <NuxtLink
          to="/#booking"
          class="inline-block bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all duration-300"
        >
          Retour à l'accueil
        </NuxtLink>
      </div>

      <!-- Formulaire de paiement -->
      <div v-else-if="mapping" class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <!-- En-tête -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ mapping.label }}</h1>
          <p v-if="mapping.description" class="text-gray-600">{{ mapping.description }}</p>
        </div>

        <!-- Résumé -->
        <div class="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 class="font-semibold text-gray-900 mb-4">Résumé de votre réservation</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Type de consultation :</span>
              <span class="font-medium">{{ mapping.label }}</span>
            </div>
            <div v-if="mapping.duration" class="flex justify-between">
              <span class="text-gray-600">Durée :</span>
              <span class="font-medium">{{ mapping.duration }} minutes</span>
            </div>
            <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
              <span>Total :</span>
              <span class="text-primary">{{ formattedPrice }}</span>
            </div>
          </div>
        </div>

        <!-- Formulaire client -->
        <form @submit.prevent="submitPayment" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                v-model="form.firstName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Votre prénom"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nom *
              </label>
              <input
                v-model="form.lastName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Téléphone (optionnel)
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="06 12 34 56 78"
            />
          </div>

          <!-- Informations importantes -->
          <div class="bg-tertiary-50 border border-tertiary-200 rounded-lg p-4">
            <p class="text-sm text-secondary">
              <strong>Important :</strong> Votre carte sera enregistrée mais <strong>ne sera pas débitée</strong> maintenant. 
              Le paiement sera effectué après votre rendez-vous.
            </p>
          </div>

          <!-- Bouton de soumission -->
          <button
            type="submit"
            :disabled="submitting"
            class="w-full bg-gradient-primary text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Traitement...' : 'Continuer vers le paiement' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { getMappingByCalEventType, type CalStripeMapping } from '~/config/cal-stripe-mapping'

definePageMeta({
  ssr: false
})

useHead({
  title: 'Paiement - Sophie Davesne'
})

const route = useRoute()
const calEventType = route.query.event as string // Paramètre depuis Cal.com
const calBookingId = route.query.bookingUid as string // ID du booking Cal.com si disponible

const loading = ref(true)
const error = ref('')
const mapping = ref<CalStripeMapping | null>(null)
const price = ref<number | null>(null)
const submitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const { initBookingWithPayment } = useCal()

const formattedPrice = computed(() => {
  if (price.value) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price.value)
  }
  return 'Chargement...'
})

// Charger le mapping et le prix
const loadMappingAndPrice = async () => {
  if (!calEventType) {
    error.value = 'Type d\'événement non spécifié'
    loading.value = false
    return
  }

  // Trouver le mapping
  const foundMapping = getMappingByCalEventType(calEventType)
  if (!foundMapping) {
    error.value = `Type d'événement non configuré: ${calEventType}`
    loading.value = false
    return
  }

  mapping.value = foundMapping

  // Charger le prix depuis Stripe
  try {
    const response = await $fetch('/api/stripe/get-prices')
    if (response.success && response.prices) {
      const priceData = response.prices.find((p: any) => p.id === foundMapping.stripePriceId)
      if (priceData) {
        price.value = priceData.amount
      }
    }
  } catch (err) {
    console.error('Erreur chargement prix:', err)
  }

  loading.value = false
}

const submitPayment = async () => {
  if (!mapping.value) return

  submitting.value = true

  try {
    await initBookingWithPayment({
      calEventType: mapping.value.calEventType,
      priceId: mapping.value.stripePriceId,
      customerEmail: form.value.email,
      customerName: `${form.value.firstName} ${form.value.lastName}`.trim(),
      calBookingId: calBookingId // Passer l'ID du booking Cal.com si disponible
    })
  } catch (err) {
    console.error('Erreur:', err)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadMappingAndPrice()
})
</script>
