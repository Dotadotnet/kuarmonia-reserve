import ServiceContent from "@/components/shared/content/service/ServiceContent";
import Main from "@/layouts/Main";
import "./Style.css";
import RedirectService from "../page";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "@/app/language";
import Api from "@/utils/api";



export async function generateMetadata({ params }) {
  const { id, locale, slug } = params;
  const service = await Api(`/dynamic/get-one/service/serviceId/${id}`);
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: service.metaTitle,
    description: service.metaDescription,
    category: service.category.title,
    keywords: service.tags.map(tag => { return tag.title }).join(" , "),
    creator: service.creator.name,
    openGraph: {
      title: service.title,
      description: service.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: service.thumbnail.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}

const ServicePost = async ({ params }) => {
  const { id, locale, slug } = params;
  const service = await Api(`/dynamic/get-one/service/serviceId/${id}`);
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const seoTranslations = await getTranslations('Seo');
  const canonical = await canonicalUrl()

  if (encodeURIComponent(service.translations.en.slug) !== slug) {
    return <RedirectService params={params} />
  }
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "@id" : canonical.canonical + "#main" ,
    "url" : canonical.canonical ,
    "description": service.summary,
    "keywords": service.tags.map(tag => { return tag.title }).join(" , "),
    "serviceType": service.category.title,
    "image": {
      "@type": "ImageObject",
      "url": service.thumbnail.url
    },
    "provider": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "eligibleRegion": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "itemOffered": {
        "@type": "Service",
        "name": seoTranslations("ForFirstFree")
      }
    },
    "hasFAQ": [
      ...service.faqs.map(faq => {
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
    ]
  }

  return (
    <Main schema={schema} >
      <ServiceContent service={service} />
    </Main>
  );

};

export default ServicePost;
