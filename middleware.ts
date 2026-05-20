import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing, locales, defaultLocale, type Locale } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

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

const LOCALE_PREFIX_RE = new RegExp(`^/(${locales.join('|')})(/|$)`);
const LOCALE_COOKIE = 'NEXT_LOCALE';

function detectFromCountry(req: NextRequest): Locale | null {
  const country = (
    req.headers.get('cf-ipcountry') ||
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('x-country-code') ||
    ''
  ).toUpperCase();
  return COUNTRY_TO_LOCALE[country] || null;
}

function detectFromAcceptLanguage(req: NextRequest): Locale | null {
  const header = req.headers.get('accept-language');
  if (!header) return null;
  const langs = header
    .split(',')
    .map((p) => {
      const [tag, q] = p.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of langs) {
    const primary = tag.split('-')[0];
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

    if (target && target !== defaultLocale) {
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

  const res = intlMiddleware(req);
  // Cache-Control'u zorla — Next.js'in default 1 yıl s-maxage'ini ez.
  // CDN'de 60s, browser'da zorla yeniden doğrulama.
  res.headers.set('Cache-Control', 'public, max-age=0, s-maxage=60, must-revalidate');
  return res;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
