'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Script from 'next/script';

const VIDEO_ID = 'EmyEqzKLyBQ';
const YT_THUMBNAIL = `https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export default function VideoSection() {
  const [active, setActive] = useState(false);
  const t = useTranslations('video');

  return (
    <section className="py-12 sm:py-20 lg:py-28 bg-[#0d2d5e] relative overflow-hidden" id="video" aria-label={t('title') + ' ' + t('titleHighlight')}>
      {/* SEO: VideoObject structured data */}
      <Script id="video-schema" type="application/ld+json" strategy="afterInteractive">{`
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "Soft & Power Üretim Tesisi Tanıtım Videosu",
          "description": "Modern tesisimiz ve ileri teknoloji altyapımızla dünya standartlarında hijyen ürünleri üretiyoruz.",
          "thumbnailUrl": "${YT_THUMBNAIL}",
          "embedUrl": "https://www.youtube.com/embed/${VIDEO_ID}",
          "uploadDate": "2024-01-01",
          "publisher": {
            "@type": "Organization",
            "name": "Soft & Power",
            "url": "https://softandpower.com"
          }
        }
      `}</Script>

      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-pattern opacity-[0.04]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00b4c8]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-[#00b4c8]" />
            <span className="text-[#00b4c8] text-xs font-semibold uppercase tracking-[0.25em]">
              {t('badge')}
            </span>
            <span className="w-10 h-[2px] bg-[#00b4c8]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {t('title')} <span className="text-[#00b4c8]">{t('titleHighlight')}</span>
          </h2>
          <p className="text-blue-300/80 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow border */}
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#00b4c8]/40 via-[#1a5fa8]/30 to-[#00b4c8]/20 blur-sm" />

          {/* 16:9 aspect ratio wrapper */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
            {active ? (
              /* YouTube iframe — lazy loaded after click */
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Soft & Power Üretim Tesisi Tanıtım Videosu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              /* Thumbnail + play overlay — SEO dostu, hızlı yükleme */
              <button
                onClick={() => setActive(true)}
                aria-label="Videoyu oynat"
                className="absolute inset-0 w-full h-full group"
              >
                {/* Thumbnail */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={YT_THUMBNAIL}
                  alt="Soft & Power Üretim Tesisi Tanıtım Videosu"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0d2d5e]/50 group-hover:bg-[#0d2d5e]/35 transition-colors duration-300" />

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00b4c8] rounded-full flex items-center justify-center shadow-2xl shadow-[#00b4c8]/40 ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-300"
                  >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <span className="text-white/80 text-sm font-medium">{t('play')}</span>
                </div>
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto"
        >
          {[
            { value: '10+', labelKey: 'statProducts' as const },
            { value: 'ISO', labelKey: 'statCertified' as const },
            { value: '24/7', labelKey: 'statCapacity' as const },
          ].map(({ value, labelKey }) => (
            <div key={labelKey} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-[#00b4c8] mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>
                {value}
              </div>
              <p className="text-blue-300/60 text-xs uppercase tracking-wider">{t(labelKey)}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
