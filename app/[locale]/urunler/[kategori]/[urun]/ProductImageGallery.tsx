'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  seriesColor: string;
  seriesName: string;
}

export default function ProductImageGallery({
  images,
  productName,
  seriesColor,
  seriesName,
}: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const t = useTranslations('productPage');

  const validImages = images.filter((_, i) => !imgError[i]);
  if (validImages.length === 0) return null;

  const total = images.length;

  const goTo = useCallback((nextIdx: number, dir: 1 | -1) => {
    setDirection(dir);
    setActiveIndex(((nextIdx % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next]);

  return (
    <div>
      {/* Main image */}
      <div
        className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] max-h-[520px] mx-auto w-full rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[#f0f7ff] to-[#e8f4fd] group"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 40) {
            dx < 0 ? next() : prev();
          }
          touchStartX.current = null;
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            initial={{ x: direction === 0 ? 0 : direction * 100 + '%' }}
            animate={{ x: 0 }}
            exit={{ x: direction * -100 + '%' }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={productName}
              fill
              className="object-contain p-2 sm:p-3 scale-110 sm:scale-[1.15]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={activeIndex === 0}
              onError={() => setImgError((prev) => ({ ...prev, [activeIndex]: true }))}
            />
          </motion.div>
        </AnimatePresence>

        {/* Series badge */}
        <span
          className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md z-10"
          style={{ backgroundColor: seriesColor }}
        >
          {seriesName}
        </span>

        {/* Prev / Next arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              aria-label={t('previousImage')}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#0d2d5e] shadow-md flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label={t('nextImage')}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-[#0d2d5e] shadow-md flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 sm:opacity-100 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                  aria-label={t('imageNumber', { n: i + 1 })}
                  className={`rounded-full transition-all ${
                    activeIndex === i ? 'w-6 h-1.5 bg-[#0d2d5e]' : 'w-1.5 h-1.5 bg-[#0d2d5e]/30 hover:bg-[#0d2d5e]/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="mt-4 flex gap-3 sm:gap-4 overflow-x-auto pb-2 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 bg-white ${
                activeIndex === i
                  ? 'border-[#1a5fa8] shadow-md ring-2 ring-[#1a5fa8]/20'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} - ${i + 1}`}
                fill
                className="object-contain p-1"
                sizes="80px"
                onError={() => setImgError((prev) => ({ ...prev, [i]: true }))}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
