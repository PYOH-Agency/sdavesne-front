/**
 * Mapping entre les événements Cal.com et les produits Stripe
 * Cet objet centralise toutes les informations nécessaires pour lier Cal.com et Stripe
 */

export interface CalStripeMapping {
  // Identifiants Cal.com
  calEventType: string // Slug de l'événement Cal.com (ex: "premiere-consultation")
  calEventId?: string // ID interne Cal.com (optionnel)
  
  // Identifiants Stripe
  stripeProductId: string // ID du produit Stripe (ex: "prod_TsHNw3I65b19ly")
  stripePriceId: string // ID du prix Stripe (ex: "price_1SuWomGYNUMkiUuZaMzourSX")
  
  // Informations affichage
  label: string // Nom affiché
  description?: string
  duration?: number // Durée en minutes
  
  // Métadonnées
  metadata?: Record<string, any>
}

/**
 * Configuration complète du mapping Cal.com ↔ Stripe
 * ⚠️ IMPORTANT : Les calEventType doivent correspondre exactement aux slugs de vos événements Cal.com
 */
export const CAL_STRIPE_MAPPING: CalStripeMapping[] = [
  {
    calEventType: 'premiere-consultation', // ⚠️ À ajuster selon votre slug Cal.com réel
    stripeProductId: 'prod_TsHNw3I65b19ly',
    stripePriceId: 'price_1SuWomGYNUMkiUuZaMzourSX',
    label: 'Première consultation',
    description: 'Consultation initiale pour faire connaissance et définir vos objectifs',
    duration: 60,
    metadata: {
      type: 'initial',
      category: 'individual'
    }
  },
  {
    calEventType: 'suivi-consultation', // ⚠️ À ajuster selon votre slug Cal.com réel
    stripeProductId: 'prod_TsHNynwk9WPnQf',
    stripePriceId: 'price_1SuWp0GYNUMkiUuZxMeoOr81',
    label: 'Consultation de suivi',
    description: 'Séance de suivi pour continuer votre accompagnement',
    duration: 60,
    metadata: {
      type: 'follow-up',
      category: 'individual'
    }
  },
  {
    calEventType: 'entreprise-groupe', // ⚠️ À ajuster selon votre slug Cal.com réel
    stripeProductId: 'prod_TsHOEG2Hsn4Apk',
    stripePriceId: 'price_1SuWpJGYNUMkiUuZLHC8M4oz',
    label: 'Entreprise / Groupe',
    description: 'Séance pour groupes ou entreprises',
    duration: 90,
    metadata: {
      type: 'group',
      category: 'business'
    }
  }
]

/**
 * Trouver le mapping par événement Cal.com
 */
export const getMappingByCalEventType = (eventType: string): CalStripeMapping | undefined => {
  return CAL_STRIPE_MAPPING.find(m => m.calEventType === eventType)
}

/**
 * Trouver le mapping par ID de prix Stripe
 */
export const getMappingByStripePriceId = (priceId: string): CalStripeMapping | undefined => {
  return CAL_STRIPE_MAPPING.find(m => m.stripePriceId === priceId)
}

/**
 * Trouver le mapping par ID de produit Stripe
 */
export const getMappingByStripeProductId = (productId: string): CalStripeMapping | undefined => {
  return CAL_STRIPE_MAPPING.find(m => m.stripeProductId === productId)
}

/**
 * Vérifier si un événement Cal.com est configuré
 */
export const isCalEventConfigured = (eventType: string): boolean => {
  return CAL_STRIPE_MAPPING.some(m => m.calEventType === eventType)
}

/**
 * Obtenir tous les événements Cal.com configurés
 */
export const getConfiguredCalEventTypes = (): string[] => {
  return CAL_STRIPE_MAPPING.map(m => m.calEventType)
}
