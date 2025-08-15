<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Test Uptime Robot - Sophie Davesne</h1>
        <p class="text-gray-600">Surveillez la disponibilité de votre site et vérifiez les performances</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Test Uptime Robot -->
        <div class="lg:col-span-2 p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Test Uptime Robot</h2>
          
          <div class="space-y-4">
            <button 
              @click="checkUptimeStatus" 
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              :disabled="loading"
            >
              {{ loading ? 'Checking...' : 'Check Uptime Status' }}
            </button>
            
            <button 
              @click="checkAllMonitors" 
              class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              :disabled="loading"
            >
              Check All Monitors
            </button>
            
            <button 
              @click="getUptimeLogs" 
              class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              :disabled="loading"
            >
              Get Uptime Logs
            </button>

            <button 
              @click="testGrafanaIntegration" 
              class="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              :disabled="loading"
            >
              Test Grafana Integration
            </button>
          </div>
          
          <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
            <p><strong>Status:</strong> {{ status }}</p>
            <p><strong>Last Action:</strong> {{ lastAction }}</p>
          </div>
        </div>
        
        <!-- Configuration Uptime Robot -->
        <div class="p-6 bg-white rounded-lg shadow-md">
          <h2 class="text-xl font-bold mb-4">Configuration Uptime Robot</h2>
          
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="font-medium">API Key:</span>
              <span :class="uptimeApiKey ? 'text-green-600' : 'text-red-600'">
                {{ uptimeApiKey ? 'Configured' : 'Not configured' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Monitor ID:</span>
              <span :class="uptimeMonitorId ? 'text-green-600' : 'text-red-600'">
                {{ uptimeMonitorId ? 'Configured' : 'Not configured' }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Check Interval:</span>
              <span class="text-blue-600">
                {{ uptimeCheckInterval }}s
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="font-medium">Alerts Enabled:</span>
              <span :class="uptimeAlertsEnabled ? 'text-green-600' : 'text-red-600'">
                {{ uptimeAlertsEnabled ? 'Yes' : 'No' }}
              </span>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-800">
            <p><strong>Instructions:</strong></p>
            <ul class="list-disc list-inside mt-2 space-y-1">
              <li>Configurez votre API key Uptime Robot</li>
              <li>Ajoutez votre Monitor ID</li>
              <li>Testez la surveillance</li>
              <li>Vérifiez l'intégration Grafana</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Résultats Uptime Robot -->
      <div class="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Résultats Uptime Robot</h2>
        
        <!-- Status du Monitor Principal -->
        <div v-if="uptimeStatus" class="mb-6 p-4 bg-gray-50 rounded">
          <h3 class="font-bold mb-2">Monitor Principal</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="font-medium">Nom:</span>
              <span class="ml-2">{{ uptimeStatus.name }}</span>
            </div>
            <div>
              <span class="font-medium">Status:</span>
              <span :class="getStatusClass(uptimeStatus.status)" class="ml-2">
                {{ getStatusText(uptimeStatus.status) }}
              </span>
            </div>
            <div>
              <span class="font-medium">Uptime:</span>
              <span class="ml-2">{{ (uptimeStatus.uptime * 100).toFixed(2) }}%</span>
            </div>
            <div>
              <span class="font-medium">Response Time:</span>
              <span class="ml-2">{{ uptimeStatus.responseTime }}ms</span>
            </div>
          </div>
        </div>
        
        <!-- Tous les Monitors -->
        <div v-if="allMonitors.length > 0" class="mb-6">
          <h3 class="font-bold mb-2">Tous les Monitors</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-4 py-2 border-b text-left">Nom</th>
                  <th class="px-4 py-2 border-b text-left">Status</th>
                  <th class="px-4 py-2 border-b text-left">Uptime</th>
                  <th class="px-4 py-2 border-b text-left">Response Time</th>
                  <th class="px-4 py-2 border-b text-left">URL</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="monitor in allMonitors" :key="monitor.id" class="hover:bg-gray-50">
                  <td class="px-4 py-2 border-b">{{ monitor.name }}</td>
                  <td class="px-4 py-2 border-b">
                    <span :class="getStatusClass(monitor.status)">
                      {{ getStatusText(monitor.status) }}
                    </span>
                  </td>
                  <td class="px-4 py-2 border-b">{{ (monitor.uptime * 100).toFixed(2) }}%</td>
                  <td class="px-4 py-2 border-b">{{ monitor.responseTime }}ms</td>
                  <td class="px-4 py-2 border-b text-blue-600">
                    <a :href="monitor.url" target="_blank" class="hover:underline">
                      {{ monitor.url }}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Logs Uptime Robot -->
        <div v-if="uptimeLogs.length > 0">
          <h3 class="font-bold mb-2">Logs Uptime Robot</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-4 py-2 border-b text-left">Date</th>
                  <th class="px-4 py-2 border-b text-left">Type</th>
                  <th class="px-4 py-2 border-b text-left">Duration</th>
                  <th class="px-4 py-2 border-b text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="log in uptimeLogs" :key="log.id" class="hover:bg-gray-50">
                  <td class="px-4 py-2 border-b">{{ formatDate(log.datetime) }}</td>
                  <td class="px-4 py-2 border-b">
                    <span :class="getLogTypeClass(log.type)">
                      {{ getLogTypeText(log.type) }}
                    </span>
                  </td>
                  <td class="px-4 py-2 border-b">{{ log.duration }}s</td>
                  <td class="px-4 py-2 border-b">{{ log.reason }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Message si pas de données -->
        <div v-if="!uptimeStatus && !allMonitors.length && !uptimeLogs.length" class="text-center py-8 text-gray-500">
          <p>Aucune donnée Uptime Robot disponible.</p>
          <p class="text-sm mt-2">Configurez Uptime Robot et cliquez sur les boutons de test.</p>
        </div>
      </div>
      
      <!-- Logs des Actions -->
      <div class="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Logs des Actions</h2>
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
const { 
  initializeMonitoring, 
  checkUptimeStatus: checkUptimeStatusMonitoring, 
  checkAllUptimeMonitors,
  getUptimeLogs: getUptimeLogsMonitoring,
  sendUptimeAlertToGrafana
} = useMonitoring()

const status = ref('Ready')
const lastAction = ref('No action yet')
const logs = ref([])
const loading = ref(false)

// Configuration Uptime Robot
const uptimeApiKey = config.public.uptimeRobot?.apiKey
const uptimeMonitorId = config.public.uptimeRobot?.monitorId
const uptimeCheckInterval = config.public.uptimeRobot?.checkInterval
const uptimeAlertsEnabled = config.public.uptimeRobot?.enableAlerts

// Données Uptime Robot
const uptimeStatus = ref(null)
const allMonitors = ref([])
const uptimeLogs = ref([])

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

// Vérifier le statut Uptime Robot
const checkUptimeStatus = async () => {
  status.value = 'Checking uptime status...'
  lastAction.value = 'Uptime status checked'
  loading.value = true
  
  try {
    const result = await checkUptimeStatusMonitoring()
    if (result) {
      uptimeStatus.value = result
      addLog(`Uptime status checked: ${result.name} - ${getStatusText(result.status)}`, 'info')
      
      // Envoyer à Grafana si activé
      if (uptimeAlertsEnabled) {
        await sendUptimeAlertToGrafana(result)
        addLog('Uptime alert sent to Grafana', 'info')
      }
    } else {
      addLog('Failed to get uptime status', 'error')
    }
  } catch (error) {
    addLog(`Error checking uptime status: ${error.message}`, 'error')
  }
  
  loading.value = false
  status.value = 'Uptime status checked'
}

// Vérifier tous les monitors
const checkAllMonitors = async () => {
  status.value = 'Checking all monitors...'
  lastAction.value = 'All monitors checked'
  loading.value = true
  
  try {
    const result = await checkAllUptimeMonitors()
    allMonitors.value = result
    addLog(`All monitors checked: ${result.length} monitors found`, 'info')
  } catch (error) {
    addLog(`Error checking all monitors: ${error.message}`, 'error')
  }
  
  loading.value = false
  status.value = 'All monitors checked'
}

// Obtenir les logs Uptime Robot
const getUptimeLogs = async () => {
  status.value = 'Getting uptime logs...'
  lastAction.value = 'Uptime logs retrieved'
  loading.value = true
  
  try {
    const result = await getUptimeLogsMonitoring()
    uptimeLogs.value = result
    addLog(`Uptime logs retrieved: ${result.length} logs found`, 'info')
  } catch (error) {
    addLog(`Error getting uptime logs: ${error.message}`, 'error')
  }
  
  loading.value = false
  status.value = 'Uptime logs retrieved'
}

// Tester l'intégration Grafana
const testGrafanaIntegration = async () => {
  status.value = 'Testing Grafana integration...'
  lastAction.value = 'Grafana integration tested'
  loading.value = true
  
  try {
    if (uptimeStatus.value) {
      await sendUptimeAlertToGrafana(uptimeStatus.value)
      addLog('Grafana integration test successful', 'info')
    } else {
      addLog('No uptime status available for Grafana test', 'warning')
    }
  } catch (error) {
    addLog(`Error testing Grafana integration: ${error.message}`, 'error')
  }
  
  loading.value = false
  status.value = 'Grafana integration tested'
}

// Utilitaires pour l'affichage
const getStatusClass = (status) => {
  switch (status) {
    case 0: return 'text-red-600 font-bold' // Paused
    case 1: return 'text-red-600 font-bold' // Not checked yet
    case 2: return 'text-green-600 font-bold' // Up
    case 8: return 'text-yellow-600 font-bold' // Seems down
    case 9: return 'text-red-600 font-bold' // Down
    default: return 'text-gray-600'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 0: return 'Paused'
    case 1: return 'Not checked yet'
    case 2: return 'Up'
    case 8: return 'Seems down'
    case 9: return 'Down'
    default: return 'Unknown'
  }
}

const getLogTypeClass = (type) => {
  switch (type) {
    case 1: return 'text-red-600 font-bold' // Down
    case 2: return 'text-green-600 font-bold' // Up
    case 98: return 'text-yellow-600 font-bold' // Down (delayed)
    default: return 'text-gray-600'
  }
}

const getLogTypeText = (type) => {
  switch (type) {
    case 1: return 'Down'
    case 2: return 'Up'
    case 98: return 'Down (delayed)'
    default: return 'Unknown'
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleString()
}

// Initialiser le monitoring
onMounted(() => {
  addLog('Page loaded, Uptime Robot test ready', 'info')
  
  // Initialiser le monitoring
  initializeMonitoring()
  
  // Log de la configuration
  addLog(`Uptime Robot API Key: ${uptimeApiKey ? 'Configured' : 'Not configured'}`, 'info')
  addLog(`Uptime Robot Monitor ID: ${uptimeMonitorId || 'Not configured'}`, 'info')
  addLog(`Uptime Robot Check Interval: ${uptimeCheckInterval}s`, 'info')
  addLog(`Uptime Robot Alerts: ${uptimeAlertsEnabled ? 'Enabled' : 'Disabled'}`, 'info')
})
</script>
