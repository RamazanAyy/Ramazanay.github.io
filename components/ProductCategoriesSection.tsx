'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

interface ProductDef {
  nameKey: string;
  descKey: string;
  img: string;
  href: string;
  badgeKey: string | null;
}

interface CategoryDef {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  products: ProductDef[];
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'baby',
    labelKey: 'tabBabyCare',
    icon: (
      /* Bebek Bakımı - bebek bezi + bebek yüzü (referans görsel gibi) */
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#00b4c8" />
        {/* Bez - sivri bantlı hourglass silüeti */}
        <path d="M16 22 L20 20 L22 22 L42 22 L44 20 L48 22 L48 28 Q48 42 32 46 Q16 42 16 28 Z" fill="white" />
        {/* İç açık aksan */}
        <path d="M20 24 L22 24 L42 24 L44 24 L44 28 Q44 40 32 44 Q20 40 20 28 Z" fill="#e0f4f7" opacity="0.55" />
        {/* Bebek yüzü */}
        <circle cx="32" cy="36" r="5" fill="white" stroke="#00b4c8" strokeWidth="1.1" />
        <circle cx="30" cy="35.5" r="0.7" fill="#00b4c8" />
        <circle cx="34" cy="35.5" r="0.7" fill="#00b4c8" />
        <path d="M30 38 Q32 39.2 34 38" stroke="#00b4c8" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
    products: [
      { nameKey: 'babyDiapers', descKey: 'babyDiapersDesc', img: '/images/products/eco-baby-diapers/SP_BABY_DIAPERS_ECO_1_.jpg', href: '/urunler/bebek-bezi', badgeKey: 'badgeBestSeller' },
      { nameKey: 'babyWipes', descKey: 'babyWipesDesc', img: '/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_72.jpg', href: '/urunler/islak-mendil', badgeKey: null },
      { nameKey: 'babyUnderpads', descKey: 'babyUnderpadsDesc', img: '/images/products/baby-underpad/SP_UNDERPAD_BABY_60x60_10.png', href: '/urunler/bebek-alt-serme-ortusu', badgeKey: null },
    ],
  },
  {
    id: 'adult',
    labelKey: 'tabAdultCare',
    icon: (
      /* Yetişkin Bakımı - pull-up / külot bez silüeti (referans görsel gibi) */
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#00b4c8" />
        {/* Külot dış gövde - geniş bel, daralan orta, bacak çıkıntıları */}
        <path d="M18 20 L46 20 L46 26 Q45 30 43 30 Q43 40 41 44 Q39 48 36 48 L34 48 L33 32 L31 32 L30 48 L28 48 Q25 48 23 44 Q21 40 21 30 Q19 30 18 26 Z" fill="white" />
        {/* Bel bandı */}
        <rect x="18" y="20" width="28" height="3.5" fill="#e0f4f7" />
        {/* İç emici aksan */}
        <path d="M27 26 L37 26 L36 38 L28 38 Z" fill="#e0f4f7" opacity="0.7" />
      </svg>
    ),
    products: [
      { nameKey: 'adultPants', descKey: 'adultPantsDesc', img: '/images/products/adult-pants-30/SP_ADULT_PANTS_M (2).jpg', href: '/urunler/yetiskin-kulot-bezi', badgeKey: 'badgeNew' },
      { nameKey: 'adultDiapers', descKey: 'adultDiapersDesc', img: '/images/products/adult-diapers-30/SP_ADULT_DIAPERS_M (2).jpg', href: '/urunler/yetiskin-bezi', badgeKey: null },
      { nameKey: 'adultUnderpads', descKey: 'adultUnderpadsDesc', img: '/images/products/adult-underpad/SP_UNDERPAD_60x90_30 (2).jpg', href: '/urunler/yetiskin-alt-serme-ortusu', badgeKey: null },
      { nameKey: 'bladderPads', descKey: 'bladderPadsDesc', img: '/images/products/bladder-pads/SP_PADS_UNISEX_4 (2).jpg', href: '/urunler/mesane-pedi', badgeKey: null },
      { nameKey: 'sanitaryPads', descKey: 'sanitaryPadsDesc', img: '/images/products/sanitary-pads/SP_PADS_LADY_4.jpg.jpeg', href: '/urunler/hijyenik-ped', badgeKey: null },
    ],
  },
  {
    id: 'wipes',
    labelKey: 'tabWetWipes',
    icon: (
      /* Islak Mendil - paket + çıkan mendil (referans görsel gibi) */
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#00b4c8" />
        {/* Çıkan mendil */}
        <path d="M26 26 Q26 16 32 16 Q38 16 38 26 Z" fill="white" />
        <path d="M28 26 Q28 19 32 19 Q36 19 36 26" stroke="#e0f4f7" strokeWidth="1" fill="none" />
        {/* Paket gövde */}
        <rect x="16" y="26" width="32" height="22" rx="2.5" fill="white" />
        {/* Üst kapak şeridi */}
        <rect x="16" y="26" width="32" height="4" fill="#e0f4f7" />
        {/* Açıklık ovali */}
        <ellipse cx="32" cy="28" rx="4.5" ry="1.3" fill="#00b4c8" opacity="0.3" />
      </svg>
    ),
    products: [
      { nameKey: 'babyWipes', descKey: 'babyWipesDesc', img: '/images/products/baby-wet-wipes/SP_WET_WIPES_BABY_72.jpg', href: '/urunler/islak-mendil', badgeKey: null },
      { nameKey: 'wetWipes', descKey: 'wetWipesDesc', img: '/images/products/wet-wipes/SP_WET_WIPES_120.jpg', href: '/urunler/islak-mendil', badgeKey: null },
    ],
  },
  {
    id: 'hygiene',
    labelKey: 'tabHygiene',
    icon: (
      /* Hijyen & Temizlik - temizlik havlu paketi (referans görsel gibi) */
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="30" fill="#00b4c8" />
        {/* Çıkan havlu */}
        <path d="M24 24 Q24 14 32 14 Q40 14 40 24 Z" fill="white" />
        <path d="M26 24 Q26 17 32 17 Q38 17 38 24" stroke="#e0f4f7" strokeWidth="1" fill="none" />
        {/* Paket gövde - daha geniş */}
        <rect x="14" y="24" width="36" height="24" rx="3" fill="white" />
        {/* Üst kapak şeridi */}
        <rect x="14" y="24" width="36" height="4.5" fill="#e0f4f7" />
        {/* Açıklık ovali */}
        <ellipse cx="32" cy="26.5" rx="5" ry="1.4" fill="#00b4c8" opacity="0.3" />
      </svg>
    ),
    products: [
      { nameKey: 'cleaningTowels', descKey: 'cleaningTowelsDesc', img: '/images/products/home-care-wet-towels/SP_Cleaning_towels_100.jpg', href: '/urunler/yuzey-temizleme-havlusu', badgeKey: null },
    ],
  },
];

export default function ProductCategoriesSection() {
  const locale = useLocale();
  const tCat = useTranslations('categoriesSection');
  const tProducts = useTranslations('products');
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showTabLeft, setShowTabLeft] = useState(false);
  const [showTabRight, setShowTabRight] = useState(false);

  const active = CATEGORIES.find((c) => c.id === activeId)!;

  const scroll = useCallback((dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  }, []);

  const scrollTabs = useCallback((dir: 'left' | 'right') => {
    if (!tabsRef.current) return;
    tabsRef.current.scrollBy({ left: dir === 'right' ? 150 : -150, behavior: 'smooth' });
  }, []);

  const updateTabArrows = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setShowTabLeft(el.scrollLeft > 4);
    setShowTabRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    updateTabArrows();
    el.addEventListener('scroll', updateTabArrows);
    window.addEventListener('resize', updateTabArrows);
    return () => {
      el.removeEventListener('scroll', updateTabArrows);
      window.removeEventListener('resize', updateTabArrows);
    };
  }, [updateTabArrows]);

  return (
    <section className="relative py-12 sm:py-20 lg:py-24 overflow-hidden" id="product-categories"
      style={{ background: 'linear-gradient(160deg, #e8f4fd 0%, #f0f9ff 35%, #e6f3fb 65%, #dff0fa 100%)' }}
    >
      {/* Büyük arka plan baloncukları */}
      <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#00b4c8]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#1a5fa8]/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00b4c8]/5 blur-3xl pointer-events-none" />

      {/* Dekoratif yüzen daireler — sadece sm+ ekranlarda */}
      <div className="hidden sm:block absolute top-10 left-[8%] w-16 h-16 rounded-full border-2 border-[#00b4c8]/20 pointer-events-none" />
      <div className="hidden sm:block absolute top-20 left-[12%] w-8 h-8 rounded-full bg-[#00b4c8]/10 pointer-events-none" />
      <div className="hidden sm:block absolute top-16 right-[10%] w-20 h-20 rounded-full border border-[#1a5fa8]/15 pointer-events-none" />
      <div className="hidden sm:block absolute top-32 right-[6%] w-5 h-5 rounded-full bg-[#1a5fa8]/15 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-24 left-[5%] w-12 h-12 rounded-full border-2 border-[#00b4c8]/15 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-16 right-[8%] w-10 h-10 rounded-full bg-[#00b4c8]/8 pointer-events-none" />
      <div className="hidden sm:block absolute bottom-40 left-[20%] w-6 h-6 rounded-full bg-[#1a5fa8]/10 pointer-events-none" />
      <div className="hidden sm:block absolute top-1/3 right-[18%] w-4 h-4 rounded-full bg-[#00b4c8]/20 pointer-events-none" />

      {/* Alt dalga SVG */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 30 C360 60 720 0 1080 30 C1260 45 1380 20 1440 30 L1440 60 L0 60 Z" fill="white" fillOpacity="0.4" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-[#00b4c8]" />
            <span className="text-[#00b4c8] text-xs font-semibold uppercase tracking-[0.3em]">{tCat('sectionLabel')}</span>
            <span className="w-10 h-[2px] bg-[#00b4c8]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0d2d5e] leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
            {tCat('sectionTitle')}{' '}
            <span className="bg-gradient-to-r from-[#1a5fa8] to-[#00b4c8] bg-clip-text text-transparent">{tCat('sectionTitleHighlight')}</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mt-3 text-sm">
            Hijyen sektorunde uluslararasi kalite standartlarinda uretilen urunlerimizi kategorilere gore inceleyin.
          </p>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {/* Left tab arrow — desktop only */}
          <button
            onClick={() => scrollTabs('left')}
            aria-label="Sola kaydır"
            className={`hidden sm:flex shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center text-gray-500 hover:text-[#1a5fa8] hover:border-[#1a5fa8] transition-all ${showTabLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={tabsRef}
            className="grid grid-cols-2 gap-1.5 sm:flex sm:gap-2 bg-white/80 backdrop-blur-sm p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 sm:overflow-x-auto w-full sm:w-auto sm:max-w-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className={`relative flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 sm:whitespace-nowrap px-2 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 sm:shrink-0 ${
                  activeId === cat.id ? 'text-white shadow-lg shadow-blue-200' : 'text-gray-500 hover:text-[#1a5fa8] hover:bg-gray-50'
                }`}
              >
                {activeId === cat.id && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-[#1a5fa8] to-[#00b4c8] rounded-lg sm:rounded-xl" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                )}
                <span className="relative z-10 hidden sm:inline-block shrink-0">{cat.icon}</span>
                <span className="relative z-10 text-center leading-tight">{tCat(cat.labelKey as any)}</span>
              </button>
            ))}
          </div>

          {/* Right tab arrow — desktop only */}
          <button
            onClick={() => scrollTabs('right')}
            aria-label="Sağa kaydır"
            className={`hidden sm:flex shrink-0 w-8 h-8 rounded-full bg-white border border-gray-200 shadow items-center justify-center text-gray-500 hover:text-[#1a5fa8] hover:border-[#1a5fa8] transition-all ${showTabRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* ── Product Carousel ── */}
        <div className="relative">
          {/* Left / Right arrows — hidden on mobile (uses vertical grid there) */}
          <button
            onClick={() => scroll('left')}
            className="hidden sm:flex absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-[#1a5fa8] border border-gray-200 hover:border-[#1a5fa8] rounded-full items-center justify-center shadow-lg transition-all group"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            className="hidden sm:flex absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white hover:bg-[#1a5fa8] border border-gray-200 hover:border-[#1a5fa8] rounded-full items-center justify-center shadow-lg transition-all group"
          >
            <svg className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Mobile: 2-column vertical grid | sm+: horizontal snap carousel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              ref={scrollRef}
              className="grid grid-cols-2 gap-3 sm:flex sm:gap-5 sm:overflow-x-auto px-1 py-2 sm:snap-x sm:snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {active.products.map((product, i) => (
                <motion.div
                  key={product.nameKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="w-full sm:snap-start sm:shrink-0 sm:w-[260px] lg:w-[280px]"
                >
                  <Link
                    href={`/${locale}${product.href}`}
                    className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-transparent hover:border-[#00b4c8]/30 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1.5 h-full"
                  >
                    {/* Hover accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#00b4c8] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top z-10 rounded-r" />

                    {/* Image */}
                    <div className="relative h-[180px] sm:h-[220px] lg:h-[240px] overflow-hidden bg-gradient-to-br from-[#f0f7ff] to-[#e8f4fd]">
                      <Image
                        src={product.img}
                        alt={tProducts(product.nameKey as any)}
                        fill
                        sizes="280px"
                        className="object-contain p-4 sm:p-5 group-hover:scale-[1.08] transition-transform duration-500"
                      />
                      {product.badgeKey && (
                        <span className={`absolute top-3 left-3 text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md z-10 ${
                          product.badgeKey === 'badgeBestSeller' ? 'bg-gradient-to-r from-[#1a5fa8] to-[#00b4c8]' : 'bg-[#00b4c8]'
                        }`}>
                          {tCat(product.badgeKey as any)}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h3 className="font-bold text-[#0d2d5e] text-sm sm:text-base lg:text-lg mb-1 group-hover:text-[#1a5fa8] transition-colors line-clamp-2">
                        {tProducts(product.nameKey as any)}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed flex-1 mt-1 line-clamp-2">
                        {tProducts(product.descKey as any)}
                      </p>
                      <div className="mt-3 sm:mt-4 flex items-center justify-between">
                        <span className="text-[#00b4c8] text-xs sm:text-sm font-semibold flex items-center gap-1">
                          {tCat('examine')}
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#f4f7fb] group-hover:bg-[#00b4c8] flex items-center justify-center transition-all">
                          <svg className="w-3.5 h-3.5 text-[#1a5fa8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* Tüm Ürünler card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: active.products.length * 0.08 }}
                className={`w-full sm:snap-start sm:shrink-0 sm:w-[200px] ${
                  active.products.length % 2 === 0 ? 'col-span-2 sm:col-auto' : ''
                }`}
              >
                <Link
                  href={`/${locale}/urunler`}
                  className="group flex flex-row sm:flex-col items-center justify-center bg-gradient-to-b from-[#f0f9ff] to-white border-2 border-dashed border-[#00b4c8]/40 hover:border-solid hover:border-[#00b4c8] rounded-2xl sm:rounded-3xl min-h-[90px] sm:min-h-[360px] h-full transition-all duration-300 gap-3 sm:gap-4 p-4 sm:p-5 text-center hover:shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#1a5fa8]/10 group-hover:bg-[#1a5fa8] flex items-center justify-center transition-all">
                    <svg className="w-6 h-6 text-[#1a5fa8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#1a5fa8] text-sm">{tCat('viewAll')}</p>
                    <p className="font-bold text-[#1a5fa8] text-sm">{tCat('viewAllSub')}</p>
                  </div>
                  <motion.svg
                    className="w-5 h-5 text-[#00b4c8]"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <span className="text-gray-500 text-sm">Aradığınız Ürünü Bulamadınız mı?</span>
          <a
            href="https://wa.me/905396312392?text=Merhaba%2C%20urunleriniz%20hakkinda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105 shadow-md"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp ile Sorun
          </a>
        </motion.div>
      </div>
    </section>
  );
}
