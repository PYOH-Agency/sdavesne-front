<template>
  <!-- Header de la page -->
  <div class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-gray-900 text-center">
        Contact et rendez-vous
      </h1>
      <p class="text-xl text-gray-600 text-center mt-4">
        Prenez rendez-vous pour votre première consultation gratuite
      </p>
    </div>
  </div>

  <!-- Section principale -->
  <section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Informations de contact -->
        <div class="space-y-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-6">
              Mes coordonnées
            </h2>
            
            <div class="space-y-6">
              <!-- Localisation -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Cabinet d'hypnothérapie</h3>
                  <p class="text-gray-600">123 Rue de la Paix<br>75000 Paris, France</p>
                  <p class="text-sm text-gray-500 mt-1">Métro : Station de la Paix (ligne 1)</p>
                </div>
              </div>

              <!-- Téléphone -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Téléphone</h3>
                  <p class="text-gray-600">+33 1 23 45 67 89</p>
                  <p class="text-sm text-gray-500 mt-1">Du lundi au vendredi, 9h-18h</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Email</h3>
                  <p class="text-gray-600">sophie.davesne@example.com</p>
                  <p class="text-sm text-gray-500 mt-1">Réponse sous 24h</p>
                </div>
              </div>

              <!-- Horaires -->
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">Horaires de consultation</h3>
                  <div class="text-gray-600 space-y-1">
                    <p>Lundi - Vendredi : 9h00 - 18h00</p>
                    <p>Samedi : 9h00 - 12h00</p>
                    <p>Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Informations pratiques -->
          <div class="bg-blue-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Informations pratiques
            </h3>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>• Première consultation gratuite (30 min)</li>
              <li>• Séances en cabinet ou à distance</li>
              <li>• Durée moyenne : 1h à 1h30</li>
              <li>• Paiement par carte, chèque ou espèces</li>
              <li>• Remboursement possible selon votre mutuelle</li>
            </ul>
          </div>
        </div>

        <!-- Formulaire de contact -->
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            Prendre rendez-vous
          </h2>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <!-- Nom et Prénom -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                  Prénom *
                </label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre prénom"
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <!-- Email et Téléphone -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            <!-- Motif de consultation -->
            <div>
              <label for="consultationType" class="block text-sm font-medium text-gray-700 mb-2">
                Type de consultation *
              </label>
              <select
                id="consultationType"
                v-model="form.consultationType"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Sélectionnez un type</option>
                <option value="premiere">Première consultation gratuite</option>
                <option value="stress">Gestion du stress et anxiété</option>
                <option value="sommeil">Troubles du sommeil</option>
                <option value="tabac">Arrêt du tabac</option>
                <option value="confiance">Confiance en soi</option>
                <option value="phobies">Phobies et peurs</option>
                <option value="douleurs">Gestion des douleurs</option>
                <option value="autre">Autre (à préciser)</option>
              </select>
            </div>

            <!-- Message -->
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                Message (optionnel)
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Décrivez brièvement votre situation ou vos objectifs..."
              ></textarea>
            </div>

            <!-- Préférences -->
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  v-model="form.preferences.remote"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">
                  Je préfère une consultation à distance
                </span>
              </label>
              
              <label class="flex items-center">
                <input
                  v-model="form.preferences.newsletter"
                  type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span class="ml-2 text-sm text-gray-700">
                  Je souhaite recevoir des informations sur l'hypnothérapie
                </span>
              </label>
            </div>

            <!-- Bouton de soumission -->
            <button
              type="submit"
              :disabled="submitting"
              class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </span>
              <span v-else>
                Demander un rendez-vous
              </span>
            </button>
          </form>

          <!-- Message de confirmation -->
          <div v-if="formSubmitted" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <p class="text-green-800 text-sm">
                Merci ! Votre demande a été envoyée. Je vous recontacte dans les 24h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section CTA -->
  <section class="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
      <h2 class="text-3xl font-bold mb-6">
        Prêt(e) à commencer votre transformation ?
      </h2>
      <p class="text-xl mb-8 opacity-90">
        La première consultation est gratuite et sans engagement
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
          Appeler maintenant
        </button>
        <button class="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
          Envoyer un email
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Configuration de la page
useHead({
  title: 'Contact - Sophie Davesne Hypnothérapeute',
  meta: [
    {
      name: 'description',
      content: 'Prenez rendez-vous avec Sophie Davesne, hypnothérapeute certifiée. Première consultation gratuite. Cabinet à Paris et consultations à distance.'
    }
  ]
})

// État du formulaire
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  consultationType: '',
  message: '',
  preferences: {
    remote: false,
    newsletter: false
  }
})

const submitting = ref(false)
const formSubmitted = ref(false)

// Soumission du formulaire
const submitForm = async () => {
  submitting.value = true
  
  try {
    // Simulation d'envoi (à remplacer par votre logique d'API)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    formSubmitted.value = true
    
    // Réinitialiser le formulaire
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      consultationType: '',
      message: '',
      preferences: {
        remote: false,
        newsletter: false
      }
    }
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
      formSubmitted.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* Animations au survol */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-4px);
}

/* Transitions fluides */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
