/**
 * Basit URL oluşturucu — tüm dillerde aynı path yapısını kullan (EN canonical).
 *
 * Örnek:
 *   getLocalizedUrl('en', '/products')                            → '/en/products'
 *   getLocalizedUrl('de', '/products', 'baby-diapers')            → '/de/products/baby-diapers'
 *   getLocalizedUrl('en', '/products', 'baby-diapers', 'eco-newborn')
 *                                                                 → '/en/products/baby-diapers/eco-newborn'
 */
export function getLocalizedUrl(
  locale: string,
  canonicalPath: string,
  ...dynamicSegments: string[]
): string {
  const path =
    dynamicSegments.length > 0
      ? `${canonicalPath}/${dynamicSegments.filter(Boolean).join('/')}`
      : canonicalPath;
  return `/${locale}${path === '/' ? '' : path}`;
}

/** Backwards-compat — basit pass-through */
export function getLocalizedPath(_locale: string, canonicalPath: string): string {
  return canonicalPath;
}
