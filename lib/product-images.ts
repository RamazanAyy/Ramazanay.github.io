// ── Shared product images ──────────────────────────────────────────
const BABY_DIAPER_OPEN = '/images/products/eco-baby-diapers/SP_BABY_DIAPER_OPEN.png';

// ── Category cover images ──────────────────────────────────────────
export const categoryImages: Record<string, string> = {
  'bebek-bezi': '/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_1_.jpg',
  'yetiskin-bezi': '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_M (2).png',
  'yetiskin-kulot-bezi': '/images/products/adult-pants-30/SP_ADULT_PANTS_M (2).jpg',
  'yetiskin-alt-serme-ortusu': '/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).jpg',
  'bebek-alt-serme-ortusu': '/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.png',
  'mesane-pedi': '/images/products/bladder-pads/SP_PADS_UNISEX_4 (2).jpg',
  'hijyenik-ped': '/images/products/bladder-pads/SP_PADS_UNISEX_6.jpg',
  'islak-mendil': '/images/products/wet-wipes/SP_WET_WIPES_120.jpg',
  'yuzey-temizleme-havlusu': '/images/products/home-care-wet-towels/SP_Cleaning_towels_100.jpg',
};

// ── Product images mapped by product slug ──────────────────────────
export const productImages: Record<string, string[]> = {
  // Bebek Bezi - Eco
  'eco-newborn': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_1_.png', BABY_DIAPER_OPEN],
  'eco-mini': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_2.png', BABY_DIAPER_OPEN],
  'eco-midi': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_3.png', BABY_DIAPER_OPEN],
  'eco-maxi': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_4.png', BABY_DIAPER_OPEN],
  'eco-junior': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_5 (2).png', BABY_DIAPER_OPEN],
  'eco-xlarge': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_6 (2).png', BABY_DIAPER_OPEN],
  'eco-xxlarge': ['/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_7_.png', BABY_DIAPER_OPEN],

  // Bebek Bezi - Premium (Mega)
  'premium-newborn': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_1_.png', BABY_DIAPER_OPEN],
  'premium-mini': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_2_.png', BABY_DIAPER_OPEN],
  'premium-midi': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_3_.png', BABY_DIAPER_OPEN],
  'premium-maxi': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_4_.png', BABY_DIAPER_OPEN],
  'premium-junior': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_5_.png', BABY_DIAPER_OPEN],
  'premium-xlarge': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_6_.png', BABY_DIAPER_OPEN],
  'premium-xxlarge': ['/images/products/mega-baby-diapers/SP_BABY_DIAPERS_MEGA_7_.png', BABY_DIAPER_OPEN],

  // Yetişkin Bezi
  'yetiskin-bezi-m': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_M (2).png',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_M_10.png',
  ],
  'yetiskin-bezi-l': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_L (2).png',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_L_10.png',
  ],
  'yetiskin-bezi-xl': [
    '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_XL (2).png',
    '/images/products/adult-diapers-10/SP_ADULT_DIAPERS_XL_10.png',
  ],

  // Yetişkin Külot Bezi
  'kulot-bezi-m': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_M (2).jpg',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_M_10.jpg',
  ],
  'kulot-bezi-l': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_L (2).jpg',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_L_10.jpg',
  ],
  'kulot-bezi-xl': [
    '/images/products/adult-pants-30/SP_ADULT_PANTS_XL (2).jpg',
    '/images/products/adult-pants-10/SP_ADULT_PANTS_XL_10.jpg',
  ],

  // Yetişkin Alt Serme
  'alt-serme-60x60': ['/images/products/adult-underpad/SP_UNDERPAD_60x90_10.jpg'],
  'alt-serme-60x90': ['/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).jpg'],
  'alt-serme-90x180': ['/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).jpg'],

  // Bebek Alt Serme
  'bebek-alt-serme-40x60': ['/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.png'],
  'bebek-alt-serme-60x60': ['/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.png'],

  // Mesane Pedi
  'mesane-pedi-mini': ['/images/products/bladder-pads/SP_PADS_UNISEX_4 (2).jpg'],
  'mesane-pedi-normal': ['/images/products/bladder-pads/SP_PADS_UNISEX_4.jpg'],
  'mesane-pedi-maxi': ['/images/products/bladder-pads/SP_PADS_UNISEX_6.jpg'],

  // Hijyenik Ped
  'gunluk-ped': ['/images/products/bladder-pads/SP_PADS_UNISEX_4 (2).jpg'],
  'normal-ped': ['/images/products/bladder-pads/SP_PADS_UNISEX_4.jpg'],
  'uzun-ped': ['/images/products/bladder-pads/SP_PADS_UNISEX_6.jpg'],
  'gece-pedi': ['/images/products/bladder-pads/SP_PADS_UNISEX_6.jpg'],

  // Islak Mendil
  'bebek-hassas': ['/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_72.jpg'],
  'aloe-vera': ['/images/products/wet-wipes/SP_WET_WIPES_ALOE_90.jpg'],
  'antibakteriyel': ['/images/products/wet-wipes/SP_WET_WIPES_UNIVERSAL_90.jpg'],
  'ekstra-kalin': ['/images/products/wet-wipes/SP_WET_WIPES_120.jpg'],
  'islak-mendil-bebek-hassas': [
    '/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_72.jpg',
    '/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_90.jpg',
    '/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_120.jpg',
  ],
  'islak-mendil-aloe-vera': [
    '/images/products/wet-wipes/SP_WET_WIPES_ALOE_90.jpg',
  ],
  'islak-mendil-antibakteriyel': [
    '/images/products/wet-wipes/SP_WET_WIPES_UNIVERSAL_90.jpg',
    '/images/products/wet-wipes/SP_WET_WIPES_UNIVERSAL_90_2.jpg',
  ],
  'islak-mendil-ekstra-kalin': [
    '/images/products/wet-wipes/SP_WET_WIPES_120.jpg',
    '/images/products/wet-wipes/SP_WET_WIPES_120_2.jpg',
  ],

  // Yüzey Temizleme Havlusu
  'rulo-havlu': ['/images/products/home-care-wet-towels/SP_Cleaning_towels_50.jpg'],
  'katli-havlu': ['/images/products/home-care-wet-towels/SP_Cleaning_towels_100.jpg'],
  'endustriyel-rulo': ['/images/products/home-care-wet-towels/SP_SURFACE CLEANING TOWEL (2).jpg'],
  'yuzey-temizleme-rulo': ['/images/products/home-care-wet-towels/SP_Cleaning_towels_50.jpg'],
  'yuzey-temizleme-katli': ['/images/products/home-care-wet-towels/SP_Cleaning_towels_100.jpg'],
  'yuzey-temizleme-endustriyel': ['/images/products/home-care-wet-towels/SP_SURFACE CLEANING TOWEL (2).jpg'],
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
