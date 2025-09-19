import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
import VisaTypeContent from "./VisaTypeContent";
import canonicalUrl from "@/components/shared/seo/canonical";
import language from "@/app/language";

export async function generateMetadata({ params }) {
  const { id, locale, slug } = await params;
  console.log(id, locale, slug);

  const visaType = await Api(`/dynamic/get-one/visaType/visaTypeId/${id}?fields=title,summary,creator,tags,thumbnail`);
  console.log("",visaType);
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
    alternates: canonical
  };
  return metadata;
}

const VisaTypePost = async ({ params }) => {
  const { id, locale } = await params;
  
  // دریافت اطلاعات نوع ویزا
  const visaType = await Api(`/dynamic/get-one/visaType/visaTypeId/${id}`);
  
  // دریافت ویزاهای مرتبط با این نوع
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
        "@type": "Article",
        "@id": canonical.canonical + "#article",
        "headline": visaType.title,
        "description": visaType.summary,
        "image": visaType.thumbnail?.url,
        "author": {
          "@type": "Person",
          "name": visaType.creator?.name || "Kuarmonia"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Kuarmonia",
          "logo": {
            "@type": "ImageObject",
            "url": process.env.NEXT_PUBLIC_BASE_URL + "/logo2.png"
          }
        },
        "datePublished": visaType.createdAt,
        "dateModified": visaType.updatedAt,
        "inLanguage": locale
      },
      {
        "@type": "FAQPage",
        "@id": canonical.canonical + "#faq",
        "mainEntity": visaType.faqs?.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        })) || []
      }
    ]
  };

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
