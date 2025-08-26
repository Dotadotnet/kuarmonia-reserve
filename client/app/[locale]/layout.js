import Head from 'next/head';
import "../globals.css";
import Auth from "../auth";
import Session from "../session";
import Providers from "../providers";
import { Toaster } from "react-hot-toast";
import language from "../language";
import { NextIntlClientProvider, hasLocale, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
const feeds = ["blog", "media", "news", "opportunity", "property", "rent", "service"]
const langs_result = [];
export async function generateMetadata() {
  const headersList = await headers();
  const url = headersList.get("url")
  const lang = await getLocale();
  const class_lang = new language(lang);
  const lang_now = class_lang.getInfo();
  const seoTranslations= await getTranslations('Seo');
  const metadata = {
    title: seoTranslations("defaultTitle"),
    description: seoTranslations("defaultDis") ,
    keywords : seoTranslations("defaultKeywords") ,
    openGraph: {
      title: seoTranslations("defaultTitle") ,
      description: seoTranslations("defaultDis") ,
      url: "https://kuarmonia.com",
      siteName: seoTranslations("siteName"),
      images: "https://s3-console.kuarmonia.com/main/e58b2333-8860-4f68-a9a2-522004e2cfe8.webp", // لینک تصویر
      locale: lang_now.lang + "-" + lang_now.loc,
      type: "website"
    },
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
    },
    twitter: {
      card: "summary_large_image",
      site: "@kuarmonia",
      title: "مهاجرت و ازدواج در ترکیه و کانادا",
      description: "راهنمای جامع برای مهاجرت و ازدواج در ترکیه و کانادا با نکات کلیدی و خدمات مشاوره.",
      image: "https://s3-console.kuarmonia.com/main/84a10727-61b7-4199-91bf-12989c4e575a.webp" // لینک تصویر
    },
    links: [
      {
        rel: "preload",
        href: "/fonts/vazir/Vazir.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous"
      },
      {
        rel: "preload",
        href: "/fonts/DigiNozha/DigiNozha2Bold.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous"
      }
    ]
  };


  return metadata
}
export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const RssTranslated = await getTranslations('Rss');
  const rssFiles = feeds.map(async (feed) => {
    return (
      <link rel="alternate" type="application/rss+xml" hrefLang={lang.lang + "-" + lang.loc} title={RssTranslated(feed.toLowerCase() + "Title")} href={process.env.NEXT_PUBLIC_BASE_URL + "/feed.xml/" + lang.lang + "/" + feed} />
    )
  })
  return (
    <>
      <head>
        <meta httpEquiv="Content-Language" content={lang.lang + "-" + lang.loc} />
        {rssFiles}
      </head>
      <NextIntlClientProvider>
        <Providers>
          <Session>
            <Auth>
              <html lang={lang.lang + "-" + lang.loc} dir={lang.dir}>
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
