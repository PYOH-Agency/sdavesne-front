#!/bin/bash

# 🚀 Script de Build Production - Sophie Davesne Vitrine
# Ce script construit le projet avec le monitoring activé pour la production

set -e  # Arrêter en cas d'erreur

echo "🚀 Build de Production - Sophie Davesne Vitrine"
echo "================================================"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que nous sommes dans le bon répertoire
if [[ ! -f "nuxt.config.ts" ]]; then
    print_error "Ce script doit être exécuté depuis le répertoire racine du projet Nuxt"
    exit 1
fi

# Vérifier Node.js et npm
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm n'est pas installé"
    exit 1
fi

print_success "Node.js et npm sont installés"

# Sauvegarder la configuration de développement
print_status "Sauvegarde de la configuration de développement..."
cp nuxt.config.ts nuxt.config.dev.ts

# Utiliser la configuration de production
print_status "Activation de la configuration de production..."
cp nuxt.config.production.ts nuxt.config.ts

# Installer les dépendances si nécessaire
print_status "Vérification des dépendances..."
npm install

# Build de production
print_status "Build de production avec monitoring activé..."
npm run build

if [ $? -eq 0 ]; then
    print_success "✅ Build de production réussi !"
    echo ""
    echo "📊 Monitoring activé pour:"
    echo "  - Sentry (suivi des erreurs)"
    echo "  - Google Analytics 4"
    echo "  - Uptime Robot"
    echo "  - Grafana"
    echo ""
    echo "🚀 Prêt pour le déploiement !"
else
    print_error "❌ Le build de production a échoué"
    
    # Restaurer la configuration de développement
    print_status "Restauration de la configuration de développement..."
    cp nuxt.config.dev.ts nuxt.config.ts
    
    exit 1
fi

# Restaurer la configuration de développement
print_status "Restauration de la configuration de développement..."
cp nuxt.config.dev.ts nuxt.config.ts

print_success "Script de build de production terminé !"
