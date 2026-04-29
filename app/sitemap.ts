import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://softandpower.com';
  const now = new Date();

  const locales = ['tr', 'en', 'de', 'ar', 'ru', 'uk'];

  const pages = [
    { path: '', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/urunler', changeFrequency: 'weekly' as const, priority: 0.9 },
    { path: '/urunler/bebek-bezi', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/urunler/yetiskin-bezi', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/urunler/yetiskin-kulot-bezi', changeFrequency: 'monthly' as const, priority: 0.8 },
    { path: '/urunler/yetiskin-alt-serme-ortusu', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/urunler/bebek-alt-serme-ortusu', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/urunler/mesane-pedi', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/urunler/hijyenik-ped', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/urunler/islak-mendil', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/urunler/yuzey-temizleme-havlusu', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/kurumsal/hakkimizda', changeFrequency: 'monthly' as const, priority: 0.6 },
    { path: '/kurumsal/sertifikalar', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/kurumsal/uretim', changeFrequency: 'yearly' as const, priority: 0.5 },
    { path: '/kurumsal/ihracat', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/ozel-etiket', changeFrequency: 'monthly' as const, priority: 0.7 },
    { path: '/iletisim', changeFrequency: 'yearly' as const, priority: 0.6 },
  ];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${base}/${locale}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );
}
