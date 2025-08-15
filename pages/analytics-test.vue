<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Test Analytics - Sophie Davesne</h1>
        <p class="text-gray-600">Testez l'intégration des analytics et le tracking utilisateur</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Test des Analytics -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Test Analytics</h2>
          
          <div class="space-y-4">
            <button 
              @click="trackPageView" 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Track Page View
            </button>
            
            <button 
              @click="trackCustomEvent" 
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Track Custom Event
            </button>
            
            <button 
              @click="trackUserAction" 
              class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Track User Action
            </button>

            <button 
              @click="setUser" 
              class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Set User
            </button>
          </div>
          
          <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p><strong>Status:</strong> {{ status }}</p>
            <p><strong>Last Action:</strong> {{ lastAction }}</p>
          </div>
        </div>
        
        <!-- Configuration des Analytics -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Configuration Analytics</h2>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="font-medium">Analytics Enabled:</span>
              <span :class="analyticsEnabled ? 'text-green-600' : 'text-red-600'">
                {{ analyticsEnabled ? 'Enabled' : 'Disabled' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Google Analytics:</span>
              <span :class="gaMeasurementId ? 'text-green-600' : 'text-red-600'">
                {{ gaMeasurementId ? 'Configured' : 'Not configured' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Plausible:</span>
              <span :class="plausibleDomain ? 'text-green-600' : 'text-red-600'">
                {{ plausibleDomain ? 'Configured' : 'Not configured' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Google Tag Manager:</span>
              <span :class="gtmId ? 'text-green-600' : 'text-red-600'">
                {{ gtmId ? 'Configured' : 'Not configured' }}
              </span>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
            <p><strong>Instructions:</strong></p>
            <ul class="list-disc list-inside mt-2 space-y-1">
              <li>Configurez vos IDs d'analytics dans le fichier .env</li>
              <li>Cliquez sur les boutons pour tester le tracking</li>
              <li>Vérifiez vos dashboards analytics</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Logs des Analytics -->
      <div class="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Analytics Logs</h2>
        <div class="bg-gray-100 p-4 rounded font-mono text-sm max-h-64 overflow-y-auto">
          <div v-for="(log, index) in logs" :key="index" class="mb-1">
            <span class="text-gray-500">[{{ log.timestamp }}]</span>
            <span :class="log.type === 'error' ? 'text-red-600' : 'text-blue-600'">
              {{ log.message }}
            </span>
          </div>
        </div>
        <button 
          @click="clearLogs" 
          class="mt-3 px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          Clear Logs
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useMonitoring } from '~/composables/useMonitoring'

const config = useRuntimeConfig()
const { initializeMonitoring, trackPageView: trackPageViewMonitoring, trackEvent, setUser: setUserMonitoring } = useMonitoring()

const status = ref('Ready')
const lastAction = ref('No action yet')
const logs = ref([])

// Configuration Analytics
const analyticsEnabled = config.public.monitoring?.enableAnalytics
const gaMeasurementId = config.public.ga?.measurementId
const plausibleDomain = config.public.plausible?.domain
const gtmId = config.public.gtm?.id

// Ajouter un log
const addLog = (message, type = 'info') => {
  logs.value.push({
    timestamp: new Date().toLocaleTimeString(),
    message,
    type
  })
}

// Effacer les logs
const clearLogs = () => {
  logs.value = []
}

const trackPageView = () => {
  status.value = 'Tracking page view...'
  lastAction.value = 'Page view tracked'
  
  trackPageViewMonitoring('/analytics-test')
  addLog('Page view tracked: /analytics-test', 'info')
  status.value = 'Page view tracked'
}

const trackCustomEvent = () => {
  status.value = 'Tracking custom event...'
  lastAction.value = 'Custom event tracked'
  
  trackEvent('analytics_test', { 
    button: 'custom_event', 
    page: 'analytics-test',
    timestamp: Date.now()
  })
  addLog('Custom event tracked: analytics_test', 'info')
  status.value = 'Custom event tracked'
}

const trackUserAction = () => {
  status.value = 'Tracking user action...'
  lastAction.value = 'User action tracked'
  
  trackEvent('button_click', { 
    button: 'user_action', 
    page: 'analytics-test',
    action: 'test_click'
  })
  addLog('User action tracked: button_click', 'info')
  status.value = 'User action tracked'
}

const setUser = () => {
  status.value = 'Setting user...'
  lastAction.value = 'User set'
  
  setUserMonitoring('test-user-123', { 
    email: 'test@example.com',
    plan: 'premium',
    source: 'analytics-test'
  })
  addLog('User set: test-user-123', 'info')
  status.value = 'User set'
}

// Initialiser le monitoring
onMounted(() => {
  addLog('Page loaded, analytics test ready', 'info')
  
  // Initialiser le monitoring
  initializeMonitoring()
  
  // Log de la configuration
  addLog(`Analytics enabled: ${analyticsEnabled}`, 'info')
  addLog(`GA Measurement ID: ${gaMeasurementId || 'Not configured'}`, 'info')
  addLog(`Plausible Domain: ${plausibleDomain || 'Not configured'}`, 'info')
  addLog(`GTM ID: ${gtmId || 'Not configured'}`, 'info')
})
</script>
