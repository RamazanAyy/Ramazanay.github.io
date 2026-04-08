import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import {
  categories,
  getCategoryBySlug,
  getProductBySlug,
} from '@/lib/products-data';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/sections/Breadcrumb';
import CtaSection from '@/components/sections/CtaSection';
import FadeInUp from '@/components/animations/FadeInUp';
import ProductContactForm from './ProductContactForm';
import ProductImageGallery from './ProductImageGallery';
import { getProductImages, getProductImage } from '@/lib/product-images';

interface PageProps {
  params: { locale: string; kategori: string; urun: string };
}

/* ─── SEO Metadata ──────────────────────────────────────────────── */

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.kategori);
  const product = getProductBySlug(params.kategori, params.urun);
  if (!product || !category) return {};

  const title = `${product.name} | ${category.name} | Soft & Power`;
  const description = product.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: params.locale === 'tr' ? 'tr_TR' : params.locale,
    },
    alternates: {
      canonical: `/${params.locale}/urunler/${category.slug}/${product.slug}`,
    },
  };
}

/* ─── Static Params ─────────────────────────────────────────────── */

export function generateStaticParams() {
  const paths: { kategori: string; urun: string }[] = [];
  for (const cat of categories) {
    for (const prod of cat.products) {
      paths.push({ kategori: cat.slug, urun: prod.slug });
    }
  }
  return paths;
}

/* ─── Page ──────────────────────────────────────────────────────── */

export default function ProductPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const category = getCategoryBySlug(params.kategori);
  const product = getProductBySlug(params.kategori, params.urun);
  if (!category || !product) notFound();

  // Product images
  const images = getProductImages(product.slug);

  // Related products: other products in the same category, excluding current
  const related = category.products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  // Product JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Soft & Power',
    },
    category: category.name,
  };

  // Technical specs
  const specs: { label: string; value: string }[] = [
    { label: 'Ürün Adı', value: product.name },
    { label: 'Seri', value: product.series },
    { label: 'Adet', value: product.count },
  ];
  if (product.size) {
    specs.push({ label: 'Beden / Boyut', value: product.size });
  }
  specs.push(
    { label: 'Kategori', value: category.name },
    { label: 'Marka', value: 'Soft & Power' }
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f7fb] pt-14 md:pt-24">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Ürünler', href: `/${params.locale}/urunler` },
              {
                label: category.name,
                href: `/${params.locale}/urunler/${category.slug}`,
              },
              { label: product.name },
            ]}
          />
        </div>

        {/* ─── Product Hero ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Product image(s) or gradient fallback */}
            <FadeInUp>
              {images.length > 0 ? (
                <ProductImageGallery
                  images={images}
                  productName={product.name}
                  seriesColor={product.seriesColor}
                  seriesName={product.series}
                />
              ) : (
                <div
                  className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${product.seriesColor}25, ${product.seriesColor}50)`,
                  }}
                >
                  <div
                    className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20"
                    style={{ backgroundColor: product.seriesColor }}
                  />
                  <div
                    className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-15"
                    style={{ backgroundColor: product.seriesColor }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-24 h-24 sm:w-32 sm:h-32 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={0.8}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <span
                    className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md"
                    style={{ backgroundColor: product.seriesColor }}
                  >
                    {product.series}
                  </span>
                </div>
              )}
            </FadeInUp>

            {/* Right: Product info */}
            <FadeInUp delay={0.15}>
              <div className="flex flex-col">
                {/* Series badge */}
                <span
                  className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold text-white mb-4"
                  style={{ backgroundColor: product.seriesColor }}
                >
                  {product.series} Serisi
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d2d5e] leading-tight">
                  {product.name}
                </h1>

                <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Key info chips */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <svg
                      className="w-5 h-5 text-[#1a5fa8]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-400">Adet</p>
                      <p className="text-sm font-semibold text-[#0d2d5e]">
                        {product.count}
                      </p>
                    </div>
                  </div>
                  {product.size && (
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                      <svg
                        className="w-5 h-5 text-[#00b4c8]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-400">Beden</p>
                        <p className="text-sm font-semibold text-[#0d2d5e]">
                          {product.size}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 shadow-sm">
                    <svg
                      className="w-5 h-5 text-[#1a5fa8]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-400">Kategori</p>
                      <p className="text-sm font-semibold text-[#0d2d5e]">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://wa.me/905396312392"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold shadow-lg shadow-[#25D366]/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp ile Soru Sor
                  </a>
                  <a
                    href="#soru-sor"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1a5fa8] text-[#1a5fa8] hover:bg-[#1a5fa8] hover:text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Teklif Formu
                  </a>
                </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ─── Technical Specs ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <FadeInUp>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#0d2d5e]">
                  Teknik Bilgiler
                </h2>
              </div>
              <div className="divide-y divide-gray-50">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                  >
                    <div className="px-6 py-4 text-sm font-semibold text-[#0d2d5e]">
                      {spec.label}
                    </div>
                    <div className="px-6 py-4 text-sm text-gray-600">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </section>

        {/* ─── Contact Form ───────────────────────────────────────── */}
        <section
          id="soru-sor"
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        >
          <FadeInUp>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0d2d5e] mb-2">
                Bu ürün hakkında soru sor
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Fiyat, minimum sipariş miktarı veya özel etiket hakkında bilgi
                almak için formu doldurun.
              </p>
              <ProductContactForm productName={product.name} />
            </div>
          </FadeInUp>
        </section>

        {/* ─── Related Products ───────────────────────────────────── */}
        {related.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <FadeInUp>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2d5e] mb-8">
                Benzer Ürünler
              </h2>
            </FadeInUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {related.map((rel, i) => (
                <FadeInUp key={rel.slug} delay={i * 0.08}>
                  <Link
                    href={`/${params.locale}/urunler/${category.slug}/${rel.slug}`}
                    className="group block rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#1a5fa8]/20 transition-all duration-300 overflow-hidden"
                  >
                    {/* Image or gradient fallback */}
                    {getProductImage(rel.slug) ? (
                      <div className="relative h-44 overflow-hidden bg-white">
                        <Image
                          src={getProductImage(rel.slug)}
                          alt={rel.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        />
                        <span
                          className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                          style={{ backgroundColor: rel.seriesColor }}
                        >
                          {rel.series}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="relative h-44 overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${rel.seriesColor}18, ${rel.seriesColor}38)`,
                        }}
                      >
                        <span
                          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                          style={{ backgroundColor: rel.seriesColor }}
                        >
                          {rel.series}
                        </span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="w-14 h-14 text-gray-300 group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="text-base font-bold text-[#0d2d5e] group-hover:text-[#1a5fa8] transition-colors line-clamp-1 mb-1">
                        {rel.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span>{rel.count}</span>
                        {rel.size && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{rel.size}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                </FadeInUp>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
