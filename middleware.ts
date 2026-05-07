import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['tr', 'en', 'de', 'ru', 'ar', 'uk'] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT_LOCALE: Locale = 'tr';

const intlMiddleware = createMiddleware({
  locales: LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

// ─── Ülke kodu → site dili eşlemesi ────────────────────────────────
const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  TR: 'tr',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de', LU: 'de',
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', TJ: 'ru', UZ: 'ru', AM: 'ru', AZ: 'ru', MD: 'ru',
  UA: 'uk',
  SA: 'ar', AE: 'ar', EG: 'ar', KW: 'ar', QA: 'ar', BH: 'ar', OM: 'ar',
  JO: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar', IQ: 'ar', SY: 'ar', LB: 'ar',
  YE: 'ar', LY: 'ar', PS: 'ar', SD: 'ar', MR: 'ar',
};

// ─── Tarayıcı dil kodu → site dili eşlemesi (Accept-Language fallback) ──
const LANG_TO_LOCALE: Record<string, Locale> = {
  tr: 'tr',
  de: 'de',
  ru: 'ru',
  uk: 'uk',
  ar: 'ar',
  en: 'en',
};

const LOCALE_PREFIX_RE = /^\/(tr|en|de|ru|ar|uk)(\/|$)/;
const LOCALE_COOKIE = 'NEXT_LOCALE';

function detectFromCountry(req: NextRequest): Locale | null {
  const country = (
    req.headers.get('cf-ipcountry') ||      // Cloudflare
    req.headers.get('x-vercel-ip-country') || // Vercel
    req.headers.get('x-country-code') ||    // Generic / custom
    ''
  ).toUpperCase();
  return COUNTRY_TO_LOCALE[country] || null;
}

function detectFromAcceptLanguage(req: NextRequest): Locale | null {
  const header = req.headers.get('accept-language');
  if (!header) return null;
  // "tr-TR,tr;q=0.9,en-US;q=0.8" → [tr-TR, tr, en-US]
  const langs = header
    .split(',')
    .map((p) => {
      const [tag, q] = p.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of langs) {
    const primary = tag.split('-')[0]; // "tr-tr" → "tr"
    if (LANG_TO_LOCALE[primary]) return LANG_TO_LOCALE[primary];
  }
  return null;
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Sadece kök/locale-prefiksiz istekler için ve cookie yoksa otomatik tespit
  if (!LOCALE_PREFIX_RE.test(pathname) && !req.cookies.get(LOCALE_COOKIE)) {
    const target =
      detectFromCountry(req) ||
      detectFromAcceptLanguage(req);

    if (target && target !== DEFAULT_LOCALE) {
      const url = req.nextUrl.clone();
      url.pathname = `/${target}${pathname === '/' ? '' : pathname}`;
      const res = NextResponse.redirect(url);
      res.cookies.set(LOCALE_COOKIE, target, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
        sameSite: 'lax',
      });
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
