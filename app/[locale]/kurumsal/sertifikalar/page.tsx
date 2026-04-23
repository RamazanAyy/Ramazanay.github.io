'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import Breadcrumb from '@/components/sections/Breadcrumb';

const certificates = [
  {
    title: 'GHP',
    subtitle: 'Good Hygiene Practices',
    issuer: 'SQS International Certification',
    image: '/images/certificates/ghp.png',
  },
  {
    title: 'GMP',
    subtitle: 'Good Manufacture Practices',
    issuer: 'SQR — Sigmacert',
    image: '/images/certificates/gmp.png',
  },
  {
    title: 'CE',
    subtitle: 'Attestation of Conformity (93/42/EEC)',
    issuer: 'DCS Certification',
    image: '/images/certificates/ce.png',
  },
  {
    title: 'ISO 13485:2016',
    subtitle: 'Medical Devices — Quality Management',
    issuer: 'IQR International',
    image: '/images/certificates/iso-13485.png',
  },
  {
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management System',
    issuer: 'SQR — Sigmacert',
    image: '/images/certificates/iso-9001.png',
  },
];

export default function SertifikalarPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Prevent background scroll when lightbox open + keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') setLightbox((p) => p === null ? 0 : (p - 1 + certificates.length) % certificates.length);
      if (e.key === 'ArrowRight') setLightbox((p) => p === null ? 0 : (p + 1) % certificates.length);
    };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handler);
    };
  }, [lightbox]);

  return (
    <>
      <Navbar />

      <main className="bg-[#f4f7fb] min-h-screen pt-14 md:pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Kurumsal' },
            { label: 'Sertifikalar' },
          ]} />
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2d5e] via-[#143d75] to-[#1a5fa8] text-white">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#00b4c8]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-center">
            <FadeInUp>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-sm border border-white/15">
                Kalite Belgeleri
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                Sertifikalarımız
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                Uluslararası standartlara uygun üretim süreçlerimiz, bağımsız denetim kuruluşları tarafından belgelendirilmiştir.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Certificate Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 lg:gap-6">
            {certificates.map((cert, i) => (
              <FadeInUp key={cert.title} delay={i * 0.05}>
                <button
                  onClick={() => setLightbox(i)}
                  aria-label={`${cert.title} sertifikasını büyüt`}
                  className="group relative w-full bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#00b4c8]/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden text-left"
                >
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-[#f0f7ff] to-[#e8f4fd] overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} sertifikası`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 18vw"
                      className="object-contain p-2 sm:p-3 group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                      <svg className="w-3.5 h-3.5 text-[#1a5fa8]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6M18 11a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 border-t border-gray-100">
                    <p className="text-[#0d2d5e] font-bold text-xs sm:text-sm truncate">
                      {cert.title}
                    </p>
                    <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 line-clamp-2">
                      {cert.subtitle}
                    </p>
                  </div>
                </button>
              </FadeInUp>
            ))}
          </div>
        </section>

        {/* Trust Banner */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="bg-gradient-to-r from-[#0d2d5e] to-[#1a5fa8] rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-14 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#00b4c8]/10 translate-x-1/3 -translate-y-1/3" />
                <div className="relative">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Kalite Güvencesi
                  </h3>
                  <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                    Tüm ürünlerimiz uluslararası standartlara uygun olarak üretilmekte ve düzenli olarak bağımsız laboratuvarlarda test edilmektedir. Müşterilerimize her zaman en yüksek kaliteyi sunmayı taahhüt ediyoruz.
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightbox(null)}
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
                  src={certificates[lightbox].image}
                  alt={certificates[lightbox].title}
                  width={1200}
                  height={1600}
                  className="w-auto max-h-[75vh] object-contain rounded-lg bg-white"
                />
              </div>
              <div className="text-center mt-3 sm:mt-4 text-white">
                <p className="font-bold text-sm sm:text-lg">{certificates[lightbox].title}</p>
                <p className="text-xs sm:text-sm text-white/70 mt-0.5">{certificates[lightbox].subtitle}</p>
                <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">{certificates[lightbox].issuer}</p>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? 0 : (p - 1 + certificates.length) % certificates.length); }}
                aria-label="Önceki"
                className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox((p) => p === null ? 0 : (p + 1) % certificates.length); }}
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
      </main>

      <Footer />
    </>
  );
}
