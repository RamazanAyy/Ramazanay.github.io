import { defineRouting } from 'next-intl/routing';

export const locales = ['tr', 'en', 'de', 'ru', 'ar', 'uk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

// Tüm diller aynı URL yapısını paylaşır (canonical TR slugs).
// Dil farkı sadece /locale prefix'inde, path segmentleri çevrilmez.
// Örn: /tr/urunler/bebek-bezi, /en/urunler/bebek-bezi, /de/urunler/bebek-bezi
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});
