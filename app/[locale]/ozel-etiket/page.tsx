'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import Breadcrumb from '@/components/sections/Breadcrumb';

const PackageEditor = dynamic(
  () => import('@/components/package-editor/PackageEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl h-[560px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <span className="text-sm">Tasarım araçı yükleniyor...</span>
        </div>
      </div>
    ),
  }
);


// ─── Data ───────────────────────────────────────────────────────────────────

// processSteps moved into component to access translations

const minOrderTable = [
  { category: 'Bebek Bezi', minQty: '50.000 adet', delivery: '15-20 gün' },
  { category: 'Yetişkin Bezi', minQty: '30.000 adet', delivery: '15-20 gün' },
  { category: 'Islak Mendil', minQty: '20.000 paket', delivery: '10-15 gün' },
  { category: 'Hijyenik Ped', minQty: '50.000 adet', delivery: '15-20 gün' },
  { category: 'Alt Açma Örtüsü', minQty: '20.000 adet', delivery: '10-15 gün' },
];

const ADV_ICONS = [
  <svg key="1" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  <svg key="2" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  <svg key="3" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="4" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
];

const productInterests = [
  'Bebek Bezi',
  'Yetişkin Bezi',
  'Yetişkin Hasta Bezi (Pants)',
  'Hijyenik Ped',
  'Islak Mendil',
  'Alt Açma Örtüsü',
  'Temizlik Havlusu',
  'Diğer',
];

// ─── JSON-LD ────────────────────────────────────────────────────────────────

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Özel Etiket Hijyen Ürünleri Üretimi',
  provider: {
    '@type': 'Organization',
    name: 'Soft & Power Hygiene',
    url: 'https://softandpower.com',
  },
  description: 'Kendi markanızla hijyen ürünleri üretimi. Bebek bezi, yetişkin bezi, ıslak mendil ve daha fazlası için özel etiket (private label) hizmeti.',
  areaServed: 'Worldwide',
  serviceType: 'Private Label Manufacturing',
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function OzelEtiketPage() {
  const t = useTranslations('privateLabelPage');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    productInterest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'ozel-etiket', locale, ...formData }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Gönderim başarısız');
      setStatus('success');
      setFormData({ company: '', name: '', email: '', phone: '', productInterest: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  const processSteps = [
    { step: 1, title: t('step1Title'), description: t('step1Desc') },
    { step: 2, title: t('step2Title'), description: t('step2Desc') },
    { step: 3, title: t('step3Title'), description: t('step3Desc') },
    { step: 4, title: t('step4Title'), description: t('step4Desc') },
  ];

  const advantages = [
    { title: t('adv1Title'), description: t('adv1Desc'), icon: ADV_ICONS[0] },
    { title: t('adv2Title'), description: t('adv2Desc'), icon: ADV_ICONS[1] },
    { title: t('adv3Title'), description: t('adv3Desc'), icon: ADV_ICONS[2] },
    { title: t('adv4Title'), description: t('adv4Desc'), icon: ADV_ICONS[3] },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Navbar />

      <main className="bg-[#f4f7fb] min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0d2d5e] via-[#1a5fa8] to-[#00b4c8] py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/5 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#00b4c8]/20 -translate-x-1/2 translate-y-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInUp>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
                {t('heroBadge')}
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                {t('heroTitle')}
              </h1>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
                {t('heroSubtitle')}
              </p>
              <a
                href="#request-form"
                className="inline-flex items-center gap-2 bg-white text-[#1a5fa8] font-bold px-8 py-4 rounded-xl hover:bg-[#f4f7fb] transition-all hover:scale-105 active:scale-95 shadow-lg"
              >
                {tCommon('getQuote')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </FadeInUp>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: t('breadcrumb') }]} />
        </div>

        {/* 5-Step Process */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  {t('stepsBadge')}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {t('stepsTitle')}
                </h2>
              </div>
            </FadeInUp>

            <div className="relative max-w-4xl mx-auto">
              {/* Connector line */}
              <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#1a5fa8] via-[#00b4c8] to-[#1a5fa8]" />

              <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
                {processSteps.map((step) => (
                  <StaggerItem key={step.step}>
                    <div className="flex flex-col items-center text-center">
                      {/* Numbered circle */}
                      <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#1a5fa8] to-[#00b4c8] flex items-center justify-center text-white font-black text-xl shadow-lg mb-4">
                        {step.step}
                      </div>
                      <h3 className="font-bold text-[#0d2d5e] mb-1">{step.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* ── Paket Tasarım Editörü ── */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  Tasarım Araçı
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e] mb-3" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Paketinizi Tasarlayın
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                  Ürün seçin, renk ve logonuzu ekleyin, metin ve şekil çizin. Tasarımınızı PNG olarak indirin veya hemen teklif alın.
                </p>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <PackageEditor />
            </FadeInUp>
          </div>
        </section>

        {/* Min Order Table */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  Sipariş Bilgileri
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  Minimum Sipariş Miktarları
                </h2>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <div className="max-w-3xl mx-auto overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#0d2d5e] text-white">
                        <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Min. Sipariş</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">Teslimat Süresi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {minOrderTable.map((row, i) => (
                        <tr
                          key={row.category}
                          className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#f4f7fb]'} hover:bg-[#1a5fa8]/5 transition-colors`}
                        >
                          <td className="px-6 py-4 text-sm font-medium text-[#0d2d5e]">{row.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{row.minQty}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{row.delivery}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-14">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  {t('advantagesBadge')}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {t('advantagesTitle')}
                </h2>
              </div>
            </FadeInUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {advantages.map((adv) => (
                <StaggerItem key={adv.title}>
                  <div className="group bg-white rounded-2xl p-7 border border-gray-100 hover:border-[#1a5fa8]/30 hover:shadow-xl transition-all hover:-translate-y-1 h-full">
                    <div className="w-14 h-14 rounded-2xl bg-[#f4f7fb] flex items-center justify-center text-[#1a5fa8] mb-5 group-hover:bg-[#1a5fa8] group-hover:text-white transition-all">
                      {adv.icon}
                    </div>
                    <h3 className="font-bold text-[#0d2d5e] text-lg mb-2">{adv.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{adv.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Request Form */}
        <section id="request-form" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <FadeInUp>
                <div className="text-center mb-12">
                  <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                    {tCommon('quoteForm')}
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e] mb-4" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {t('ctaTitle')}
                  </h2>
                  <p className="text-gray-500">{t('ctaSubtitle')}</p>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <form onSubmit={handleSubmit} className="bg-[#f4f7fb] rounded-2xl p-8 lg:p-10 border border-gray-100">
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">Firma Adı *</label>
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
                      <label htmlFor="productInterest" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">İlgilenilen Ürün *</label>
                      <select
                        id="productInterest"
                        name="productInterest"
                        required
                        value={formData.productInterest}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                      >
                        <option value="">Ürün seçin...</option>
                        {productInterests.map((interest) => (
                          <option key={interest} value={interest}>{interest}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">Mesaj</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm resize-none"
                        placeholder="Ürün detayları, tahmini miktar, özel istekler..."
                      />
                    </div>
                    {status === 'success' && (
                      <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                        ✅ Talebiniz alındı. En kısa sürede size dönüş yapılacaktır.
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        ⚠ {errorMsg || 'Bir hata oluştu, lütfen tekrar deneyin.'}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-gradient-to-r from-[#1a5fa8] to-[#00b4c8] text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#1a5fa8]/25 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      {status === 'sending' ? tCommon('loading') : tCommon('getQuote')}
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
