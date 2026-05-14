'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  { img: '/slider/slide-baby-diapers.webp',    label: 'Bebek Bezi' },
  { img: '/slider/slide-adult-pants.webp',     label: 'Külot Bezi' },
  { img: '/slider/slide-wet-wipes.webp',       label: 'Islak Mendil' },
  { img: '/slider/slide-baby-underpads.webp',  label: 'Bebek Örtüsü' },
  { img: '/slider/slide-bladder-pads.webp',    label: 'Mesane Pedi' },
  { img: '/slider/slide-cleaning-towels.webp', label: 'Temizleme Havlusu' },
  { img: '/slider/slide-underpads.webp',       label: 'Alt Örtüsü' },
  { img: '/slider/slide-wipes.webp',           label: 'Bebek Mendili' },
];

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD = 50;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number, dir?: 1 | -1) => {
    setCurrent((prev) => {
      const next = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
      setDirection(dir ?? (next > prev ? 1 : -1));
      return next;
    });
  }, []);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => goTo(current + 1, 1), INTERVAL_MS);
    return () => clearInterval(id);
  }, [isPaused, current, goTo]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) (delta < 0 ? next() : prev());
    touchStartX.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <section
      className="relative w-full bg-[#0d2d5e] mt-[56px] md:mt-[96px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Soft & Power ürün galerisi"
    >
      {/* MAIN slider — görselin tam oranı (1920:606), kırpma + bant yok */}
      <div
        className="relative w-full overflow-hidden group"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full aspect-[1920/606]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 220, damping: 28 },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={SLIDES[current].img}
                alt={SLIDES[current].label}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={current === 0}
                quality={90}
              />
            </motion.div>
          </AnimatePresence>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        {/* Arrows */}
        <button
          type="button" onClick={prev} aria-label="Önceki"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 bg-white/95 hover:bg-white text-[#0d2d5e] rounded-full flex items-center justify-center shadow-xl shadow-black/30 transition-all duration-300 hover:scale-110 active:scale-95 z-10 lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-3 lg:group-hover:translate-x-0"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button" onClick={next} aria-label="Sonraki"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 bg-white/95 hover:bg-white text-[#0d2d5e] rounded-full flex items-center justify-center shadow-xl shadow-black/30 transition-all duration-300 hover:scale-110 active:scale-95 z-10 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-3 lg:group-hover:translate-x-0"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Vertical pagination — right side (örnek sitedeki gibi) */}
        <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-10">
          {SLIDES.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className="group/dot flex items-center gap-2 transition-all"
            >
              <span className={`text-xs font-bold tabular-nums transition-all duration-300 ${
                i === current ? 'text-white opacity-100 -translate-x-0' : 'text-white/0 group-hover/dot:text-white/70 group-hover/dot:opacity-100 -translate-x-2'
              }`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`block rounded-full transition-all duration-500 ${
                i === current
                  ? 'w-1 h-8 bg-[#00b4c8]'
                  : 'w-1 h-1 bg-white/40 group-hover/dot:bg-white/80'
              }`} />
            </button>
          ))}
        </div>

        {/* Mobile dots — bottom */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex md:hidden items-center gap-2 z-10">
          {SLIDES.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Big counter (top-right desktop) — opsiyonel ferah görünüm */}
        <div className="absolute top-5 right-5 hidden lg:flex items-baseline gap-1 z-10">
          <span className="text-white font-black text-2xl tabular-nums drop-shadow-lg">{String(current + 1).padStart(2, '0')}</span>
          <span className="text-white/40 text-base">/</span>
          <span className="text-white/60 text-sm tabular-nums">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

        {/* Progress bar */}
        {!isPaused && (
          <motion.div
            key={`progress-${current}`}
            className="absolute bottom-0 left-0 h-[3px] bg-[#00b4c8] z-10 shadow-[0_0_8px_#00b4c8]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
          />
        )}
      </div>
    </section>
  );
}
