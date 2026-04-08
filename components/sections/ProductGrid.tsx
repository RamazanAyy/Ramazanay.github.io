'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/products-data';
import { getProductImage } from '@/lib/product-images';

interface ProductGridProps {
  products: Product[];
  categorySlug: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function ProductGrid({ products, categorySlug }: ProductGridProps) {
  const locale = useLocale();

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <svg
          className="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <p className="text-gray-500 text-lg">Bu filtrelere uygun urun bulunamadi.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
    >
      {products.map((product) => (
        <motion.div
          key={product.slug}
          variants={cardVariants}
          className="group flex flex-col rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#1a5fa8]/20 transition-all duration-300 overflow-hidden"
        >
          {/* Product image or gradient fallback */}
          {(() => {
            const productImg = getProductImage(product.slug);
            return productImg ? (
              <div className="relative h-48 sm:h-52 overflow-hidden bg-white">
                <Image
                  src={productImg}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: product.seriesColor }}
                >
                  {product.series}
                </span>
              </div>
            ) : (
              <div
                className="relative h-48 sm:h-52 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${product.seriesColor}18, ${product.seriesColor}38)`,
                }}
              >
                <span
                  className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: product.seriesColor }}
                >
                  {product.series}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-300 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <div
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-20"
                  style={{ backgroundColor: product.seriesColor }}
                />
              </div>
            );
          })()}

          {/* Card body */}
          <div className="flex flex-col flex-1 p-5">
            <h3 className="text-lg font-bold text-[#0d2d5e] group-hover:text-[#1a5fa8] transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>

            {/* Info chips */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              {product.count && (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  {product.count}
                </span>
              )}
              {product.size && (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                  {product.size}
                </span>
              )}
            </div>

            {/* Spacer */}
            <div className="flex-1 min-h-[16px]" />

            {/* Action buttons */}
            <div className="mt-4 flex gap-3">
              <Link
                href={`/${locale}/urunler/${categorySlug}/${product.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00b4c8] hover:bg-[#009db0] text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Detaylari Gor
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <a
                href="https://wa.me/905396312392"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#1a5fa8] text-[#1a5fa8] hover:bg-[#1a5fa8] hover:text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Teklif Al
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
