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
    const out = [];

    // ─── 1. Eski WordPress kategorileri (TR slug'a yönlendir) ──────
    const SLUG_MAP = {
      'baby-diaper':       'bebek-bezi',
      'baby-diapers':      'bebek-bezi',
      'baby-underpad':     'bebek-alt-serme-ortusu',
      'baby-underpads':    'bebek-alt-serme-ortusu',
      'baby-wipe':         'islak-mendil',
      'baby-wipes':        'islak-mendil',
      'adult-diaper':      'yetiskin-bezi',
      'adult-diapers':     'yetiskin-bezi',
      'adult-pant':        'yetiskin-kulot-bezi',
      'adult-pants':       'yetiskin-kulot-bezi',
      'adult-underpad':    'yetiskin-alt-serme-ortusu',
      'adult-underpads':   'yetiskin-alt-serme-ortusu',
      'bladder-pad':       'mesane-pedi',
      'bladder-pads':      'mesane-pedi',
      'sanitary-pad':      'hijyenik-ped',
      'sanitary-pads':     'hijyenik-ped',
      'wet-wipe':          'islak-mendil',
      'wet-wipes':         'islak-mendil',
      'cleaning-towel':    'yuzey-temizleme-havlusu',
      'cleaning-towels':   'yuzey-temizleme-havlusu',
    };
    for (const [oldSlug, newSlug] of Object.entries(SLUG_MAP)) {
      out.push({
        source: `/${oldSlug}`,
        destination: `/tr/urunler/${newSlug}`,
        permanent: true,
      });
      out.push({
        source: `/:locale(tr|en|de|ru|ar|uk)/${oldSlug}`,
        destination: `/:locale/urunler/${newSlug}`,
        permanent: true,
      });
    }

    // ─── 2. Eski WordPress sayfaları ──────────────────────────────
    out.push(
      { source: '/about',          destination: '/tr/kurumsal/hakkimizda',  permanent: true },
      { source: '/about-us',       destination: '/tr/kurumsal/hakkimizda',  permanent: true },
      { source: '/contact',        destination: '/tr/iletisim',             permanent: true },
      { source: '/contact-us',     destination: '/tr/iletisim',             permanent: true },
      { source: '/products',       destination: '/tr/urunler',              permanent: true },
      { source: '/private-label',  destination: '/tr/ozel-etiket',          permanent: true },
      { source: '/certificates',   destination: '/tr/kurumsal/sertifikalar',permanent: true },
      { source: '/quality',        destination: '/tr/kurumsal/uretim',      permanent: true },
      { source: '/production',     destination: '/tr/kurumsal/uretim',      permanent: true },
    );

    // ─── 3. Eski lokalize URL'ler (kısa süreli deploydaydı) → canonical TR ──
    // /en/products/... → /en/urunler/..., /de/produkte/... → /de/urunler/..., vb.
    const REVERSE_PATHS = {
      '/products':                  '/urunler',
      '/produkte':                  '/urunler',
      '/produkty':                  '/urunler',
      '/muntajat':                  '/urunler',
      '/contact':                   '/iletisim',
      '/kontakt':                   '/iletisim',
      '/kontakty':                  '/iletisim',
      '/tawasul':                   '/iletisim',
      '/private-label':             '/ozel-etiket',
      '/eigenmarke':                '/ozel-etiket',
      '/sobstvennaya-marka':        '/ozel-etiket',
      '/alama-khasa':               '/ozel-etiket',
      '/vlasna-marka':              '/ozel-etiket',
      '/about/about-us':            '/kurumsal/hakkimizda',
      '/unternehmen/ueber-uns':     '/kurumsal/hakkimizda',
      '/o-kompanii/o-nas':          '/kurumsal/hakkimizda',
      '/al-sharika/man-nahnu':      '/kurumsal/hakkimizda',
      '/kompaniya/pro-nas':         '/kurumsal/hakkimizda',
      '/about/certificates':        '/kurumsal/sertifikalar',
      '/unternehmen/zertifikate':   '/kurumsal/sertifikalar',
      '/o-kompanii/sertifikaty':    '/kurumsal/sertifikalar',
      '/al-sharika/al-shahadat':    '/kurumsal/sertifikalar',
      '/kompaniya/sertyfikaty':     '/kurumsal/sertifikalar',
      '/about/production':          '/kurumsal/uretim',
      '/unternehmen/produktion':    '/kurumsal/uretim',
      '/o-kompanii/proizvodstvo':   '/kurumsal/uretim',
      '/al-sharika/al-intaj':       '/kurumsal/uretim',
      '/kompaniya/vyrobnytstvo':    '/kurumsal/uretim',
      '/about/export':              '/kurumsal/ihracat',
      '/unternehmen/export':        '/kurumsal/ihracat',
      '/o-kompanii/eksport':        '/kurumsal/ihracat',
      '/al-sharika/al-tasdir':      '/kurumsal/ihracat',
      '/kompaniya/eksport':         '/kurumsal/ihracat',
    };

    for (const [localized, canonical] of Object.entries(REVERSE_PATHS)) {
      out.push({
        source: `/:locale(tr|en|de|ru|ar|uk)${localized}`,
        destination: `/:locale${canonical}`,
        permanent: true,
      });
      out.push({
        source: `/:locale(tr|en|de|ru|ar|uk)${localized}/:slug*`,
        destination: `/:locale${canonical}/:slug*`,
        permanent: true,
      });
    }

    return out;
  },
};

module.exports = withNextIntl(nextConfig);
