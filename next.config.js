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

    // ─── 3. Lokalize-edilmemiş eski URL'ler → yeni lokalize URL'ler ──
    // Örnek: /en/urunler/baby-diapers → /en/products/baby-diapers
    // Path translations (i18n/routing.ts ile aynı tutulmalı)
    const PATHS = {
      '/urunler':                { en: '/products',     de: '/produkte',     ru: '/produkty',     ar: '/muntajat',     uk: '/produkty' },
      '/iletisim':               { en: '/contact',      de: '/kontakt',      ru: '/kontakty',     ar: '/tawasul',      uk: '/kontakty' },
      '/ozel-etiket':            { en: '/private-label',de: '/eigenmarke',   ru: '/sobstvennaya-marka', ar: '/alama-khasa', uk: '/vlasna-marka' },
      '/kurumsal/hakkimizda':    { en: '/about/about-us',de: '/unternehmen/ueber-uns',ru: '/o-kompanii/o-nas', ar: '/al-sharika/man-nahnu', uk: '/kompaniya/pro-nas' },
      '/kurumsal/sertifikalar':  { en: '/about/certificates',de: '/unternehmen/zertifikate',ru: '/o-kompanii/sertifikaty', ar: '/al-sharika/al-shahadat', uk: '/kompaniya/sertyfikaty' },
      '/kurumsal/uretim':        { en: '/about/production',de: '/unternehmen/produktion',ru: '/o-kompanii/proizvodstvo', ar: '/al-sharika/al-intaj', uk: '/kompaniya/vyrobnytstvo' },
      '/kurumsal/ihracat':       { en: '/about/export',  de: '/unternehmen/export',  ru: '/o-kompanii/eksport', ar: '/al-sharika/al-tasdir', uk: '/kompaniya/eksport' },
    };

    for (const [canonical, perLocale] of Object.entries(PATHS)) {
      for (const [locale, localized] of Object.entries(perLocale)) {
        // Tek path + alt path varsa wildcard ekle (özellikle /urunler/:slug için)
        out.push({
          source: `/${locale}${canonical}`,
          destination: `/${locale}${localized}`,
          permanent: true,
        });
        out.push({
          source: `/${locale}${canonical}/:slug*`,
          destination: `/${locale}${localized}/:slug*`,
          permanent: true,
        });
      }
    }

    return out;
  },
};

module.exports = withNextIntl(nextConfig);
