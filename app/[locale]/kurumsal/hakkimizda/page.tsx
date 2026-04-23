'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/sections/Breadcrumb';
import FadeInUp from '@/components/animations/FadeInUp';

export default function HakkimizdaPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f4f7fb] pt-14 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Kurumsal' },
              { label: 'Hakkımızda' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2d5e] via-[#143d75] to-[#1a5fa8] text-white">
          <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#00b4c8]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 text-center">
            <FadeInUp>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-sm border border-white/15">
                About Us
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                Our Mission & Vision
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.15}>
              <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                Quality hygiene and personal care, built on trust and sustainable growth.
              </p>
            </FadeInUp>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
            {/* Mission */}
            <FadeInUp>
              <article className="group relative h-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#1a5fa8]/20 transition-all duration-300 p-5 sm:p-7 lg:p-9 overflow-hidden">
                {/* corner accent */}
                <span className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-gradient-to-br from-[#1a5fa8]/10 to-[#00b4c8]/10 blur-2xl pointer-events-none" />

                <div className="relative flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1a5fa8] to-[#00b4c8] shadow-lg shadow-[#1a5fa8]/25 group-hover:scale-105 transition-transform">
                    {/* Rocket — launching purpose & ambition */}
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Mission
                  </h2>
                </div>

                <div className="relative space-y-3 sm:space-y-4 text-gray-700 text-[13px] sm:text-sm lg:text-base leading-relaxed">
                  <p>
                    We aim to enhance quality of life by developing reliable, high-quality, and accessible hygiene and care products that meet the daily needs of people of all ages. Our broad product portfolio—including baby diapers, adult diapers, pant diapers, sanitary and urological pads, underpads, wet wipes, and other personal care products—is developed in accordance with international quality and safety standards and supported by modern production technologies.
                  </p>
                  <p>
                    Across all our operations, we adopt a people-centered approach and regard quality, reliability, and sustainability as core values. Our objective goes beyond manufacturing; we focus on delivering solutions that provide long-term value for our users and business partners while bringing comfort, confidence, and reliability into everyday life. Our growth is built on continuous improvement, attention to detail, and trust-based business relationships.
                  </p>
                </div>
              </article>
            </FadeInUp>

            {/* Vision */}
            <FadeInUp delay={0.1}>
              <article className="group relative h-full bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#00b4c8]/20 transition-all duration-300 p-5 sm:p-7 lg:p-9 overflow-hidden">
                <span className="absolute -top-14 -right-14 w-40 h-40 rounded-full bg-gradient-to-br from-[#00b4c8]/10 to-[#1a5fa8]/10 blur-2xl pointer-events-none" />

                <div className="relative flex items-center gap-3 mb-4 sm:mb-5">
                  <span className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#00b4c8] to-[#1a5fa8] shadow-lg shadow-[#00b4c8]/25 group-hover:scale-105 transition-transform">
                    {/* Telescope — looking to the future */}
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
                      <path d="m13.56 11.747 4.332-.924" />
                      <path d="m16 21-3.105-6.21" />
                      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
                      <path d="m6.158 8.633 1.114 4.456" />
                      <path d="m8 21 3.105-6.21" />
                      <circle cx="12" cy="13" r="2" />
                    </svg>
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0d2d5e]" style={{ fontFamily: 'var(--font-outfit)' }}>
                    Vision
                  </h2>
                </div>

                <div className="relative space-y-3 sm:space-y-4 text-gray-700 text-[13px] sm:text-sm lg:text-base leading-relaxed">
                  <p>
                    We aim to become a trusted and preferred brand in the hygiene and personal care industry, achieving sustainable growth across international markets through a strong commitment to quality and reliability. By integrating technology, innovation, and operational excellence, we deliver solutions that adapt to evolving market dynamics and user expectations.
                  </p>
                  <p>
                    Guided by ethical principles and a strong sense of environmental and social responsibility, we focus on building a respected corporate structure that creates long-term value for our employees, business partners, and all stakeholders.
                  </p>
                </div>
              </article>
            </FadeInUp>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
