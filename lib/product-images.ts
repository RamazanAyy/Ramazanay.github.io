// ── Shared product images ──────────────────────────────────────────
const BABY_DIAPER_OPEN = '/images/products/eco-baby-diapers/SP_BABY_DIAPER_OPEN.webp';

// ── Category cover images ──────────────────────────────────────────
export const categoryImages: Record<string, string> = {
  'bebek-bezi': '/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_1_.webp',
  'yetiskin-bezi': '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_M (2).webp',
  'yetiskin-kulot-bezi': '/images/products/adult-pants-30/SP_ADULT_PANTS_M (2).webp',
  'yetiskin-alt-serme-ortusu': '/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).webp',
  'bebek-alt-serme-ortusu': '/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.webp',
  'mesane-pedi': '/images/products/bladder-pads/SP_PADS_UNISEX_4 (2).webp',
  'hijyenik-ped': '/images/products/sanitary-pads/SP_PADS_LADY_4.webp',
  'islak-mendil': '/images/products/wet-wipes/SP_WET_WIPES_120.webp',
  'yuzey-temizleme-havlusu': '/images/products/home-care-wet-towels/SP_Cleaning_towels_100.webp',
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
  'yetiskin-bezi-m': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_M (2).webp',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_M_10.webp',
  ],
  'yetiskin-bezi-l': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_L (2).webp',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_L_10.webp',
  ],
  'yetiskin-bezi-xl': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_XL (2).webp',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_XL_10.webp',
  ],

  // Yetişkin Külot Bezi
  'kulot-bezi-m': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_M (2).webp',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_M_10.webp',
  ],
  'kulot-bezi-l': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_L (2).webp',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_L_10.webp',
  ],
  'kulot-bezi-xl': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_XL (2).webp',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_XL_10.webp',
  ],

  // Yetişkin Alt Serme
  'alt-serme-60x90': ['/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).webp'],

  // Bebek Alt Serme
  'bebek-alt-serme-60x60': ['/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.webp'],

  // Mesane Pedi
  'mesane-pedi-4-damla': ['/images/products/bladder-pads/SP_PADS_UNISEX_4.webp'],
  'mesane-pedi-6-damla': ['/images/products/bladder-pads/SP_PADS_UNISEX_6.webp'],
  'mesane-pedi-8-damla': ['/images/products/bladder-pads/SP_PADS_UNISEX_PURPLE.webp'],

  // Hijyenik Ped
  'hijyenik-ped-4-damla': ['/images/products/sanitary-pads/SP_PADS_LADY_4.webp'],
  'hijyenik-ped-5-damla': ['/images/products/sanitary-pads/SP_PADS_LADY_5.webp'],
  'hijyenik-ped-6-damla': ['/images/products/sanitary-pads/SP_PADS_LADY_6.webp'],

  // Islak Mendil
  // Bebek serisi
  'islak-mendil-bebek-72': ['/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_72.webp'],
  'islak-mendil-bebek-90': ['/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_90.webp'],
  'islak-mendil-bebek-120': ['/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_120.webp'],
  // Günlük Kullanım serisi
  'islak-mendil-fresh-splash-120': ['/images/products/wet-wipes/SP_WET_WIPES_120.webp'],
  'islak-mendil-fresh-splash-90': ['/images/products/wet-wipes/SP_WET_WIPES_UNIVERSAL_90.webp'],
  // Çiçek serisi
  'islak-mendil-aloe-vera': ['/images/products/wet-wipes/SP_WET_WIPES_ALOE_90.webp'],
  'islak-mendil-papatya': ['/images/products/wet-wipes/SP_WET_WIPES_CHAMOMILE_90.webp'],
  'islak-mendil-gul': ['/images/products/wet-wipes/SP_WET_WIPES_ROSE_90.webp'],
  'islak-mendil-lavanta': ['/images/products/wet-wipes/SP_WET_WIPES_LAVENDER_90.webp'],

  // Yüzey Temizleme Havlusu
  'yuzey-temizleme-havlusu-100': ['/images/products/home-care-wet-towels/SP_Cleaning_towels_100.webp'],
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
