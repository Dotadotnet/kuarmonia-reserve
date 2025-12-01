import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import { getTranslations } from "next-intl/server";
import VisaContent from "./VisaContent";
import canonicalUrl from "@/components/shared/seo/canonical";
import language from "@/app/language";

// Create a simple API utility function
async function fetchVisa(id, locale) {
  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visaById/${id}`;
  try {
    const response = await fetch(api, {
      cache: "no-store",
      headers: {
        "Accept-Language": locale
      }
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching visa:", error);
    return null;
  }
}

async function fetchTagsByIds(ids, locale) {
  const api = `${process.env.NEXT_PUBLIC_API}/tag/get-tagById`;
  try {
    const response = await fetch(api, {
      method: 'POST',
      body: JSON.stringify(ids),
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tags by IDs:", error);
    return [];
  }
}

async function fetchRelatedVisas(locale) {
  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas`;
  try {
    const response = await fetch(api, {
      cache: "no-store",
      headers: {
        "Accept-Language": locale
      }
    });
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching related visas:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id, locale, slug } = await params;
  
  // Simple API call to fetch visa data
  const visa = await fetchVisa(id, locale);
  console.log(visa)

  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  
  // Fetch tag details for metadata if visa has tag IDs
  let visaWithTags = { ...visa };
  if (visa && visa.tags && visa.tags.length > 0 && typeof visa.tags[0] === 'string') {
    const tagDetails = await fetchTagsByIds(visa.tags, locale);
    visaWithTags = { ...visa, tags: tagDetails };
  }
  
  const metadata = {
    title: visaWithTags.title,
    description: visaWithTags.summary,
    category: visaWithTags.type.title,
    creator: visaWithTags.creator.name,
    keywords: Array.isArray(visaWithTags.tags) ? visaWithTags.tags.map(tag => { 
      // Handle both cases: tags with title property or tags as strings
      return tag.title ? tag.title : tag;
    }).join(" , ") : (visaWithTags.tags && visaWithTags.tags.keynotes ? visaWithTags.tags.keynotes.join(" , ") : ""),
    openGraph: {
      title: visaWithTags.title,
      description: visaWithTags.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: visaWithTags.thumbnail.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}

const VisaPost = async ({ params }) => {
  const { id, locale , slug } = await params;
  const canonical = await canonicalUrl()
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  
  // Simple API call to fetch visa data
  const visa = await fetchVisa(id, locale);
  
  if (!visa || visa.slug !== slug) {
    return <RedirectVisa params={params} />
  }
  
  // Enhance visa with full tag details if tags are just IDs
  let enhancedVisa = { ...visa };
  if (visa.tags && visa.tags.length > 0 && typeof visa.tags[0] === 'string') {
    // Tags are IDs, fetch full tag details
    const tagDetails = await fetchTagsByIds(visa.tags, locale);
    enhancedVisa = { ...visa, tags: tagDetails };
  }
  
  const seoTranslations = await getTranslations("Seo");
  const visaTranslations = await getTranslations("Visa")
  
  // Fetch related visas
  const visas = await fetchRelatedVisas(locale);
  
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": canonical.canonical + "#main",
        "name": enhancedVisa.title,
        "url": canonical.canonical,
        "keywords": Array.isArray(enhancedVisa.tags) ? enhancedVisa.tags.map(tag => { 
          // Handle both cases: tags with title property or tags as strings
          return tag.title ? tag.title : tag;
        }).join(" , ") : (enhancedVisa.tags && enhancedVisa.tags.keynotes ? enhancedVisa.tags.keynotes.join(" , ") : ""),
        "serviceType": enhancedVisa.type.title,
        "image": {
          "@type": "ImageObject",
          "url": enhancedVisa.thumbnail.url
        },
        "provider": {
          "@type": "Organization",
          "@id": hostLang + "/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": enhancedVisa.country.title
        },
        "description": enhancedVisa.summary,
        "hasPart": [
          { "@id": canonical.canonical + "#faq" },
          { "@id": canonical.canonical + "#howto" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": canonical.canonical + "#faq",
        "name": visaTranslations("FrequentlyAskedQuestions"),
        "mainEntity": visa.faqs?.map(faq => {
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
        }) || []
      },
      {
        "@type": "HowTo",
        "@id": canonical.canonical + "#howto",
        "name": visaTranslations("StepsRequest"),
        "step": [
          ...(visa.conditions?.map(condition => {
            return (
              {
                "@type": "HowToStep",
                "name": visaTranslations("FullCondition"),
                "text": condition
              }
            )
          }) || []),
          ...(visa.documents?.map((doc) => {
            return (
              {
                "@type": "HowToStep",
                "name": doc.title,
                "text": doc.description
              }
            )
          }) || []),
          ...(visa.roadmap?.map((step) => {
            return (
              {
                "@type": "HowToStep",
                "name": step.title,
                "text": step.description
              }
            )
          }) || [])
        ]
      }
    ]
  };

  console.log("visa",visa)
  return (
    <Main schema={schema} >
      <Container className="!px-0">
        <VisaContent visa={enhancedVisa} locale={locale} related={visas} />
      </Container>
    </Main>
  );
};

export default VisaPost;