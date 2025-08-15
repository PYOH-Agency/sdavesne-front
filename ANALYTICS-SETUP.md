# 📊 Guide de Configuration des Analytics - Sophie Davesne

Ce guide vous explique comment configurer et utiliser les différents systèmes d'analytics dans votre projet.

## 🎯 **Analytics Disponibles**

### **1. Google Analytics 4 (GA4)**
- **Fonctionnalités** : Suivi des utilisateurs, événements, conversions, performances
- **Avantages** : Gratuit, complet, intégration Google
- **Configuration** : ID de mesure (G-XXXXXXXXXX)

### **2. Plausible Analytics**
- **Fonctionnalités** : Analytics respectueux de la vie privée, simple
- **Avantages** : Pas de cookies, conformité RGPD, interface claire
- **Configuration** : Domaine de votre site

### **3. Google Tag Manager (GTM)**
- **Fonctionnalités** : Gestion centralisée des tags, flexibilité maximale
- **Avantages** : Pas de code à modifier, déploiement rapide
- **Configuration** : ID GTM (GTM-XXXXXXX)

## 🔧 **Configuration**

### **Étape 1 : Variables d'environnement**

Modifiez votre fichier `.env` :

```bash
# Analytics Configuration
NUXT_PUBLIC_ENABLE_ANALYTICS=true

# Google Analytics 4
NUXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NUXT_PUBLIC_GA_DEBUG_MODE=false

# Plausible Analytics
NUXT_PUBLIC_PLAUSIBLE_DOMAIN=votre-domaine.com

# Google Tag Manager
NUXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### **Étape 2 : Récupération des IDs**

#### **Google Analytics 4 :**
1. Allez sur [analytics.google.com](https://analytics.google.com)
2. Créez une propriété GA4
3. Récupérez l'ID de mesure (commence par G-)
4. Exemple : `G-1A2B3C4D5E`

#### **Plausible Analytics :**
1. Allez sur [plausible.io](https://plausible.io)
2. Créez un site
3. Récupérez le domaine
4. Exemple : `sophiedavesne.com`

#### **Google Tag Manager :**
1. Allez sur [tagmanager.google.com](https://tagmanager.google.com)
2. Créez un compte et un conteneur
3. Récupérez l'ID GTM
4. Exemple : `GTM-ABC123`

## 🧪 **Test des Analytics**

### **Page de Test**
- **Route** : `/analytics-test`
- **URL** : http://localhost:3000/analytics-test

### **Fonctionnalités de Test**
1. **Track Page View** - Teste le suivi des pages vues
2. **Track Custom Event** - Teste le suivi des événements personnalisés
3. **Track User Action** - Teste le suivi des actions utilisateur
4. **Set User** - Teste la définition d'utilisateur

## 📊 **Utilisation dans votre Code**

### **Composable de Monitoring**

```typescript
// Dans vos composants
const { 
  initializeMonitoring, 
  trackEvent, 
  trackPageView, 
  setUser 
} = useMonitoring()

// Initialiser le monitoring
onMounted(() => {
  initializeMonitoring()
})

// Tracker un événement
trackEvent('button_click', { 
  button: 'cta', 
  page: 'home',
  category: 'engagement'
})

// Tracker une page vue
trackPageView('/nouvelle-page')

// Définir l'utilisateur
setUser('user123', { 
  email: 'user@example.com',
  plan: 'premium'
})
```

### **Exemples d'Événements**

#### **E-commerce :**
```typescript
// Ajout au panier
trackEvent('add_to_cart', {
  product_id: 'prod_123',
  product_name: 'Formation Vue.js',
  price: 99.99,
  currency: 'EUR'
})

// Achat
trackEvent('purchase', {
  transaction_id: 'txn_456',
  value: 99.99,
  currency: 'EUR',
  items: ['prod_123']
})
```

#### **Engagement :**
```typescript
// Téléchargement
trackEvent('download', {
  file_name: 'guide-vuejs.pdf',
  file_type: 'pdf'
})

// Inscription newsletter
trackEvent('newsletter_signup', {
  source: 'homepage',
  method: 'email'
})
```

## 🔍 **Vérification**

### **Google Analytics 4 :**
1. Ouvrez les DevTools (F12)
2. Allez dans l'onglet Network
3. Filtrez par "google-analytics"
4. Vérifiez les requêtes vers GA4

### **Plausible :**
1. Ouvrez les DevTools
2. Allez dans l'onglet Network
3. Filtrez par "plausible"
4. Vérifiez les requêtes vers Plausible

### **Google Tag Manager :**
1. Ouvrez les DevTools
2. Vérifiez la présence de `dataLayer`
3. Vérifiez les requêtes vers GTM

## 📈 **Dashboard et Rapports**

### **Google Analytics 4 :**
- **URL** : https://analytics.google.com
- **Rapports** : Utilisateurs, événements, conversions, performances
- **Temps réel** : Activité en direct

### **Plausible :**
- **URL** : https://plausible.io
- **Rapports** : Visiteurs, pages populaires, sources de trafic
- **Interface** : Simple et claire

### **Google Tag Manager :**
- **URL** : https://tagmanager.google.com
- **Gestion** : Tags, déclencheurs, variables
- **Débogage** : Mode aperçu

## 🚀 **Déploiement**

### **Variables de Production :**
```bash
NUXT_PUBLIC_GA_DEBUG_MODE=false
NUXT_PUBLIC_ENABLE_ANALYTICS=true
```

### **Vérification Post-Déploiement :**
1. Testez sur votre site en production
2. Vérifiez que les données arrivent dans vos dashboards
3. Testez les événements personnalisés
4. Vérifiez la conformité RGPD si nécessaire

## 🔒 **Conformité RGPD**

### **Recommandations :**
1. **Cookie Banner** : Informez les utilisateurs
2. **Consentement** : Demandez l'autorisation avant le tracking
3. **Anonymisation** : Masquez les données personnelles
4. **Documentation** : Expliquez votre politique de confidentialité

### **Plausible (Recommandé) :**
- Respecte automatiquement la vie privée
- Pas de cookies de tracking
- Conforme RGPD par défaut

## 📚 **Ressources**

- [Documentation Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4)
- [Documentation Plausible](https://plausible.io/docs)
- [Documentation Google Tag Manager](https://developers.google.com/tag-manager)
- [Guide RGPD Analytics](https://www.cnil.fr/fr/analytics-et-mesure-daudience)

## 🎯 **Prochaines Étapes**

Une fois les analytics configurés :

1. **Personnalisez les événements** selon vos besoins
2. **Créez des objectifs** dans GA4
3. **Configurez des alertes** pour les métriques importantes
4. **Intégrez avec d'autres outils** (CRM, email marketing)
5. **Analysez les données** pour optimiser votre site

Les analytics sont maintenant configurés et prêts à collecter des données ! 🎉
