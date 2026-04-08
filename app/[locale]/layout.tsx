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
              address: { '@type': 'PostalAddress', addressCountry: 'TR' },
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
          {/* Catalog download corner button */}
          <a
            href="/images/catalog/softpower-katalog.pdf"
            download="SoftPower-Katalog-2024.pdf"
            className="fixed bottom-24 right-4 z-50 bg-[#1a5fa8] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-[#0d2d5e] transition-all hover:scale-110"
            title="Katalogu Indir"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </a>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
