import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import ScrollProgress from '@/components/animations/ScrollProgress';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import '../globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['700', '800', '900'],
});

const RTL_LOCALES = ['ar'];
const SUPPORTED_LOCALES = ['tr', 'en', 'de', 'ru', 'ar', 'uk'] as const;
const SITE_URL = 'https://softandpower.com';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

const META_BY_LOCALE: Record<string, { title: string; description: string }> = {
  tr: {
    title: 'Soft & Power Hygiene | Hijyen Ürünleri Üreticisi',
    description: 'Bebek bezi, yetişkin bezi, ıslak mendil ve daha fazlası. Türkiye\'nin güvenilir hijyen ürünleri üreticisi. 50+ ülkeye ihracat, özel etiket hizmeti.',
  },
  en: {
    title: 'Soft & Power Hygiene | Hygiene Products Manufacturer',
    description: 'Baby diapers, adult diapers, wet wipes and more. Turkey\'s trusted hygiene products manufacturer. Export to 50+ countries, private label service.',
  },
  de: {
    title: 'Soft & Power Hygiene | Hygieneprodukte-Hersteller',
    description: 'Babywindeln, Erwachsenenwindeln, Feuchttücher und mehr. Türkeis vertrauenswürdiger Hygieneprodukte-Hersteller. Export in über 50 Länder, Private Label.',
  },
  ru: {
    title: 'Soft & Power Hygiene | Производитель гигиенических товаров',
    description: 'Детские подгузники, подгузники для взрослых, влажные салфетки и многое другое. Надежный турецкий производитель. Экспорт в 50+ стран.',
  },
  ar: {
    title: 'سوفت آند باور | مُصنّع منتجات النظافة',
    description: 'حفاضات أطفال، حفاضات بالغين، مناديل مبللة والمزيد. المُصنّع التركي الموثوق به لمنتجات النظافة. تصدير إلى أكثر من 50 دولة.',
  },
  uk: {
    title: 'Soft & Power Hygiene | Виробник гігієнічних товарів',
    description: 'Дитячі підгузки, підгузки для дорослих, вологі серветки та інше. Надійний турецький виробник. Експорт до 50+ країн.',
  },
};

const OG_LOCALE_MAP: Record<string, string> = {
  tr: 'tr_TR', en: 'en_US', de: 'de_DE', ru: 'ru_RU', ar: 'ar_SA', uk: 'uk_UA',
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const meta = META_BY_LOCALE[locale] || META_BY_LOCALE.tr;
  const languages: Record<string, string> = {};
  for (const l of SUPPORTED_LOCALES) languages[l] = `${SITE_URL}/${l}`;
  languages['x-default'] = `${SITE_URL}/tr`;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: 'bebek bezi, yetişkin bezi, ıslak mendil, özel etiket, fason üretim, baby diaper, adult diaper, wet wipes, private label, hygiene products',
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'Soft & Power Hygiene',
      locale: OG_LOCALE_MAP[locale] || 'tr_TR',
      type: 'website',
      images: [{ url: `${SITE_URL}/logo-wide.png`, width: 1200, height: 630, alt: 'Soft & Power Hygiene' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${SITE_URL}/logo-wide.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} className={`${jakarta.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1a5fa8" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Soft & Power Hygiene',
              url: 'https://softandpower.com',
              logo: 'https://softandpower.com/logo.png',
              telephone: '+905396312392',
              email: 'info@softandpower.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Çamlık Mah, Selçuklu Cd. No: 24/148, Kurtköy',
                addressLocality: 'Pendik',
                addressRegion: 'İstanbul',
                postalCode: '34912',
                addressCountry: 'TR',
              },
              geo: { '@type': 'GeoCoordinates', latitude: 40.9231835, longitude: 29.2904611 },
              sameAs: [
                'https://www.facebook.com/softandpower',
                'https://www.instagram.com/softandpower',
                'https://www.linkedin.com/company/softandpower',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <ScrollProgress />
          {children}
          <WhatsAppButton />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
