'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/products-data';
import { getProductImage } from '@/lib/product-images';

interface Props {
  series: string;
  seriesColor: string;
  products: Product[];
  activeSlug: string;
  categorySlug: string;
}

// Extract numeric size (e.g. "2-5 kg" → "1" based on order, "X Large" → "6")
// Uses array index + 1 as the size number since products are in order.
export default function SeriesSizeGuide({
  series,
  seriesColor,
  products,
  activeSlug,
  categorySlug,
}: Props) {
  const locale = useLocale();
  const t = useTranslations('categoryPage');

  if (products.length <= 1) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex items-center gap-3"
        style={{ backgroundColor: `${seriesColor}10` }}
      >
        <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: seriesColor }} />
        <h2 className="text-lg sm:text-xl font-bold text-[#0d2d5e]">
          {t('siblingsTitle', { series })}
        </h2>
        <span className="ml-auto text-xs sm:text-sm text-gray-500">
          {t('siblingsCount', { count: products.length })}
        </span>
      </div>

      <div className="p-3 sm:p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
          {products.map((p, i) => {
            const isActive = p.slug === activeSlug;
            const img = getProductImage(p.slug);
            const sizeNumber = i + 1;
            const shortLabel = p.name.replace(/^(Ekonomik|Mega|Premium)\s*/i, '').trim();

            return (
              <Link
                key={p.slug}
                href={`/${locale}/urunler/${categorySlug}/${p.slug}`}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative flex flex-col items-center text-center rounded-xl border transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'shadow-md ring-2'
                    : 'border-gray-200 hover:border-[#1a5fa8] hover:shadow-md'
                }`}
                style={
                  isActive
                    ? {
                        borderColor: seriesColor,
                        // @ts-ignore custom prop for Tailwind ring
                        '--tw-ring-color': seriesColor,
                        backgroundColor: `${seriesColor}08`,
                      }
                    : undefined
                }
              >
                {/* Size badge */}
                <span
                  className="absolute top-1.5 left-1.5 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-[11px] sm:text-xs font-bold text-white shadow"
                  style={{ backgroundColor: seriesColor }}
                >
                  {sizeNumber}
                </span>

                {/* Count pill */}
                <span className="absolute top-1.5 right-1.5 z-10 text-[9px] sm:text-[10px] font-bold bg-[#0d2d5e] text-white px-1.5 py-0.5 rounded">
                  {p.count.replace(/\s*Adet/i, ' pcs')}
                </span>

                {/* Thumbnail */}
                <div className="relative w-full aspect-square bg-white">
                  {img ? (
                    <Image
                      src={img}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 14vw"
                      className="object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Labels */}
                <div className="w-full px-2 py-2 border-t border-gray-100">
                  <p className="text-[11px] sm:text-xs font-bold text-[#0d2d5e] truncate">
                    {shortLabel}
                  </p>
                  {p.size && (
                    <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">
                      {p.size}
                    </p>
                  )}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId={`active-${series}`}
                    className="absolute inset-x-0 bottom-0 h-1"
                    style={{ backgroundColor: seriesColor }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
