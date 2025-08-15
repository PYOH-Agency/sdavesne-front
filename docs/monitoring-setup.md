# 🚀 Guide de Configuration Monitoring

## 📊 Configuration UptimeRobot

### 1. Création du compte et ajout des sites

1. **Créer un compte UptimeRobot**
   ```
   https://uptimerobot.com/register
   ```

2. **Ajouter vos sites à surveiller**
   ```
   Dashboard → Add New Monitor
   
   Configuration pour chaque site :
   - Monitor Type: HTTP(s)
   - Friendly Name: [Nom du site] (ex: Sophie Davesne)
   - URL: https://votre-domaine.com
   - Monitoring Interval: 5 minutes (gratuit)
   ```

3. **Configuration des alertes**
   ```
   Alert Contacts → Add Alert Contact
   
   Types d'alertes :
   - Email (gratuit)
   - SMS (payant)
   - Webhook pour Slack/Discord
   ```

### 2. Récupération de la clé API

```bash
# Dans UptimeRobot Dashboard
My Settings → API Settings → Create API Key

# Types de clés :
- Main API Key (lecture seule) - RECOMMANDÉ
- Account-specific API Key (lecture/écriture)

# Copier la clé dans votre .env :
UPTIMEROBOT_API_KEY=ur123456-abcdef1234567890abcdef12
```

## 🔐 Configuration Sentry

### 1. Création du projet

1. **Créer un compte Sentry**
   ```
   https://sentry.io/signup/
   ```

2. **Créer un nouveau projet**
   ```
   Create Project → Vue.js → Project Name: [nom-du-site]
   ```

3. **Récupérer le DSN**
   ```bash
   # Dans Sentry Project Settings → Client Keys (DSN)
   # Copier dans votre .env :
   NUXT_PUBLIC_SENTRY_DSN=https://abc123@o123456.ingest.sentry.io/123456
   ```

### 2. Configuration avancée

```bash
# Créer un Auth Token pour l'API
Sentry → Settings → Auth Tokens → Create New Token

Scopes nécessaires :
- project:read
- event:read
- team:read
- org:read
```

## 📈 Configuration Google Analytics

### 1. Création de la propriété

1. **Accéder à Google Analytics**
   ```
   https://analytics.google.com/
   ```

2. **Créer une propriété GA4**
   ```
   Admin → Create Property → Google Analytics 4
   Property name: [Nom du site]
   ```

3. **Configurer le stream de données**
   ```
   Admin → Data Streams → Add stream → Web
   Website URL: https://votre-domaine.com
   Stream name: [Nom du site]
   ```

4. **Récupérer l'ID de mesure**
   ```bash
   # Dans Data Streams → [Votre stream] → Measurement ID
   # Copier dans votre .env :
   NUXT_PUBLIC_GTM_ID=G-XXXXXXXXXX
   ```

## 🔄 Configuration Plausible (Alternative)

### 1. Compte Plausible

```bash
# Créer un compte (gratuit 30 jours, puis payant)
https://plausible.io/register

# Ajouter votre site
Dashboard → Add website → Domain: votre-domaine.com

# Copier dans votre .env :
NUXT_PUBLIC_PLAUSIBLE_DOMAIN=votre-domaine.com
```

## ☁️ Configuration Grafana Cloud

### 1. Création du compte

```bash
# Créer un compte Grafana Cloud (gratuit jusqu'à certaines limites)
https://grafana.com/products/cloud/

# Instance Stack Name: [nom-organisation]-monitoring
```

### 2. Configuration des Data Sources

#### UptimeRobot Data Source

```bash
# Dans Grafana Cloud Dashboard :
Configuration → Data Sources → Add data source → JSON API

Settings :
- Name: UptimeRobot
- URL: https://api.uptimerobot.com/v2/
- Headers:
  - X-API-Key: [VOTRE_UPTIMEROBOT_API_KEY]
  - Content-Type: application/x-www-form-urlencoded
```

#### Sentry Data Source

```bash
# Installer le plugin Sentry
Configuration → Plugins → Search "Sentry" → Install

# Configuration :
- Organization Slug: [votre-org]
- Auth Token: [VOTRE_SENTRY_AUTH_TOKEN]
```

### 3. Import des Dashboards

```bash
# Dashboards pré-configurés disponibles :
1. UptimeRobot Overview: Dashboard ID 12345
2. Sentry Errors & Performance: Dashboard ID 67890
3. Web Vitals Monitoring: Dashboard ID 11111

# Import :
Dashboards → Import → Dashboard ID → Load
```

## 🔔 Configuration des Alertes Grafana

```bash
# Alerting → Alert Rules → New rule

Exemples de règles :
1. Site Down Alert :
   - Query: UptimeRobot status = 0
   - Condition: Last value is below 1
   - Evaluation: Every 1m for 2m

2. Error Rate Alert :
   - Query: Sentry error count > 10 in 5min
   - Condition: Last value is above 10
   - Evaluation: Every 5m for 1m

3. Performance Alert :
   - Query: Page load time > 3s
   - Condition: Last value is above 3000
   - Evaluation: Every 5m for 2m
```

## 🧪 Test de la Configuration

### 1. Vérification locale

```bash
# Créer un fichier .env à partir de .env.example
cp env.example .env

# Remplir les clés API
# Démarrer l'application
npm run dev

# Vérifier dans la console du navigateur :
# - Aucune erreur Sentry
# - Événements Google Analytics envoyés
# - Métriques de performance capturées
```

### 2. Test des alertes

```bash
# UptimeRobot : Arrêter temporairement votre serveur
# Sentry : Déclencher une erreur volontaire
# Grafana : Vérifier que les données arrivent dans les dashboards
```

## 📱 Applications Mobiles

```bash
# UptimeRobot Mobile App
iOS: https://apps.apple.com/app/uptimerobot/id1104878581
Android: https://play.google.com/store/apps/details?id=com.uptimerobot

# Sentry Mobile App  
iOS: https://apps.apple.com/app/sentry/id1403496476
Android: https://play.google.com/store/apps/details?id=io.sentry.android

# Grafana Mobile App
iOS: https://apps.apple.com/app/grafana/id1463211246
Android: https://play.google.com/store/apps/details?id=com.grafana.mobile
```

## 🔧 Automatisation avec Zapier/Make

### Workflow de notifications centralisées

```bash
# Créer des Zaps pour :
1. UptimeRobot Down → Slack Alert + Email
2. Sentry Critical Error → Teams Notification
3. Analytics Goal Completed → CRM Update
4. Weekly Performance Report → Email Summary
```

## 💰 Coûts et Limites

### Formule Gratuite (jusqu'à 3-5 sites)
- UptimeRobot : 50 monitors, 5min interval
- Sentry : 5,000 errors/mois
- Google Analytics : Gratuit
- Grafana Cloud : 10,000 metrics, 50GB logs
- **Total : 0€/mois**

### Formule Professionnelle (10+ sites)
- UptimeRobot Pro : 50€/an
- Sentry Team : 26$/mois
- Plausible : 9€/mois
- Grafana Cloud Pro : 49$/mois
- **Total : ~125€/mois**

## 🚀 Prochaines Étapes

1. Configurer les comptes (30 min)
2. Remplir le .env avec les clés API (5 min)
3. Déployer votre premier site avec monitoring (15 min)
4. Configurer Grafana Cloud dashboards (45 min)
5. Tester toutes les alertes (15 min)

**Temps total d'installation : ~2 heures pour un monitoring complet**
