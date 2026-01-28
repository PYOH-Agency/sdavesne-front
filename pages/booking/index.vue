<template>
  <div class="min-h-screen bg-gradient-hero py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Choisissez votre type de consultation</h1>
        <p class="text-xl text-gray-600">
          Sélectionnez le type de consultation qui correspond à vos besoins
        </p>
      </div>

      <!-- Liste des produits -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          v-for="product in products"
          :key="product.calEventType"
          class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8 cursor-pointer border-2"
          :class="selectedProduct?.calEventType === product.calEventType ? 'border-primary' : 'border-transparent'"
          @click="selectedProduct = product"
        >
          <div class="text-center">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ product.label }}</h3>
            <p v-if="product.description" class="text-gray-600 mb-4 text-sm">
              {{ product.description }}
            </p>
            <div class="text-3xl font-bold text-blue-600 mb-2">
              {{ getProductPrice(product) }}
            </div>
            <div v-if="product.duration" class="text-sm text-gray-500 mb-4">
              Durée : {{ product.duration }} minutes
            </div>
            <div
              class="w-6 h-6 rounded-full border-2 mx-auto transition-all"
              :class="selectedProduct?.calEventType === product.calEventType 
                ? 'bg-primary border-primary' 
                : 'border-gray-300'"
            >
              <svg
                v-if="selectedProduct?.calEventType === product.calEventType"
                class="w-full h-full text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire client -->
      <div v-if="selectedProduct" class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Vos informations</h2>
        
        <form @submit.prevent="submitBooking" class="space-y-6">
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

          <!-- Résumé -->
          <div class="bg-gray-50 rounded-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Résumé de votre réservation</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Type de consultation :</span>
                <span class="font-medium">{{ selectedProduct.label }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Durée :</span>
                <span class="font-medium">{{ selectedProduct.duration }} minutes</span>
              </div>
              <div class="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total :</span>
                <span class="text-primary">{{ getProductPrice(selectedProduct) }}</span>
              </div>
            </div>
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

      <!-- Message si aucun produit sélectionné -->
      <div v-else class="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p class="text-gray-600">Veuillez sélectionner un type de consultation ci-dessus</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { BOOKING_PRODUCTS, type BookingProduct } from '~/config/booking-products'

definePageMeta({
  ssr: false
})

useHead({
  title: 'Réserver une consultation - Sophie Davesne'
})

const products = ref(BOOKING_PRODUCTS)
const selectedProduct = ref<BookingProduct | null>(null)
const submitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const { initBookingWithPayment } = useCal()

const productPrices = ref<Record<string, number>>({})

// Récupérer les prix depuis Stripe
const loadPrices = async () => {
  try {
    const response = await $fetch('/api/stripe/get-prices')
    if (response.success && response.prices) {
      response.prices.forEach((price: any) => {
        productPrices.value[price.id] = price.amount
      })
    }
  } catch (error) {
    console.error('Erreur chargement prix:', error)
  }
}

const getProductPrice = (product: BookingProduct) => {
  const price = productPrices.value[product.stripePriceId]
  if (price) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price)
  }
  return 'Chargement...'
}

onMounted(() => {
  loadPrices()
})

const submitBooking = async () => {
  if (!selectedProduct.value) return

  submitting.value = true

  try {
    await initBookingWithPayment({
      calEventType: selectedProduct.value.calEventType,
      priceId: selectedProduct.value.stripePriceId,
      customerEmail: form.value.email,
      customerName: `${form.value.firstName} ${form.value.lastName}`.trim()
    })
  } catch (error) {
    console.error('Erreur:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadPrices()
})
</script>
