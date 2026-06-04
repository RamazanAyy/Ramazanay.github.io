// ── Shared product images ──────────────────────────────────────────
const BABY_DIAPER_OPEN = '/images/products/eco-baby-diapers/SP_BABY_DIAPER_OPEN.webp';

// ── Category cover images ──────────────────────────────────────────
export const categoryImages: Record<string, string> = {
  'baby-diapers': '/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_1_.webp',
  'adult-diapers': '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_M (2).webp',
  'adult-pants': '/images/products/adult-pants-30/SP_ADULT_PANTS_M (2).webp',
  'adult-underpads': '/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).webp',
  'baby-underpads': '/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.webp',
  'bladder-pads': '/images/products/bladder-pads/SP_PADS_UNISEX_4 (2).webp',
  'sanitary-pads': '/images/products/sanitary-pads/SP_PADS_LADY_4.webp',
  'wet-wipes': '/images/products/wet-wipes/SP_WET_WIPES_120.webp',
  'cleaning-towels': '/images/products/home-care-wet-towels/SP_Cleaning_towels_100.webp',
};

// ── Product images mapped by product slug ──────────────────────────
export const productImages: Record<string, string[]> = {
  // Bebek Bezi - Eco
  'eco-newborn': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_1_.webp', BABY_DIAPER_OPEN],
  'eco-mini': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_2.webp', BABY_DIAPER_OPEN],
  'eco-midi': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_3.webp', BABY_DIAPER_OPEN],
  'eco-maxi': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_4.webp', BABY_DIAPER_OPEN],
  'eco-junior': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_5 (2).webp', BABY_DIAPER_OPEN],
  'eco-xlarge': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_6 (2).webp', BABY_DIAPER_OPEN],
  'eco-xxlarge': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_7_.webp', BABY_DIAPER_OPEN],

  // Bebek Bezi - Premium (Mega)
  'premium-newborn': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_1_.webp', BABY_DIAPER_OPEN],
  'premium-mini': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_2_.webp', BABY_DIAPER_OPEN],
  'premium-midi': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_3_.webp', BABY_DIAPER_OPEN],
  'premium-maxi': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_4_.webp', BABY_DIAPER_OPEN],
  'premium-junior': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_5_.webp', BABY_DIAPER_OPEN],
  'premium-xlarge': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_6_.webp', BABY_DIAPER_OPEN],
  'premium-xxlarge': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_7_.webp', BABY_DIAPER_OPEN],

  // Yetişkin Bezi
  'adult-diaper-m': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_M (2).webp',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_M_10.webp',
  ],
  'adult-diaper-l': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_L (2).webp',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_L_10.webp',
  ],
  'adult-diaper-xl': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_XL (2).webp',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_XL_10.webp',
  ],

  // Yetişkin Külot Bezi
  'adult-pant-m': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_M (2).webp',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_M_10.webp',
  ],
  'adult-pant-l': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_L (2).webp',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_L_10.webp',
  ],
  'adult-pant-xl': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_XL (2).webp',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_XL_10.webp',
  ],

  // Yetişkin Alt Serme
  'adult-underpad-60x90': ['/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).webp'],

  // Bebek Alt Serme
  'baby-underpad-60x60': ['/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.webp'],

  // Mesane Pedi
  'bladder-pad-4-drops': ['/images/products/bladder-pads/SP_PADS_UNISEX_4.webp'],
  'bladder-pad-6-drops': ['/images/products/bladder-pads/SP_PADS_UNISEX_6.webp'],
  'bladder-pad-8-drops': ['/images/products/bladder-pads/SP_PADS_UNISEX_PURPLE.webp'],

  // Hijyenik Ped
  'sanitary-pad-4-drops': ['/images/products/sanitary-pads/SP_PADS_LADY_4.webp'],
  'sanitary-pad-5-drops': ['/images/products/sanitary-pads/SP_PADS_LADY_5.webp'],
  'sanitary-pad-6-drops': ['/images/products/sanitary-pads/SP_PADS_LADY_6.webp'],

  // Islak Mendil
  // Bebek serisi
  'baby-wipe-72': ['/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_72.webp'],
  'baby-wipe-90': ['/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_90.webp'],
  'baby-wipe-120': ['/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_120.webp'],
  // Günlük Kullanım serisi
  'wet-wipe-fresh-splash-120': ['/images/products/wet-wipes/SP_WET_WIPES_120.webp'],
  'wet-wipe-fresh-splash-90': ['/images/products/wet-wipes/SP_WET_WIPES_UNIVERSAL_90.webp'],
  // Çiçek serisi
  'wet-wipe-aloe-vera': ['/images/products/wet-wipes/SP_WET_WIPES_ALOE_90.webp'],
  'wet-wipe-chamomile': ['/images/products/wet-wipes/SP_WET_WIPES_CHAMOMILE_90.webp'],
  'wet-wipe-rose': ['/images/products/wet-wipes/SP_WET_WIPES_ROSE_90.webp'],
  'wet-wipe-lavender': ['/images/products/wet-wipes/SP_WET_WIPES_LAVENDER_90.webp'],

  // Yüzey Temizleme Havlusu
  'cleaning-towel-100': ['/images/products/home-care-wet-towels/SP_Cleaning_towels_100.webp'],
};

/** Get primary image for a product slug */
export function getProductImage(slug: string): string {
  return productImages[slug]?.[0] ?? '';
}

/** Get all images for a product slug */
export function getProductImages(slug: string): string[] {
  return productImages[slug] ?? [];
}

/** Get category cover image */
export function getCategoryImage(categorySlug: string): string {
  return categoryImages[categorySlug] ?? '';
}
