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
  canonicalSlug?: string;
}

const CATEGORY_BANNER: Record<string, string> = {
  'bebek-bezi': '/slider/slide-baby-diapers.webp',
  'yetiskin-bezi': '/slider/slide-adult-pants.webp',
  'yetiskin-kulot-bezi': '/slider/slide-adult-pants.webp',
  'yetiskin-alt-serme-ortusu': '/slider/slide-underpads.webp',
  'bebek-alt-serme-ortusu': '/slider/slide-baby-underpads.webp',
  'mesane-pedi': '/slider/slide-bladder-pads.webp',
  'hijyenik-ped': '/slider/slide-bladder-pads.webp',
  'islak-mendil': '/slider/slide-wet-wipes.webp',
  'yuzey-temizleme-havlusu': '/slider/slide-cleaning-towels.webp',
};

export default function CategoryHero({
  title,
  description,
  features,
  locale,
  canonicalSlug,
}: CategoryHeroProps) {
  const t = useTranslations('categoryPage');
  const tCommon = useTranslations('common');

  const banner = (canonicalSlug && CATEGORY_BANNER[canonicalSlug]) || '/slider/slide-baby-diapers.webp';

  const CTAs = (
    <div className="flex flex-wrap gap-3">
      <Link
        href={getLocalizedUrl(locale, '/iletisim')}
        className="inline-flex items-center gap-2 bg-[#00b4c8] hover:bg-[#009aad] text-white font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-[#00b4c8]/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
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
        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-[#25D366]/40 hover:scale-[1.03] active:scale-[0.98] transition-all"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
        {tCommon('askWhatsapp')}
      </a>
    </div>
  );

  const featureChips = (
    <div className="flex flex-wrap gap-2">
      {features.map((feature, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full"
        >
          <svg className="w-3.5 h-3.5 text-[#00b4c8]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {feature}
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative bg-[#0d2d5e] mt-[56px] md:mt-[96px]">
      {/* === DESKTOP: banner üzerinde overlay text === */}
      <div className="hidden lg:block relative overflow-hidden">
        <div className="relative w-full aspect-[1920/606]">
          <Image
            src={banner}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Gradient overlay — sol koyu, sağa şeffaf */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2d5e]/85 via-[#0d2d5e]/40 to-transparent" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
              <div className="max-w-xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl xl:text-5xl 2xl:text-6xl font-black text-white leading-[1.05] tracking-tight"
                  style={{ fontFamily: 'var(--font-outfit)', textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                >
                  {title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 text-base xl:text-lg text-white leading-relaxed max-w-md"
                  style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
                >
                  {description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-5"
                >
                  {featureChips}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6"
                >
                  {CTAs}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === MOBİL / TABLET: banner üstte, yazı altında === */}
      <div className="lg:hidden">
        {/* Banner image — gerçek oranında, kırpma yok */}
        <div className="relative w-full aspect-[1920/606] min-h-[180px]">
          <Image
            src={banner}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>
        {/* Yazılar banner'ın altında */}
        <div className="bg-gradient-to-br from-[#0d2d5e] via-[#143d75] to-[#1a5fa8] px-4 sm:px-6 py-8 sm:py-10">
          <div className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-black text-white leading-tight"
              style={{ fontFamily: 'var(--font-outfit)' }}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed"
            >
              {description}
            </motion.p>
            <div className="mt-4">{featureChips}</div>
            <div className="mt-5">{CTAs}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
