const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'softandpower.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    scrollRestoration: true,
  },
  async headers() {
    return [
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
  async redirects() {
    // Eski WordPress URL'lerini yeni Next.js yapısına yönlendir
    // ?:locale opsiyonel, hem /baby-underpad hem /tr/baby-underpad çalışır
    const SLUG_MAP = {
      'baby-diaper': 'bebek-bezi',
      'baby-diapers': 'bebek-bezi',
      'baby-underpad': 'bebek-alt-serme-ortusu',
      'baby-underpads': 'bebek-alt-serme-ortusu',
      'baby-wipe': 'islak-mendil',
      'baby-wipes': 'islak-mendil',
      'adult-diaper': 'yetiskin-bezi',
      'adult-diapers': 'yetiskin-bezi',
      'adult-pant': 'yetiskin-kulot-bezi',
      'adult-pants': 'yetiskin-kulot-bezi',
      'adult-underpad': 'yetiskin-alt-serme-ortusu',
      'adult-underpads': 'yetiskin-alt-serme-ortusu',
      'bladder-pad': 'mesane-pedi',
      'bladder-pads': 'mesane-pedi',
      'sanitary-pad': 'hijyenik-ped',
      'sanitary-pads': 'hijyenik-ped',
      'wet-wipe': 'islak-mendil',
      'wet-wipes': 'islak-mendil',
      'cleaning-towel': 'yuzey-temizleme-havlusu',
      'cleaning-towels': 'yuzey-temizleme-havlusu',
    };
    const out = [];
    for (const [oldSlug, newSlug] of Object.entries(SLUG_MAP)) {
      // /baby-underpad → /tr/urunler/bebek-alt-serme-ortusu
      out.push({
        source: `/${oldSlug}`,
        destination: `/tr/urunler/${newSlug}`,
        permanent: true,
      });
      // /tr/baby-underpad → /tr/urunler/bebek-alt-serme-ortusu (locale prefixli)
      out.push({
        source: `/:locale(tr|en|de|ru|ar|uk)/${oldSlug}`,
        destination: `/:locale/urunler/${newSlug}`,
        permanent: true,
      });
    }
    // Eski genel WordPress sayfaları
    out.push(
      { source: '/about', destination: '/tr/kurumsal/hakkimizda', permanent: true },
      { source: '/about-us', destination: '/tr/kurumsal/hakkimizda', permanent: true },
      { source: '/contact', destination: '/tr/iletisim', permanent: true },
      { source: '/contact-us', destination: '/tr/iletisim', permanent: true },
      { source: '/products', destination: '/tr/urunler', permanent: true },
      { source: '/private-label', destination: '/tr/ozel-etiket', permanent: true },
      { source: '/certificates', destination: '/tr/kurumsal/sertifikalar', permanent: true },
      { source: '/quality', destination: '/tr/kurumsal/uretim', permanent: true },
      { source: '/production', destination: '/tr/kurumsal/uretim', permanent: true },
    );
    return out;
  },
};

module.exports = withNextIntl(nextConfig);
