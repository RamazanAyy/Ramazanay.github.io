import { MetadataRoute } from 'next';
import { categories, CATEGORY_SLUGS_BY_LOCALE, SUPPORTED_LOCALES } from '@/lib/products-data';

const BASE = 'https://softandpower.com';

type ChangeFreq = 'weekly' | 'monthly' | 'yearly';

const STATIC_PAGES: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/urunler', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/kurumsal/hakkimizda', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/kurumsal/sertifikalar', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/kurumsal/uretim', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/kurumsal/ihracat', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/ozel-etiket', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/iletisim', changeFrequency: 'yearly', priority: 0.6 },
];

function buildAlternates(pathBuilder: (locale: string) => string) {
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `${BASE}${pathBuilder(l)}`;
  }
  // x-default: TR (canonical)
  languages['x-default'] = `${BASE}${pathBuilder('tr')}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  // ─── Static pages ─── her dil için bir entry + tüm dil alternatifleri
  for (const locale of SUPPORTED_LOCALES) {
    for (const page of STATIC_PAGES) {
      out.push({
        url: `${BASE}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: buildAlternates((l) => `/${l}${page.path}`),
      });
    }
  }

  // ─── Category pages ─── her dil kendi lokalize slug'ı + alternates
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      const slugForLocale = (l: string) =>
        CATEGORY_SLUGS_BY_LOCALE[cat.slug]?.[l as (typeof SUPPORTED_LOCALES)[number]] || cat.slug;
      out.push({
        url: `${BASE}/${locale}/urunler/${slugForLocale(locale)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: buildAlternates((l) => `/${l}/urunler/${slugForLocale(l)}`),
      });
    }
  }

  // ─── Product pages ─── her dil için her ürün + alternates
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      const slugForLocale = (l: string) =>
        CATEGORY_SLUGS_BY_LOCALE[cat.slug]?.[l as (typeof SUPPORTED_LOCALES)[number]] || cat.slug;
      for (const prod of cat.products) {
        out.push({
          url: `${BASE}/${locale}/urunler/${slugForLocale(locale)}/${prod.slug}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: buildAlternates((l) => `/${l}/urunler/${slugForLocale(l)}/${prod.slug}`),
        });
      }
    }
  }

  return out;
}
