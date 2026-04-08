'use client';
import { motion } from 'framer-motion';

interface CategoryHeroProps {
  title: string;
  description: string;
  features: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function CategoryHero({ title, description, features }: CategoryHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d2d5e] via-[#1a3f6f] to-[#0d2d5e]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00b4c8]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#1a5fa8]/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00b4c8]/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
          {/* Text content */}
          <div className="flex-1 mb-10 lg:mb-0">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' as const }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' as const }}
              className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          </div>

          {/* Feature badges */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex-shrink-0 grid grid-cols-2 gap-3 sm:gap-4 lg:max-w-md"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={badgeVariants}
                className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-3 sm:px-5 sm:py-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00b4c8]/20 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-[#00b4c8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-sm sm:text-base font-medium text-white">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
