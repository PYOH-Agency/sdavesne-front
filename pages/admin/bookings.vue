<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestion des rendez-vous</h1>
        <p class="text-gray-600">Validez les rendez-vous et chargez les paiements</p>
      </div>

      <!-- Filtres -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="flex flex-wrap gap-4">
          <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg">
            <option value="">Tous les statuts</option>
            <option value="pending_payment">Paiement en attente</option>
            <option value="payment_captured">Paiement capturé</option>
            <option value="confirmed">Confirmé</option>
            <option value="completed">Terminé</option>
            <option value="cancelled">Annulé</option>
          </select>
          
          <select v-model="paymentFilter" class="px-4 py-2 border border-gray-300 rounded-lg">
            <option value="">Tous les paiements</option>
            <option value="setup_complete">Méthode enregistrée</option>
            <option value="pending">En attente</option>
            <option value="paid">Payé</option>
          </select>

          <button
            @click="loadBookings"
            class="px-4 py-2 bg-tertiary text-white rounded-lg hover:bg-tertiary-600 transition-colors"
          >
            Actualiser
          </button>
        </div>
      </div>

      <!-- Chargement -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center px-6 py-3 bg-primary-50 text-primary-600 rounded-lg">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Chargement...
        </div>
      </div>

      <!-- Liste des bookings -->
      <div v-else-if="filteredBookings.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in filteredBookings" :key="booking.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ booking.customerName }}</div>
                <div class="text-sm text-gray-500">{{ booking.customerEmail }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(booking.appointmentDate) }}</div>
                <div class="text-sm text-gray-500">{{ booking.appointmentDuration }} min</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatAmount(booking.amount, booking.currency) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(booking.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ getStatusLabel(booking.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getPaymentStatusClass(booking.paymentStatus)" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ getPaymentStatusLabel(booking.paymentStatus) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  v-if="booking.paymentStatus === 'setup_complete' && booking.status === 'confirmed'"
                  @click="chargePayment(booking.id)"
                  :disabled="charging === booking.id"
                  class="text-emerald-600 hover:text-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ charging === booking.id ? 'Chargement...' : 'Charger le paiement' }}
                </button>
                <span v-else-if="booking.paymentStatus === 'paid'" class="text-gray-400">
                  Payé
                </span>
                <span v-else class="text-gray-400">
                  -
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Aucun booking -->
      <div v-else class="bg-white rounded-lg shadow p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun rendez-vous trouvé</h3>
        <p class="text-gray-500">Aucun rendez-vous ne correspond aux filtres sélectionnés.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
definePageMeta({
  ssr: false,
  middleware: 'auth' // À implémenter selon votre système d'auth
})

useHead({
  title: 'Gestion des rendez-vous - Admin'
})

const bookings = ref([])
const loading = ref(true)
const charging = ref(null)
const statusFilter = ref('')
const paymentFilter = ref('')

const filteredBookings = computed(() => {
  let filtered = bookings.value

  if (statusFilter.value) {
    filtered = filtered.filter(b => b.status === statusFilter.value)
  }

  if (paymentFilter.value) {
    filtered = filtered.filter(b => b.paymentStatus === paymentFilter.value)
  }

  return filtered.sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
})

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatAmount = (amount: number, currency: string = 'eur') => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(amount)
}

const getStatusClass = (status: string) => {
  const classes = {
    pending_payment: 'bg-yellow-100 text-yellow-800',
    payment_captured: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    no_show: 'bg-orange-100 text-orange-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status: string) => {
  const labels = {
    pending_payment: 'Paiement en attente',
    payment_captured: 'Paiement capturé',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    cancelled: 'Annulé',
    no_show: 'Absent'
  }
  return labels[status] || status
}

const getPaymentStatusClass = (status: string) => {
  const classes = {
    setup_complete: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPaymentStatusLabel = (status: string) => {
  const labels = {
    setup_complete: 'Méthode enregistrée',
    pending: 'En attente',
    paid: 'Payé',
    failed: 'Échoué',
    refunded: 'Remboursé'
  }
  return labels[status] || status
}

const loadBookings = async () => {
  loading.value = true
  try {
    const strapiUrl = process.env.NUXT_PUBLIC_STRAPI_URL || 'https://abundant-horse-f9e91a1796.strapiapp.com'
    const strapiToken = process.env.NUXT_PUBLIC_STRAPI_TOKEN || ''

    const response = await $fetch(`${strapiUrl}/api/bookings`, {
      headers: {
        'Authorization': `Bearer ${strapiToken}`
      },
      query: {
        populate: '*',
        sort: 'appointmentDate:desc'
      }
    })

    bookings.value = response?.data || []
  } catch (error) {
    console.error('Erreur chargement bookings:', error)
    bookings.value = []
  } finally {
    loading.value = false
  }
}

const chargePayment = async (bookingId: number) => {
  if (!confirm('Êtes-vous sûr de vouloir charger le paiement pour ce rendez-vous ?')) {
    return
  }

  charging.value = bookingId
  try {
    const response = await $fetch('/api/bookings/charge', {
      method: 'POST',
      body: {
        bookingId
      }
    })

    if (response.success) {
      alert('Paiement chargé avec succès !')
      await loadBookings()
    } else {
      alert('Erreur lors du chargement du paiement')
    }
  } catch (error) {
    console.error('Erreur chargement paiement:', error)
    alert('Erreur lors du chargement du paiement: ' + (error.message || 'Erreur inconnue'))
  } finally {
    charging.value = null
  }
}

onMounted(() => {
  loadBookings()
})
</script>
