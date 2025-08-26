import Main from "@/layouts/Main";
import ContactPage from "./contactPage";

import canonicalUrl from "@/components/shared/seo/canonical";
import { getLocale, getTranslations } from "next-intl/server";
import language from "@/app/language";
import { headers } from "next/headers";

export async function generateMetadata() {
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const locale = await getLocale();
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: seoTranslations("pageContactTitle"),
    description: seoTranslations("pageContactDis"),
    openGraph: {
      title: seoTranslations("pageContactTitle"),
      description: seoTranslations("pageContactDis"),
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: "https://s3-console.kuarmonia.com/main/e58b2333-8860-4f68-a9a2-522004e2cfe8.webp", // لینک تصویر
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}


export default async function Contact() {
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const t = await getTranslations("ForAll");
  const seoTranslations = await getTranslations('Seo');
  const url = await headers().get("url");
  const locale = await getLocale();
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);


  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t("3"),
    "url": hostLang + "/contact",
    "description": seoTranslations("pageContactDis"),
    "mainEntity": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    },
    "hasPart": {
      "@type": "WebForm",
      "name": t("3"),
      "url": hostLang + "/contact#form",
      "description": seoTranslations("pageContactDis"),
      "encodingType": "application/x-www-form-urlencoded"
    }
  };
  return (
    <Main schema={schema}>
      <ContactPage />
    </Main>
  );
}
