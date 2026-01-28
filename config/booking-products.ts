/**
 * Configuration des produits Stripe liés aux événements Cal.com
 */
export interface BookingProduct {
  calEventType: string // Slug de l'événement Cal.com (ex: "premiere-consultation")
  stripeProductId: string // ID du produit Stripe (ex: "prod_TsHNw3I65b19ly")
  stripePriceId: string // ID du prix Stripe (ex: "price_1SuWomGYNUMkiUuZaMzourSX")
  label: string // Nom affiché
  description?: string
  duration?: number // Durée en minutes
}

export const BOOKING_PRODUCTS: BookingProduct[] = [
  {
    calEventType: 'premiere-consultation', // ⚠️ À ajuster selon vos slugs Cal.com réels
    stripeProductId: 'prod_TsHNw3I65b19ly',
    stripePriceId: 'price_1SuWomGYNUMkiUuZaMzourSX',
    label: 'Première consultation',
    description: 'Consultation initiale pour faire connaissance et définir vos objectifs',
    duration: 60
  },
  {
    calEventType: 'suivi-consultation', // ⚠️ À ajuster selon vos slugs Cal.com réels
    stripeProductId: 'prod_TsHNynwk9WPnQf',
    stripePriceId: 'price_1SuWp0GYNUMkiUuZxMeoOr81',
    label: 'Consultation de suivi',
    description: 'Séance de suivi pour continuer votre accompagnement',
    duration: 60
  },
  {
    calEventType: 'entreprise-groupe', // ⚠️ À ajuster selon vos slugs Cal.com réels
    stripeProductId: 'prod_TsHOEG2Hsn4Apk',
    stripePriceId: 'price_1SuWpJGYNUMkiUuZLHC8M4oz',
    label: 'Entreprise / Groupe',
    description: 'Séance pour groupes ou entreprises',
    duration: 90
  }
]

/**
 * Trouver un produit par son événement Cal.com
 */
export const getProductByCalEventType = (eventType: string): BookingProduct | undefined => {
  return BOOKING_PRODUCTS.find(p => p.calEventType === eventType)
}

/**
 * Trouver un produit par son ID Stripe
 */
export const getProductByStripePriceId = (priceId: string): BookingProduct | undefined => {
  return BOOKING_PRODUCTS.find(p => p.stripePriceId === priceId)
}

/**
 * Trouver un produit par son ID de produit Stripe
 */
export const getProductByStripeProductId = (productId: string): BookingProduct | undefined => {
  return BOOKING_PRODUCTS.find(p => p.stripeProductId === productId)
}
