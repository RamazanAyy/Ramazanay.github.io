import { Metadata } from 'next';

const BASE_URL = 'https://softandpower.com';
const SITE_NAME = 'Soft & Power Hygiene';

export function generateSEO({
  title,
  description,
  path = '',
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'hijyen ürünleri',
      'toptan hijyen',
      'bebek bezi üreticisi',
      'soft power hygiene',
      ...keywords,
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: `${BASE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      locale: 'tr_TR',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
