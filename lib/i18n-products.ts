/**
 * Localized product / category content.
 *
 * `products-data.ts` is the single source of truth for STRUCTURE
 * (slugs, counts, colors, image refs, gradients, series).
 * This file only carries TRANSLATABLE TEXT for each locale.
 *
 * Use `getLocalizedProducts(locale)` to merge translations onto the
 * base structure and obtain a fully-translated `Category[]` list.
 */

import {
  categories as baseCategories,
  type Category,
  type FAQ,
  type Product,
} from './products-data';

export type SupportedLocale = 'tr' | 'en' | 'de' | 'ru' | 'ar' | 'uk';

interface CategoryI18n {
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  features: string[];
  faqs: FAQ[];
}

interface ProductI18n {
  name: string;
  description: string;
  size?: string;
  series: string;
  count: string;
}

interface LocaleData {
  // Indexed by category slug
  categories: Record<string, CategoryI18n>;
  // Indexed by product slug
  products: Record<string, ProductI18n>;
}

// ─── Helper: build TR data from base products-data.ts (the canonical source) ──
function buildTrData(): LocaleData {
  const categories: Record<string, CategoryI18n> = {};
  const products: Record<string, ProductI18n> = {};
  for (const cat of baseCategories) {
    categories[cat.slug] = {
      name: cat.name,
      description: cat.description,
      seoTitle: cat.seoTitle,
      seoDescription: cat.seoDescription,
      features: cat.features,
      faqs: cat.faqs,
    };
    for (const p of cat.products) {
      products[p.slug] = {
        name: p.name,
        description: p.description,
        size: p.size,
        series: p.series,
        count: p.count,
      };
    }
  }
  return { categories, products };
}

const TR: LocaleData = buildTrData();

// ─── EN data ─────────────────────────────────────────────────────────────────
const EN: LocaleData = {
  categories: {
    'bebek-bezi': {
      name: 'Baby Diapers',
      description:
        "Super-absorbent, leak-proof baby diapers that protect your baby's delicate skin. Our Eco and Mega series offer solutions for every budget.",
      seoTitle: 'Baby Diapers | Eco & Mega Series | Soft & Power',
      seoDescription:
        "Soft & Power baby diapers protect your baby with hypoallergenic, super-absorbent and leak-proof construction. Affordable solutions with Eco and Mega options.",
      features: ['Hypoallergenic', 'Super Absorbent', 'Leak-proof', 'ISO Certified'],
      faqs: [
        {
          question: 'How often should baby diapers be changed?',
          answer:
            'For newborns 8–10 times a day, for older babies 5–7 times. Changing immediately after a bowel movement is important for skin health.',
        },
        {
          question: 'Are the baby diapers hypoallergenic?',
          answer:
            'Yes, all Soft & Power baby diapers are made from hypoallergenic materials. They are dermatologically tested and designed for sensitive baby skin.',
        },
        {
          question: 'How do I choose the right size?',
          answer:
            "Pick a size based on your baby's weight. Check the weight range printed on the package. If leaks are frequent, it may be time to move up a size.",
        },
        {
          question: 'Are the diapers ISO certified?',
          answer:
            'Yes, all our products are manufactured in compliance with ISO 9001 quality management and ISO 13485 medical device standards.',
        },
      ],
    },
    'yetiskin-bezi': {
      name: 'Adult Diapers',
      description:
        'High absorbency, leak-proof protection and breathable construction make these diapers suitable for both day and night use.',
      seoTitle: 'Adult Diapers | M / L / XL | Soft & Power',
      seoDescription:
        'Soft & Power adult diapers offer high absorbency, leak protection and breathable structure for day and night use. Dermatologically tested.',
      features: ['Superior Absorption', 'Breathable', 'Anti-leak', 'Dermatology Tested'],
      faqs: [
        {
          question: 'When are adult diapers used?',
          answer:
            'Adult diapers are used by people experiencing urinary incontinence, post-surgical patients and the elderly. They are also chosen for daily comfort by people with limited mobility.',
        },
        {
          question: 'Do adult diapers leak?',
          answer:
            'Soft & Power adult diapers prevent leaks effectively thanks to a double-barrier system, leak-proof side gathers and an ultra-absorbent core. Their elastic waistband fits snugly even during long use.',
        },
        {
          question: 'Do adult diapers irritate the skin?',
          answer:
            "Soft & Power adult diapers are dermatologically tested and made of breathable materials. Changed at regular intervals, they minimise the risk of skin irritation.",
        },
        {
          question: 'How do I choose the right size?',
          answer:
            'Measure waist circumference. M fits 85–125 cm, L fits 100–150 cm and XL fits 120–170 cm. The right size is essential for comfort.',
        },
        {
          question: 'How often should adult diapers be changed?',
          answer:
            'Depending on saturation and the user’s needs, change roughly every 3–4 hours. Replace immediately after a bowel movement. Keeping the skin clean and dry minimises irritation and infection risk.',
        },
        {
          question: 'Do adult diapers cause odour?',
          answer:
            'Soft & Power adult diapers feature an odour-control technology. Special granules in the absorbent core trap and neutralise odour, keeping the user confident in social situations.',
        },
      ],
    },
    'yetiskin-kulot-bezi': {
      name: 'Adult Pants',
      description:
        'Pull-up style adult diapers designed for active life; 360° protection and an elastic waistband provide all-day comfort.',
      seoTitle: 'Adult Pants | 360° Protection | Soft & Power',
      seoDescription:
        'Soft & Power adult pants offer 360° protection, a double-barrier system and an elastic waistband so you can move freely in your active life.',
      features: ['360° Protection', 'Elastic Waist', 'Double Barrier', 'Anatomic Fit'],
      faqs: [
        {
          question: 'What is the difference between adult pants and taped diapers?',
          answer:
            'Pant diapers are pulled on like underwear; taped diapers are applied while lying down. Pants are more practical for active and mobile users.',
        },
        {
          question: 'Are adult pants visible under clothing?',
          answer:
            'No. Soft & Power pants have a slim, ergonomic design that does not show under clothing. The silhouette is similar to regular underwear.',
        },
        {
          question: 'How do I put on and remove the pants?',
          answer:
            'They are pulled on like ordinary underwear. To remove, simply tear the sides – making care easier for caregivers.',
        },
        {
          question: 'How do I choose the right size?',
          answer:
            'Measure waist circumference. M: 70–100 cm, L: 90–120 cm, XL: 110–150 cm.',
        },
        {
          question: 'Are adult pants suitable for all-day use?',
          answer:
            'Yes. With an elastic waistband, anatomic cut and double-barrier system, they are comfortable for all-day use. Day or night, replace approximately every 3–4 hours.',
        },
      ],
    },
    'yetiskin-alt-serme-ortusu': {
      name: 'Adult Underpads',
      description:
        'Adult underpads designed for bed and surface protection. A waterproof base layer and a fast-absorbing top surface provide hygienic protection.',
      seoTitle: 'Adult Underpads | Bed Protection | Soft & Power',
      seoDescription:
        'Soft & Power adult underpads offer reliable protection for beds and surfaces with their waterproof bottom, fast-absorbing top and non-slip design.',
      features: ['Waterproof Surface', 'Fast Absorbing Surface', 'Non-slip Build'],
      faqs: [
        {
          question: 'What are underpads used for?',
          answer:
            'Underpads protect beds, sofas and seating areas from liquid leaks. They are widely used to maintain hygiene on beds of people with urinary incontinence.',
        },
        {
          question: 'Do underpads slip?',
          answer:
            'No. Soft & Power underpads have non-slip backing technology. They stay in place on the bed for safe use.',
        },
        {
          question: 'Can the underpad be used at home?',
          answer:
            'Yes, our 60×90 cm underpads can be comfortably used at home.',
        },
        {
          question: 'How often should underpads be changed?',
          answer:
            'Change immediately when wet or soiled. While dry, replacing daily is sufficient. They are designed for single use.',
        },
      ],
    },
    'bebek-alt-serme-ortusu': {
      name: 'Baby Underpads',
      description:
        'Baby underpads designed for hygienic use during diaper changes. Soft, breathable upper surface and waterproof bottom layer for safe protection.',
      seoTitle: 'Baby Underpads | Practical & Hygienic | Soft & Power',
      seoDescription:
        "Soft & Power baby underpads protect your baby's delicate skin with a breathable surface, waterproof base and non-irritating structure.",
      features: ['Breathable Top Surface', 'Waterproof Base', 'Skin-Friendly'],
      faqs: [
        {
          question: 'When should baby underpads be used?',
          answer:
            'During diaper changes, while sleeping for bed protection, and outdoors during diaper changes. They are also great for protecting surfaces during free play.',
        },
        {
          question: 'Do baby underpads irritate the skin?',
          answer:
            'No. Soft & Power baby underpads are made of hypoallergenic materials suitable for baby skin. The breathable top surface is soft and gentle.',
        },
        {
          question: 'Can baby underpads be reused?',
          answer:
            'No, our products are designed as single-use. For hygiene, dispose after each use and place a fresh one. This keeps your baby on a clean surface every time.',
        },
        {
          question: 'Are baby underpads waterproof?',
          answer:
            'The bottom layer is fully waterproof, protecting surfaces from liquid. The top surface is breathable and quick-absorbing, keeping baby skin dry.',
        },
      ],
    },
    'mesane-pedi': {
      name: 'Bladder Pads',
      description:
        'Pads specifically designed for urinary incontinence. Discreet, anatomic design with a neutral odour system supports comfort throughout the day.',
      seoTitle: 'Bladder Pads | Discreet Protection | Soft & Power',
      seoDescription:
        'Soft & Power bladder pads provide discreet protection and freedom of movement for light to heavy urinary incontinence with high absorption.',
      features: ['Unisex', 'Anatomic Form', 'Neutral Odour System'],
      faqs: [
        {
          question: 'Who can use bladder pads?',
          answer:
            'Bladder pads are suitable for women and men with light to moderate urinary incontinence. They are an everyday comfort solution for those experiencing leaks during coughing, sneezing or exercise.',
        },
        {
          question: 'What is the difference between a bladder pad and a sanitary pad?',
          answer:
            'Bladder pads are designed specifically for urine absorption and absorb significantly more liquid than sanitary pads. Their odour-control technology is also more advanced.',
        },
        {
          question: 'Are bladder pads visible under clothing?',
          answer:
            'No. Thanks to their thin, anatomic design, Soft & Power bladder pads are not visible under clothing. All 4, 6 and 8 droplet models conform to the body and remain unnoticed.',
        },
        {
          question: 'Which model should I choose?',
          answer:
            'The 4 droplet model is for light incontinence, the 6 droplet model for moderate incontinence and the 8 droplet model for heavy incontinence. Pick the model that matches your needs.',
        },
        {
          question: 'How often should bladder pads be changed?',
          answer:
            'Depending on usage we recommend changing 3–5 times a day. Replacing as soon as wetness is felt is best for skin health.',
        },
        {
          question: 'Do bladder pads control odour?',
          answer:
            'Soft & Power bladder pads come with a neutral odour-control system. Special absorbent granules trap and neutralise odour so you can feel confident in any social situation.',
        },
      ],
    },
    'hijyenik-ped': {
      name: 'Sanitary Pads',
      description:
        'Sanitary pads offering superior protection and comfort during your period. A fast-absorbing surface and leak-proof back design provide assurance at every moment.',
      seoTitle: 'Sanitary Pads | Daily & Night | Soft & Power',
      seoDescription:
        'Soft & Power sanitary pads provide comfortable, reliable period protection with a fast-absorbing surface, leak-proof back layer and breathable build.',
      features: ['Fast-Absorbing Surface', 'Leak-proof Build', 'Breathable Surface'],
      faqs: [
        {
          question: 'How often should sanitary pads be changed?',
          answer:
            'Sanitary pads should be changed every 3–4 hours. More frequent changes may be needed on heavy days. Leaving them too long may cause bacterial growth and odour.',
        },
        {
          question: 'Which model should I choose?',
          answer:
            'The 4 droplet model is for everyday use on normal flow days. The 5 droplet model is for heavier flow. The 6 droplet model has a longer build and higher absorbency, ideal for night use.',
        },
        {
          question: 'Do sanitary pads cause skin irritation?',
          answer:
            'Soft & Power sanitary pads minimise irritation with a breathable, soft top surface. For very sensitive skin, change at regular intervals and maintain hygiene to prevent irritation.',
        },
        {
          question: 'What is the difference between winged and non-winged pads?',
          answer:
            'Winged pads fold under the underwear and prevent the pad from shifting, providing extra protection on the sides. Winged models are safer for active lifestyles.',
        },
        {
          question: 'Can I use sanitary pads while exercising?',
          answer:
            'Yes. All Soft & Power sanitary pads can be safely used during exercise thanks to their flexible winged design. They stay in place during movement and prevent leaks.',
        },
      ],
    },
    'islak-mendil': {
      name: 'Wet Wipes',
      description:
        'pH-balanced, alcohol-free wet wipes suitable for every age group. A wide range from baby care to general cleaning.',
      seoTitle: 'Wet Wipes | pH Balanced & Alcohol-free | Soft & Power',
      seoDescription:
        'Soft & Power wet wipes are pH-balanced, alcohol-free and dermatologically approved – safe to use from baby care to everyday cleaning.',
      features: ['pH Balanced', 'Alcohol-Free', 'Dermatology Approved'],
      faqs: [
        {
          question: 'Can adults use baby wet wipes?',
          answer:
            'Yes, our sensitive baby wet wipes are safe for adults. The fragrance-free, pH-balanced formula is suitable for anyone with sensitive skin.',
        },
        {
          question: 'Do the wipes contain alcohol?',
          answer:
            'No, no Soft & Power wet wipes contain alcohol. With pH-balanced and dermatologically approved formulas, they cleanse skin gently.',
        },
        {
          question: 'What is special about the Flower series?',
          answer:
            'The Flower series wipes (Aloe Vera, Chamomile, Rose, Lavender) are enriched with natural plant extracts. Each offers a unique scent and skincare benefit – a gentle alternative for daily face, hand and body cleansing.',
        },
        {
          question: 'Are the wipes flushable?',
          answer:
            'No, do not flush our wipes. They can clog plumbing. Dispose of them in the trash after use.',
        },
        {
          question: 'How long can an opened pack be used?',
          answer:
            'Keep the lid tightly closed after each use. Stored properly, an opened pack stays moist for about a month. Do not use wipes that have dried out.',
        },
      ],
    },
    'yuzey-temizleme-havlusu': {
      name: 'Surface Cleaning Towels',
      description:
        'Practical and durable cleaning towels for home, office and industrial use.',
      seoTitle: 'Surface Cleaning Towels | Practical & Durable | Soft & Power',
      seoDescription:
        'Soft & Power surface cleaning towels deliver professional results in homes, offices and industry with their practical, durable and single-use construction.',
      features: ['Practical', 'Durable', 'Single-Use'],
      faqs: [
        {
          question: 'On which surfaces can the cleaning towel be used?',
          answer:
            'It can be safely used on glass, kitchen counters, tables, sinks, bathroom fixtures, carpets, electronic devices and many other surfaces.',
        },
        {
          question: 'Does the cleaning towel leave lint?',
          answer:
            'No. Soft & Power surface cleaning towels feature a special lint-free weave; they leave a clean, streak-free finish on glass and delicate surfaces.',
        },
        {
          question: 'Are the ingredients skin-safe?',
          answer:
            'They contain no parabens or SLS. Optimised for surface cleaning, they are safe to use at home.',
        },
        {
          question: 'How long can an opened pack be used?',
          answer:
            'Keep the lid tightly closed after each use. Stored properly, the towels stay moist for a long time.',
        },
      ],
    },
  },
  products: {
    // Baby Eco
    'eco-newborn': { name: 'Eco Newborn', description: "Specially designed for newborns, breathable and ultra-soft baby diaper. Provides total comfort.", count: '40 pcs', size: '2-5 kg', series: 'Eco Pack' },
    'eco-mini': { name: 'Eco Mini', description: 'Eco baby diaper offering ideal absorbency and comfort for growing babies. The flexible waistband fits even active babies perfectly.', count: '38 pcs', size: '3-6 kg', series: 'Eco Pack' },
    'eco-midi': { name: 'Eco Midi', description: 'Mid-sized baby diaper with strong absorbent capacity for active babies. Double-barrier system prevents side leaks.', count: '34 pcs', size: '5-9 kg', series: 'Eco Pack' },
    'eco-maxi': { name: 'Eco Maxi', description: 'Designed for active babies with a wide absorbent core. Guarantees a dry night.', count: '32 pcs', size: '7-18 kg', series: 'Eco Pack' },
    'eco-junior': { name: 'Eco Junior', description: 'Ideal diaper for older babies and toddlers transitioning to potty training. Easy-to-remove adhesive tabs.', count: '30 pcs', size: '11-25 kg', series: 'Eco Pack' },
    'eco-xlarge': { name: 'Eco X Large', description: 'Larger-cut, high-absorbency diaper for bigger babies. Keeps skin dry even with extended use.', count: '28 pcs', size: '15+ kg', series: 'Eco Pack' },
    'eco-xxlarge': { name: 'Eco XX Large', description: 'Largest size for active children. An extra-wide absorbent core delivers long-lasting dryness.', count: '24 pcs', size: '20-30 kg', series: 'Eco Pack' },
    // Baby Mega
    'premium-newborn': { name: 'Mega Newborn', description: 'Premium-pack diaper for newborns with an ultra-absorbent core for long-lasting dryness.', count: '80 pcs', size: '2-5 kg', series: 'Mega Pack' },
    'premium-mini': { name: 'Mega Mini', description: "Premium-pack diaper formulated for delicate baby skin. High absorbency prevents skin irritation.", count: '76 pcs', size: '3-6 kg', series: 'Mega Pack' },
    'premium-midi': { name: 'Mega Midi', description: 'Mid-size premium-pack diaper with superior absorbency technology – maximum protection.', count: '68 pcs', size: '5-9 kg', series: 'Mega Pack' },
    'premium-maxi': { name: 'Mega Maxi', description: 'Premium-pack diaper for active babies. Elastic waist and flexible build for all-day comfort.', count: '64 pcs', size: '7-18 kg', series: 'Mega Pack' },
    'premium-junior': { name: 'Mega Junior', description: 'Premium-pack diaper for older children. Ultra-thin design hides under clothing.', count: '60 pcs', size: '11-25 kg', series: 'Mega Pack' },
    'premium-xlarge': { name: 'Mega X Large', description: 'XL premium-pack diaper, day & night premium protection with breathing channels for skin.', count: '56 pcs', size: '15+ kg', series: 'Mega Pack' },
    'premium-xxlarge': { name: 'Mega XX Large', description: 'Largest premium-pack diaper – highest absorbency capacity for active children.', count: '48 pcs', size: '20-30 kg', series: 'Mega Pack' },
    // Adult diapers
    'yetiskin-bezi-m': { name: 'Adult Diaper M', description: 'Medium adult diaper. High absorbency, leak-proof side gathers and breathable build for day & night use. Waist 85-125 cm.', count: '30 pcs', size: 'M (85-125 cm)', series: 'Standard' },
    'yetiskin-bezi-l': { name: 'Adult Diaper L', description: 'Large adult diaper. High absorbency, leak-proof side gathers and breathable build for day & night use. Waist 100-150 cm.', count: '30 pcs', size: 'L (100-150 cm)', series: 'Standard' },
    'yetiskin-bezi-xl': { name: 'Adult Diaper XL', description: 'Extra-large adult diaper. High absorbency, leak-proof side gathers and breathable build for day & night use. Waist 120-170 cm.', count: '30 pcs', size: 'XL (120-170 cm)', series: 'Standard' },
    // Adult pants
    'kulot-bezi-m': { name: 'Adult Pants Medium', description: 'Medium pant diaper that can be pulled on like regular underwear. The 360° elastic waistband fits snugly.', count: '30 pcs', size: 'M (70-100 cm)', series: 'Standard' },
    'kulot-bezi-l': { name: 'Adult Pants Large', description: 'Large pant diaper offering ideal freedom of movement for active users. Double-barrier system prevents leaks.', count: '30 pcs', size: 'L (90-120 cm)', series: 'Standard' },
    'kulot-bezi-xl': { name: 'Adult Pants XLarge', description: 'Extra-large pant diaper with a wide absorbent surface for superior protection. Tear-away sides for easy removal.', count: '28 pcs', size: 'XL (110-150 cm)', series: 'Standard' },
    // Adult underpad
    'alt-serme-60x90': { name: 'Underpad 60x90', description: "Wide-format adult underpad – the most preferred size for bed protection. Quick-absorbing top keeps skin dry.", count: '30 pcs', size: '60x90 cm', series: 'Standard' },
    // Baby underpad
    'bebek-alt-serme-60x60': { name: 'Baby Underpad 60x60', description: "Wide baby underpad – the perfect size for cribs and changing units. Breathable construction protects baby skin.", count: '10 pcs', size: '60x60 cm', series: 'Standard' },
    // Bladder pads
    'mesane-pedi-4-damla': { name: 'Bladder Pad 4 Drops', description: 'Bladder pad designed for light urinary incontinence. Slim, discreet build can be used comfortably in daily life.', count: '20 pcs', size: '4 Drops · Light Flow', series: 'Standard' },
    'mesane-pedi-6-damla': { name: 'Bladder Pad 6 Drops', description: 'Ideal bladder pad for moderate urinary incontinence. Anatomic form fits the body.', count: '20 pcs', size: '6 Drops · Moderate Flow', series: 'Standard' },
    'mesane-pedi-8-damla': { name: 'Bladder Pad 8 Drops', description: 'High-absorbency bladder pad for heavy urinary incontinence. Wide absorbent surface and neutral odour system.', count: '20 pcs', size: '8 Drops · Heavy Flow', series: 'Standard' },
    // Sanitary pads
    'hijyenik-ped-4-damla': { name: 'Sanitary Pad 4 Drops', description: 'Ultra-thin sanitary pad. Flexible wings, extra-dry surface and skin-friendly construction make it ideal for normal flow days.', count: '20 pcs', size: '4 Drops', series: 'Standard' },
    'hijyenik-ped-5-damla': { name: 'Sanitary Pad 5 Drops', description: 'Super-absorbent sanitary pad designed for heavy flow days. Wide absorbent core and flexible wings provide all-day confidence.', count: '20 pcs', size: '5 Drops', series: 'Standard' },
    'hijyenik-ped-6-damla': { name: 'Sanitary Pad 6 Drops', description: 'Extra-long, high-absorbency sanitary pad for night use. Total night-long protection for restful sleep.', count: '20 pcs', size: '6 Drops', series: 'Standard' },
    // Wet wipes - Baby
    'islak-mendil-bebek-72': { name: 'Sensitive Baby Wet Wipes 72', description: "Fragrance-free, pH-balanced wet wipes safe for all babies including newborns.", count: '72 sheets', series: 'Baby' },
    'islak-mendil-bebek-90': { name: 'Sensitive Baby Wet Wipes 90', description: 'Soft and thick texture for gentle baby skin. Practical lid for easy use at home and on the go.', count: '90 sheets', series: 'Baby' },
    'islak-mendil-bebek-120': { name: 'Sensitive Baby Wet Wipes 120', description: 'Family-size economical pack. Ideal for heavy use, daily diaper changes and skincare.', count: '120 sheets', series: 'Baby' },
    // Wet wipes - Daily
    'islak-mendil-fresh-splash-120': { name: 'Fresh Splash Wet Wipes', description: 'Refreshing scent and thick texture. Suitable for hand, face and surface cleaning. The lidded pack keeps wipes fresh.', count: '120 sheets', series: 'Daily Use' },
    'islak-mendil-fresh-splash-90': { name: 'Fresh Splash Wet Wipes 90', description: 'Practical-sized daily wet wipes. Compact for carrying – ideal for quick clean-ups on the go.', count: '90 sheets', series: 'Daily Use' },
    // Wet wipes - Flower
    'islak-mendil-aloe-vera': { name: 'Aloe Vera Wet Wipes', description: 'Gentle Touch wet wipes with aloe vera extract. Cleanses while moisturising the skin with a natural fresh feel.', count: '90 sheets', series: 'Flower Series' },
    'islak-mendil-papatya': { name: 'Chamomile Wet Wipes', description: 'Gentle Touch wet wipes with chamomile extract. The soothing formula is ideal for sensitive skin.', count: '90 sheets', series: 'Flower Series' },
    'islak-mendil-gul': { name: 'Rose Wet Wipes', description: 'Gentle Touch wet wipes with rose extract. Pleasant scent and gentle formula offer daily care for face and hands.', count: '90 sheets', series: 'Flower Series' },
    'islak-mendil-lavanta': { name: 'Lavender Wet Wipes', description: 'Gentle Touch wet wipes with lavender extract. Soothing scent freshens the skin and leaves it soft.', count: '90 sheets', series: 'Flower Series' },
    // Cleaning towels
    'yuzey-temizleme-havlusu-100': { name: 'Surface Cleaning Towel', description: 'Practical and hygienic cleaning for all surfaces such as glass, kitchen counters, sinks and bathrooms. Free from parabens and SLS.', count: '100 sheets', series: 'Standard' },
  },
};

// ─── DE / RU / AR / UK — fallback to EN for now (will be filled in) ───────────
// To keep the bundle small while still functional, locales without dedicated
// translations fall back to English. Replace with real translations as needed.

const DE: LocaleData = EN;
const RU: LocaleData = EN;
const AR: LocaleData = EN;
const UK: LocaleData = EN;

const ALL: Record<SupportedLocale, LocaleData> = { tr: TR, en: EN, de: DE, ru: RU, ar: AR, uk: UK };

/** Returns the categories list with all translatable fields swapped for the given locale. */
export function getLocalizedCategories(locale: string): Category[] {
  const data = ALL[(locale as SupportedLocale)] ?? TR;
  return baseCategories.map((cat) => {
    const ci = data.categories[cat.slug];
    if (!ci) return cat;
    return {
      ...cat,
      name: ci.name,
      description: ci.description,
      seoTitle: ci.seoTitle,
      seoDescription: ci.seoDescription,
      features: ci.features,
      faqs: ci.faqs,
      products: cat.products.map((p): Product => {
        const pi = data.products[p.slug];
        if (!pi) return p;
        return {
          ...p,
          name: pi.name,
          description: pi.description,
          size: pi.size,
          series: pi.series,
          count: pi.count,
        };
      }),
    };
  });
}

export function getLocalizedCategoryBySlug(locale: string, slug: string): Category | undefined {
  return getLocalizedCategories(locale).find((c) => c.slug === slug);
}

export function getLocalizedProductBySlug(locale: string, catSlug: string, prodSlug: string): Product | undefined {
  return getLocalizedCategoryBySlug(locale, catSlug)?.products.find((p) => p.slug === prodSlug);
}
