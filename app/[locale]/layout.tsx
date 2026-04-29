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

export const metadata: Metadata = {
  title: 'Soft & Power Hygiene | Hijyen Ürünleri Üreticisi',
  description: 'Bebek bezi, yetişkin bezi, ıslak mendil ve daha fazlası. Türkiye\'nin güvenilir hijyen ürünleri üreticisi. 50+ ülkeye ihracat, özel etiket hizmeti.',
  keywords: 'bebek bezi, yetişkin bezi, ıslak mendil, özel etiket, fason üretim, hijyen ürünleri',
  openGraph: {
    title: 'Soft & Power Hygiene',
    description: 'Turkey\'s trusted hygiene products manufacturer. Baby diapers, adult diapers, wet wipes & more.',
    siteName: 'Soft & Power Hygiene',
    locale: 'tr_TR',
    type: 'website',
  },
};

const RTL_LOCALES = ['ar'];
const SUPPORTED_LOCALES = ['tr', 'en', 'de', 'ru', 'ar', 'uk'] as const;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
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
