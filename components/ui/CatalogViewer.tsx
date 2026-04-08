"use client"
import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, X, ZoomIn, ZoomOut } from "lucide-react"

const PAGES = Array.from({ length: 30 }, (_, i) =>
  `/images/catalog/pages/page-${String(i + 1).padStart(2, '0')}.jpg`
)

interface CatalogViewerProps {
  isOpen: boolean
  onClose: () => void
}

export function CatalogViewer({ isOpen, onClose }: CatalogViewerProps) {
  const [page, setPage] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(PAGES.length - 1, p + 1))

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative z-10 flex flex-col w-full max-w-4xl h-[92vh] mx-4 bg-[#0d2d5e] rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between bg-[#1a5fa8] px-4 py-3 flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                Soft &amp; Power — Katalog
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomed((z) => !z)}
                  className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {zoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                </button>
                <a
                  href="/images/catalog/softpower-katalog.pdf"
                  download="SoftPower-Katalog-2024.pdf"
                  className="flex items-center gap-1.5 bg-[#00b4c8] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#00b4c8]/80 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  PDF Indir
                </a>
                <button
                  onClick={onClose}
                  className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image area */}
            <div className="flex-1 relative bg-gray-900 overflow-auto flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  className={`relative ${zoomed ? 'w-full h-auto min-h-full' : 'w-full h-full'}`}
                >
                  <Image
                    src={PAGES[page]}
                    alt={`Katalog sayfa ${page + 1}`}
                    fill={!zoomed}
                    width={zoomed ? 1200 : undefined}
                    height={zoomed ? 1600 : undefined}
                    className={zoomed ? 'w-full h-auto' : 'object-contain'}
                    sizes="800px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Left/Right arrows on image */}
              <button
                onClick={prev}
                disabled={page === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-20 text-white rounded-full flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                disabled={page === PAGES.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 disabled:opacity-20 text-white rounded-full flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom - page strip */}
            <div className="bg-[#0a1f3d] px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Page number */}
                <span className="text-white text-sm font-bold shrink-0">
                  {page + 1} <span className="text-white/40">/ {PAGES.length}</span>
                </span>

                {/* Thumbnail strip */}
                <div className="flex-1 overflow-x-auto flex gap-1.5" style={{ scrollbarWidth: 'none' }}>
                  {PAGES.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`relative shrink-0 w-10 h-14 rounded overflow-hidden border-2 transition-all ${
                        i === page ? 'border-[#00b4c8] scale-105' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="40px" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
