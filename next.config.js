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
      // Static assets — uzun cache (immutable, hash'li)
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // HTML pages — kısa cache, deploy sonrası anında güncellenir
      {
        source: '/((?!_next/static|images|api).*)',
        headers: [
          // CDN'de 60 saniye, browser'da hiç (her zaman revalidate)
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, must-revalidate' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
  async redirects() {
    const out = [];

    // ─── 1. Path segment redirects: eski TR → yeni EN canonical ──────
    // /:locale/urunler/...     → /:locale/products/...
    // /:locale/iletisim        → /:locale/contact
    // /:locale/ozel-etiket     → /:locale/private-label
    // /:locale/kurumsal/...    → /:locale/about/...
    const LOC = ':locale(tr|en|de|ru|ar|uk)';
    out.push(
      { source: `/${LOC}/urunler`,                       destination: '/:locale/products',                  permanent: true },
      { source: `/${LOC}/urunler/:path*`,                destination: '/:locale/products/:path*',           permanent: true },
      { source: `/${LOC}/iletisim`,                      destination: '/:locale/contact',                   permanent: true },
      { source: `/${LOC}/ozel-etiket`,                   destination: '/:locale/private-label',             permanent: true },
      { source: `/${LOC}/kurumsal/hakkimizda`,           destination: '/:locale/about/about-us',            permanent: true },
      { source: `/${LOC}/kurumsal/sertifikalar`,         destination: '/:locale/about/certificates',        permanent: true },
      { source: `/${LOC}/kurumsal/uretim`,               destination: '/:locale/about/production',          permanent: true },
      { source: `/${LOC}/kurumsal/ihracat`,              destination: '/:locale/about/export',              permanent: true },
      { source: `/${LOC}/kurumsal`,                      destination: '/:locale/about/about-us',            permanent: true },
    );

    // ─── 2. Kategori slug redirects: eski TR slug → yeni EN canonical ──
    // /:locale/products/bebek-bezi/...  → /:locale/products/baby-diapers/...
    const CAT_MAP = {
      'bebek-bezi':                  'baby-diapers',
      'yetiskin-bezi':               'adult-diapers',
      'yetiskin-kulot-bezi':         'adult-pants',
      'yetiskin-alt-serme-ortusu':   'adult-underpads',
      'bebek-alt-serme-ortusu':      'baby-underpads',
      'mesane-pedi':                 'bladder-pads',
      'hijyenik-ped':                'sanitary-pads',
      'islak-mendil':                'wet-wipes',
      'yuzey-temizleme-havlusu':     'cleaning-towels',
    };
    for (const [oldCat, newCat] of Object.entries(CAT_MAP)) {
      // /:locale/urunler/bebek-bezi/... — eski path + eski kategori (en eski URL)
      out.push({
        source: `/${LOC}/urunler/${oldCat}`,
        destination: `/:locale/products/${newCat}`,
        permanent: true,
      });
      out.push({
        source: `/${LOC}/urunler/${oldCat}/:product*`,
        destination: `/:locale/products/${newCat}/:product*`,
        permanent: true,
      });
      // /:locale/products/bebek-bezi/... — yeni path + eski kategori
      out.push({
        source: `/${LOC}/products/${oldCat}`,
        destination: `/:locale/products/${newCat}`,
        permanent: true,
      });
      out.push({
        source: `/${LOC}/products/${oldCat}/:product*`,
        destination: `/:locale/products/${newCat}/:product*`,
        permanent: true,
      });
    }

    // ─── 3. Eski WordPress kök-level kategori slug'ları ──────
    // /baby-diaper → /tr/products/baby-diapers, vb.
    const WP_SLUG_MAP = {
      'baby-diaper':       'baby-diapers',
      'baby-diapers':      'baby-diapers',
      'baby-underpad':     'baby-underpads',
      'baby-underpads':    'baby-underpads',
      'baby-wipe':         'wet-wipes',
      'baby-wipes':        'wet-wipes',
      'adult-diaper':      'adult-diapers',
      'adult-diapers':     'adult-diapers',
      'adult-pant':        'adult-pants',
      'adult-pants':       'adult-pants',
      'adult-underpad':    'adult-underpads',
      'adult-underpads':   'adult-underpads',
      'bladder-pad':       'bladder-pads',
      'bladder-pads':      'bladder-pads',
      'sanitary-pad':      'sanitary-pads',
      'sanitary-pads':     'sanitary-pads',
      'wet-wipe':          'wet-wipes',
      'wet-wipes':         'wet-wipes',
      'cleaning-towel':    'cleaning-towels',
      'cleaning-towels':   'cleaning-towels',
    };
    for (const [oldSlug, newSlug] of Object.entries(WP_SLUG_MAP)) {
      out.push({
        source: `/${oldSlug}`,
        destination: `/tr/products/${newSlug}`,
        permanent: true,
      });
    }

    // ─── 4. Eski WordPress sayfaları (kök-level, locale prefix yok) ──
    out.push(
      { source: '/about',          destination: '/tr/about/about-us',     permanent: true },
      { source: '/about-us',       destination: '/tr/about/about-us',     permanent: true },
      { source: '/contact-us',     destination: '/tr/contact',            permanent: true },
      { source: '/quality',        destination: '/tr/about/production',   permanent: true },
    );

    return out;
  },
};

module.exports = withNextIntl(nextConfig);
