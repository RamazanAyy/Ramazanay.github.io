'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

// ─── Product Icon Components ────────────────────────────────────────────────

function BabyDiaperIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect x="8" y="20" width="48" height="28" rx="8" fill="currentColor" opacity="0.15" />
      <path d="M8 28C8 28 20 32 32 32C44 32 56 28 56 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="22" cy="24" r="4" fill="currentColor" opacity="0.3" />
      <circle cx="42" cy="24" r="4" fill="currentColor" opacity="0.3" />
      <path d="M24 40C24 40 28 44 32 44C36 44 40 40 40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="14" r="6" fill="#FFD6E0" />
      <circle cx="30" cy="13" r="1.5" fill="#FF6B8A" />
      <circle cx="34" cy="13" r="1.5" fill="#FF6B8A" />
      <path d="M30 16.5C30 16.5 31 17.5 34 16.5" stroke="#FF6B8A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function AdultDiaperIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect x="10" y="18" width="44" height="30" rx="6" fill="currentColor" opacity="0.15" />
      <path d="M10 26C10 26 22 30 32 30C42 30 54 26 54 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="18" y="34" width="28" height="8" rx="4" fill="currentColor" opacity="0.2" />
      <circle cx="21" cy="22" r="3" fill="currentColor" opacity="0.25" />
      <circle cx="43" cy="22" r="3" fill="currentColor" opacity="0.25" />
    </svg>
  );
}

function PantsIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M14 16H50C52 16 54 18 54 20V28C54 34 48 42 42 50H22C16 42 10 34 10 28V20C10 18 12 16 14 16Z" fill="currentColor" opacity="0.15" />
      <path d="M10 28C10 28 22 32 32 32C42 32 54 28 54 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 16C14 16 20 20 32 20C44 20 50 16 50 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function UnderpadsIcon({ baby = false }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect x="8" y="22" width="48" height="24" rx="4" fill="currentColor" opacity="0.15" />
      <rect x="12" y="26" width="40" height="16" rx="2" fill="currentColor" opacity="0.12" />
      <path d="M16 32H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <path d="M16 38H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
    </svg>
  );
}

function SanitaryPadIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M12 32C12 22 20 14 32 14C44 14 52 22 52 32C52 42 44 50 32 50C20 50 12 42 12 32Z" fill="currentColor" opacity="0.12" />
      <path d="M20 32C20 26 25.5 20 32 20C38.5 20 44 26 44 32C44 38 38.5 44 32 44C25.5 44 20 38 20 32Z" fill="currentColor" opacity="0.2" />
      <path d="M24 32C24 28 27.5 24 32 24C36.5 24 40 28 40 32C40 36 36.5 40 32 40C27.5 40 24 36 24 32Z" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function BladderPadIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <path d="M16 36C16 28 22 20 32 20C42 20 48 28 48 36V44H16V36Z" fill="currentColor" opacity="0.15" />
      <rect x="16" y="40" width="32" height="8" rx="4" fill="currentColor" opacity="0.2" />
      <path d="M24 32C24 32 28 36 32 36C36 36 40 32 40 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BabyWipesIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect x="12" y="14" width="40" height="36" rx="6" fill="currentColor" opacity="0.15" />
      <rect x="18" y="20" width="28" height="24" rx="3" fill="white" opacity="0.5" />
      <path d="M22 28H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 32H42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 36H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WetWipesIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect x="10" y="16" width="44" height="32" rx="6" fill="currentColor" opacity="0.15" />
      <rect x="16" y="22" width="32" height="20" rx="3" fill="white" opacity="0.5" />
      <path d="M20 29H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 33H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 37H36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CleaningTowelIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
      <rect x="8" y="12" width="48" height="40" rx="4" fill="currentColor" opacity="0.15" />
      <path d="M8 20H56" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 28H56" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 36H56" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 44H56" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 12V52" stroke="currentColor" strokeWidth="1.5" />
      <path d="M44 12V52" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Section Label ───────────────────────────────────────────────────────────

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#F4A300]/10 text-[#F4A300] border border-[#F4A300]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
      {children}
    </span>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const t = useTranslations('hero');
  const tProducts = useTranslations('products');
  const tWhyUs = useTranslations('whyUs');
  const tPL = useTranslations('privateLabelSection');
  const tStats = useTranslations('stats');
  const tCerts = useTranslations('certificates');
  const tAbout = useTranslations('aboutSection');
  const locale = useLocale();

  const products = [
    { key: 'babyDiapers',    descKey: 'babyDiapersDesc',    icon: <BabyDiaperIcon />,    href: '/products/baby-diapers' },
    { key: 'adultDiapers',   descKey: 'adultDiapersDesc',   icon: <AdultDiaperIcon />,   href: '/products/adult-diapers' },
    { key: 'adultPants',     descKey: 'adultPantsDesc',     icon: <PantsIcon />,         href: '/products/adult-pants' },
    { key: 'adultUnderpads', descKey: 'adultUnderpadsDesc', icon: <UnderpadsIcon />,     href: '/products/adult-underpads' },
    { key: 'babyUnderpads',  descKey: 'babyUnderpadsDesc',  icon: <UnderpadsIcon baby />,href: '/products/baby-underpads' },
    { key: 'sanitaryPads',   descKey: 'sanitaryPadsDesc',   icon: <SanitaryPadIcon />,   href: '/products/sanitary-pads' },
    { key: 'bladderPads',    descKey: 'bladderPadsDesc',    icon: <BladderPadIcon />,    href: '/products/bladder-pads' },
    { key: 'babyWipes',      descKey: 'babyWipesDesc',      icon: <BabyWipesIcon />,     href: '/products/baby-wet-wipes' },
    { key: 'wetWipes',       descKey: 'wetWipesDesc',       icon: <WetWipesIcon />,      href: '/products/wet-wipes' },
    { key: 'cleaningTowels', descKey: 'cleaningTowelsDesc', icon: <CleaningTowelIcon />, href: '/products/cleaning-towels' },
  ];

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

  const stats = [
    { value: tStats('countriesValue'), label: tStats('countries') },
    { value: tStats('productsValue'),  label: tStats('products') },
    { value: tStats('productionValue'),label: tStats('production') },
    { value: tStats('experienceValue'),label: tStats('experience') },
  ];

  const certificates = [
    { name: 'ISO 9001',   subtitle: 'Quality Management' },
    { name: 'ISO 13485', subtitle: 'Medical Devices' },
    { name: 'CE',         subtitle: 'European Conformity' },
    { name: 'OEKO-TEX',  subtitle: 'Textile Safety' },
    { name: 'GMP',        subtitle: 'Good Manufacturing' },
    { name: 'TSE',        subtitle: 'Turkish Standards' },
  ];

  const aboutFeatures = [
    { icon: '🏭', label: tAbout('facility') },
    { icon: '🌍', label: tAbout('global') },
    { icon: '🏆', label: tAbout('quality') },
    { icon: '🤝', label: tAbout('partnership') },
  ];

  return (
    <>
      <Navbar />

      <main>

        {/* ══════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative bg-[#1B4F8A] min-h-[90vh] flex items-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#164178] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#0d2340] opacity-70 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div className="absolute inset-0 bg-hero-pattern opacity-[0.06] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — Copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-flex items-center gap-2 bg-[#F4A300] text-white text-sm font-bold px-5 py-2.5 rounded-full mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {t('badge')}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl lg:text-6xl xl:text-[4.25rem] font-black text-white leading-[1.08] mb-6"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {t('title')}<br />
                  <span className="text-[#F4A300]">{t('titleHighlight')}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-blue-200 text-lg leading-relaxed mb-10 max-w-lg"
                >
                  {t('subtitle')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    href={`/${locale}/products`}
                    className="inline-flex items-center gap-2 bg-[#F4A300] hover:bg-[#e09600] text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
                  >
                    {t('cta1')}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white/70 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl transition-all"
                  >
                    {t('cta2')}
                  </Link>
                </motion.div>

                {/* Trust marks */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-5 mt-10 pt-10 border-t border-white/20"
                >
                  {['ISO 9001', 'CE', 'GMP', 'OEKO-TEX'].map((cert) => (
                    <div key={cert} className="flex items-center gap-1.5 text-sm text-blue-200">
                      <svg className="w-4 h-4 text-[#F4A300] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {cert}
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 text-sm text-blue-200">
                    <span>🇹🇷</span>
                    <span>Made in Turkey</span>
                  </div>
                </motion.div>
              </div>

              {/* Right — Product showcase grid */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {[
                  { name: 'Baby Diapers',   icon: <BabyDiaperIcon />,    delay: 0.4 },
                  { name: 'Adult Care',      icon: <AdultDiaperIcon />,   delay: 0.5 },
                  { name: 'Wet Wipes',       icon: <WetWipesIcon />,      delay: 0.55 },
                  { name: 'Private Label',   icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  ), delay: 0.6 },
                ].map(({ name, icon, delay }) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay }}
                    className="group bg-white/10 hover:bg-white/16 backdrop-blur-sm border border-white/20 rounded-2xl p-8 flex flex-col items-center gap-4 cursor-default transition-all hover:-translate-y-1"
                  >
                    <div className="text-white">{icon}</div>
                    <p className="text-white font-semibold text-sm text-center">{name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════════════════════════ */}
        <section className="bg-[#0D2B4E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  {...fadeUp(i * 0.1)}
                  className="py-10 px-6 text-center border-r border-white/10 last:border-r-0 [&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r"
                >
                  <div
                    className="text-4xl lg:text-5xl font-black text-[#F4A300] mb-2"
                    style={{ fontFamily: 'var(--font-outfit)' }}
                  >
                    {value}
                  </div>
                  <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            ABOUT
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-28 bg-white" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — Visual panel */}
              <motion.div {...slideLeft(0)} className="relative">
                {/* Offset background */}
                <div className="absolute inset-0 bg-[#E8F0FB] rounded-3xl rotate-2 scale-[0.97]" />
                <div className="relative bg-[#1B4F8A] rounded-3xl p-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#F4A300]/10 -translate-y-1/2 translate-x-1/2" />
                  <div className="grid grid-cols-2 gap-6 relative">
                    {aboutFeatures.map(({ icon, label }) => (
                      <div key={label} className="flex items-start gap-3 bg-white/10 rounded-2xl p-5">
                        <span className="text-2xl shrink-0">{icon}</span>
                        <p className="text-blue-100 text-sm font-medium leading-snug">{label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Large accent number */}
                  <div className="mt-8 pt-8 border-t border-white/20 flex items-end gap-3">
                    <span
                      className="text-7xl font-black text-[#F4A300] leading-none"
                      style={{ fontFamily: 'var(--font-outfit)' }}
                    >
                      50+
                    </span>
                    <span className="text-blue-200 text-base pb-2 leading-tight">
                      {tStats('countries')}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right — Text */}
              <motion.div {...slideRight(0.1)}>
                <SectionBadge>{tAbout('badge')}</SectionBadge>
                <h2
                  className="text-4xl lg:text-5xl font-black text-[#1A1A2E] leading-tight mb-6"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {tAbout('title')}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  {tAbout('text1')}
                </p>
                <p className="text-gray-500 leading-relaxed mb-10">
                  {tAbout('text2')}
                </p>
                <Link
                  href={`/${locale}/corporate/about`}
                  className="inline-flex items-center gap-2 border-2 border-[#1B4F8A] text-[#1B4F8A] font-bold px-7 py-3.5 rounded-xl hover:bg-[#1B4F8A] hover:text-white transition-all"
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
            PRODUCTS
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-28 bg-gray-50" id="products">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="text-center mb-16">
              <SectionBadge>{tProducts('viewAll')}</SectionBadge>
              <h2
                className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {tProducts('title')}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">{tProducts('subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {products.map(({ key, descKey, icon, href }, i) => (
                <motion.div key={key} {...fadeUp(i * 0.05)}>
                  <Link
                    href={`/${locale}${href}`}
                    className="group flex flex-col items-center text-center bg-white border border-gray-100 hover:border-[#1B4F8A] rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1 h-full"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#E8F0FB] flex items-center justify-center text-[#1B4F8A] mb-4 group-hover:bg-[#1B4F8A] group-hover:text-white transition-all group-hover:scale-110 duration-300">
                      {icon}
                    </div>
                    <h3 className="font-bold text-[#1A1A2E] text-sm mb-1.5 group-hover:text-[#1B4F8A] transition-colors">
                      {tProducts(key as any)}
                    </h3>
                    <p className="text-gray-400 text-xs leading-snug">
                      {tProducts(descKey as any)}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeUp(0.2)} className="text-center mt-12">
              <Link
                href={`/${locale}/products`}
                className="inline-flex items-center gap-2 bg-[#1B4F8A] hover:bg-[#164178] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                {tProducts('viewAll')}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            WHY US
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-28 bg-white" id="why-us">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="text-center mb-16">
              <SectionBadge>{tWhyUs('title')}</SectionBadge>
              <h2
                className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {tWhyUs('title')}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">{tWhyUs('subtitle')}</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUsItems.map(({ key, descKey, icon }, i) => (
                <motion.div
                  key={key}
                  {...fadeUp(i * 0.1)}
                  className="group relative bg-white border border-gray-100 hover:border-[#1B4F8A]/30 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                >
                  {/* Amber corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#F4A300]/5 rounded-bl-[3rem] group-hover:bg-[#F4A300]/10 transition-colors" />

                  <div className="w-14 h-14 rounded-2xl bg-[#E8F0FB] flex items-center justify-center text-[#1B4F8A] mb-6 group-hover:bg-[#1B4F8A] group-hover:text-white transition-all relative">
                    {icon}
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-lg mb-3 group-hover:text-[#1B4F8A] transition-colors">
                    {tWhyUs(key as any)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
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
        <section className="py-28 bg-[#1B4F8A] relative overflow-hidden" id="private-label">
          <div className="absolute inset-0 bg-hero-pattern opacity-[0.07]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F4A300]/10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <motion.div {...slideLeft()} className="text-white">
                <span className="inline-block bg-[#F4A300] text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
                  {tPL('badge')}
                </span>
                <h2
                  className="text-4xl lg:text-5xl font-black mb-6 leading-tight"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  {tPL('title')}
                </h2>
                <p className="text-blue-200 text-lg mb-10 leading-relaxed">
                  {tPL('subtitle')}
                </p>
                <Link
                  href={`/${locale}/private-label`}
                  className="inline-flex items-center gap-2 bg-white text-[#1B4F8A] font-bold px-8 py-4 rounded-xl hover:bg-[#F4A300] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  {tPL('cta')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>

              <motion.div {...slideRight(0.1)} className="grid grid-cols-2 gap-4">
                {(['feature1', 'feature2', 'feature3', 'feature4'] as const).map((key, i) => (
                  <div
                    key={key}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F4A300]/20 flex items-center justify-center text-[#F4A300] mb-4">
                      {i === 0 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      )}
                      {i === 1 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                      {i === 2 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      {i === 3 && (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                    </div>
                    <p className="text-white font-semibold text-sm">{tPL(key)}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CERTIFICATES
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-gray-50" id="certificates">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp()} className="text-center mb-14">
              <SectionBadge>{tCerts('title')}</SectionBadge>
              <h2
                className="text-4xl lg:text-5xl font-black text-[#1A1A2E] mb-4"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {tCerts('title')}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">{tCerts('subtitle')}</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {certificates.map(({ name, subtitle }, i) => (
                <motion.div
                  key={name}
                  {...fadeUp(i * 0.07)}
                  className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#1B4F8A] hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-full bg-[#E8F0FB] flex items-center justify-center mb-3 group-hover:bg-[#1B4F8A] transition-colors">
                    <svg className="w-7 h-7 text-[#1B4F8A] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <p className="font-bold text-[#1B4F8A] text-base">{name}</p>
                  <p className="text-gray-400 text-xs text-center mt-1">{subtitle}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CONTACT CTA STRIP
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-[#0D2B4E]">
          <motion.div
            {...fadeIn()}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div>
              <h3
                className="text-2xl font-bold text-white mb-1"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                Hazır mısınız? / Ready to start?
              </h3>
              <p className="text-gray-400">info@softandpower.com · +90 539 631 23 92</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <a
                href="https://wa.me/905396312392"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 bg-[#F4A300] hover:bg-[#e09600] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                E-posta / Email
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
