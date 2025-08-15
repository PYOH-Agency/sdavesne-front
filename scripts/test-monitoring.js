#!/usr/bin/env node

/**
 * Script de test pour vérifier que le monitoring fonctionne correctement
 * Usage: npm run monitoring:test
 */

const fs = require('fs')
const path = require('path')

class MonitoringTest {
  constructor() {
    this.results = {
      sentry: { status: 'pending', message: '' },
      analytics: { status: 'pending', message: '' },
      uptimerobot: { status: 'pending', message: '' },
      grafana: { status: 'pending', message: '' }
    }
  }

  // Test Sentry
  async testSentry() {
    console.log('🔍 Test Sentry...')
    
    try {
      const sentryDsn = process.env.NUXT_PUBLIC_SENTRY_DSN
      
      if (!sentryDsn) {
        this.results.sentry = {
          status: 'error',
          message: 'NUXT_PUBLIC_SENTRY_DSN non défini dans .env'
        }
        return
      }

      // Vérifier le format du DSN
      const dsnPattern = /^https:\/\/[a-f0-9]+@[a-f0-9]+\.ingest\.sentry\.io\/[0-9]+$/
      if (!dsnPattern.test(sentryDsn)) {
        this.results.sentry = {
          status: 'warning',
          message: 'Format DSN Sentry invalide'
        }
        return
      }

      // Test de connexion basique
      const projectId = sentryDsn.split('/').pop()
      this.results.sentry = {
        status: 'success',
        message: `DSN valide (Project ID: ${projectId})`
      }

    } catch (error) {
      this.results.sentry = {
        status: 'error',
        message: error.message
      }
    }
  }

  // Test Analytics
  async testAnalytics() {
    console.log('📊 Test Analytics...')
    
    try {
      const gtmId = process.env.NUXT_PUBLIC_GTM_ID
      const plausibleDomain = process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN
      
      if (!gtmId && !plausibleDomain) {
        this.results.analytics = {
          status: 'warning',
          message: 'Aucun service analytics configuré (GTM ou Plausible)'
        }
        return
      }

      let messages = []
      
      if (gtmId) {
        if (gtmId.startsWith('GTM-') || gtmId.startsWith('G-')) {
          messages.push(`✅ Google Analytics: ${gtmId}`)
        } else {
          messages.push(`⚠️ Google Analytics: Format ID invalide (${gtmId})`)
        }
      }

      if (plausibleDomain) {
        if (plausibleDomain.includes('.')) {
          messages.push(`✅ Plausible: ${plausibleDomain}`)
        } else {
          messages.push(`⚠️ Plausible: Format domaine invalide (${plausibleDomain})`)
        }
      }

      this.results.analytics = {
        status: 'success',
        message: messages.join(', ')
      }

    } catch (error) {
      this.results.analytics = {
        status: 'error',
        message: error.message
      }
    }
  }

  // Test UptimeRobot
  async testUptimeRobot() {
    console.log('⏱️ Test UptimeRobot...')
    
    try {
      const apiKey = process.env.UPTIMEROBOT_API_KEY
      
      if (!apiKey) {
        this.results.uptimerobot = {
          status: 'warning',
          message: 'UPTIMEROBOT_API_KEY non défini'
        }
        return
      }

      // Test API UptimeRobot
      const response = await fetch('https://api.uptimerobot.com/v2/getAccountDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `api_key=${apiKey}&format=json`
      })

      const data = await response.json()
      
      if (data.stat === 'ok') {
        this.results.uptimerobot = {
          status: 'success',
          message: `Connexion réussie (Email: ${data.account.email})`
        }
      } else {
        this.results.uptimerobot = {
          status: 'error',
          message: `Erreur API: ${data.error?.message || 'Inconnu'}`
        }
      }

    } catch (error) {
      this.results.uptimerobot = {
        status: 'error',
        message: `Erreur de connexion: ${error.message}`
      }
    }
  }

  // Test Grafana
  async testGrafana() {
    console.log('📈 Test Grafana Cloud...')
    
    try {
      const apiKey = process.env.GRAFANA_CLOUD_API_KEY
      const grafanaUrl = process.env.GRAFANA_CLOUD_URL
      
      if (!apiKey || !grafanaUrl) {
        this.results.grafana = {
          status: 'warning',
          message: 'Configuration Grafana incomplète (API_KEY ou URL manquante)'
        }
        return
      }

      // Test API Grafana
      const response = await fetch(`${grafanaUrl}/api/org`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        this.results.grafana = {
          status: 'success',
          message: `Connexion réussie (Org: ${data.name})`
        }
      } else {
        this.results.grafana = {
          status: 'error',
          message: `Erreur HTTP ${response.status}`
        }
      }

    } catch (error) {
      this.results.grafana = {
        status: 'error',
        message: `Erreur de connexion: ${error.message}`
      }
    }
  }

  // Test de la configuration Nuxt
  testNuxtConfig() {
    console.log('⚙️ Test configuration Nuxt...')
    
    const configPath = path.join(__dirname, '..', 'nuxt.config.ts')
    
    if (!fs.existsSync(configPath)) {
      console.log('❌ nuxt.config.ts introuvable')
      return false
    }

    const configContent = fs.readFileSync(configPath, 'utf8')
    
    const checks = [
      { name: 'Module Sentry', test: configContent.includes('@sentry/nuxt/module') },
      { name: 'Config Sentry', test: configContent.includes('sentry:') },
      { name: 'Runtime Config', test: configContent.includes('sentryDsn:') }
    ]

    console.log('\n📋 Vérification nuxt.config.ts:')
    checks.forEach(check => {
      const status = check.test ? '✅' : '❌'
      console.log(`   ${status} ${check.name}`)
    })

    return checks.every(check => check.test)
  }

  // Test des fichiers
  testFiles() {
    console.log('📁 Test des fichiers...')
    
    const files = [
      { path: 'composables/useMonitoring.ts', required: true },
      { path: 'plugins/monitoring.client.ts', required: true },
      { path: 'docs/monitoring-setup.md', required: false },
      { path: 'grafana-dashboards/monitoring-overview.json', required: false }
    ]

    console.log('\n📋 Vérification des fichiers:')
    files.forEach(file => {
      const filePath = path.join(__dirname, '..', file.path)
      const exists = fs.existsSync(filePath)
      const status = exists ? '✅' : (file.required ? '❌' : '⚠️')
      console.log(`   ${status} ${file.path}`)
    })
  }

  // Générer le rapport
  generateReport() {
    console.log('\n📊 RAPPORT DE TEST')
    console.log('=' .repeat(50))
    
    Object.entries(this.results).forEach(([service, result]) => {
      const icon = {
        success: '✅',
        warning: '⚠️',
        error: '❌',
        pending: '⏳'
      }[result.status]
      
      console.log(`${icon} ${service.toUpperCase()}: ${result.message}`)
    })

    // Score global
    const scores = Object.values(this.results)
    const successCount = scores.filter(r => r.status === 'success').length
    const totalCount = scores.length
    const score = Math.round((successCount / totalCount) * 100)

    console.log('\n🎯 SCORE GLOBAL')
    console.log(`${score}% des services configurés correctement (${successCount}/${totalCount})`)

    // Recommandations
    console.log('\n💡 RECOMMANDATIONS')
    if (score < 50) {
      console.log('   🔴 Configuration critique - Plusieurs services ne fonctionnent pas')
    } else if (score < 80) {
      console.log('   🟡 Configuration partielle - Quelques ajustements nécessaires')
    } else {
      console.log('   🟢 Configuration excellente - Monitoring opérationnel')
    }

    // Étapes suivantes
    const errors = Object.entries(this.results)
      .filter(([, result]) => result.status === 'error')
      .map(([service]) => service)

    if (errors.length > 0) {
      console.log('\n🔧 ACTIONS REQUISES:')
      errors.forEach(service => {
        console.log(`   • Corriger la configuration ${service}`)
      })
    }

    console.log('\n📖 Consultez docs/monitoring-setup.md pour plus d\'informations')

    // Sauvegarde du rapport
    const reportPath = path.join(__dirname, '..', 'monitoring-test-report.json')
    const report = {
      timestamp: new Date().toISOString(),
      score,
      results: this.results,
      recommendations: score >= 80 ? 'Configuration excellente' : 'Ajustements nécessaires'
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    console.log(`\n💾 Rapport détaillé: ${reportPath}`)

    return score >= 80
  }

  // Fonction principale
  async run() {
    console.log('🧪 Test de la configuration monitoring')
    console.log('=' .repeat(50))

    // Tests de configuration
    this.testNuxtConfig()
    this.testFiles()

    // Tests des services
    await this.testSentry()
    await this.testAnalytics()
    await this.testUptimeRobot()
    await this.testGrafana()

    // Génération du rapport
    const success = this.generateReport()

    if (success) {
      console.log('\n🎉 Configuration monitoring validée!')
      process.exit(0)
    } else {
      console.log('\n⚠️ Configuration incomplète - Consultez le rapport ci-dessus')
      process.exit(1)
    }
  }
}

// Exécution du script
if (require.main === module) {
  const test = new MonitoringTest()
  test.run().catch(error => {
    console.error('❌ Erreur pendant les tests:', error.message)
    process.exit(1)
  })
}

module.exports = MonitoringTest
