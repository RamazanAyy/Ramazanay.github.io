import { MetadataRoute } from 'next';
import { categories, CATEGORY_SLUGS_BY_LOCALE, SUPPORTED_LOCALES } from '@/lib/products-data';
import { getLocalizedPath } from '@/lib/paths';
import { pathnames } from '@/i18n/routing';

const BASE = 'https://softandpower.com';

type ChangeFreq = 'weekly' | 'monthly' | 'yearly';

// Statik sayfalar — canonical (TR) path → meta
const STATIC_PAGES: { canonicalPath: keyof typeof pathnames | '/'; changeFrequency: ChangeFreq; priority: number }[] = [
  { canonicalPath: '/',                       changeFrequency: 'weekly',  priority: 1 },
  { canonicalPath: '/urunler',                changeFrequency: 'weekly',  priority: 0.9 },
  { canonicalPath: '/kurumsal/hakkimizda',    changeFrequency: 'monthly', priority: 0.6 },
  { canonicalPath: '/kurumsal/sertifikalar',  changeFrequency: 'yearly',  priority: 0.5 },
  { canonicalPath: '/kurumsal/uretim',        changeFrequency: 'yearly',  priority: 0.5 },
  { canonicalPath: '/kurumsal/ihracat',       changeFrequency: 'monthly', priority: 0.5 },
  { canonicalPath: '/ozel-etiket',            changeFrequency: 'monthly', priority: 0.7 },
  { canonicalPath: '/iletisim',               changeFrequency: 'yearly',  priority: 0.6 },
];

function buildAlternates(pathBuilder: (locale: string) => string) {
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `${BASE}${pathBuilder(l)}`;
  }
  languages['x-default'] = `${BASE}${pathBuilder('tr')}`;
  return { languages };
}

function localeUrl(locale: string, canonicalPath: string): string {
  if (canonicalPath === '/') return `/${locale}`;
  return `/${locale}${getLocalizedPath(locale, canonicalPath)}`;
}

function localeProductUrl(locale: string, canonicalCategorySlug: string, productSlug?: string): string {
  const localizedCat = CATEGORY_SLUGS_BY_LOCALE[canonicalCategorySlug]?.[locale as (typeof SUPPORTED_LOCALES)[number]] || canonicalCategorySlug;
  const base = `/${locale}${getLocalizedPath(locale, '/urunler')}/${localizedCat}`;
  return productSlug ? `${base}/${productSlug}` : base;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  // ─── Statik sayfalar (her dil + alternates) ─────────────────────
  for (const locale of SUPPORTED_LOCALES) {
    for (const page of STATIC_PAGES) {
      out.push({
        url: `${BASE}${localeUrl(locale, page.canonicalPath as string)}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: buildAlternates((l) => localeUrl(l, page.canonicalPath as string)),
      });
    }
  }

  // ─── Kategori sayfaları ─────────────────────────────────────────
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      out.push({
        url: `${BASE}${localeProductUrl(locale, cat.slug)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: buildAlternates((l) => localeProductUrl(l, cat.slug)),
      });
    }
  }

  // ─── Ürün sayfaları ─────────────────────────────────────────────
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      for (const prod of cat.products) {
        out.push({
          url: `${BASE}${localeProductUrl(locale, cat.slug, prod.slug)}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: buildAlternates((l) => localeProductUrl(l, cat.slug, prod.slug)),
        });
      }
    }
  }

  return out;
}
