import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['tr', 'en', 'de', 'ru', 'ar', 'uk'] as const;
const DEFAULT_LOCALE = 'tr';

const intlMiddleware = createMiddleware({
  locales: LOCALES as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'always',
});

const COUNTRY_TO_LOCALE: Record<string, string> = {
  TR: 'tr',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de', LU: 'de',
  RU: 'ru', BY: 'ru', KZ: 'ru', KG: 'ru', TJ: 'ru', UZ: 'ru', AM: 'ru', AZ: 'ru', MD: 'ru',
  UA: 'uk',
  SA: 'ar', AE: 'ar', EG: 'ar', KW: 'ar', QA: 'ar', BH: 'ar', OM: 'ar',
  JO: 'ar', MA: 'ar', DZ: 'ar', TN: 'ar', IQ: 'ar', SY: 'ar', LB: 'ar',
  YE: 'ar', LY: 'ar', PS: 'ar', SD: 'ar', MR: 'ar',
};

const LOCALE_PREFIX_RE = /^\/(tr|en|de|ru|ar|uk)(\/|$)/;
const LOCALE_COOKIE = 'NEXT_LOCALE';

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!LOCALE_PREFIX_RE.test(pathname) && !req.cookies.get(LOCALE_COOKIE)) {
    const country = (
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country-code') ||
      ''
    ).toUpperCase();

    const target = COUNTRY_TO_LOCALE[country];
    if (target && target !== DEFAULT_LOCALE) {
      const url = req.nextUrl.clone();
      url.pathname = `/${target}${pathname === '/' ? '' : pathname}`;
      const res = NextResponse.redirect(url);
      res.cookies.set(LOCALE_COOKIE, target, { path: '/', maxAge: 60 * 60 * 24 * 365 });
      return res;
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
