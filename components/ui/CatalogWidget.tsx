"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FileDown, Eye } from "lucide-react"
import { CatalogViewer } from "./CatalogViewer"

const CATALOG_IMAGES = Array.from({ length: 30 }, (_, i) =>
  `/images/catalog/pages/page-${String(i + 1).padStart(2, '0')}.jpg`
)

export function CatalogWidget() {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [currentImg, setCurrentImg] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((c) => (c + 1) % CATALOG_IMAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <section className="w-full bg-gradient-to-r from-[#0d2d5e] via-[#143d75] to-[#1a5fa8] py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">

          {/* Sol: Katalog mockup with rotating images */}
          <div className="relative flex-shrink-0 w-[220px] h-[310px] sm:w-[260px] sm:h-[370px] lg:w-[280px] lg:h-[400px] cursor-pointer" onClick={() => setViewerOpen(true)}>
            {/* Glow effect behind */}
            <div className="absolute -inset-4 bg-[#00b4c8]/15 rounded-3xl blur-2xl" />

            {/* Book shadow */}
            <div className="absolute -bottom-3 left-4 right-4 h-6 bg-black/30 blur-xl rounded-full" />

            {/* Main book */}
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-white">
              {/* Rotating catalog pages */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={CATALOG_IMAGES[currentImg]}
                    alt={`Katalog sayfa ${currentImg + 1}`}
                    fill
                    className="object-contain"
                    sizes="280px"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Subtle bottom gradient for logo area */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d2d5e]/80 to-transparent" />

              {/* Top badge */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="bg-[#00b4c8] text-white text-[9px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  2025 Katalog
                </span>
                <span className="bg-white/20 backdrop-blur-sm text-white text-[9px] font-medium px-2 py-1 rounded-md">
                  {currentImg + 1}/{CATALOG_IMAGES.length}
                </span>
              </div>

              {/* Bottom content on book */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <Image
                  src="/logo.png"
                  alt="Soft & Power"
                  width={90}
                  height={30}
                  className="h-6 w-auto object-contain brightness-0 invert mb-2"
                />
                <p className="text-white/70 text-[10px] leading-tight">
                  Family Care Collection
                </p>
              </div>

              {/* Spine effect left */}
              <div className="absolute left-0 inset-y-0 w-[6px] bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
            </div>

            {/* Page stack behind book */}
            <div className="absolute -right-1 top-2 bottom-2 w-[6px] bg-white/20 rounded-r-sm" />
            <div className="absolute -right-2 top-3 bottom-3 w-[5px] bg-white/10 rounded-r-sm" />

            {/* Dot indicators */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
              {CATALOG_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentImg ? 'w-5 h-1.5 bg-[#00b4c8]' : 'w-1.5 h-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sag: Content */}
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-[#00b4c8]/20 text-[#00b4c8] text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-[#00b4c8]/30">
              Soft &amp; Power Katalog
            </span>
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-outfit)' }}>
              Online{' '}
              <span className="text-[#00b4c8]">Katalog</span>
            </h2>
            <p className="text-white/70 text-sm mb-6 max-w-md">
              Tüm ürünlerimize tek bir katalog ile sınırsız erişebilirsiniz.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8 justify-center md:justify-start">
              {["Tum Sayfalar", "TR / EN", "Tum Urunler", "ISO Sertifikali"].map(item => (
                <span key={item} className="bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/15">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a
                href="/images/catalog/softpower-katalog.pdf"
                download="SoftPower-Katalog-2025.pdf"
                className="flex items-center gap-2 bg-[#00b4c8] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#00b4c8]/90 transition-colors shadow-lg shadow-[#00b4c8]/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileDown className="w-5 h-5" />
                Katalogu Indir
              </motion.a>
              <motion.button
                onClick={() => setViewerOpen(true)}
                className="flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-5 h-5" />
                Online Goruntule
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <CatalogViewer isOpen={viewerOpen} onClose={() => setViewerOpen(false)} />
    </>
  )
}
