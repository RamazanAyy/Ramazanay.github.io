import { MetadataRoute } from 'next';
import { categories, CATEGORY_SLUGS_BY_LOCALE, SUPPORTED_LOCALES } from '@/lib/products-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://softandpower.com';
  const now = new Date();

  const staticPages: { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number }[] = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/urunler', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/kurumsal/hakkimizda', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/kurumsal/sertifikalar', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/kurumsal/uretim', changeFrequency: 'yearly', priority: 0.5 },
    { path: '/kurumsal/ihracat', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/ozel-etiket', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/iletisim', changeFrequency: 'yearly', priority: 0.6 },
  ];

  const out: MetadataRoute.Sitemap = [];

  // Static pages — her dilde
  for (const locale of SUPPORTED_LOCALES) {
    for (const page of staticPages) {
      out.push({
        url: `${base}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  // Category pages — her dil kendi localized slug'ı
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      const localizedSlug = CATEGORY_SLUGS_BY_LOCALE[cat.slug]?.[locale] || cat.slug;
      out.push({
        url: `${base}/${locale}/urunler/${localizedSlug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return out;
}
