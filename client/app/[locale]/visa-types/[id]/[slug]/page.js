import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
import VisaTypeContent from "./VisaTypeContent";
import canonicalUrl from "@/components/shared/seo/canonical";
import language from "@/app/language";
import RedirectVisaType from "../page";

export async function generateMetadata({ params }) {
  const { id, locale, slug } = await params;
  console.log(id, locale, slug);
  const visaType = await Api(`/dynamic/get-one/visaType/visaTypeId/${id}?fields=title,content,creator,tags,thumbnail`);
  const canonical = await canonicalUrl();
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo();
  const metadata = {
    title: visaType.title,
    description: visaType.content,
    creator: visaType.creator?.name,
    keywords: Array.isArray(visaType.tags)
      ? visaType.tags.map(tag => tag.title).join(" , ")
      : visaType.tags?.keynotes?.map(tag => tag).join(" , ") || "",
    openGraph: {
      title: visaType.title,
      description: visaType.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: visaType.thumbnail?.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    canonical: canonical.canonical,
    alternates: canonical
  };
  return metadata;
}

const VisaTypePost = async ({ params }) => {
  const { id, locale, slug } = await params;
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const visaType = await Api(`/dynamic/get-one/visaType/visaTypeId/${id}`);
  if (!visaType || visaType.slug_en !== slug) {
    return <RedirectVisaType params={params} />
  }
  const visaTranslations = await getTranslations("Visa")
  const relatedVisasApi = `${process.env.NEXT_PUBLIC_API}/visa/get-visas?type=${id}`;
  const response = await fetch(relatedVisasApi, {
    cache: "no-store",
    headers: {
      "Accept-Language": locale
    }
  });
  const res = await response.json();
  const relatedVisas = res.data || [];

  const visaTypeTranslations = await getTranslations("VisaType", locale);
  const canonical = await canonicalUrl();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": canonical.canonical + "#main",
        "name": visaType.title,
        "url": canonical.canonical,
        "keywords": Array.isArray(visaType.tags) ? visaType.tags.map(tag => { return tag.title }).join(" , ") : visaType.tags.keynotes.map(tag => { return tag }).join(" , "),
        "image": {
          "@type": "ImageObject",
          "url": visaType.thumbnail.url
        },
        "provider": {
          "@type": "Organization",
          "@id": hostLang + "/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": visaType.country
        },
        "description": visaType.content,
        "hasPart": [
          { "@id": canonical.canonical + "#faq" },
          ...relatedVisas.map((relatedVisa) => {
            return (
              {
                "@type": "SiteNavigationElement",
                "name": relatedVisa.title,
                "url": hostLang + "/visas/" + relatedVisa.visaId + "/" + encodeURIComponent(relatedVisa.slug_en)
              }
            )
          })
        ]
      },
      {
        "@type": "FAQPage",
        "@id": canonical.canonical + "#faq",
        "name": visaTranslations("FrequentlyAskedQuestions"),
        "mainEntity": visaType.faqs.map(faq => {
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
      }
    ]
  }

  return (
    <Main schema={schema}>
      <Container className="!px-0">
        <VisaTypeContent
          visaType={visaType}
          locale={locale}
          relatedVisas={relatedVisas}
        />
      </Container>
    </Main>
  );
};

export default VisaTypePost;
