'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getLocalizedCategories } from '@/lib/i18n-products';
import { getCategoryImage } from '@/lib/product-images';
import { localizeCategorySlug } from '@/lib/products-data';

const CATEGORY_ICONS: Record<string, string> = {
  'bebek-bezi': '👶',
  'yetiskin-bezi': '🛡️',
  'yetiskin-kulot-bezi': '🩲',
  'yetiskin-alt-serme-ortusu': '🛏️',
  'bebek-alt-serme-ortusu': '🍼',
  'mesane-pedi': '💧',
  'hijyenik-ped': '🌸',
  'islak-mendil': '🧴',
  'yuzey-temizleme-havlusu': '🧹',
};

export default function ProductsPage() {
  const locale = useLocale();
  const t = useTranslations('productsListPage');
  const tCta = useTranslations('common');
  const categories = getLocalizedCategories(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-[#0d2d5e] pt-28 md:pt-36 pb-20 md:pb-28">
          {/* Decorative */}
          <div className="absolute inset-0 bg-hero-pattern opacity-[0.04]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00b4c8]/8 blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#1a5fa8]/15 blur-[100px] translate-y-1/2 -translate-x-1/3" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <span className="w-10 h-[2px] bg-[#00b4c8]" />
              <span className="text-[#00b4c8] text-xs font-semibold uppercase tracking-[0.25em]">
                {t('heroBadge')}
              </span>
              <span className="w-10 h-[2px] bg-[#00b4c8]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {t('heroTitle')} <span className="text-[#00b4c8]">{t('heroTitleHighlight')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-blue-200/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
            >
              {t('heroSubtitle')}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-10"
            >
              {[
                { val: '9', label: t('statCategories') },
                { val: '38+', label: t('statVarieties') },
                { val: 'ISO', label: t('statCertified') },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-black text-[#00b4c8]" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {val}
                  </div>
                  <p className="text-blue-300/60 text-xs uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Categories Grid ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl sm:text-4xl font-black text-[#0d2d5e] mb-3"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {t('categoriesTitle')}
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              {t('categoriesSubtitle')}
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' as const }}
              >
                <Link
                  href={`/${locale}/urunler/${localizeCategorySlug(cat.slug, locale)}`}
                  className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#1a5fa8]/20 transition-all duration-400 hover:-translate-y-1.5"
                >
                  {/* Image */}
                  <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
                    <Image
                      src={getCategoryImage(cat.slug) || '/slider/slide-baby-diapers.jpg'}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d2d5e]/80 via-[#0d2d5e]/20 to-transparent" />

                    {/* Category icon */}
                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
                      {CATEGORY_ICONS[cat.slug] || '📦'}
                    </div>

                    {/* Product count badge */}
                    <div className="absolute top-4 right-4 bg-[#00b4c8] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {t('productCount', { count: cat.products.length })}
                    </div>

                    {/* Category name on image */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3
                        className="text-xl sm:text-2xl font-bold text-white leading-tight"
                        style={{ fontFamily: 'var(--font-outfit)' }}
                      >
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {cat.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cat.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="text-[10px] font-semibold text-[#1a5fa8] bg-[#f4f7fb] px-2.5 py-1 rounded-full"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-bold text-[#1a5fa8] group-hover:text-[#00b4c8] transition-colors">
                        {tCta('examineProducts')}
                      </span>
                      <div className="w-9 h-9 rounded-full bg-[#f4f7fb] group-hover:bg-[#1a5fa8] flex items-center justify-center transition-all duration-300">
                        <svg className="w-4 h-4 text-[#1a5fa8] group-hover:text-white transition-colors group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────── */}
        <section className="bg-[#0d2d5e] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {t('ctaTitle')}
              </h2>
              <p className="text-blue-200/70 mb-8 max-w-lg mx-auto">
                {t('ctaSubtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/905396312392"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t('ctaWhatsapp')}
                </a>
                <Link
                  href={`/${locale}/iletisim`}
                  className="inline-flex items-center gap-2 bg-[#00b4c8] hover:bg-[#009aad] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {tCta('quoteForm')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
