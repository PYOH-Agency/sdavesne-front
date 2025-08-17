<template>
  <!-- Header de la page -->
  <div class="bg-white shadow-sm border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-4xl font-bold text-gray-900 text-center">
        À propos de l'hypnothérapie
      </h1>
      <p class="text-xl text-gray-600 text-center mt-4">
        Découvrez mon parcours et l'approche qui peut transformer votre vie
      </p>
    </div>
  </div>

  <!-- Section 1: Qui suis-je ? -->
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Photo professionnelle -->
        <div class="relative">
          <div class="w-80 h-96 mx-auto bg-gradient-to-br from-blue-200 to-indigo-300 rounded-2xl shadow-2xl flex items-center justify-center">
            <div class="text-center text-gray-600">
              <svg class="w-24 h-24 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm">Photo professionnelle</p>
              <p class="text-xs text-gray-500">à remplacer</p>
            </div>
          </div>
        </div>

        <!-- Contenu texte -->
        <div class="space-y-6">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Hypnothérapeute certifiée
          </div>
          
          <h2 class="text-3xl font-bold text-gray-900">
            Votre hypnothérapeute certifiée et passionnée
          </h2>
          
          <div class="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Passionnée par l'accompagnement humain, je me suis formée aux meilleures approches de l'hypnothérapie pour vous offrir un accompagnement personnalisé et bienveillant.
            </p>
            <p>
              Mon parcours m'a permis de développer une expertise dans l'hypnose ericksonienne et classique, avec une approche centrée sur vos besoins spécifiques et votre rythme personnel.
            </p>
            <p>
              Chaque personne est unique, et c'est pourquoi j'adapte mes techniques pour vous aider à découvrir et mobiliser vos propres ressources intérieures.
            </p>
          </div>

          <!-- Signature manuscrite -->
          <div class="pt-4">
            <div class="text-2xl text-blue-600">
              Avec bienveillance,<br>
              <span class="text-xl">Sophie Davesne</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: Qu'est-ce que l'hypnothérapie ? -->
  <section class="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Qu'est-ce que l'hypnothérapie ?
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          L'hypnose est un état naturel de conscience modifiée qui permet d'accéder à nos ressources intérieures et de favoriser des changements positifs.
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Hypnose Ericksonienne -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Hypnose Ericksonienne</h3>
          <p class="text-gray-700 mb-4 leading-relaxed">
            L'hypnose ericksonienne est aujourd'hui l'approche la plus répandue et la plus utilisée. Elle est souple, respectueuse et entièrement personnalisée.
          </p>
          <div class="bg-blue-50 rounded-lg p-4">
            <p class="text-blue-800 font-medium">
              Idéale pour la gestion du stress, des phobies, de l'anxiété, des douleurs ou encore pour renforcer la confiance en soi.
            </p>
          </div>
        </div>

        <!-- Hypnose Classique -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <h4 class="text-xl font-bold text-gray-900 mb-4">Hypnose Classique</h4>
          <p class="text-gray-700 mb-4 text-sm leading-relaxed">
            L'hypnose classique repose sur des suggestions directes, simples et puissantes.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• L'arrêt du tabac</li>
            <li>• La motivation</li>
            <li>• La gestion des habitudes</li>
            <li>• La performance et la concentration</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Call-to-action -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-12 text-white">
        <h2 class="text-3xl font-bold mb-6">
          Prêt(e) à transformer votre vie ?
        </h2>
        
        <p class="text-xl mb-8 opacity-90">
          Vous souhaitez découvrir comment l'hypnose peut vous aider ?
        </p>
        
        <button class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
          Réservez votre séance
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
// Configuration de la page
useHead({
  title: 'À propos - Sophie Davesne Hypnothérapeute',
  meta: [
    {
      name: 'description',
      content: 'Découvrez mon parcours d\'hypnothérapeute certifiée et comment l\'hypnose ericksonienne peut vous aider à transformer votre vie.'
    }
  ]
})
</script>

<style scoped>
/* Police manuscrite pour la signature */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600&display=swap');

.font-dancing-script {
  font-family: 'Dancing Script', cursive;
}

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
