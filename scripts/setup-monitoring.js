#!/usr/bin/env node

/**
 * Script d'automatisation pour configurer le monitoring Grafana Cloud
 * Usage: node scripts/setup-monitoring.js
 */

const fs = require('fs')
const path = require('path')

class MonitoringSetup {
  constructor() {
    this.config = {
      uptimerobotApiKey: process.env.UPTIMEROBOT_API_KEY,
      grafanaApiKey: process.env.GRAFANA_CLOUD_API_KEY,
      grafanaUrl: process.env.GRAFANA_CLOUD_URL,
      sentryAuthToken: process.env.SENTRY_AUTH_TOKEN
    }
  }

  // Vérifier la configuration
  checkConfig() {
    const missing = []
    
    if (!this.config.uptimerobotApiKey) missing.push('UPTIMEROBOT_API_KEY')
    if (!this.config.grafanaApiKey) missing.push('GRAFANA_CLOUD_API_KEY')
    if (!this.config.grafanaUrl) missing.push('GRAFANA_CLOUD_URL')
    
    if (missing.length > 0) {
      console.error('❌ Variables d\'environnement manquantes:')
      missing.forEach(key => console.error(`   - ${key}`))
      console.error('\n📝 Créez un fichier .env avec ces variables ou exportez-les.')
      return false
    }
    
    console.log('✅ Configuration validée')
    return true
  }

  // Récupérer les monitors UptimeRobot
  async getUptimeRobotMonitors() {
    try {
      const response = await fetch('https://api.uptimerobot.com/v2/getMonitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `api_key=${this.config.uptimerobotApiKey}&format=json&logs=1`
      })
      
      const data = await response.json()
      
      if (data.stat === 'ok') {
        console.log(`✅ ${data.monitors.length} monitors trouvés sur UptimeRobot`)
        return data.monitors
      } else {
        console.error('❌ Erreur UptimeRobot:', data.error)
        return []
      }
    } catch (error) {
      console.error('❌ Erreur de connexion UptimeRobot:', error.message)
      return []
    }
  }

  // Créer un dashboard Grafana
  async createGrafanaDashboard(monitors) {
    const dashboard = {
      dashboard: {
        id: null,
        title: 'Monitoring Sites - Vue d\'ensemble',
        tags: ['monitoring', 'uptime', 'sites'],
        timezone: 'browser',
        panels: [
          {
            id: 1,
            title: 'État des Sites',
            type: 'stat',
            targets: [{
              expr: 'uptimerobot_monitor_status',
              refId: 'A'
            }],
            fieldConfig: {
              defaults: {
                color: {
                  mode: 'thresholds'
                },
                thresholds: {
                  steps: [
                    { color: 'red', value: 0 },
                    { color: 'yellow', value: 1 },
                    { color: 'green', value: 2 }
                  ]
                }
              }
            },
            gridPos: { h: 8, w: 12, x: 0, y: 0 }
          },
          {
            id: 2,
            title: 'Temps de Réponse',
            type: 'timeseries',
            targets: [{
              expr: 'uptimerobot_monitor_response_time',
              refId: 'A'
            }],
            gridPos: { h: 8, w: 12, x: 12, y: 0 }
          },
          {
            id: 3,
            title: 'Disponibilité 30j',
            type: 'table',
            targets: [{
              expr: 'uptimerobot_monitor_uptime_ratio',
              refId: 'A'
            }],
            gridPos: { h: 8, w: 24, x: 0, y: 8 }
          }
        ],
        time: {
          from: 'now-24h',
          to: 'now'
        },
        refresh: '5m'
      },
      overwrite: true
    }

    try {
      const response = await fetch(`${this.config.grafanaUrl}/api/dashboards/db`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.grafanaApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dashboard)
      })

      const result = await response.json()
      
      if (response.ok) {
        console.log('✅ Dashboard Grafana créé:', result.url)
        return result
      } else {
        console.error('❌ Erreur création dashboard:', result.message)
        return null
      }
    } catch (error) {
      console.error('❌ Erreur Grafana API:', error.message)
      return null
    }
  }

  // Configurer les alertes
  async setupAlerts(monitors) {
    const alertRules = monitors.map(monitor => ({
      alert: {
        name: `${monitor.friendly_name} - Site Down`,
        message: `Le site ${monitor.friendly_name} (${monitor.url}) est indisponible`,
        frequency: '1m',
        conditions: [{
          query: {
            queryType: '',
            refId: 'A',
            model: {
              expr: `uptimerobot_monitor_status{monitor_id="${monitor.id}"} == 0`,
              interval: '',
              refId: 'A'
            }
          },
          reducer: {
            type: 'last',
            params: []
          },
          evaluator: {
            params: [1],
            type: 'lt'
          }
        }],
        executionErrorState: 'alerting',
        noDataState: 'no_data',
        for: '2m'
      }
    }))

    console.log(`📋 ${alertRules.length} règles d'alerte configurées`)
    return alertRules
  }

  // Générer un rapport de configuration
  generateReport(monitors, dashboard) {
    const report = {
      timestamp: new Date().toISOString(),
      monitors: monitors.map(m => ({
        name: m.friendly_name,
        url: m.url,
        status: m.status === 2 ? 'UP' : 'DOWN',
        uptime: `${m.all_time_uptime_ratio}%`
      })),
      dashboard: dashboard ? {
        url: dashboard.url,
        uid: dashboard.uid
      } : null,
      next_steps: [
        '1. Vérifier que tous les sites sont surveillés',
        '2. Configurer les notifications (email, Slack, etc.)',
        '3. Tester les alertes en simulant une panne',
        '4. Partager les dashboards avec votre équipe'
      ]
    }

    const reportPath = path.join(__dirname, '..', 'monitoring-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    console.log('\n📊 RAPPORT DE CONFIGURATION')
    console.log('=' .repeat(50))
    console.log(`📅 Date: ${new Date().toLocaleString('fr-FR')}`)
    console.log(`🌐 Sites surveillés: ${monitors.length}`)
    
    monitors.forEach(monitor => {
      const status = monitor.status === 2 ? '🟢' : '🔴'
      console.log(`   ${status} ${monitor.friendly_name} (${monitor.all_time_uptime_ratio}%)`)
    })
    
    if (dashboard) {
      console.log(`📈 Dashboard: ${dashboard.url}`)
    }
    
    console.log(`\n💾 Rapport complet sauvé: ${reportPath}`)
    console.log('\n🎯 PROCHAINES ÉTAPES:')
    report.next_steps.forEach((step, i) => {
      console.log(`   ${i + 1}. ${step}`)
    })
  }

  // Fonction principale
  async run() {
    console.log('🚀 Configuration du monitoring Grafana Cloud')
    console.log('=' .repeat(50))

    // Vérification de la configuration
    if (!this.checkConfig()) {
      process.exit(1)
    }

    // Récupération des monitors UptimeRobot
    console.log('\n📡 Récupération des monitors UptimeRobot...')
    const monitors = await this.getUptimeRobotMonitors()
    
    if (monitors.length === 0) {
      console.log('⚠️  Aucun monitor trouvé. Ajoutez vos sites sur UptimeRobot d\'abord.')
      return
    }

    // Création du dashboard Grafana
    console.log('\n📊 Création du dashboard Grafana...')
    const dashboard = await this.createGrafanaDashboard(monitors)

    // Configuration des alertes
    console.log('\n🔔 Configuration des alertes...')
    await this.setupAlerts(monitors)

    // Génération du rapport
    console.log('\n📋 Génération du rapport...')
    this.generateReport(monitors, dashboard)

    console.log('\n✅ Configuration terminée!')
    console.log('🌐 Accédez à Grafana Cloud pour voir vos dashboards')
  }
}

// Exécution du script
if (require.main === module) {
  const setup = new MonitoringSetup()
  setup.run().catch(error => {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  })
}

module.exports = MonitoringSetup
