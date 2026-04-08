'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  // Delay appearance
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // Auto-expand after 4s, collapse after 8s
  useEffect(() => {
    if (!show) return;
    const t1 = setTimeout(() => setExpanded(true), 2500);
    const t2 = setTimeout(() => setExpanded(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [show]);

  // Hide tooltip after 12s
  useEffect(() => {
    const t = setTimeout(() => setTooltip(false), 12000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

          {/* Tooltip bubble */}
          <AnimatePresence>
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-[220px]"
              >
                <button
                  onClick={() => setTooltip(false)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors text-xs"
                >
                  ✕
                </button>
                <p className="text-[#0d2d5e] text-sm font-semibold mb-1">
                  Size nasıl yardımcı olabiliriz?
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Toptan fiyat ve ürün bilgisi için hemen yazın. Ortalama yanıt süresi: <strong className="text-[#25D366]">2 dakika</strong>
                </p>
                {/* Triangle pointer */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.a
            href="https://wa.me/905396312392?text=Merhaba%2C%20%C3%BCr%C3%BCnleriniz%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className="relative flex items-center bg-[#25D366] text-white rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_32px_rgba(37,211,102,0.5)] transition-shadow overflow-hidden"
          >
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full">
              <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-[0.15]" />
            </span>
            <span className="absolute -inset-1 rounded-full">
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-[#25D366]"
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            </span>

            {/* Icon container */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <motion.svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </motion.svg>
            </div>

            {/* Expandable text */}
            <AnimatePresence>
              {expanded && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden whitespace-nowrap pr-5"
                >
                  <span className="text-sm font-bold">Teklif Al</span>
                  <span className="text-xs opacity-80 ml-1.5">via WhatsApp</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>

          {/* Online indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border border-gray-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] font-medium text-gray-600">Çevrimiçi</span>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
