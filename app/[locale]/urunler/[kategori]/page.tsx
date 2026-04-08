import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { categories, getCategoryBySlug } from '@/lib/products-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/sections/Breadcrumb';
import CategoryHero from '@/components/sections/CategoryHero';
import ProductGrid from '@/components/sections/ProductGrid';
import FaqAccordion from '@/components/sections/FaqAccordion';
import CtaSection from '@/components/sections/CtaSection';
import FadeInUp from '@/components/animations/FadeInUp';

interface PageProps {
  params: { locale: string; kategori: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.kategori);
  if (!category) return {};

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      type: 'website',
      locale: params.locale === 'tr' ? 'tr_TR' : params.locale,
    },
    alternates: {
      canonical: `/${params.locale}/urunler/${category.slug}`,
    },
  };
}

export function generateStaticParams() {
  return categories.map((cat) => ({ kategori: cat.slug }));
}

export default function CategoryPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const category = getCategoryBySlug(params.kategori);
  if (!category) notFound();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f7fb]">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Ürünler', href: `/${params.locale}/urunler` },
              { label: category.name },
            ]}
          />
        </div>

        {/* Hero */}
        <CategoryHero
          title={category.name}
          description={category.description}
          features={category.features}
        />

        {/* Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <FadeInUp>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2d5e]">
                Tüm {category.name} Ürünleri
              </h2>
              <p className="mt-2 text-gray-500">
                {category.products.length} ürün listeleniyor
              </p>
            </div>
          </FadeInUp>
          <ProductGrid products={category.products} categorySlug={category.slug} />
        </section>

        {/* FAQ with JSON-LD */}
        {category.faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <FadeInUp>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0d2d5e] text-center mb-8">
                Sık Sorulan Sorular
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <FaqAccordion faqs={category.faqs} />
            </FadeInUp>
          </section>
        )}

        {/* CTA */}
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
