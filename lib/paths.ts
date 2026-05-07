import { pathnames, type Locale } from '@/i18n/routing';

/**
 * Canonical (TR) path → her dilde URL path'i.
 * Sitemap, Link href ve manuel URL üretimi için kullanılır.
 *
 * Örnek:
 *   getLocalizedUrl('en', '/urunler')                           → '/en/products'
 *   getLocalizedUrl('de', '/urunler', 'babywindeln')           → '/de/produkte/babywindeln'
 *   getLocalizedUrl('en', '/urunler', 'baby-diapers', 'eco-newborn')
 *                                                              → '/en/products/baby-diapers/eco-newborn'
 */
export function getLocalizedUrl(
  locale: string,
  canonicalPath: keyof typeof pathnames | string,
  ...dynamicSegments: string[]
): string {
  // Canonical path için lokalize edilmiş base path'i bul
  const entry = (pathnames as Record<string, unknown>)[canonicalPath];
  let localizedBase: string;

  if (typeof entry === 'string') {
    localizedBase = entry;
  } else if (entry && typeof entry === 'object') {
    const map = entry as Record<string, string>;
    localizedBase = map[locale] || map[(pathnames as any)['/'] || 'tr'] || (canonicalPath as string);
    // Dinamik segment placeholder'larını ([kategori], [urun]) çıkar
    localizedBase = localizedBase.replace(/\/\[[^\]]+\]/g, '');
  } else {
    localizedBase = canonicalPath as string;
  }

  const path =
    dynamicSegments.length > 0
      ? `${localizedBase}/${dynamicSegments.filter(Boolean).join('/')}`
      : localizedBase;

  return `/${locale}${path === '/' ? '' : path}`;
}

/**
 * Sadece path kısmını verir (locale prefix'siz).
 * URL canonical mapping ya da redirect oluşturmak için.
 */
export function getLocalizedPath(
  locale: Locale | string,
  canonicalPath: keyof typeof pathnames | string,
): string {
  const entry = (pathnames as Record<string, unknown>)[canonicalPath];
  if (typeof entry === 'string') return entry;
  if (entry && typeof entry === 'object') {
    const map = entry as Record<string, string>;
    return map[locale] || (canonicalPath as string);
  }
  return canonicalPath as string;
}
