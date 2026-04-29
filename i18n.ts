import { getRequestConfig } from 'next-intl/server';

const SUPPORTED = ['tr', 'en', 'de', 'ru', 'ar', 'uk'] as const;

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = SUPPORTED.includes(locale as any) ? locale : 'tr';
  return {
    locale: safeLocale,
    messages: (await import(`./messages/${safeLocale}.json`)).default,
  };
});
