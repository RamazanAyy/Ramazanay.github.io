'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-colors duration-200 ${
              isOpen
                ? 'border-[#1a5fa8]/30 bg-white shadow-sm'
                : 'border-gray-200 bg-white hover:border-[#1a5fa8]/20'
            }`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
                  isOpen ? 'text-[#1a5fa8]' : 'text-[#0d2d5e]'
                }`}
              >
                {faq.question}
              </span>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="w-5 h-5 flex-shrink-0 text-[#00b4c8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </motion.svg>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 sm:px-6 sm:pb-5">
                    <div className="h-px bg-gradient-to-r from-[#1a5fa8]/20 via-[#00b4c8]/20 to-transparent mb-4" />
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
