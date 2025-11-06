import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import { getTranslations } from "next-intl/server";
import VisaTypeContent from "./VisaTypeContent";
import canonicalUrl from "@/components/shared/seo/canonical";
import language from "@/app/language";

// Create a simple API utility function
async function fetchVisaType(id, locale) {
  const api = `${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypeById/${id}`;
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
    console.error("Error fetching visa type:", error);
    return null;
  }
}

// async function fetchRelatedVisas(id, locale) {
//   const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas?type=${id}`;
//   try {
//     const response = await fetch(api, {
//       cache: "no-store",
//       headers: {
//         "Accept-Language": locale
//       }
//     });
//     const data = await response.json();
//     return data.data || [];
//   } catch (error) {
//     console.error("Error fetching related visas:", error);
//     return [];
//   }
// }

export async function generateMetadata({ params }) {
  const { id, locale, slug } = await params;
  
  // Simple API call to fetch visa type data
  const visaType = await fetchVisaType(id, locale);
  

  const canonical = await canonicalUrl();
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo();
  
  const metadata = {
    title: visaType.title,
    description: visaType.summary,
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
  
  // Simple API call to fetch visa type data
  const visaType = await fetchVisaType(id, locale);
  

  
  // const relatedVisas = await fetchRelatedVisas(id, locale);

  return (
      <Container className="!px-0">
        <VisaTypeContent
          visaType={visaType}
          locale={locale}
          // relatedVisas={relatedVisas}
        />
      </Container>
  );
};

export default VisaTypePost;