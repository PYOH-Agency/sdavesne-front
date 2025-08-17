<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Header de navigation - Sticky avec le composant du kit -->
    <div class="sticky top-0 z-50">
      <AppHeader
        title="Sophie Davesne"
        subtitle="Hypnothérapeute Certifiée"
        avatar="/images/sophie-davesne-avatar.svg"
        color="emerald"
        :navigation="[
          { path: '/', label: 'Accueil' },
          { path: '/a-propos', label: 'À propos' },
          { path: '/services', label: 'Services' },
          { path: '/contact', label: 'Contact' }
        ]"
        :cta="{
          primary: { path: '/#booking', label: 'Prendre RDV' }
        }"
      />
    </div>

    <!-- Contenu principal de la page -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter
      title="Sophie Davesne"
      subtitle="Hypnothérapeute Certifiée"
      description="Accompagnement personnalisé en hypnothérapie pour votre bien-être et votre transformation personnelle."
      :links="[
        { path: '/', label: 'Accueil' },
        { path: '/a-propos', label: 'À propos' },
        { path: '/services', label: 'Services' },
        { path: '/contact', label: 'Contact' }
      ]"
      :social="[
        { name: 'Email', url: 'mailto:sophie.davesne@example.com', icon: 'email' },
        { name: 'Téléphone', url: 'tel:+33123456789', icon: 'phone' }
      ]"
    />
  </div>
</template>

<script setup>
// Import des composants du kit depuis l'index principal
import { AppHeader, AppFooter } from '@pbugeon/nuxt-components-kit'
</script>
