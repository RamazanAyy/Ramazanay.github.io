'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { getLocalizedUrl } from '@/lib/paths';

interface CategoryHeroProps {
  title: string;
  description: string;
  features: string[];
  locale: string;
  /** Kategori için temsil görseli (ürün resmi vb.) */
  bannerImage?: string;
}

export default function CategoryHero({
  title,
  description,
  features,
  locale,
  bannerImage,
}: CategoryHeroProps) {
  const t = useTranslations('categoryPage');
  const tCommon = useTranslations('common');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2d5e] via-[#143d75] to-[#1a5fa8]">
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#00b4c8]/15 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#1a5fa8]/25 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-28">
        <div className="grid lg:grid-cols-[1.1fr,1fr] gap-10 lg:gap-16 items-center">
          {/* LEFT: Title + description + CTAs */}
          <div>
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-[#00b4c8]/15 text-[#00b4c8] border border-[#00b4c8]/30 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b4c8] animate-pulse" />
              {t('wholesaleBadge')}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.05] tracking-tight"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {features.map((feature, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  <svg className="w-3.5 h-3.5 text-[#00b4c8]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href={getLocalizedUrl(locale, '/iletisim')}
                className="inline-flex items-center gap-2 bg-[#00b4c8] hover:bg-[#009aad] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#00b4c8]/30 hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                {t('getWholesaleQuote')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="https://wa.me/905396312392"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#25D366]/30 hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
                </svg>
                {tCommon('askWhatsapp')}
              </a>
            </motion.div>
          </div>

          {/* RIGHT: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {bannerImage ? (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/15 shadow-2xl">
                <Image
                  src={bannerImage}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 0px, 50vw"
                  className="object-contain p-4"
                  priority
                />
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave/blend */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f4f7fb] to-transparent pointer-events-none" />
    </section>
  );
}
