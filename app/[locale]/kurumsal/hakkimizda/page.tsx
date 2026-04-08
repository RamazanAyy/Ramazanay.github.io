'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import CountUp from '@/components/animations/CountUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import Breadcrumb from '@/components/sections/Breadcrumb';
import Head from 'next/head';

// ─── Timeline Data ──────────────────────────────────────────────────────────

const milestones = [
  {
    year: '2010',
    title: 'Kuruluş',
    description: 'Soft & Power, İstanbul\'da hijyen ürünleri sektöründe faaliyetlerine başladı.',
  },
  {
    year: '2015',
    title: 'İlk İhracat',
    description: 'Avrupa ve Orta Doğu pazarlarına ilk ihracatımızı gerçekleştirdik.',
  },
  {
    year: '2020',
    title: 'Kapasite Artışı',
    description: 'Modern üretim tesislerimizi genişleterek kapasitemizi 3 katına çıkardık.',
  },
  {
    year: '2024',
    title: '20+ Ülkeye İhracat',
    description: '20\'den fazla ülkeye ihracat yapan global bir marka haline geldik.',
  },
];

const certificates = [
  { name: 'ISO 9001', subtitle: 'Kalite Yönetim Sistemi' },
  { name: 'CE', subtitle: 'Avrupa Uygunluk' },
  { name: 'GMP', subtitle: 'İyi Üretim Uygulamaları' },
  { name: 'ISO 13485', subtitle: 'Medikal Cihazlar' },
];

const stats = [
  { target: 500, suffix: '+', label: 'Ürün' },
  { target: 20, suffix: '+', label: 'Ülke' },
  { target: 15, suffix: '', label: 'Yıl Tecrübe' },
];

// ─── JSON-LD ────────────────────────────────────────────────────────────────

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Soft & Power Hygiene',
  url: 'https://softandpower.com',
  logo: 'https://softandpower.com/logo-wide.png',
  description: 'Türkiye merkezli hijyen ürünleri üreticisi. Bebek bezi, yetişkin bezi, ıslak mendil ve özel etiket üretimi.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'İstanbul',
    addressCountry: 'TR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+90-539-631-23-92',
    contactType: 'customer service',
    email: 'info@softandpower.com',
  },
  sameAs: [
    'https://www.instagram.com/softandpowertr',
    'https://www.linkedin.com/company/softandpower',
    'https://www.facebook.com/people/Softpower/61579102840493/',
  ],
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HakkimizdaPage() {
  return (
    <>
      <head>
        <title>Hakkımızda | Soft & Power Hygiene</title>
        <meta name="description" content="Soft & Power Hygiene hakkında bilgi edinin. 15 yılı aşkın tecrübe, 500+ ürün çeşidi ve 20+ ülkeye ihracat." />
        <meta name="keywords" content="Soft & Power, hijyen ürünleri, bebek bezi üreticisi, Türkiye, hakkımızda" />
        <meta property="og:title" content="Hakkımızda | Soft & Power Hygiene" />
        <meta property="og:description" content="Türkiye'nin lider hijyen ürünleri üreticisi Soft & Power hakkında." />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>

      <Navbar />

      <main className="bg-[#f4f7fb] min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0d2d5e] to-[#1a5fa8] py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00b4c8]/10 translate-x-1/2 -translate-y-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInUp>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
                Kurumsal
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                Hakkımızda
              </h1>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
                Hijyen sektöründe güvenilir çözüm ortağınız. Kalite, yenilik ve müşteri memnuniyeti odaklı üretim anlayışımızla fark yaratıyoruz.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Kurumsal', href: '#' },
            { label: 'Hakkımızda' },
          ]} />
        </div>

        {/* Company Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  Hikayemiz
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e] mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Yolculuğumuz
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  2010 yılından bu yana hijyen sektöründe kaliteyi ve yeniliği bir arada sunuyoruz.
                </p>
              </div>
            </FadeInUp>

            {/* Vertical Timeline */}
            <div className="relative max-w-3xl mx-auto">
              {/* Center line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#1a5fa8] via-[#00b4c8] to-[#1a5fa8] hidden md:block" />
              <div className="absolute left-6 w-0.5 h-full bg-gradient-to-b from-[#1a5fa8] via-[#00b4c8] to-[#1a5fa8] md:hidden" />

              <div className="space-y-12">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className={`relative flex items-center gap-6 ${
                      i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-row`}
                  >
                    {/* Content card */}
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left pl-16 md:pl-0`}>
                      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                        <span className="text-[#00b4c8] font-bold text-sm">{milestone.year}</span>
                        <h3 className="text-xl font-bold text-[#0d2d5e] mt-1 mb-2">{milestone.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Circle dot */}
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a5fa8] rounded-full border-4 border-white shadow-md z-10" />

                    {/* Spacer for the other side */}
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  Vizyon & Misyon
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Değerlerimiz
                </h2>
              </div>
            </FadeInUp>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <FadeInUp delay={0.1}>
                <div className="relative bg-gradient-to-br from-[#1a5fa8] to-[#0d2d5e] rounded-2xl p-8 lg:p-10 text-white overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-white/5" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Vizyonumuz</h3>
                    <p className="text-blue-100 leading-relaxed">
                      Hijyen sektöründe global bir marka olarak, yenilikci ürünlerimizle dünya genelinde insanların yaşam kalitesini artırmak ve sektörün referans noktası olmak.
                    </p>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <div className="relative bg-gradient-to-br from-[#00b4c8] to-[#0097a7] rounded-2xl p-8 lg:p-10 text-white overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-white/5" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Misyonumuz</h3>
                    <p className="text-cyan-100 leading-relaxed">
                      En yüksek kalite standartlarında, çevre dostu ve yenilikci hijyen ürünleri üreterek, iş ortaklarımıza ve tüketicilere güvenilir çözümler sunmak.
                    </p>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Animated Counters */}
        <section className="py-20 bg-gradient-to-r from-[#0d2d5e] to-[#1a5fa8] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="text-5xl lg:text-6xl font-black text-white mb-2" style={{ fontFamily: 'var(--font-outfit)' }}>
                      <CountUp target={stat.target} suffix={stat.suffix} />
                    </div>
                    <p className="text-blue-200 text-lg font-medium">{stat.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Certificate Badges */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  Kalite Belgeleri
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Sertifikalarımız
                </h2>
              </div>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {certificates.map((cert) => (
                <StaggerItem key={cert.name}>
                  <div className="group flex flex-col items-center justify-center p-8 bg-[#f4f7fb] rounded-2xl border border-gray-100 hover:border-[#1a5fa8] hover:shadow-lg transition-all">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 group-hover:bg-[#1a5fa8] transition-colors shadow-sm">
                      <svg className="w-8 h-8 text-[#1a5fa8] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <p className="font-bold text-[#1a5fa8] text-lg">{cert.name}</p>
                    <p className="text-gray-400 text-xs text-center mt-1">{cert.subtitle}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
