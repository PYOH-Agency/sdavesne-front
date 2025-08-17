<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
            <div class="relative z-10">
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
            <!-- Éléments décoratifs -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-60"></div>
            <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-200 rounded-full opacity-60"></div>
          </div>

          <!-- Contenu texte -->
          <div class="space-y-6">
            <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Hypnothérapeute certifiée
            </div>
            
            <h2 class="text-3xl font-bold text-gray-900">
              ✨ Votre hypnothérapeute certifiée et passionnée
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
              <div class="text-2xl font-dancing-script text-blue-600">
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
            🌿 Qu'est-ce que l'hypnothérapie ?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            L'hypnose est un état naturel de conscience modifiée qui permet d'accéder à nos ressources intérieures et de favoriser des changements positifs.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Hypnose Ericksonienne - Mise en avant principale -->
          <div class="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">🌀 Hypnose Ericksonienne</h3>
            </div>
            <p class="text-gray-700 mb-4 leading-relaxed">
              L'hypnose ericksonienne est aujourd'hui l'approche la plus répandue et la plus utilisée. Elle est souple, respectueuse et entièrement personnalisée : le praticien utilise vos propres expériences, images et émotions pour favoriser le changement.
            </p>
            <div class="bg-blue-50 rounded-lg p-4">
              <p class="text-blue-800 font-medium">
                → Idéale pour la gestion du stress, des phobies, de l'anxiété, des douleurs ou encore pour renforcer la confiance en soi.
              </p>
            </div>
          </div>

          <!-- Hypnose Classique -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 class="text-xl font-bold text-gray-900">🎯 Hypnose Classique</h4>
            </div>
            <p class="text-gray-700 mb-4 text-sm leading-relaxed">
              L'hypnose classique repose sur des suggestions directes, simples et puissantes. Elle est particulièrement efficace pour :
            </p>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• L'arrêt du tabac</li>
              <li>• La motivation</li>
              <li>• La gestion des habitudes</li>
              <li>• La performance et la concentration</li>
            </ul>
          </div>

          <!-- Hypnose Humaniste -->
          <div class="lg:col-span-3 bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-400">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-900">🌍 Hypnose Humaniste</h4>
            </div>
            <p class="text-gray-700 text-sm leading-relaxed">
              L'hypnose humaniste permet un travail plus symbolique et spirituel, axé sur la conscience élargie et la compréhension de soi.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Les bienfaits concrets -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            💡 Les bienfaits concrets
          </h2>
          <p class="text-xl text-gray-600">
            Découvrez comment l'hypnothérapie peut transformer votre quotidien
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Réduire le stress</h3>
            <p class="text-sm text-gray-600">et l'anxiété</p>
          </div>

          <div class="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Retrouver un sommeil</h3>
            <p class="text-sm text-gray-600">réparateur</p>
          </div>

          <div class="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
            <div class="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Se libérer du tabac</h3>
            <p class="text-sm text-gray-600">et d'autres habitudes</p>
          </div>

          <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Reprendre confiance</h3>
            <p class="text-sm text-gray-600">en soi</p>
          </div>

          <div class="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
            <div class="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Dépasser les blocages</h3>
            <p class="text-sm text-gray-600">émotionnels</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Mon approche -->
    <section class="py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="bg-white rounded-2xl shadow-xl p-12 border border-indigo-100">
          <div class="w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          
          <h2 class="text-3xl font-bold text-gray-900 mb-6">
            🤝 Mon approche
          </h2>
          
          <blockquote class="text-xl text-gray-700 italic leading-relaxed mb-8">
            "Chaque séance est un espace bienveillant où je vous guide avec l'hypnose ericksonienne ou classique selon vos besoins, afin de créer un changement durable et respectueux de votre rythme."
          </blockquote>
          
          <div class="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
              Bienveillance
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              Personnalisation
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
              Respect
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Call-to-action -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-12 text-white">
          <h2 class="text-3xl font-bold mb-6">
            📞 Prêt(e) à transformer votre vie ?
          </h2>
          
          <p class="text-xl mb-8 opacity-90">
            Vous souhaitez découvrir comment l'hypnose peut vous aider ?
          </p>
          
          <div class="space-y-4">
            <button class="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              🗓️ Réservez votre séance
            </button>
            
            <p class="text-sm opacity-75">
              Première consultation gratuite • Séances en cabinet ou à distance
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
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
