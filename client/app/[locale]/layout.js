import "../globals.css";
import Auth from "../auth";
import Session from "../session";
import Providers from "../providers";
import { Toaster } from "react-hot-toast";
import language from "../language";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
const feeds = ["blog", "media", "news", "opportunity", "property", "rent", "service", "tag"]
const langs_result = [];
export async function generateMetadata() {
  const headersList = await headers();
  const url = headersList.get("url")
  const lang = await getLocale();
  const class_lang = new language(lang);
  const lang_now = class_lang.getInfo();
  const seoTranslations = await getTranslations('Seo');
  const metadata = {
    title: seoTranslations("defaultTitle"),
    description: seoTranslations("defaultDis"),
    keywords: seoTranslations("defaultKeywords"),
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  };

  return metadata
}
export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo();
  const RssTranslated = await getTranslations('Rss');
  const rssFiles = feeds.map(async (feed) => {
    return (
      <link rel="alternate" type="application/rss+xml" hrefLang={lang.lang + "-" + lang.loc} title={RssTranslated(feed.toLowerCase() + "Title")} href={process.env.NEXT_PUBLIC_BASE_URL + "/feed.xml/" + lang.lang + "/" + feed} />
    )
  })
  return (
    <>
      <NextIntlClientProvider>
        <Providers>
          <Session>
            <Auth>
              <html lang={lang.lang + "-" + lang.loc} dir={lang.dir}>
                {/* داداش دستم به دامنت دست نزن */}
                <head>
                  <meta httpEquiv="Content-Language" content={lang.lang + "-" + lang.loc} />
                  {rssFiles}
                  <meta name="expires" content="never" />
                  <meta name="publisher" content={seoTranslations("siteName")} />
                  <meta name="dc.publisher" content={seoTranslations("pageAboutDis")} />
                  <meta name="language" content={lang.lang} />
                </head>
                {/* داداش دستم به دامنت دست نزن */}
                <body>
                  {children}
                </body>
              </html>
              <Toaster />
            </Auth>
          </Session>
        </Providers>
      </NextIntlClientProvider>
    </>
  );
}
