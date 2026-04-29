'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { localizeCategorySlug } from '@/lib/products-data';

const cs = (canonical: string, locale: string) => localizeCategorySlug(canonical, locale);

// ─── Constants ────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: 'tr', label: 'Türkçe',    flag: '🇹🇷', short: 'TR' },
  { code: 'en', label: 'English',   flag: '🇬🇧', short: 'EN' },
  { code: 'de', label: 'Deutsch',   flag: '🇩🇪', short: 'DE' },
  { code: 'ru', label: 'Русский',   flag: '🇷🇺', short: 'RU' },
  { code: 'ar', label: 'العربية',   flag: '🇸🇦', short: 'AR' },
  { code: 'uk', label: 'Українська',flag: '🇺🇦', short: 'UK' },
];

// ─── Animated hamburger ───────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-[18px] flex flex-col justify-between">
      <motion.span
        className="block h-0.5 bg-current rounded-full origin-center"
        animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        className="block h-0.5 bg-current rounded-full"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 bg-current rounded-full origin-center"
        animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

// ─── Mobile overlay link variants ────────────────────────────────────────────

const mobileListVariants = {
  closed: {},
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const mobileItemVariants = {
  closed: { opacity: 0, y: 18 },
  open:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

// ─── Desktop NavigationMenu content ──────────────────────────────────────────

function CorporateMenu({ locale, t, tNav }: { locale: string; t: ReturnType<typeof useTranslations<'navExtra'>>; tNav: ReturnType<typeof useTranslations<'nav'>> }) {
  const links = [
    {
      key: 'about' as const,
      href: `/${locale}/kurumsal/hakkimizda`,
      descKey: 'aboutDesc' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      key: 'quality' as const,
      href: `/${locale}/kurumsal/uretim`,
      descKey: 'qualityDesc' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      key: 'certificates' as const,
      href: `/${locale}/kurumsal/sertifikalar`,
      descKey: 'certificatesDesc' as const,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  return (
    <ul className="grid w-64 gap-1 p-3">
      {links.map(({ key, href, icon, descKey }) => (
        <li key={key}>
          <NavigationMenuLink asChild>
            <Link
              href={href}
              className="flex items-start gap-3 rounded-xl p-3 hover:bg-[#f4f7fb] transition-colors group"
            >
              <div className="mt-0.5 text-[#1a5fa8] group-hover:text-[#00b4c8] transition-colors shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#1a5fa8] transition-colors">
                  {tNav(key)}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-snug">{t(descKey as any)}</p>
              </div>
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
}

function ProductsMenu({ locale, tProducts, tNav }: { locale: string; tProducts: ReturnType<typeof useTranslations<'products'>>; tNav: ReturnType<typeof useTranslations<'navExtra'>> }) {
  const items = [
    { key: 'babyDiapers' as const,    href: `/${locale}/urunler/${cs('bebek-bezi', locale)}` },
    { key: 'adultDiapers' as const,   href: `/${locale}/urunler/${cs('yetiskin-bezi', locale)}` },
    { key: 'adultPants' as const,     href: `/${locale}/urunler/${cs('yetiskin-kulot-bezi', locale)}` },
    { key: 'adultUnderpads' as const, href: `/${locale}/urunler/${cs('yetiskin-alt-serme-ortusu', locale)}` },
    { key: 'babyUnderpads' as const,  href: `/${locale}/urunler/${cs('bebek-alt-serme-ortusu', locale)}` },
    { key: 'bladderPads' as const,    href: `/${locale}/urunler/${cs('mesane-pedi', locale)}` },
    { key: 'sanitaryPads' as const,   href: `/${locale}/urunler/${cs('hijyenik-ped', locale)}` },
    { key: 'wetWipes' as const,       href: `/${locale}/urunler/${cs('islak-mendil', locale)}` },
    { key: 'cleaningTowels' as const, href: `/${locale}/urunler/${cs('yuzey-temizleme-havlusu', locale)}` },
  ];

  return (
    <div className="w-56 p-3">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">
        {tNav('productCategories')}
      </p>
      <ul className="grid gap-0.5">
        {items.map(({ key, href }) => (
          <li key={key}>
            <NavigationMenuLink asChild>
              <Link
                href={href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-[#f4f7fb] hover:text-[#1a5fa8] transition-colors group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8]/30 group-hover:bg-[#00b4c8] transition-colors shrink-0" />
                {tProducts(key)}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-100 mt-3 pt-3 px-3">
        <Link
          href={`/${locale}/urunler`}
          className="text-xs font-semibold text-[#1a5fa8] hover:text-[#00b4c8] transition-colors flex items-center gap-1"
        >
          {tNav('allProducts')}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const t = useTranslations('nav');
  const tNavExtra = useTranslations('navExtra');
  const tProducts = useTranslations('products');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled]   = React.useState(false);
  const [mobileOpen, setMobileOpen]   = React.useState(false);
  const [langOpen, setLangOpen]       = React.useState(false);
  // Only one accordion open at a time
  const [mobileAccordion, setMobileAccordion] = React.useState<'products' | 'corporate' | null>(null);
  const mobileProds = mobileAccordion === 'products';
  const mobileCorp = mobileAccordion === 'corporate';
  const toggleMobileAccordion = (which: 'products' | 'corporate') =>
    setMobileAccordion(prev => (prev === which ? null : which));

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLocale = (code: string) => {
    const segs = pathname.split('/');
    segs[1] = code;
    router.push(segs.join('/'));
    setLangOpen(false);
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);
  const currentLang = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* Fixed nav wrapper                                                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <header>
        <nav
          data-state={mobileOpen ? 'active' : undefined}
          className={cn(
            'fixed z-50 w-full transition-all duration-300',
            isScrolled ? 'pt-2 pb-1' : ''
          )}
        >
          {/* Blue info bar — full width, no side padding on outer */}
          <motion.div
            className="hidden md:block bg-[#1a5fa8] text-white text-sm overflow-hidden w-full"
            initial={false}
            animate={{ maxHeight: isScrolled ? 0 : 60, opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <a href="tel:+905396312392" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 539 631 23 92
                </a>
                <a href="mailto:info@softandpower.com" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@softandpower.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                {[
                  { href: 'https://www.facebook.com/people/Softpower/61579102840493/', label: 'Facebook', d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { href: 'http://www.instagram.com/softandpowertr', label: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                  { href: 'https://www.linkedin.com/company/softandpower', label: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                ].map(({ href, label, d }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors" aria-label={label}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={d} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Nav content bar ── */}
          <div
            className={cn(
              'mx-auto transition-all duration-300',
              isScrolled
                ? 'bg-white/95 max-w-7xl rounded-2xl border border-gray-200 backdrop-blur-xl shadow-lg px-4 mx-auto w-[calc(100%-1.5rem)] md:w-[calc(100%-2rem)]'
                : 'max-w-full bg-white border-b border-gray-100 px-3 md:px-6'
            )}
          >
            <div className="relative flex items-center justify-between gap-3 py-3">

              {/* Logo */}
              <div className="flex w-full lg:w-auto justify-between lg:justify-start items-center shrink-0">
                <Link href={`/${locale}`} aria-label="Anasayfa" className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="Soft & Power"
                    width={150}
                    height={48}
                    className="h-9 md:h-11 w-auto object-contain"
                    style={{ mixBlendMode: 'multiply' }}
                    priority
                  />
                </Link>

                {/* Mobile: lang + hamburger */}
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-700"
                    onClick={() => setLangOpen(o => !o)}
                  >
                    <span>{currentLang.flag}</span>
                    <span className="text-xs font-bold">{currentLang.short}</span>
                  </button>
                  <button
                    onClick={() => setMobileOpen(o => !o)}
                    aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                    className="relative z-20 p-2 text-[#1a5fa8]"
                  >
                    <HamburgerIcon open={mobileOpen} />
                  </button>
                </div>
              </div>

              {/* Desktop NavigationMenu (centered) */}
              <div className="absolute inset-0 m-auto hidden lg:flex items-center justify-center size-fit pointer-events-none">
                <div className="pointer-events-auto">
                  <NavigationMenu>
                    <NavigationMenuList>

                      {/* Anasayfa */}
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-[15px]')}>
                          <Link href={`/${locale}`}>{t('home')}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      {/* Ürünler */}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-[15px]">
                          {t('products')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ProductsMenu locale={locale} tProducts={tProducts} tNav={tNavExtra} />
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {/* Kurumsal */}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent text-[15px]">
                          {t('corporate')}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <CorporateMenu locale={locale} t={tNavExtra} tNav={t} />
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {/* Private Label */}
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-[15px]')}>
                          <Link href={`/${locale}/ozel-etiket`}>{t('privateLabel')}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                      {/* İletişim */}
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-[15px]')}>
                          <Link href={`/${locale}/iletisim`}>{t('contact')}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>

                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>

              {/* Right: language + CTA (desktop) */}
              <div className="hidden lg:flex items-center gap-3 shrink-0">
                {/* Language dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setLangOpen(o => !o)}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#1a5fa8] hover:bg-[#f4f7fb] rounded-lg border border-gray-200 transition-all"
                  >
                    <span>{currentLang.flag}</span>
                    <span className="hidden xl:inline text-sm">{currentLang.label}</span>
                    <span className="xl:hidden text-xs font-bold">{currentLang.short}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {langOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50"
                      >
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => switchLocale(lang.code)}
                            className={cn(
                              'w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors',
                              locale === lang.code
                                ? 'bg-[#f4f7fb] text-[#1a5fa8] font-semibold'
                                : 'text-gray-700 hover:bg-gray-50'
                            )}
                          >
                            <span>{lang.flag}</span>
                            <span>{lang.label}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA button */}
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center gap-1.5 bg-[#00b4c8] hover:bg-[#009aad] text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  {tNavExtra('getQuote')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </nav>
      </header>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* Mobile language quick-switch                                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {langOpen && (
          <motion.div
            key="lang-mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[60px] right-4 z-[55] w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 lg:hidden"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors',
                  locale === lang.code
                    ? 'bg-[#f4f7fb] text-[#1a5fa8] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* Mobile full-screen overlay                                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            className="fixed inset-0 z-[60] bg-[#1a5fa8] flex flex-col lg:hidden overflow-y-auto overflow-x-hidden w-screen max-w-full"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 h-[64px] shrink-0 border-b border-white/10 relative">
              <Link href={`/${locale}`} onClick={closeMobile} className="flex items-center">
                <Image
                  src="/logo-transparent.png"
                  alt="Soft & Power"
                  width={110}
                  height={36}
                  className="h-8 w-auto object-contain"
                  priority
                />
              </Link>
              <button className="p-2 text-white hover:text-[#00b4c8] transition-colors" onClick={closeMobile} aria-label="Kapat">
                <HamburgerIcon open={true} />
              </button>
            </div>

            {/* Links */}
            <motion.nav
              className="flex-1 flex flex-col px-5 sm:px-6 pt-6 pb-10 relative w-full max-w-full"
              variants={mobileListVariants}
              initial="closed"
              animate="open"
            >
              {/* Anasayfa */}
              <motion.div variants={mobileItemVariants}>
                <Link
                  href={`/${locale}`}
                  onClick={closeMobile}
                  className="flex items-center py-4 text-xl font-bold text-white border-b border-white/10 hover:text-[#00b4c8] transition-colors"
                >
                  {t('home')}
                </Link>
              </motion.div>

              {/* Ürünler accordion */}
              <motion.div variants={mobileItemVariants}>
                <button
                  className="w-full flex items-center justify-between py-4 text-xl font-bold text-white border-b border-white/10 hover:text-[#00b4c8] transition-colors"
                  onClick={() => toggleMobileAccordion('products')}
                  aria-expanded={mobileProds}
                >
                  {t('products')}
                  <motion.svg
                    className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ rotate: mobileProds ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {mobileProds && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-b border-white/10"
                    >
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 py-2">
                        {[
                          { key: 'babyDiapers' as const,    href: `/${locale}/urunler/${cs('bebek-bezi', locale)}` },
                          { key: 'adultDiapers' as const,   href: `/${locale}/urunler/${cs('yetiskin-bezi', locale)}` },
                          { key: 'adultPants' as const,     href: `/${locale}/urunler/${cs('yetiskin-kulot-bezi', locale)}` },
                          { key: 'adultUnderpads' as const, href: `/${locale}/urunler/${cs('yetiskin-alt-serme-ortusu', locale)}` },
                          { key: 'babyUnderpads' as const,  href: `/${locale}/urunler/${cs('bebek-alt-serme-ortusu', locale)}` },
                          { key: 'bladderPads' as const,    href: `/${locale}/urunler/${cs('mesane-pedi', locale)}` },
                          { key: 'sanitaryPads' as const,   href: `/${locale}/urunler/${cs('hijyenik-ped', locale)}` },
                          { key: 'wetWipes' as const,       href: `/${locale}/urunler/${cs('islak-mendil', locale)}` },
                          { key: 'cleaningTowels' as const, href: `/${locale}/urunler/${cs('yuzey-temizleme-havlusu', locale)}` },
                        ].map(({ key, href }) => (
                          <Link
                            key={key}
                            href={href}
                            onClick={closeMobile}
                            className="group flex items-center gap-2 py-2 text-white/90 hover:text-white transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00b4c8] shrink-0" />
                            <span className="text-sm font-medium leading-tight line-clamp-2">{tProducts(key)}</span>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={`/${locale}/urunler`}
                        onClick={closeMobile}
                        className="flex items-center gap-2 pb-4 text-sm font-semibold text-[#00b4c8] hover:text-white transition-colors"
                      >
                        {tNavExtra('allProducts')}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Özel Etiket */}
              <motion.div variants={mobileItemVariants}>
                <Link
                  href={`/${locale}/ozel-etiket`}
                  onClick={closeMobile}
                  className="flex items-center py-4 text-xl font-bold text-white border-b border-white/10 hover:text-[#00b4c8] transition-colors"
                >
                  {t('privateLabel')}
                </Link>
              </motion.div>

              {/* İletişim */}
              <motion.div variants={mobileItemVariants}>
                <Link
                  href={`/${locale}/iletisim`}
                  onClick={closeMobile}
                  className="flex items-center py-4 text-xl font-bold text-white border-b border-white/10 hover:text-[#00b4c8] transition-colors"
                >
                  {t('contact')}
                </Link>
              </motion.div>

              {/* Kurumsal accordion */}
              <motion.div variants={mobileItemVariants}>
                <button
                  className="w-full flex items-center justify-between py-4 text-xl font-bold text-white border-b border-white/10 hover:text-[#00b4c8] transition-colors"
                  onClick={() => toggleMobileAccordion('corporate')}
                  aria-expanded={mobileCorp}
                >
                  {t('corporate')}
                  <motion.svg
                    className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ rotate: mobileCorp ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <AnimatePresence>
                  {mobileCorp && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden pl-4 border-b border-white/10"
                    >
                      {[
                        { key: 'about',        href: `/${locale}/kurumsal/hakkimizda` },
                        { key: 'quality',      href: `/${locale}/kurumsal/uretim` },
                        { key: 'certificates', href: `/${locale}/kurumsal/sertifikalar` },
                      ].map(({ key, href }) => (
                        <Link
                          key={key}
                          href={href}
                          onClick={closeMobile}
                          className="flex items-center gap-3 py-3 text-sm text-blue-200 hover:text-white transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00b4c8] shrink-0" />
                          <span className="truncate">{t(key as any)}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Language */}
              <motion.div variants={mobileItemVariants} className="mt-8">
                <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-3">Dil / Language</p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLocale(lang.code)}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0',
                        locale === lang.code ? 'bg-[#00b4c8] text-white' : 'bg-white/10 text-white hover:bg-white/20'
                      )}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.short}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Contact info */}
              <motion.div variants={mobileItemVariants} className="mt-8 pt-6 border-t border-white/10 space-y-2">
                <a href="tel:+905396312392" className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors break-all">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 539 631 23 92
                </a>
                <a href="mailto:info@softandpower.com" className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors break-all">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@softandpower.com
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
