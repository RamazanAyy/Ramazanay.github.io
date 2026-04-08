'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <section className="py-24 bg-[#0D2B4E] relative overflow-hidden" id="video">
      {/* Background texture */}
      <div className="absolute inset-0 bg-hero-pattern opacity-[0.04]" />
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00BAD1]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-[#00BAD1]" />
            <span className="text-[#00BAD1] text-xs font-semibold uppercase tracking-[0.25em]">
              Tanıtım Filmi
            </span>
            <span className="w-10 h-[2px] bg-[#00BAD1]" />
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Üretim Gücümüzü <span className="text-[#00BAD1]">Keşfedin</span>
          </h2>
          <p className="text-blue-300/80 max-w-lg mx-auto text-base leading-relaxed">
            Modern tesislerimiz ve ileri teknoloji altyapımızla dünya standartlarında
            hijyen ürünleri üretiyoruz.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow border */}
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#00BAD1]/40 via-[#1B4F8A]/30 to-[#00BAD1]/20 blur-sm" />

          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer bg-black shadow-2xl"
            onClick={toggle}
          >
            <video
              ref={videoRef}
              src="/promo-video.mp4"
              className="w-full block"
              loop
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />

            {/* Play overlay */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0D2B4E]/50 backdrop-blur-[2px] transition-all hover:bg-[#0D2B4E]/35">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-[#00BAD1] rounded-full flex items-center justify-center shadow-2xl shadow-[#00BAD1]/40"
                  >
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <span className="text-white/70 text-sm font-medium">Oynat</span>
                </div>
              </div>
            )}

            {/* Playing — subtle pause indicator on hover */}
            {playing && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 transition-opacity">
                <div className="w-14 h-14 bg-black/50 rounded-full flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-6 bg-white rounded-full" />
                  <span className="w-1.5 h-6 bg-white rounded-full" />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Bottom stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { value: '10+', label: 'Ürün Çeşidi' },
            { value: '50+', label: 'İhracat Ülkesi' },
            { value: 'ISO', label: '9001 Sertifikalı' },
            { value: '24/7', label: 'Üretim Kapasitesi' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl font-black text-[#00BAD1] mb-1"
                style={{ fontFamily: 'var(--font-outfit)' }}
              >
                {value}
              </div>
              <p className="text-blue-300/60 text-xs uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
