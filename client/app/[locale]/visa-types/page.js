import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
import VisaTypeCard from "@/components/shared/card/VisaTypeCard";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "@/i18n/navigation";
import canonicalUrl from "@/components/shared/seo/canonical";
import language from "@/app/language";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const canonical = await canonicalUrl();
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo();
  
  const metadata = {
    title: seoTranslations("ModelPageAllTitle.visaType") || "انواع ویزا",
    description: seoTranslations("ModelPageAllDis.visaType") || "انواع مختلف ویزا و راهنمای کامل",
    keywords: "انواع ویزا, ویزای توریستی, ویزای تحصیلی, ویزای کاری, راهنمای ویزا",
    openGraph: {
      title: seoTranslations("ModelPageAllTitle.visaType") || "انواع ویزا",
      description: seoTranslations("ModelPageAllDis.visaType") || "انواع مختلف ویزا و راهنمای کامل",
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata;
}

const VisaTypesPage = async ({ params }) => {
  const { locale } = await params;
  const api = `${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypes`;
  
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["visaType"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const visaTypes = res.data || [];
  
  const t = await getTranslations("VisaType", locale);
  const seoTranslations = await getTranslations('Seo');

  return (
    <Main>
      <Container>
        <div className="py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {seoTranslations("ModelPageAllTitle.visaType") || "انواع ویزا"}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {seoTranslations("ModelPageAllDis.visaType") || "انواع مختلف ویزا و راهنمای کامل برای انتخاب بهترین گزینه"}
            </p>
          </div>

          {/* Visa Types Grid */}
          {visaTypes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visaTypes.map((visaType) => {
                const { title, summary } = visaType?.translations?.find(
                  (t) => t.language === locale
                )?.translation?.fields || {};
                
                return (
                  <VisaTypeCard
                    key={visaType._id}
                    visaType={visaType}
                    title={title}
                    summary={summary}
                    locale={locale}
                  />
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                  {/* Image Skeleton */}
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  
                  {/* Content Skeleton */}
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Main>
  );
};

export default VisaTypesPage;
