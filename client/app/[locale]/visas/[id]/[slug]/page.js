import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import VisaContent from "./VisaContent"; // بخش کلاینت جدا شده
import canonicalUrl from "@/components/shared/seo/canonical";
import language from "@/app/language";


export async function generateMetadata({ params }) {
  const { id, locale, slug } = params;
  const visa = await Api(`/dynamic/get-one/visa/visaId/${id}?fields=title,summary,type,creator,tags,thumbnail`);
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: visa.title,
    description: visa.summary,
    category: visa.type.title,
    creator: visa.creator.name,
    keywords: Array.isArray(visa.tags) ? visa.tags.map(tag => { return tag.title }).join(" , ") : visa.tags.keynotes.map(tag => { return tag }).join(" , "),
    openGraph: {
      title: visa.title,
      description: visa.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: visa.thumbnail.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}

const VisaPost = async ({ params }) => {
  const { id, locale } = await params;
  const canonical = await canonicalUrl()
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const visa = await Api(`/dynamic/get-one/visa/visaId/${id}`);
  const seoTranslations = await getTranslations("Seo");
  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas`;
  const visaTranslations = await getTranslations("Visa")
  const response = await fetch(api, {
    cache: "no-store",
    headers: {
      "Accept-Language": locale
    }
  });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": canonical.canonical + "#main",
        "name": visa.title,
        "url": canonical.canonical,
        "keywords": Array.isArray(visa.tags) ? visa.tags.map(tag => { return tag.title }).join(" , ") : visa.tags.keynotes.map(tag => { return tag }).join(" , "),
        "serviceType": visa.type.title,
        "image": {
          "@type": "ImageObject",
          "url": visa.thumbnail.url
        },
        "provider": {
          "@type": "Organization",
          "@id": hostLang + "/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": visa.country
        },
        "description": visa.summary,
        "hasPart": [
          { "@id": canonical.canonical + "#faq" },
          { "@id": canonical.canonical + "#howto" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": canonical.canonical + "#faq",
        "name": visaTranslations("FrequentlyAskedQuestions"),
        "mainEntity": visa.faqs.map(faq => {
          return (
            {
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }
          )
        })
      },
      {
        "@type": "HowTo",
        "@id": canonical.canonical + "#howto",
        "name": visaTranslations("StepsRequest"),
        "step": [
          ...visa.conditions.map(condition => {
            return (
              {
                "@type": "HowToStep",
                "name": visaTranslations("FullCondition"),
                "text": condition
              }
            )
          })
          ,
          ...visa.documents.map((doc) => {
            return (
              {
                "@type": "HowToStep",
                "name": doc.title,
                "text": doc.description
              }
            )
          })
          ,
          ...visa.roadmap.map((step) => {
            return (
              {
                "@type": "HowToStep",
                "name": step.title,
                "text": step.description
              }
            )
          })
        ]
      }
    ]
  }
  const res = await response.json();
  const visas = res.data;
  return (
    <Main schema={schema} >
      <Container className="!px-0">
        <VisaContent visa={visa} locale={locale} related={visas} />
      </Container>
    </Main>
  );
};

export default VisaPost;
