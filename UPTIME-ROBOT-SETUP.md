# 🚀 Guide de Configuration Uptime Robot - Sophie Davesne

Ce guide vous explique comment configurer et utiliser Uptime Robot pour surveiller la disponibilité de votre site.

## 🎯 **Qu'est-ce qu'Uptime Robot ?**

**Uptime Robot** est un service de surveillance de site web qui :
- ✅ **Surveille** la disponibilité de votre site 24h/24
- ✅ **Alerte** en cas de panne ou de problème
- ✅ **Mesure** les temps de réponse
- ✅ **Calcule** le pourcentage d'uptime
- ✅ **Intègre** avec Grafana pour la visualisation

## 🔧 **Configuration Étape par Étape**

### **Étape 1 : Créer un compte Uptime Robot**

1. **Allez sur** [uptimerobot.com](https://uptimerobot.com)
2. **Cliquez sur** "Sign Up" ou "Créer un compte"
3. **Remplissez** le formulaire d'inscription
4. **Vérifiez** votre email

### **Étape 2 : Créer un Monitor**

1. **Connectez-vous** à votre compte Uptime Robot
2. **Cliquez sur** "Add New Monitor"
3. **Choisissez** le type de monitor :
   - **HTTP(s)** : Pour les sites web
   - **Keyword** : Pour vérifier le contenu
   - **Ping** : Pour vérifier la connectivité

4. **Configurez le monitor** :
   - **Friendly Name** : `Sophie Davesne Vitrine`
   - **URL** : `https://votre-domaine.com`
   - **Monitor Type** : `HTTP(s)`
   - **Monitoring Interval** : `5 minutes` (recommandé)

### **Étape 3 : Récupérer l'API Key**

1. **Allez dans** "My Settings" → "API Settings"
2. **Cliquez sur** "Generate API Key"
3. **Copiez** la clé API générée
4. **Exemple** : `u1234567-1234567890abcdef1234567890abcdef`

### **Étape 4 : Récupérer le Monitor ID**

1. **Retournez** à la liste des monitors
2. **Cliquez sur** votre monitor
3. **Notez** l'ID du monitor dans l'URL
4. **Exemple** : `https://uptimerobot.com/dashboard#12345678` → ID = `12345678`

## 📝 **Configuration des Variables d'Environnement**

### **Modifiez votre fichier `.env` :**

```bash
# Uptime Robot Configuration
NUXT_PUBLIC_UPTIME_ROBOT_API_KEY=u1234567-1234567890abcdef1234567890abcdef
NUXT_PUBLIC_UPTIME_ROBOT_MONITOR_ID=12345678
NUXT_PUBLIC_UPTIME_ROBOT_CHECK_INTERVAL=300
NUXT_PUBLIC_UPTIME_ROBOT_ENABLE_ALERTS=true
```

### **Variables expliquées :**

- **`NUXT_PUBLIC_UPTIME_ROBOT_API_KEY`** : Votre clé API Uptime Robot
- **`NUXT_PUBLIC_UPTIME_ROBOT_MONITOR_ID`** : ID de votre monitor
- **`NUXT_PUBLIC_UPTIME_ROBOT_CHECK_INTERVAL`** : Intervalle de vérification en secondes (300 = 5 min)
- **`NUXT_PUBLIC_UPTIME_ROBOT_ENABLE_ALERTS`** : Activer l'envoi d'alertes vers Grafana

## 🧪 **Test de la Configuration**

### **Page de Test :**
- **Route** : `/uptime-test`
- **URL** : http://localhost:3000/uptime-test

### **Fonctionnalités de Test :**

1. **Check Uptime Status** - Vérifie le statut de votre monitor principal
2. **Check All Monitors** - Vérifie tous vos monitors Uptime Robot
3. **Get Uptime Logs** - Récupère l'historique des vérifications
4. **Test Grafana Integration** - Teste l'envoi de données vers Grafana

### **Vérification :**

1. **Démarrez** votre application : `npm run dev`
2. **Allez sur** : http://localhost:3000/uptime-test
3. **Cliquez sur** "Check Uptime Status"
4. **Vérifiez** que le statut s'affiche correctement

## 📊 **Interprétation des Statuts**

### **Codes de Statut Uptime Robot :**

| Code | Statut | Signification | Couleur |
|------|--------|---------------|---------|
| 0 | Paused | Monitor en pause | 🔴 Rouge |
| 1 | Not checked yet | Pas encore vérifié | 🔴 Rouge |
| 2 | Up | Site accessible | 🟢 Vert |
| 8 | Seems down | Semble inaccessible | 🟡 Jaune |
| 9 | Down | Site inaccessible | 🔴 Rouge |

### **Métriques Disponibles :**

- **Uptime Ratio** : Pourcentage de temps où le site était accessible
- **Response Time** : Temps de réponse en millisecondes
- **Last Check** : Dernière vérification effectuée
- **Logs** : Historique des vérifications et incidents

## 🔔 **Configuration des Alertes**

### **Alertes Uptime Robot :**

1. **Dans Uptime Robot** :
   - Allez dans "My Settings" → "Alert Contacts"
   - Ajoutez votre email ou Slack
   - Configurez les conditions d'alerte

2. **Alertes Grafana** :
   - Les données sont automatiquement envoyées à Grafana
   - Créez des dashboards pour visualiser l'uptime
   - Configurez des alertes basées sur les métriques

### **Types d'Alertes :**

- **Site Down** : Site inaccessible
- **Response Time High** : Temps de réponse élevé
- **Uptime Low** : Pourcentage d'uptime faible
- **Custom Alerts** : Alertes personnalisées

## 📈 **Intégration avec Grafana**

### **Données envoyées automatiquement :**

```json
{
  "metric": "nuxt.uptime_alert",
  "value": 1,
  "timestamp": 1640995200000,
  "tags": {
    "monitor_id": "12345678",
    "monitor_name": "Sophie Davesne Vitrine",
    "status": 2,
    "uptime": 0.9995,
    "response_time": 245,
    "app": "sdavesne-vitrine",
    "environment": "development"
  }
}
```

### **Dashboard Grafana recommandé :**

1. **Uptime Overview** : Vue d'ensemble de tous les monitors
2. **Response Time Trends** : Évolution des temps de réponse
3. **Uptime History** : Historique de la disponibilité
4. **Alert History** : Historique des alertes

## 🚀 **Utilisation dans votre Code**

### **Composable de Monitoring :**

```typescript
// Dans vos composants
const { 
  checkUptimeStatus, 
  checkAllUptimeMonitors, 
  getUptimeLogs 
} = useMonitoring()

// Vérifier le statut
const status = await checkUptimeStatus()
if (status?.status === 2) {
  console.log('Site accessible')
} else {
  console.log('Site inaccessible')
}

// Vérifier tous les monitors
const allMonitors = await checkAllUptimeMonitors()
console.log(`${allMonitors.length} monitors configurés`)

// Obtenir les logs
const logs = await getUptimeLogs()
console.log(`${logs.length} logs disponibles`)
```

### **Exemple d'utilisation avancée :**

```typescript
// Vérification automatique toutes les 5 minutes
onMounted(() => {
  const checkInterval = setInterval(async () => {
    const status = await checkUptimeStatus()
    
    if (status?.status !== 2) {
      // Site inaccessible - envoyer une alerte
      console.warn('Site inaccessible:', status)
      
      // Optionnel : notification utilisateur
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Site Inaccessible', {
          body: `Le site ${status.name} est inaccessible`,
          icon: '/warning-icon.png'
        })
      }
    }
  }, 5 * 60 * 1000) // 5 minutes
  
  // Nettoyer l'intervalle
  onUnmounted(() => clearInterval(checkInterval))
})
```

## 🔍 **Débogage et Résolution de Problèmes**

### **Problèmes courants :**

#### **1. API Key invalide :**
```
Error: Uptime Robot API error: 401
```
**Solution** : Vérifiez que votre clé API est correcte

#### **2. Monitor ID invalide :**
```
Error: Uptime Robot API error: 400
```
**Solution** : Vérifiez que le Monitor ID existe

#### **3. Rate limiting :**
```
Error: Uptime Robot API error: 429
```
**Solution** : Réduisez la fréquence des appels API

### **Vérifications :**

1. **Console du navigateur** : Regardez les erreurs JavaScript
2. **Network tab** : Vérifiez les requêtes vers l'API Uptime Robot
3. **Logs de l'application** : Utilisez la page de test pour voir les logs
4. **Configuration** : Vérifiez vos variables d'environnement

## 📚 **Ressources et Documentation**

### **Liens utiles :**
- [Uptime Robot Dashboard](https://uptimerobot.com/dashboard)
- [Uptime Robot API Documentation](https://uptimerobot.com/api)
- [Uptime Robot Status Page](https://status.uptimerobot.com)

### **Support :**
- **Documentation** : [help.uptimerobot.com](https://help.uptimerobot.com)
- **Forum** : [community.uptimerobot.com](https://community.uptimerobot.com)
- **Email** : support@uptimerobot.com

## 🎯 **Prochaines Étapes**

Une fois Uptime Robot configuré :

1. **Testez** la surveillance sur localhost
2. **Configurez** des alertes par email/Slack
3. **Intégrez** avec Grafana pour la visualisation
4. **Surveillez** régulièrement les métriques
5. **Optimisez** selon les insights obtenus

## 🎉 **Félicitations !**

Votre système de surveillance Uptime Robot est maintenant configuré et prêt à surveiller la disponibilité de votre site 24h/24 !

**Voulez-vous que je vous aide à configurer d'autres aspects du monitoring ou à tester Uptime Robot ?** 🚀
