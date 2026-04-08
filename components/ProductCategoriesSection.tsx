'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';

const CATEGORIES = [
  {
    id: 'baby',
    label: 'Bebek Bakımı',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    products: [
      {
        name: 'Bebek Bezi',
        desc: 'Ultra ince yapı, yüksek emicilik, hassas cilt dostu',
        img: '/slider/slide-baby-diapers.jpg',
        href: '/products/baby-diapers',
        badge: 'Çok Satan',
      },
      {
        name: 'Bebek Islak Mendil',
        desc: 'Parfümsüz, alkol içermeyen nazik formül',
        img: '/slider/slide-wipes.jpg',
        href: '/products/baby-wet-wipes',
        badge: null,
      },
      {
        name: 'Bebek Hasta Altı',
        desc: 'Hassas bebek cildi için yumuşak koruma',
        img: '/slider/slide-baby-underpads.jpg',
        href: '/products/baby-underpads',
        badge: null,
      },
    ],
  },
  {
    id: 'adult',
    label: 'Yetişkin Bakımı',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    products: [
      {
        name: 'Yetişkin Külot Bezi',
        desc: 'Aktif yaşam için iç çamaşırı konforu',
        img: '/slider/slide-adult-pants.jpg',
        href: '/products/adult-pants',
        badge: 'Yeni',
      },
      {
        name: 'Yetişkin Hasta Altı',
        desc: 'Sağlık kurumları için profesyonel çözüm',
        img: '/slider/slide-underpads.jpg',
        href: '/products/adult-underpads',
        badge: null,
      },
      {
        name: 'Mesane Pedi',
        desc: 'Hafif ve orta inkontinans için özel tasarım',
        img: '/slider/slide-bladder-pads.jpg',
        href: '/products/bladder-pads',
        badge: null,
      },
    ],
  },
  {
    id: 'wipes',
    label: 'Islak Mendil',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    products: [
      {
        name: 'Bebek Islak Mendil',
        desc: 'Parfümsüz, alkol içermeyen nazik formül',
        img: '/slider/slide-wipes.jpg',
        href: '/products/baby-wet-wipes',
        badge: null,
      },
      {
        name: 'Islak Mendil',
        desc: 'Her ortam için pratik hijyen çözümü',
        img: '/slider/slide-wet-wipes.jpg',
        href: '/products/wet-wipes',
        badge: null,
      },
    ],
  },
  {
    id: 'hygiene',
    label: 'Hijyen & Temizlik',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    products: [
      {
        name: 'Temizlik Havlusu',
        desc: 'Profesyonel temizlik için güçlü yapı',
        img: '/slider/slide-cleaning-towels.jpg',
        href: '/products/cleaning-towels',
        badge: null,
      },
      {
        name: 'Mesane Pedi',
        desc: 'Discreet ve etkili — özgürce yaşamanız için',
        img: '/slider/slide-bladder-pads.jpg',
        href: '/products/bladder-pads',
        badge: null,
      },
    ],
  },
];

export default function ProductCategoriesSection() {
  const locale = useLocale();
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden" id="product-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#00BAD1]" />
            <span className="text-[#00BAD1] text-xs font-semibold uppercase tracking-[0.25em]">Ürün Kategorileri</span>
            <span className="w-8 h-[2px] bg-[#00BAD1]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A2E] leading-tight"
            style={{ fontFamily: 'var(--font-outfit)' }}
          >
            Ürünlerimizi <span className="text-[#1B4F8A]">Keşfedin</span>
          </h2>
        </motion.div>

        {/* Category Tabs — horizontally scrollable */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex gap-3 overflow-x-auto pb-2 mb-8 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shrink-0 ${
                activeId === cat.id
                  ? 'bg-[#1B4F8A] text-white border-[#1B4F8A] shadow-lg shadow-[#1B4F8A]/25 scale-105'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#1B4F8A]/40 hover:text-[#1B4F8A]'
              }`}
            >
              <span className={activeId === cat.id ? 'text-[#00BAD1]' : 'text-gray-400'}>
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Product Cards — horizontally scrollable */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {active.products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="shrink-0 w-[260px] sm:w-[300px]"
              >
                <Link
                  href={`/${locale}${product.href}`}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-[#1B4F8A]/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Image */}
                  <div className="relative h-[180px] sm:h-[200px] overflow-hidden bg-gray-50">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      sizes="320px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B4E]/40 via-transparent to-transparent" />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-[#00BAD1] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {product.badge}
                      </span>
                    )}
                    {/* Arrow on hover */}
                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <svg className="w-4 h-4 text-[#1B4F8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[#1A1A2E] text-base mb-1.5 group-hover:text-[#1B4F8A] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed flex-1">{product.desc}</p>
                    <div className="mt-4 flex items-center gap-1.5 text-[#1B4F8A] text-xs font-semibold">
                      <span>İncele</span>
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* "Tüm Ürünler" card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: active.products.length * 0.08 }}
              className="shrink-0 w-[200px] sm:w-[220px]"
            >
              <Link
                href={`/${locale}/products`}
                className="group flex flex-col items-center justify-center bg-[#F0F6FF] hover:bg-[#1B4F8A] border-2 border-dashed border-[#1B4F8A]/25 hover:border-[#1B4F8A] rounded-2xl h-full min-h-[320px] transition-all duration-300 gap-4 p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#1B4F8A]/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                  <svg className="w-6 h-6 text-[#1B4F8A] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#1B4F8A] group-hover:text-white text-sm transition-colors">Tüm Ürünleri</p>
                  <p className="font-bold text-[#1B4F8A] group-hover:text-white text-sm transition-colors">Gör</p>
                </div>
                <svg className="w-5 h-5 text-[#00BAD1] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll hint on mobile */}
        <p className="text-center text-gray-400 text-xs mt-3 sm:hidden">← Kaydırarak daha fazla görün →</p>

      </div>
    </section>
  );
}
