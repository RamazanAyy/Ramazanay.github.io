import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import {
  categories,
  CATEGORY_SLUGS_BY_LOCALE,
  SUPPORTED_LOCALES,
  canonicalizeCategorySlug,
  localizeCategorySlug,
} from '@/lib/products-data';
import { getLocalizedCategoryBySlug } from '@/lib/i18n-products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/sections/Breadcrumb';
import CategoryHero from '@/components/sections/CategoryHero';
import ProductSeriesGroups from '@/components/sections/ProductSeriesGroups';
import FaqAccordion from '@/components/sections/FaqAccordion';
import CtaSection from '@/components/sections/CtaSection';
import FadeInUp from '@/components/animations/FadeInUp';

interface PageProps {
  params: { locale: string; kategori: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const canonicalSlug = canonicalizeCategorySlug(params.kategori);
  const category = getLocalizedCategoryBySlug(params.locale, canonicalSlug);
  if (!category) return {};

  // hreflang: her dilin kendi slug'ı
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = `/${l}/urunler/${localizeCategorySlug(canonicalSlug, l)}`;
  }

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
      canonical: `/${params.locale}/urunler/${params.kategori}`,
      languages,
    },
  };
}

// Her dil için kendi slug'ını üret (locale x kategori)
export function generateStaticParams() {
  const params: { locale: string; kategori: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      const slug = CATEGORY_SLUGS_BY_LOCALE[cat.slug]?.[locale] || cat.slug;
      params.push({ locale, kategori: slug });
    }
  }
  return params;
}

export default async function CategoryPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale });
  const canonicalSlug = canonicalizeCategorySlug(params.kategori);
  const category = getLocalizedCategoryBySlug(params.locale, canonicalSlug);
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
              { label: t('nav.products'), href: `/${params.locale}/urunler` },
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
          <ProductSeriesGroups
            products={category.products}
            categorySlug={params.kategori}
            categoryName={category.name}
          />
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
                {t('categoryPage.frequentlyAsked')}
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
