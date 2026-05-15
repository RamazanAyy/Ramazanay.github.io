'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ProductionStats() {
  const t = useTranslations('categoryPage');

  const stats = [
    { value: '500M+', label: t('statAnnual'),  detail: t('statAnnualDetail') },
    { value: '2M+',   label: t('statDaily'),   detail: t('statDailyDetail') },
    { value: '15.000 m²', label: t('statFactory'), detail: t('statFactoryDetail') },
    { value: '12+',   label: t('statLines'),   detail: t('statLinesDetail') },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#0d2d5e] to-[#143d75] py-16 sm:py-20 overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#00b4c8]/10 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-[#00b4c8]/15 text-[#00b4c8] border border-[#00b4c8]/30 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-4"
          >
            {t('productionBadge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-white"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            {t('productionTitle')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 text-blue-100/80 max-w-2xl mx-auto"
          >
            {t('productionDesc')}
          </motion.p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white/[0.06] backdrop-blur-sm border border-white/10 hover:border-[#00b4c8]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00b4c8]/10 group"
            >
              {/* Number */}
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none mb-2 group-hover:text-[#00b4c8] transition-colors"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {s.value}
              </div>
              <div className="text-sm sm:text-base font-semibold text-white">
                {s.label}
              </div>
              <div className="text-xs text-blue-200/70 mt-1.5 leading-relaxed">
                {s.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
