import { MetadataRoute } from 'next';
import { categories, SUPPORTED_LOCALES } from '@/lib/products-data';

const BASE = 'https://softandpower.com';

type ChangeFreq = 'weekly' | 'monthly' | 'yearly';

// Tüm dillerde aynı URL yapısı: /[locale]/<canonical-path>
const STATIC_PAGES: { path: string; changeFrequency: ChangeFreq; priority: number }[] = [
  { path: '',                       changeFrequency: 'weekly',  priority: 1 },
  { path: '/products',                changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/about/about-us',    changeFrequency: 'monthly', priority: 0.6 },
  { path: '/about/certificates',  changeFrequency: 'yearly',  priority: 0.5 },
  { path: '/about/production',        changeFrequency: 'yearly',  priority: 0.5 },
  { path: '/about/export',       changeFrequency: 'monthly', priority: 0.5 },
  { path: '/private-label',            changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact',               changeFrequency: 'yearly',  priority: 0.6 },
];

function buildAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `${BASE}/${l}${path}`;
  }
  languages['x-default'] = `${BASE}/tr${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  // Statik sayfalar — her dil için bir entry
  for (const locale of SUPPORTED_LOCALES) {
    for (const page of STATIC_PAGES) {
      out.push({
        url: `${BASE}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: buildAlternates(page.path),
      });
    }
  }

  // Kategori sayfaları — canonical EN slug, her dil için aynı
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      const path = `/products/${cat.slug}`;
      out.push({
        url: `${BASE}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: buildAlternates(path),
      });
    }
  }

  // Ürün sayfaları — canonical EN slug, her dil için aynı
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      for (const prod of cat.products) {
        const path = `/products/${cat.slug}/${prod.slug}`;
        out.push({
          url: `${BASE}/${locale}${path}`,
          lastModified: now,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: buildAlternates(path),
        });
      }
    }
  }

  return out;
}
