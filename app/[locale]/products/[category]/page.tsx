import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import {
  categories,
  SUPPORTED_LOCALES,
  canonicalizeCategorySlug,
} from '@/lib/products-data';
import { getLocalizedCategoryBySlug } from '@/lib/i18n-products';
import { getLocalizedUrl } from '@/lib/paths';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/sections/Breadcrumb';
import CategoryHero from '@/components/sections/CategoryHero';
import ProductSeriesGroups from '@/components/sections/ProductSeriesGroups';
import FaqAccordion from '@/components/sections/FaqAccordion';
import CtaSection from '@/components/sections/CtaSection';
import FadeInUp from '@/components/animations/FadeInUp';

interface PageProps {
  params: { locale: string; category: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const canonicalSlug = canonicalizeCategorySlug(params.category);
  const category = getLocalizedCategoryBySlug(params.locale, canonicalSlug);
  if (!category) return {};

  // hreflang: tüm diller aynı canonical URL'i kullanır
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) {
    languages[l] = getLocalizedUrl(l, '/products', canonicalSlug);
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
      canonical: getLocalizedUrl(params.locale, '/products', canonicalSlug),
      languages,
    },
  };
}

// Her dil için canonical TR slug
export function generateStaticParams() {
  const params: { locale: string; category: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const cat of categories) {
      params.push({ locale, category: cat.slug });
    }
  }
  return params;
}

export default async function CategoryPage({ params }: PageProps) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale });
  const canonicalSlug = canonicalizeCategorySlug(params.category);
  const category = getLocalizedCategoryBySlug(params.locale, canonicalSlug);
  if (!category) notFound();

  // SEO: lokalize ya da yanlış slug → canonical TR slug'a 301
  if (params.category !== canonicalSlug) {
    permanentRedirect(getLocalizedUrl(params.locale, '/products', canonicalSlug));
  }

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

  // SEO: ItemList + Organization + Product schema for category
  const pageUrl = `https://softandpower.com${getLocalizedUrl(params.locale, '/products', canonicalSlug)}`;
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.seoTitle,
    description: category.seoDescription,
    url: pageUrl,
    publisher: {
      '@type': 'Organization',
      name: 'Soft & Power Hygiene',
      url: 'https://softandpower.com',
      logo: 'https://softandpower.com/logo.webp',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: category.products.length,
      itemListElement: category.products.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          name: p.name,
          description: p.description,
          brand: { '@type': 'Brand', name: 'Soft & Power' },
          category: category.name,
          url: `${pageUrl}/${p.slug}`,
        },
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.products'), item: `https://softandpower.com${getLocalizedUrl(params.locale, '/products')}` },
      { '@type': 'ListItem', position: 2, name: category.name, item: pageUrl },
    ],
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f4f7fb]">
        {/* JSON-LD: FAQ + ItemList + Breadcrumb */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        {/* Hero — anasayfa slider stilinde banner görseli + yazılar üstte */}
        <CategoryHero
          title={category.name}
          description={category.description}
          features={category.features}
          locale={params.locale}
          canonicalSlug={canonicalSlug}
        />

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: t('nav.products'), href: getLocalizedUrl(params.locale, '/products') },
              { label: category.name },
            ]}
          />
        </div>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <ProductSeriesGroups
            products={category.products}
            categorySlug={params.category}
            categoryName={category.name}
          />
        </section>

        {/* FAQ */}
        {category.faqs.length > 0 && (
          <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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
