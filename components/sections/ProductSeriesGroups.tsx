'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Product } from '@/lib/products-data';
import ProductGrid from './ProductGrid';
import FadeInUp from '@/components/animations/FadeInUp';

interface Props {
  products: Product[];
  categorySlug: string;
  categoryName: string;
}

const ALL_KEY = '__all__';

function groupTitle(series: string, pluralName: string) {
  const prefix = series.replace(/\s*(Paket|Pack)$/i, '').trim();
  return prefix ? `${prefix} ${pluralName}` : pluralName;
}

export default function ProductSeriesGroups({ products, categorySlug, categoryName }: Props) {
  const t = useTranslations();
  const groups = useMemo(() => {
    const map = new Map<string, { items: Product[]; color: string }>();
    for (const p of products) {
      const g = map.get(p.series);
      if (g) g.items.push(p);
      else map.set(p.series, { items: [p], color: p.seriesColor });
    }
    return Array.from(map.entries()).map(([series, { items, color }]) => ({ series, items, color }));
  }, [products]);

  // pluralName for series headings (e.g. "All Bebek Bezi Ürünleri")
  const pluralName = t('categoryPage.allProductsTitle', { name: categoryName }).replace(/^\s*(Tüm|Alle|Все|All|Усі)\s*/i, '').trim() || categoryName;
  const [filter, setFilter] = useState<string>(ALL_KEY);

  if (groups.length <= 1) {
    return (
      <>
        <FadeInUp>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2d5e]">
              {t('categoryPage.allProductsTitle', { name: categoryName })}
            </h2>
            <p className="mt-2 text-gray-500">{t('categoryPage.productsListed', { count: products.length })}</p>
          </div>
        </FadeInUp>
        <ProductGrid products={products} categorySlug={categorySlug} />
      </>
    );
  }

  const visibleGroups = filter === ALL_KEY ? groups : groups.filter((g) => g.series === filter);

  return (
    <>
      {/* Series filter bar */}
      <FadeInUp>
        <div
          className="sticky top-[72px] sm:top-20 z-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-8 bg-[#f4f7fb]/90 backdrop-blur-md border-b border-gray-100"
        >
          <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
            <button
              onClick={() => setFilter(ALL_KEY)}
              className={`relative shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                filter === ALL_KEY
                  ? 'bg-[#0d2d5e] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0d2d5e] hover:text-[#0d2d5e]'
              }`}
            >
              {t('common.all')}
              <span className={`ml-1.5 text-[10px] font-bold ${filter === ALL_KEY ? 'opacity-80' : 'text-gray-400'}`}>
                {products.length}
              </span>
            </button>
            {groups.map((g) => {
              const active = filter === g.series;
              const prefix = g.series.replace(/\s*(Paket|Pack)$/i, '').trim() || g.series;
              return (
                <button
                  key={g.series}
                  onClick={() => setFilter(g.series)}
                  className={`relative shrink-0 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border ${
                    active ? 'text-white shadow-md border-transparent' : 'bg-white text-gray-600 border-gray-200 hover:text-[#0d2d5e]'
                  }`}
                  style={active ? { backgroundColor: g.color } : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${active ? 'bg-white' : ''}`}
                      style={active ? undefined : { backgroundColor: g.color }}
                    />
                    {prefix}
                  </span>
                  <span className={`ml-1.5 text-[10px] font-bold ${active ? 'opacity-80' : 'text-gray-400'}`}>
                    {g.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </FadeInUp>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="space-y-14 sm:space-y-20"
        >
          {visibleGroups.map((g) => (
            <section key={g.series} id={`seri-${g.series.replace(/\s+/g, '-').toLowerCase()}`} className="scroll-mt-32">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-8 w-1.5 rounded-full" style={{ backgroundColor: g.color }} />
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: g.color }}
                  >
                    {g.series}
                  </span>
                </div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0d2d5e]">
                    {groupTitle(g.series, pluralName)}
                  </h2>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {g.items.length} {t('common.products')}
                  </span>
                </div>
              </div>
              <ProductGrid products={g.items} categorySlug={categorySlug} />
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
