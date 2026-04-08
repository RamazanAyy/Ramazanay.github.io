'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import Breadcrumb from '@/components/sections/Breadcrumb';

// ─── Export Countries ───────────────────────────────────────────────────────

const exportCountries = [
  { name: 'Almanya', flag: '🇩🇪', region: 'Avrupa' },
  { name: 'Hollanda', flag: '🇳🇱', region: 'Avrupa' },
  { name: 'Arnavutluk', flag: '🇦🇱', region: 'Avrupa' },
  { name: 'Kosova', flag: '🇽🇰', region: 'Avrupa' },
  { name: 'Suudi Arabistan', flag: '🇸🇦', region: 'Orta Doğu' },
  { name: 'Katar', flag: '🇶🇦', region: 'Orta Doğu' },
  { name: 'Irak', flag: '🇮🇶', region: 'Orta Doğu' },
  { name: 'Azerbaycan', flag: '🇦🇿', region: 'Türk Cumhuriyetleri' },
  { name: 'Gürcistan', flag: '🇬🇪', region: 'Kafkasya' },
  { name: 'Libya', flag: '🇱🇾', region: 'Afrika' },
  { name: 'Senegal', flag: '🇸🇳', region: 'Afrika' },
  { name: 'Kamerun', flag: '🇨🇲', region: 'Afrika' },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export default function IhracatPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - no backend
    alert('Talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.');
  };

  return (
    <>
      <head>
        <title>İhracat | Soft & Power Hygiene</title>
        <meta name="description" content="Soft & Power Hygiene 20'den fazla ülkeye hijyen ürünleri ihraç etmektedir. B2B ihracat ve toptan sipariş için bizimle iletişime geçin." />
        <meta name="keywords" content="hijyen ürünleri ihracat, bebek bezi ihracat, Türkiye ihracat, B2B hijyen" />
        <meta property="og:title" content="İhracat | Soft & Power Hygiene" />
        <meta property="og:description" content="20+ ülkeye hijyen ürünleri ihracatı. B2B iş birliği fırsatları." />
      </head>

      <Navbar />

      <main className="bg-[#f4f7fb] min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0d2d5e] to-[#1a5fa8] py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#00b4c8]/10 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <FadeInUp>
                <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
                  Global Pazarlar
                </span>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                  İhracat
                </h1>
                <p className="text-blue-200 text-lg leading-relaxed mb-8">
                  Türkiye&apos;den dünyaya hijyen ürünleri ihraç ediyoruz. 20&apos;den fazla ülkede güvenilir iş ortaklarımızla birlikte, kaliteli ve rekabetçi ürünlerimizi global pazarlara ulaştırıyoruz.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-center">
                    <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-outfit)' }}>20+</div>
                    <div className="text-blue-200 text-sm">Ülke</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-center">
                    <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-outfit)' }}>4</div>
                    <div className="text-blue-200 text-sm">Kıta</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-center">
                    <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-outfit)' }}>500+</div>
                    <div className="text-blue-200 text-sm">Ürün Çeşidi</div>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-64 h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                    <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {/* Floating dots for countries */}
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                      <motion.div
                        key={deg}
                        className="absolute w-3 h-3 bg-[#00b4c8] rounded-full"
                        style={{
                          top: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
                          left: `${50 + 42 * Math.cos((deg * Math.PI) / 180)}%`,
                        }}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { label: 'Kurumsal', href: '#' },
            { label: 'İhracat' },
          ]} />
        </div>

        {/* Export Countries */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  İhracat Ağımız
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  İhracat Yaptığımız Ülkeler
                </h2>
              </div>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {exportCountries.map((country) => (
                <StaggerItem key={country.name}>
                  <div className="bg-white rounded-xl p-5 border border-gray-100 hover:border-[#1a5fa8]/30 hover:shadow-md transition-all flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <p className="font-semibold text-[#0d2d5e] text-sm">{country.name}</p>
                      <p className="text-gray-400 text-xs">{country.region}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* B2B Quote Form */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <FadeInUp>
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  B2B İş Birliği
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e] mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Teklif Alın
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  İhracat ve toptan sipariş talepleriniz için formu doldurun. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
                <div className="space-y-4">
                  {[
                    { text: 'Rekabetçi FOB/CIF fiyatları', icon: '💰' },
                    { text: 'Özel etiket ve OEM üretim', icon: '🏷️' },
                    { text: 'Minimum sipariş miktarı esnekliği', icon: '📦' },
                    { text: 'Dünya genelinde lojistik destek', icon: '🌍' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-gray-600">{item.text}</span>
                    </div>
                  ))}
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <form onSubmit={handleSubmit} className="bg-[#f4f7fb] rounded-2xl p-8 border border-gray-100">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">Ad Soyad *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">Firma *</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                        placeholder="Firma Adı"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">E-posta *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                          placeholder="ornek@firma.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">Telefon</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                          placeholder="+90 5XX XXX XX XX"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">Mesaj *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm resize-none"
                        placeholder="Ürün taleplerinizi ve sipariş detaylarınızı yazın..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#1a5fa8] to-[#00b4c8] text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#1a5fa8]/25 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Teklif Talebi Gönder
                    </button>
                  </div>
                </form>
              </FadeInUp>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
