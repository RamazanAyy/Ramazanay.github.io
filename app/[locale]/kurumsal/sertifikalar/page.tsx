'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import Breadcrumb from '@/components/sections/Breadcrumb';

// ─── Certificate Data ───────────────────────────────────────────────────────

const certificates = [
  {
    name: 'ISO 9001',
    subtitle: 'Kalite Yönetim Sistemi',
    description: 'Uluslararası kalite yönetim standartlarına uygunluğumuzu belgeleyen sertifikamız. Tüm süreçlerimiz bu standartlara göre denetlenmektedir.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    name: 'CE',
    subtitle: 'Avrupa Uygunluk Belgesi',
    description: 'Ürünlerimizin Avrupa Birliği sağlık, güvenlik ve çevre koruma standartlarına uygunluğunu gösteren CE işareti.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: 'GMP',
    subtitle: 'İyi Üretim Uygulamaları',
    description: 'Good Manufacturing Practice standartları kapsamında hijyenik ve güvenli üretim süreçlerimizin belgelendirilmesi.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: 'ISO 13485',
    subtitle: 'Medikal Cihaz Kalite Yönetimi',
    description: 'Medikal cihaz ve hijyen ürünleri üretiminde uluslararası kalite yönetim standartlarına uygunluk belgesi.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function SertifikalarPage() {
  return (
    <>
      <head>
        <title>Sertifikalar | Soft & Power Hygiene</title>
        <meta name="description" content="Soft & Power Hygiene kalite sertifikaları: ISO 9001, CE, GMP, ISO 13485. Uluslararası standartlarda üretim." />
        <meta name="keywords" content="ISO 9001, CE belgesi, GMP, ISO 13485, hijyen ürünleri sertifika, kalite belgesi" />
        <meta property="og:title" content="Sertifikalar | Soft & Power Hygiene" />
        <meta property="og:description" content="Uluslararası kalite standartlarına sahip sertifikalarımız." />
      </head>

      <Navbar />

      <main className="bg-[#f4f7fb] min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0d2d5e] to-[#1a5fa8] py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00b4c8]/10 -translate-x-1/2 translate-y-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInUp>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
                Kalite Belgeleri
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                Sertifikalarımız
              </h1>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
                Uluslararası standartlara uygun üretim süreçlerimiz, bağımsız denetim kuruluşları tarafından belgelendirilmiştir.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Kurumsal', href: '#' },
            { label: 'Sertifikalar' },
          ]} />
        </div>

        {/* Certificate Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {certificates.map((cert) => (
                <StaggerItem key={cert.name}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#1a5fa8]/30 hover:shadow-xl transition-shadow h-full"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-[#f4f7fb] flex items-center justify-center text-[#1a5fa8] flex-shrink-0">
                        {cert.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#0d2d5e] mb-1">{cert.name}</h3>
                        <p className="text-[#00b4c8] text-sm font-medium mb-3">{cert.subtitle}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">{cert.description}</p>
                        <button
                          className="inline-flex items-center gap-2 bg-[#f4f7fb] hover:bg-[#1a5fa8] text-[#1a5fa8] hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          PDF İndir
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Trust Banner */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="bg-gradient-to-r from-[#0d2d5e] to-[#1a5fa8] rounded-2xl p-10 lg:p-14 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#00b4c8]/10 translate-x-1/3 -translate-y-1/3" />
                <div className="relative">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Kalite Güvencesi
                  </h3>
                  <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed">
                    Tüm ürünlerimiz uluslararası standartlara uygun olarak üretilmekte ve düzenli olarak bağımsız laboratuvarlarda test edilmektedir. Müşterilerimize her zaman en yüksek kaliteyi sunmayı taahhüt ediyoruz.
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
