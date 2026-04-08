'use client';

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
    <span className="inline-flex items-center gap-2 bg-[#00BAD1]/10 text-[#00BAD1] border border-[#00BAD1]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
      {children}
    </span>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const tWhyUs = useTranslations('whyUs');
  const tPL = useTranslations('privateLabelSection');
  const tCerts = useTranslations('certificates');
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
    { name: 'ISO 9001',   subtitle: 'Quality Management' },
    { name: 'ISO 13485', subtitle: 'Medical Devices' },
    { name: 'CE',         subtitle: 'European Conformity' },
    { name: 'OEKO-TEX',  subtitle: 'Textile Safety' },
    { name: 'GMP',        subtitle: 'Good Manufacturing' },
    { name: 'TSE',        subtitle: 'Turkish Standards' },
  ];


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
        <section className="py-12 lg:py-28 bg-white" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

              {/* Left — VEFA Logo card */}
              <motion.div {...slideLeft(0)} className="flex flex-col items-center order-1 w-full">
                {/* Modern Logo Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-[220px] sm:max-w-sm lg:max-w-lg mx-auto mb-5">
                  {/* Glow border */}
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#00BAD1]/50 via-[#1B4F8A]/30 to-[#00BAD1]/20 z-0" />
                  <div className="relative z-10 rounded-3xl overflow-hidden">
                    <Image
                      src="/vefa-logo.png"
                      alt="Vefa Global Logo"
                      width={700}
                      height={400}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>

                <div className="w-full max-w-sm lg:max-w-lg">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { val: '50+', label: 'İhracat Ülkesi' },
                      { val: '10+', label: 'Ürün Çeşidi' },
                      { val: '10+', label: 'Yıl Deneyim' },
                    ].map(({ val, label }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                        className="relative text-center bg-gradient-to-b from-[#1B4F8A] to-[#0f3a6e] rounded-2xl py-5 px-3 shadow-lg border border-[#1B4F8A]/60 overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-[#00BAD1]/0 group-hover:bg-[#00BAD1]/5 transition-colors duration-300" />
                        <div
                          className="text-2xl font-black text-[#00BAD1] leading-none mb-1.5"
                          style={{ fontFamily: 'var(--font-outfit)' }}
                        >
                          {val}
                        </div>
                        <p className="text-blue-200/80 text-xs font-medium leading-tight">{label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Right — Text */}
              <motion.div {...slideRight(0.1)} className="order-2">
                <SectionBadge>Vefa Global</SectionBadge>
                <h2
                  className="text-3xl lg:text-4xl xl:text-5xl font-black text-[#1A1A2E] leading-tight mb-6"
                  style={{ fontFamily: 'var(--font-outfit)' }}
                >
                  Hakkımızda
                </h2>

                <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
                  <p>
                    <strong className="text-[#1A1A2E]">VEFA ULUSLARARASI TOPTAN GIDA PAZARLAMA SAN. VE TİC. LTD. ŞTİ.</strong> olarak biz şuna inanıyoruz: gerçek özen basit ama önemli şeylerden başlar. Bu nedenle, insanların her gün kendilerini rahat, özgüvenli ve güvende hissetmelerine yardımcı olan hijyen ürünleri üretiyoruz.
                  </p>
                  <p>
                    Geniş bir kişisel hijyen ürün yelpazesi üretiyoruz. Tüm ürünlerimiz, yaşamın farklı dönemlerinde hijyenin ne kadar önemli olduğunu bilerek ve ayrıntılara özen gösterilerek geliştirilmektedir.
                  </p>
                  <p>
                    Modern teknolojileri, sıkı kalite kontrolünü ve sıcak bir insani yaklaşımı bir araya getiriyoruz. Bizim için önemli olan sadece üretim yapmak değil, aynı zamanda birilerinin bakımının güvenilir bir parçası olmaktır — ister aile, ister çocuk, ister yetişkin ya da yaşlı bir birey olsun.
                  </p>
                  <p className="text-[#1B4F8A] font-medium italic border-l-4 border-[#00BAD1] pl-4">
                    Soft &amp; Power sadece bir ürün değil. Bu, ortaklık, güven ve milyonlarca insanın rahatlığı için verilen günlük bir çabadır. Müşterilerimizle birlikte büyüyoruz ve herkesin yüksek kaliteli ve erişilebilir kişisel hijyen çözümlerine layık olduğuna inanıyoruz.
                  </p>
                </div>

                <Link
                  href={`/${locale}/corporate/about`}
                  className="inline-flex items-center gap-2 border-2 border-[#1B4F8A] text-[#1B4F8A] font-bold px-7 py-3.5 rounded-xl hover:bg-[#1B4F8A] hover:text-white transition-all"
                >
                  Daha Fazla Bilgi
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
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-[#00BAD1]/5 rounded-bl-[3rem] group-hover:bg-[#00BAD1]/10 transition-colors" />

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
        <section className="py-28 bg-[#0D2B4E] relative overflow-hidden" id="private-label">
          <div className="absolute inset-0 bg-hero-pattern opacity-[0.07]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00BAD1]/10 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <motion.div {...slideLeft()} className="text-white">
                <span className="inline-block bg-[#00BAD1] text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
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
                  className="inline-flex items-center gap-2 bg-white text-[#1B4F8A] font-bold px-8 py-4 rounded-xl hover:bg-[#00BAD1] hover:text-white transition-all hover:scale-105 active:scale-95 shadow-lg"
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
                    <div className="w-10 h-10 rounded-xl bg-[#00BAD1]/20 flex items-center justify-center text-[#00BAD1] mb-4">
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
                className="inline-flex items-center gap-2 bg-[#00BAD1] hover:bg-[#009db5] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:scale-105"
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
