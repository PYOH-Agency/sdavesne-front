# 🚀 Guide de Monitoring - Sophie Davesne Vitrine

Ce projet utilise un système de monitoring complet avec Sentry, configuré pour capturer automatiquement les erreurs et les performances.

## 📋 Configuration Actuelle

### **Sentry - Suivi des Erreurs**
- ✅ **DSN configuré** : `https://2bba1985fa8c352a47e59cc4f6b7218b@o4509850120093696.ingest.de.sentry.io/4509850126123088`
- ✅ **Projet** : `sdavesne-vitrine`
- ✅ **Organisation** : `pyoh`
- ✅ **Environnement** : `development`

### **Fonctionnalités Activées**
- ✅ Capture automatique des erreurs JavaScript
- ✅ Monitoring des performances (navigation timing)
- ✅ Session replay pour reproduire les bugs
- ✅ Breadcrumbs pour tracer les actions utilisateur
- ✅ Intégration native avec Nuxt 3

## 🧪 Test du Monitoring

### **Page de Test Sentry**
- **Route** : `/sentry-test`
- **URL** : http://localhost:3000/sentry-test

### **Fonctionnalités de Test**
1. **Trigger Test Error** - Simule une erreur pour tester Sentry
2. **Trigger Performance Issue** - Teste le monitoring des performances
3. **Track Custom Event** - Teste le suivi des événements

### **Vérification Sentry**
1. Cliquez sur "Trigger Test Error"
2. Vérifiez que l'erreur apparaît dans votre dashboard Sentry
3. Vérifiez les breadcrumbs et le contexte

## 📊 Utilisation dans votre Code

### **Composable de Monitoring**

```typescript
// Dans vos composants
const { 
  initializeMonitoring, 
  trackEvent, 
  captureError, 
  setUser 
} = useMonitoring()

// Initialiser le monitoring
onMounted(() => {
  initializeMonitoring()
})

// Tracker un événement
trackEvent('button_click', { 
  button: 'cta', 
  page: 'home' 
})

// Capturer une erreur
try {
  // Votre code
} catch (error) {
  captureError(error, { context: 'user_action' })
}

// Définir l'utilisateur
setUser('user123', { 
  email: 'user@example.com',
  plan: 'premium' 
})
```

### **Interception Globale des Erreurs**

```typescript
// Dans app.vue
const { captureError } = useMonitoring()

// Intercepter les erreurs globales
onErrorCaptured((error, instance, info) => {
  captureError(error, { 
    component: instance?.$options.name,
    info 
  })
})
```

## 🔧 Configuration

### **Variables d'environnement (.env)**
```bash
# Sentry Configuration
NUXT_PUBLIC_SENTRY_DSN=https://2bba1985fa8c352a47e59cc4f6b7218b@o4509850120093696.ingest.de.sentry.io/4509850126123088
NUXT_PUBLIC_SENTRY_ENVIRONMENT=development
NUXT_PUBLIC_SENTRY_RELEASE=1.0.0

# Performance Monitoring
NUXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true
NUXT_PUBLIC_ENABLE_ERROR_TRACKING=true
NUXT_PUBLIC_ENABLE_USER_BEHAVIOR_TRACKING=true
```

### **Configuration Nuxt (nuxt.config.ts)**
```typescript
sentry: {
  dsn: process.env.NUXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NUXT_PUBLIC_SENTRY_ENVIRONMENT,
  release: process.env.NUXT_PUBLIC_SENTRY_RELEASE,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
}
```

## 📈 Dashboard Sentry

### **Accès au Dashboard**
- **URL** : https://sentry.io/organizations/pyoh/projects/sdavesne-vitrine/
- **Organisation** : pyoh
- **Projet** : sdavesne-vitrine

### **Métriques Disponibles**
- **Erreurs** : Fréquence, types, pages affectées
- **Performances** : Temps de chargement, navigation timing
- **Sessions** : Replay des sessions utilisateur
- **Breadcrumbs** : Actions utilisateur avant les erreurs

## 🔍 Dépannage

### **Sentry ne fonctionne pas**
- Vérifiez que le DSN est correct dans `.env`
- Vérifiez que les fichiers de config Sentry sont présents
- Vérifiez la console pour les erreurs

### **Erreurs de build**
- Vérifiez que `@sentry/nuxt` est installé
- Vérifiez la configuration dans `nuxt.config.ts`

### **Monitoring des performances désactivé**
- Vérifiez `NUXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING=true`
- Vérifiez que le composable est initialisé

## 🚀 Déploiement

### **Variables d'environnement de production**
```bash
NUXT_PUBLIC_SENTRY_ENVIRONMENT=production
NUXT_PUBLIC_SENTRY_RELEASE=1.0.0
```

### **Build et déploiement**
```bash
npm run build
npm run preview
```

## 📚 Ressources

- [Documentation Sentry Nuxt](https://docs.sentry.io/platforms/javascript/guides/nuxt/)
- [Dashboard Sentry](https://sentry.io/organizations/pyoh/projects/sdavesne-vitrine/)
- [Guide de Monitoring](../template-nuxt-front/MONITORING.md)

## 🎯 Prochaines Étapes

Une fois le monitoring Sentry validé, vous pouvez :

1. **Configurer Grafana** pour centraliser les métriques
2. **Configurer Uptime Robot** pour la surveillance de disponibilité
3. **Configurer Google Analytics** pour les analytics utilisateur
4. **Personnaliser les dashboards** selon vos besoins
5. **Configurer les alertes** pour être notifié des problèmes

Le monitoring est maintenant configuré et prêt pour la production ! 🎉
