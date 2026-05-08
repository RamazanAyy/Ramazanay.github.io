/**
 * Basit URL oluşturucu — tüm dillerde aynı path yapısını kullan.
 *
 * Örnek:
 *   getLocalizedUrl('en', '/urunler')                           → '/en/urunler'
 *   getLocalizedUrl('de', '/urunler', 'bebek-bezi')            → '/de/urunler/bebek-bezi'
 *   getLocalizedUrl('en', '/urunler', 'bebek-bezi', 'eco-newborn')
 *                                                              → '/en/urunler/bebek-bezi/eco-newborn'
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
