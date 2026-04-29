import { MetadataRoute } from 'next';
import { categories } from '@/lib/products-data';

const BASE = 'https://softandpower.com';
const LOCALES = ['tr', 'en', 'de', 'ar', 'ru', 'uk'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/urunler', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/kurumsal/hakkimizda', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/kurumsal/sertifikalar', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/kurumsal/uretim', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/kurumsal/ihracat', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/ozel-etiket', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/iletisim', changeFrequency: 'yearly' as const, priority: 0.6 },
  ];

  const buildAlternates = (path: string) => ({
    languages: Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}${path}`])),
  });

  // Statik sayfalar (her dil için, hreflang ile)
  const staticEntries = LOCALES.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: buildAlternates(page.path),
    }))
  );

  // Kategori sayfaları
  const categoryEntries = LOCALES.flatMap((locale) =>
    categories.map((cat) => ({
      url: `${BASE}/${locale}/urunler/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: buildAlternates(`/urunler/${cat.slug}`),
    }))
  );

  // Ürün detay sayfaları (her ürün her dilde)
  const productEntries: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const cat of categories) {
      const products = (cat as unknown as { products?: { slug: string }[] }).products || [];
      for (const prod of products) {
        const path = `/urunler/${cat.slug}/${prod.slug}`;
        productEntries.push({
          url: `${BASE}/${locale}${path}`,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
          alternates: buildAlternates(path),
        });
      }
    }
  }

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
