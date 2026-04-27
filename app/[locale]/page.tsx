'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import VideoSection from '@/components/VideoSection';
import ProductCategoriesSection from '@/components/ProductCategoriesSection';

// ─── Animation Helpers ──────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

// ─── Section Label ───────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
      {children}
    </span>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const tWhyUs = useTranslations('whyUs');
  const tPL = useTranslations('privateLabelSection');
  const tCerts = useTranslations('certificates');
  const tAbout = useTranslations('aboutSection');
  const tContact = useTranslations('contactCta');
  const locale = useLocale();


  const whyUsItems = [
    {
      key: 'quality',
      descKey: 'qualityDesc',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      key: 'production',
      descKey: 'productionDesc',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      key: 'export',
      descKey: 'exportDesc',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      key: 'privateLabel',
      descKey: 'privateLabelDesc',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
  ];


  const certificates = [
    { name: 'GHP',           subtitle: 'Good Hygiene Practices',                image: '/images/certificates/ghp.png' },
    { name: 'GMP',           subtitle: 'Good Manufacture Practices',            image: '/images/certificates/gmp.png' },
    { name: 'CE',            subtitle: 'Attestation of Conformity (93/42/EEC)', image: '/images/certificates/ce.png' },
    { name: 'ISO 13485:2016', subtitle: 'Medical Devices — Quality Management', image: '/images/certificates/iso-13485.png' },
    { name: 'ISO 9001:2015',  subtitle: 'Quality Management System',            image: '/images/certificates/iso-9001.png' },
  ];

  const [certLightbox, setCertLightbox] = useState<number | null>(null);
  useEffect(() => {
    if (certLightbox === null) return;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCertLightbox(null);
      if (e.key === 'ArrowLeft')
        setCertLightbox((p) => (p === null ? 0 : (p - 1 + certificates.length) % certificates.length));
      if (e.key === 'ArrowRight')
        setCertLightbox((p) => (p === null ? 0 : (p + 1) % certificates.length));
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [certLightbox, certificates.length]);


  return (
    <>
      <Navbar />

      <main>

        {/* ══════════════════════════════════════════════════════════════
            HERO SLIDER
        ══════════════════════════════════════════════════════════════ */}
        <HeroSlider />

        {/* ══════════════════════════════════════════════════════════════
            PRODUCTS
        ══════════════════════════════════════════════════════════════ */}
        <ProductCategoriesSection />

        {/* ══════════════════════════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-10 sm:py-16 lg:py-28 bg-white" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 items-center">

              {/* Left — Soft & Power Logo */}
              <motion.div {...slideLeft(0)} className="flex flex-col items-center order-1 w-full">
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg lg:shadow-2xl w-full max-w-[160px] sm:max-w-[220px] lg:max-w-sm xl:max-w-md mx-auto">
                  <div className="absolute -inset-[1px] rounded-2xl lg:rounded-3xl bg-gradient-to-br from-[#00b4c8]/50 via-[#1a5fa8]/30 to-[#00b4c8]/20 z-0" />
                  <div className="relative z-10 rounded-2xl lg:rounded-3xl overflow-hidden bg-white p-4 sm:p-6 lg:p-10 flex items-center justify-center">
                    <Image
                      src="/logo-wide.png"
                      alt="Soft & Power Logo"
                      width={500}
                      height={300}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right — Text */}
              <motion.div {...slideRight(0.1)} className="order-2 text-center lg:text-left">
                <SectionBadge>{tAbout('badge')}</SectionBadge>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-[#0d2d5e] leading-tight mb-4 sm:mb-6"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {tAbout('title')}
                </h2>

                <div className="space-y-3 sm:space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                  <p>{tAbout('text1')}</p>
                  <p>{tAbout('text2')}</p>
                </div>

                <Link
                  href={`/${locale}/kurumsal/hakkimizda`}
                  className="inline-flex items-center gap-2 border-2 border-[#1a5fa8] text-[#1a5fa8] font-bold px-7 py-3.5 rounded-xl hover:bg-[#1a5fa8] hover:text-white transition-all"
                >
                  {tAbout('cta')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            VIDEO
        ══════════════════════════════════════════════════════════════ */}
        <VideoSection />

        {/* ══════════════════════════════════════════════════════════════
            WHY US
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 lg:py-28 bg-white" id="why-us">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="text-center mb-10 sm:mb-16">
              <SectionBadge>Soft &amp; Power</SectionBadge>
              <h2
                className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0d2d5e] mb-3 sm:mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {tWhyUs('title')}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">{tWhyUs('subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {whyUsItems.map(({ key, descKey, icon }, i) => (
                <motion.div
                  key={key}
                  {...fadeUp(i * 0.1)}
                  className="group relative bg-white border border-gray-100 hover:border-[#1a5fa8]/30 rounded-xl sm:rounded-2xl p-4 sm:p-8 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#00b4c8]/5 rounded-bl-[3rem] group-hover:bg-[#00b4c8]/10 transition-colors" />

                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#f4f7fb] flex items-center justify-center text-[#1a5fa8] mb-3 sm:mb-6 group-hover:bg-[#1a5fa8] group-hover:text-white transition-all relative [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-7 sm:[&>svg]:h-7">
                    {icon}
                  </div>
                  <h3 className="font-bold text-[#0d2d5e] text-sm sm:text-lg mb-1.5 sm:mb-3 group-hover:text-[#1a5fa8] transition-colors">
                    {tWhyUs(key as any)}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {tWhyUs(descKey as any)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            PRIVATE LABEL CTA
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 lg:py-28 bg-[#0d2d5e] relative overflow-hidden" id="private-label">
          <div className="absolute inset-0 bg-hero-pattern opacity-[0.07]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00b4c8]/10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">

              <motion.div {...slideLeft()} className="text-white text-center lg:text-left">
                <span className="inline-block bg-[#00b4c8] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 sm:mb-6 uppercase tracking-wider">
                  {tPL('badge')}
                </span>
                <h2
                  className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {tPL('title')}
                </h2>
                <p className="text-blue-200 text-sm sm:text-lg mb-6 sm:mb-10 leading-relaxed">
                  {tPL('subtitle')}
                </p>
                <Link
                  href={`/${locale}/ozel-etiket`}
                  className="inline-flex items-center gap-2 bg-white text-[#1a5fa8] font-bold px-8 py-4 rounded-xl hover:bg-[#00b4c8] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  {tPL('cta')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div {...slideRight(0.1)} className="grid grid-cols-2 gap-3 sm:gap-4">
                {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((key, i) => (
                  <div
                    key={key}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#00b4c8]/20 flex items-center justify-center text-[#00b4c8] mb-3 sm:mb-4">
                      {/* Özel ambalaj tasarımı - boya paleti/tasarım */}
                      {i === 0 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {/* Firmanıza uygun sipariş - el sıkışma/anlaşma */}
                      {i === 1 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      )}
                      {/* Hızlı numune üretimi - fabrika/üretim */}
                      {i === 2 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                      {/* Dünya geneli teslimat - uçak/kargo */}
                      {i === 3 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                    </div>
                    <p className="text-white font-semibold text-xs sm:text-sm">{tPL(key)}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CERTIFICATES
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 lg:py-24 bg-gray-50" id="certificates">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="text-center mb-8 sm:mb-14">
              <SectionBadge>{tCerts('title')}</SectionBadge>
              <h2
                className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0d2d5e] mb-3 sm:mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {tCerts('title')}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">{tCerts('subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
              {certificates.map(({ name, subtitle, image }, i) => (
                <motion.div key={name} {...fadeUp(i * 0.07)}>
                  <button
                    type="button"
                    onClick={() => setCertLightbox(i)}
                    aria-label={`${name} sertifikasını büyüt`}
                    className="group relative flex flex-col items-center w-full bg-white rounded-xl sm:rounded-2xl border border-gray-100 hover:border-[#1a5fa8] hover:shadow-lg transition-all overflow-hidden text-left"
                  >
                    <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-[#f0f7ff] to-[#e8f4fd] overflow-hidden">
                      <Image
                        src={image}
                        alt={`${name} sertifikası`}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                        className="object-contain p-2 sm:p-3 group-hover:scale-[1.04] transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                        <svg className="w-3.5 h-3.5 text-[#1a5fa8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </span>
                    </div>
                    <div className="flex flex-col items-start w-full p-3 sm:p-4 border-t border-gray-100">
                      <p className="font-bold text-[#1a5fa8] text-xs sm:text-sm">{name}</p>
                      <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 line-clamp-2">{subtitle}</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Lightbox */}
            {certLightbox !== null && (
              <div
                onClick={() => setCertLightbox(null)}
                className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
              >
                <button
                  onClick={() => setCertLightbox(null)}
                  aria-label="Kapat"
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="relative max-w-4xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                  <div className="relative w-full flex items-center justify-center">
                    <Image
                      src={certificates[certLightbox].image}
                      alt={certificates[certLightbox].name}
                      width={1200}
                      height={1600}
                      className="w-auto max-h-[75vh] object-contain rounded-lg bg-white"
                    />
                  </div>
                  <div className="text-center mt-3 sm:mt-4 text-white">
                    <p className="font-bold text-sm sm:text-lg">{certificates[certLightbox].name}</p>
                    <p className="text-xs sm:text-sm text-white/70 mt-0.5">{certificates[certLightbox].subtitle}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCertLightbox((p) => p === null ? 0 : (p - 1 + certificates.length) % certificates.length); }}
                    aria-label="Önceki"
                    className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCertLightbox((p) => p === null ? 0 : (p + 1) % certificates.length); }}
                    aria-label="Sonraki"
                    className="absolute right-0 sm:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CONTACT CTA STRIP
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-10 sm:py-16 bg-[#0d2d5e]">
          <motion.div
            {...fadeIn()}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8 text-center md:text-left"
          >
            <div>
              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-1"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {tContact('title')}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">info@softandpower.com · +90 539 631 23 92</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/905396312392"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {tContact('whatsappBtn')}
              </a>
              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex items-center gap-2 bg-[#00b4c8] hover:bg-[#009aad] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {tContact('emailBtn')}
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
