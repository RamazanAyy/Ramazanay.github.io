'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import Breadcrumb from '@/components/sections/Breadcrumb';

const ICON_ADDRESS = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const ICON_PHONE = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const ICON_EMAIL = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const ICON_CLOCK = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ─── JSON-LD ────────────────────────────────────────────────────────────────

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Soft & Power Hygiene',
  url: 'https://softandpower.com',
  logo: 'https://softandpower.com/logo-wide.png',
  description: 'Hijyen ürünleri üreticisi - Bebek bezi, yetişkin bezi, ıslak mendil, özel etiket üretimi.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Çamlık Mah, Selçuklu Cd. No: 24/148, Kurtköy',
    addressLocality: 'Pendik',
    addressRegion: 'İstanbul',
    postalCode: '34912',
    addressCountry: 'TR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 40.9231835, longitude: 29.2904611 },
  telephone: '+90-539-631-23-92',
  email: 'info@softandpower.com',
  openingHours: 'Mo-Fr 09:00-18:00',
  sameAs: [
    'https://www.instagram.com/softandpowertr',
    'https://www.linkedin.com/company/softandpower',
  ],
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function IletisimPage() {
  const t = useTranslations('contactPage');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
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
        body: JSON.stringify({ source: 'iletisim', locale, ...formData }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gönderim başarısız');
      }
      setStatus('success');
      setFormData({ name: '', company: '', phone: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Bir hata oluştu');
    }
  };

  const COMPANY_ADDRESS = 'Çamlık Mah, Selçuklu Cd. No: 24/148, 34912 Pendik/İstanbul';
  const MAPS_URL = 'https://www.google.com/maps/place/Vefa+Global,+%C3%87aml%C4%B1k+Mah,+Kurtk%C3%B6y,+Sel%C3%A7uklu+Cd.+No:+24%2F148,+34912+Pendik%2F%C4%B0stanbul/@40.9231835,29.2904611,17z';

  const contactInfo = [
    { title: t('addressLabel'), value: COMPANY_ADDRESS, href: MAPS_URL, icon: ICON_ADDRESS },
    { title: t('phoneLabel'), value: '+90 539 631 23 92', href: 'tel:+905396312392', icon: ICON_PHONE },
    { title: t('emailLabel'), value: 'info@softandpower.com', href: 'mailto:info@softandpower.com', icon: ICON_EMAIL },
    { title: t('workingHoursLabel'), value: t('workingHoursValue'), icon: ICON_CLOCK },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <Navbar />

      <main className="bg-[#f4f7fb] min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0d2d5e] to-[#1a5fa8] py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00b4c8]/10 translate-x-1/2 -translate-y-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeInUp>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6">
                {t('heroBadge')}
              </span>
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                {t('heroTitle')}
              </h1>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
                {t('heroSubtitle')}
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: t('breadcrumb') }]} />
        </div>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {contactInfo.map((info) => (
                <StaggerItem key={info.title}>
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1a5fa8]/30 hover:shadow-md transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-[#f4f7fb] flex items-center justify-center text-[#1a5fa8] mb-4">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold text-[#0d2d5e] text-sm mb-1">{info.title}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        {...(info.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-[#1a5fa8] font-medium hover:text-[#00b4c8] transition-colors text-sm break-words"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 text-sm">{info.value}</p>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Form + Map */}
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Contact Form */}
              <FadeInUp>
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm">
                  <h2 className="text-2xl font-bold text-[#0d2d5e] mb-6" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {t('formTitle')}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">{t('fieldName')} *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f4f7fb] focus:bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                          placeholder={t('phName')}
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">Firma</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f4f7fb] focus:bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                          placeholder="Soft & Power"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">{t('fieldPhone')} *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f4f7fb] focus:bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                          placeholder={t('phPhone')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">{t('fieldEmail')} *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f4f7fb] focus:bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                          placeholder={t('phEmail')}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">{t('fieldSubject')} *</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f4f7fb] focus:bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm"
                        placeholder={t('phSubject')}
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[#0d2d5e] mb-1.5">{t('fieldMessage')} *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#f4f7fb] focus:bg-white focus:border-[#1a5fa8] focus:ring-2 focus:ring-[#1a5fa8]/20 outline-none transition-all text-sm resize-none"
                        placeholder={t('phMessage')}
                      />
                    </div>
                    {status === 'success' && (
                      <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
                        ✅ {t('submitSuccess')}
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
                      {status === 'sending' ? tCommon('loading') : t('submitBtn')}
                    </button>
                  </form>
                </div>
              </FadeInUp>

              {/* Map Embed + WhatsApp */}
              <FadeInUp delay={0.2}>
                <div className="space-y-6">
                  {/* Google Maps Embed */}
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <iframe
                      title="Soft & Power Konum"
                      src="https://maps.google.com/maps?q=40.9231835,29.2904611&hl=tr&z=16&output=embed"
                      className="w-full h-[320px] lg:h-[380px] border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-[#1a5fa8] hover:bg-[#f4f7fb] border-t border-gray-100 transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Google Maps&apos;te Aç
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/905396312392"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-[#25D366]/25"
                  >
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-lg">{t('whatsappLabel')}</p>
                      <p className="text-white/80 text-sm">{tCommon('askWhatsapp')}</p>
                    </div>
                    <svg className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </FadeInUp>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
