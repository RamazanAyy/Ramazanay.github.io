'use client';

import { useTranslations } from 'next-intl';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FadeInUp from '@/components/animations/FadeInUp';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import Breadcrumb from '@/components/sections/Breadcrumb';

const stepIcons = [
  // Raw material
  <svg key="1" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  // Production line
  <svg key="2" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  // Quality control
  <svg key="3" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Packaging
  <svg key="4" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
  // Shipment
  <svg key="5" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
];

export default function UretimPage() {
  const t = useTranslations('productionPage');
  const tNav = useTranslations('nav');

  const productionSteps = [1, 2, 3, 4, 5].map((n, i) => ({
    step: n,
    title: t(`step${n}Title` as any),
    description: t(`step${n}Desc` as any),
    icon: stepIcons[i],
  }));

  const qualityPhases = [1, 2, 3, 4].map((n) => ({
    title: t(`qc${n}Title` as any),
    description: t(`qc${n}Desc` as any),
  }));

  const capacityCards = [
    { title: t('cap1Title'), value: '2M+', description: t('cap1Desc'), icon: '⚡' },
    { title: t('cap2Title'), value: '15.000 m²', description: t('cap2Desc'), icon: '🏭' },
    { title: t('cap3Title'), value: '12+', description: t('cap3Desc'), icon: '🔧' },
    { title: t('cap4Title'), value: t('cap4Value'), description: t('cap4Desc'), icon: '🇩🇪' },
  ];

  return (
    <>
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
          <Breadcrumb items={[
            { label: tNav('corporate') },
            { label: t('breadcrumb') },
          ]} />
        </div>

        {/* 5-Step Production Process */}
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

            <div className="relative max-w-5xl mx-auto">
              <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#1a5fa8] via-[#00b4c8] to-[#1a5fa8]" />

              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
                {productionSteps.map((step, i) => (
                  <StaggerItem key={step.step}>
                    <div className="relative flex flex-col items-center text-center">
                      <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-[#1a5fa8] to-[#00b4c8] flex items-center justify-center text-white font-bold text-lg shadow-lg mb-5">
                        {step.step}
                      </div>

                      {i < productionSteps.length - 1 && (
                        <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#00b4c8]">
                          <svg className="w-5 h-5 rotate-90 sm:rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      )}

                      <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#1a5fa8]/30 hover:shadow-lg transition-all w-full">
                        <div className="w-12 h-12 rounded-xl bg-[#f4f7fb] flex items-center justify-center text-[#1a5fa8] mx-auto mb-4">
                          {step.icon}
                        </div>
                        <h3 className="font-bold text-[#0d2d5e] mb-2">{step.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>

        {/* Quality Control Phases */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-[#00b4c8]/10 text-[#00b4c8] border border-[#00b4c8]/25 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  {t('qcBadge')}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {t('qcTitle')}
                </h2>
              </div>
            </FadeInUp>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {qualityPhases.map((phase, i) => (
                <StaggerItem key={phase.title}>
                  <div className="relative bg-[#f4f7fb] rounded-2xl p-6 border border-gray-100 hover:border-[#00b4c8]/30 hover:shadow-md transition-all h-full">
                    <div className="w-10 h-10 rounded-full bg-[#00b4c8] text-white flex items-center justify-center font-bold text-sm mb-4">
                      {i + 1}
                    </div>
                    <h3 className="font-bold text-[#0d2d5e] mb-2">{phase.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{phase.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Capacity & Technology */}
        <section className="py-20 bg-gradient-to-br from-[#0d2d5e] to-[#1a5fa8] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#00b4c8]/10 translate-x-1/2 translate-y-1/2" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-5">
                  {t('capBadge')}
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-white" style={{ fontFamily: 'var(--font-outfit)' }}>
                  {t('capTitle')}
                </h2>
              </div>
            </FadeInUp>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {capacityCards.map((card) => (
                <StaggerItem key={card.title}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/15 transition-colors">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'var(--font-outfit)' }}>
                      {card.value}
                    </div>
                    <h3 className="text-white font-semibold mb-1">{card.title}</h3>
                    <p className="text-blue-200 text-sm">{card.description}</p>
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
