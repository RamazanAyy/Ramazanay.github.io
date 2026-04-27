'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

const SLIDES = [
  {
    img: '/slider/slide-baby-diapers.jpg',
    tagKey: 'tagBabyCare' as const,
    nameKey: 'babyDiapers' as const,
    descKey: 'babyDiapersDesc' as const,
    href: '/urunler/bebek-bezi',
  },
  {
    img: '/slider/slide-adult-pants.jpg',
    tagKey: 'tagAdultCare' as const,
    nameKey: 'adultPants' as const,
    descKey: 'adultPantsDesc' as const,
    href: '/urunler/yetiskin-kulot-bezi',
  },
  {
    img: '/slider/slide-wet-wipes.jpg',
    tagKey: 'tagPersonalHygiene' as const,
    nameKey: 'wetWipes' as const,
    descKey: 'wetWipesDesc' as const,
    href: '/urunler/islak-mendil',
  },
  {
    img: '/slider/slide-baby-underpads.jpg',
    tagKey: 'tagBabyCare' as const,
    nameKey: 'babyUnderpads' as const,
    descKey: 'babyUnderpadsDesc' as const,
    href: '/urunler/bebek-alt-serme-ortusu',
  },
  {
    img: '/slider/slide-bladder-pads.jpg',
    tagKey: 'tagAdultCare' as const,
    nameKey: 'bladderPads' as const,
    descKey: 'bladderPadsDesc' as const,
    href: '/urunler/mesane-pedi',
  },
  {
    img: '/slider/slide-cleaning-towels.jpg',
    tagKey: 'tagProfessionalCleaning' as const,
    nameKey: 'cleaningTowels' as const,
    descKey: 'cleaningTowelsDesc' as const,
    href: '/urunler/yuzey-temizleme-havlusu',
  },
  {
    img: '/slider/slide-underpads.jpg',
    tagKey: 'tagAdultCare' as const,
    nameKey: 'adultUnderpads' as const,
    descKey: 'adultUnderpadsDesc' as const,
    href: '/urunler/yetiskin-alt-serme-ortusu',
  },
  {
    img: '/slider/slide-wipes.jpg',
    tagKey: 'tagBabyCare' as const,
    nameKey: 'babyWipes' as const,
    descKey: 'babyWipesDesc' as const,
    href: '/urunler/islak-mendil',
  },
];

const INTERVAL_MS = 5500;

export default function HeroSlider() {
  const locale = useLocale();
  const tSlider = useTranslations('slider');
  const tProducts = useTranslations('products');
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  const slide = SLIDES[current];
  const heading = tProducts(slide.nameKey as any);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#0d2d5e] mt-[56px] md:mt-[96px]"
      style={{ height: 'clamp(260px, 55vw, 580px)', minHeight: '260px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Slide Images ─────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slide.img}
            alt={heading}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={current === 0}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2d5e]/85 via-[#0d2d5e]/50 to-[#0d2d5e]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d5e]/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide Content ─────────────────────────────────────────── */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-12 sm:px-8 lg:px-12 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="max-w-xl"
            >
              {/* Brand line */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
                <span className="w-6 sm:w-8 h-[2px] bg-[#00b4c8]" />
                <span className="text-[#00b4c8] text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em]">
                  Soft &amp; Power Hygiene
                </span>
              </div>

              {/* Category badge */}
              <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/25 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full mb-3 sm:mb-4 uppercase tracking-wider">
                {tSlider(slide.tagKey as any)}
              </span>

              {/* Heading */}
              <h1
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] mb-3 sm:mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {heading}
              </h1>

              {/* Subtitle */}
              <p className="text-blue-200/90 text-xs sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 max-w-sm hidden sm:block">
                {tProducts(slide.descKey as any)}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Link
                  href={`/${locale}${slide.href}`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 bg-[#00b4c8] hover:bg-[#009aad] text-white font-bold px-4 py-2 sm:px-7 sm:py-3.5 text-xs sm:text-base rounded-lg sm:rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#00b4c8]/30"
                >
                  {tSlider('discoverProduct')}
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/urunler`}
                  className="inline-flex items-center gap-1.5 sm:gap-2 border-2 border-white/35 hover:border-white/65 hover:bg-white/10 text-white font-semibold px-4 py-2 sm:px-7 sm:py-3.5 text-xs sm:text-base rounded-lg sm:rounded-xl transition-all"
                >
                  {tSlider('allProducts')}
                </Link>
              </div>

              {/* Trust marks */}
              <div className="hidden md:flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-white/15">
                {['ISO 9001', 'CE', 'GMP', 'ISO 13485'].map((cert) => (
                  <div key={cert} className="flex items-center gap-1.5 text-xs text-blue-200/80">
                    <svg className="w-3.5 h-3.5 text-[#00b4c8] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {cert}
                  </div>
                ))}
                <div className="text-xs text-blue-200/80">🇹🇷 {tSlider('madeInTurkey')}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Navigation Arrows ─────────────────────────────────────── */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 bg-black/25 hover:bg-black/45 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-11 sm:h-11 bg-black/25 hover:bg-black/45 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Slide Counter (top-right) ─────────────────────────────── */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex items-center gap-1.5 sm:gap-2 bg-black/30 backdrop-blur-sm border border-white/15 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 z-10">
        <span className="text-white font-bold text-[10px] sm:text-sm">{String(current + 1).padStart(2, '0')}</span>
        <span className="text-white/40 text-[8px] sm:text-xs">/</span>
        <span className="text-white/50 text-[8px] sm:text-xs">{String(SLIDES.length).padStart(2, '0')}</span>
      </div>

      {/* ── Dot Indicators ────────────────────────────────────────── */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-7 h-2 bg-[#00b4c8]'
                : 'w-2 h-2 bg-white/35 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Progress Bar ──────────────────────────────────────────── */}
      {!isPaused && (
        <motion.div
          key={`progress-${current}`}
          className="absolute bottom-0 left-0 h-[3px] bg-[#00b4c8] z-10"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
        />
      )}
    </section>
  );
}
