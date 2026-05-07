import { defineRouting } from 'next-intl/routing';

export const locales = ['tr', 'en', 'de', 'ru', 'ar', 'uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

// ─── Path segment çevirileri (her dil için lokalize) ──────────────────
// Canonical (TR) → her dilde URL path'i
// Dynamic segment'ler ([kategori], [urun]) olduğu gibi kalır
export const pathnames = {
  '/': '/',
  '/urunler': {
    tr: '/urunler',
    en: '/products',
    de: '/produkte',
    ru: '/produkty',
    ar: '/muntajat',
    uk: '/produkty',
  },
  '/urunler/[kategori]': {
    tr: '/urunler/[kategori]',
    en: '/products/[kategori]',
    de: '/produkte/[kategori]',
    ru: '/produkty/[kategori]',
    ar: '/muntajat/[kategori]',
    uk: '/produkty/[kategori]',
  },
  '/urunler/[kategori]/[urun]': {
    tr: '/urunler/[kategori]/[urun]',
    en: '/products/[kategori]/[urun]',
    de: '/produkte/[kategori]/[urun]',
    ru: '/produkty/[kategori]/[urun]',
    ar: '/muntajat/[kategori]/[urun]',
    uk: '/produkty/[kategori]/[urun]',
  },
  '/iletisim': {
    tr: '/iletisim',
    en: '/contact',
    de: '/kontakt',
    ru: '/kontakty',
    ar: '/tawasul',
    uk: '/kontakty',
  },
  '/ozel-etiket': {
    tr: '/ozel-etiket',
    en: '/private-label',
    de: '/eigenmarke',
    ru: '/sobstvennaya-marka',
    ar: '/alama-khasa',
    uk: '/vlasna-marka',
  },
  '/kurumsal/hakkimizda': {
    tr: '/kurumsal/hakkimizda',
    en: '/about/about-us',
    de: '/unternehmen/ueber-uns',
    ru: '/o-kompanii/o-nas',
    ar: '/al-sharika/man-nahnu',
    uk: '/kompaniya/pro-nas',
  },
  '/kurumsal/sertifikalar': {
    tr: '/kurumsal/sertifikalar',
    en: '/about/certificates',
    de: '/unternehmen/zertifikate',
    ru: '/o-kompanii/sertifikaty',
    ar: '/al-sharika/al-shahadat',
    uk: '/kompaniya/sertyfikaty',
  },
  '/kurumsal/uretim': {
    tr: '/kurumsal/uretim',
    en: '/about/production',
    de: '/unternehmen/produktion',
    ru: '/o-kompanii/proizvodstvo',
    ar: '/al-sharika/al-intaj',
    uk: '/kompaniya/vyrobnytstvo',
  },
  '/kurumsal/ihracat': {
    tr: '/kurumsal/ihracat',
    en: '/about/export',
    de: '/unternehmen/export',
    ru: '/o-kompanii/eksport',
    ar: '/al-sharika/al-tasdir',
    uk: '/kompaniya/eksport',
  },
} as const;

export type Pathnames = keyof typeof pathnames;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames,
});
