<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Test Sentry - Sophie Davesne</h1>
        <p class="text-gray-600">Testez l'intégration Sentry et le monitoring de votre application</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Composant de test Sentry -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Test Sentry Integration</h2>
          
          <div class="space-y-4">
            <button 
              @click="triggerError" 
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Trigger Test Error
            </button>
            
            <button 
              @click="triggerPerformanceIssue" 
              class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Trigger Performance Issue
            </button>
            
            <button 
              @click="trackCustomEvent" 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Track Custom Event
            </button>
          </div>
          
          <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p><strong>Status:</strong> {{ status }}</p>
            <p><strong>Last Action:</strong> {{ lastAction }}</p>
          </div>
        </div>
        
        <!-- Informations de configuration -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Configuration Status</h2>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="font-medium">Sentry DSN:</span>
              <span :class="sentryDsn ? 'text-green-600' : 'text-red-600'">
                {{ sentryDsn ? 'Configured' : 'Not configured' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Environment:</span>
              <span class="text-blue-600">{{ sentryEnvironment }}</span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Release:</span>
              <span class="text-blue-600">{{ sentryRelease }}</span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Performance Monitoring:</span>
              <span :class="performanceMonitoring ? 'text-green-600' : 'text-red-600'">
                {{ performanceMonitoring ? 'Enabled' : 'Disabled' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Error Tracking:</span>
              <span :class="errorTracking ? 'text-green-600' : 'text-red-600'">
                {{ errorTracking ? 'Enabled' : 'Disabled' }}
              </span>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
            <p><strong>Instructions:</strong></p>
            <ul class="list-disc list-inside mt-2 space-y-1">
              <li>Cliquez sur "Trigger Test Error" pour tester Sentry</li>
              <li>Vérifiez que l'erreur apparaît dans votre dashboard Sentry</li>
              <li>Utilisez "Trigger Performance Issue" pour tester le monitoring des performances</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Logs de test -->
      <div class="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Test Logs</h2>
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
const { initializeMonitoring, trackEvent, captureError } = useMonitoring()

const status = ref('Ready')
const lastAction = ref('No action yet')
const logs = ref([])

// Configuration Sentry
const sentryDsn = config.public.sentry?.dsn
const sentryEnvironment = config.public.sentry?.environment || 'development'
const sentryRelease = config.public.sentry?.release || '1.0.0'
const performanceMonitoring = config.public.monitoring?.enablePerformanceMonitoring
const errorTracking = config.public.monitoring?.enableErrorTracking

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

const triggerError = () => {
  try {
    status.value = 'Triggering error...'
    lastAction.value = 'Error triggered'
    
    // Simuler une erreur
    throw new Error('Test error from Sophie Davesne SentryTest component')
  } catch (error) {
    status.value = 'Error captured'
    captureError(error, { context: 'test_error' })
    addLog(`Error captured: ${error.message}`, 'error')
  }
}

const triggerPerformanceIssue = () => {
  status.value = 'Simulating performance issue...'
  lastAction.value = 'Performance issue simulated'
  
  // Simuler un long processus
  const start = performance.now()
  let result = 0
  
  for (let i = 0; i < 1000000; i++) {
    result += Math.random()
  }
  
  const duration = performance.now() - start
  status.value = `Performance test completed in ${duration.toFixed(2)}ms`
  
  addLog(`Performance test: ${duration.toFixed(2)}ms`, 'info')
  console.log(`Performance test: ${duration.toFixed(2)}ms`)
}

const trackCustomEvent = () => {
  status.value = 'Tracking custom event...'
  lastAction.value = 'Custom event tracked'
  
  trackEvent('button_click', { button: 'test', page: 'sentry-test' })
  addLog('Custom event tracked: button_click', 'info')
  status.value = 'Custom event tracked'
}

// Intercepter les erreurs globales
onMounted(() => {
  addLog('Page loaded, Sentry test ready', 'info')
  
  // Initialiser le monitoring
  initializeMonitoring()
  
  // Intercepter les erreurs non gérées
  window.addEventListener('error', (event) => {
    addLog(`Global error: ${event.message}`, 'error')
  })
  
  // Intercepter les promesses rejetées
  window.addEventListener('unhandledrejection', (event) => {
    addLog(`Unhandled promise rejection: ${event.reason}`, 'error')
  })
})
</script>
