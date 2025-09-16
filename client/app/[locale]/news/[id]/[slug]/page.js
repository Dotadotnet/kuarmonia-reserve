import NewsContent from "@/components/shared/content/NewsContent";
import Main from "@/layouts/Main";
import Sidebar from "./Sidebar";
import './Style.css';
import Api from "@/utils/api";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "@/app/language";
import RedirectNews from "../page";
import analizeComments from "@/components/shared/seo/analizeComments";
// import { permanentRedirect } from 'next/navigation';


export async function generateMetadata({ params }) {
  const { id, locale, slug } = params;
  const news = await Api(`/dynamic/get-one/news/newsId/${id}?fields=metaTitle,metaDescription,creator,tags,title,summary,thumbnail,type`);
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: news.metaTitle,
    description: news.metaDescription,
    category: news.type.title,
    creator: news.creator.name,
    keywords: Array.isArray(news.tags) ? news.tags.map(tag => { return tag.title }).join(" , ") : news.tags.keynotes.map(tag => { return tag }).join(" , "),
    openGraph: {
      title: news.title,
      description: news.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: news.thumbnail.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}


const NewsPost = async ({ params }) => {

  const { id, locale, slug } = params;
  const news = await Api(`/dynamic/get-one/news/newsId/${id}`);
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const seoTranslations = await getTranslations('Seo');
  const canonical = await canonicalUrl()

  if (!news || news.slug !== slug) {
    return <RedirectNews params={params} />
  }
  const { reviews, reviewCount, reviewPoint } = analizeComments(news);

  const directionClass = locale === "fa" ? "rtl" : "ltr";
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": canonical.canonical + "#main",
    "headline": news.title,
    "datePublished": news.publishDate,
    "dateModified": news.updatedAt,
    "keywords": Array.isArray(news.tags) ? news.tags.map(tag => { return tag.title }).join(" , ") : news.tags.keynotes.map(tag => { return tag }).join(" , "),
    "description": news.summary,
    "publisher": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    },
    "genre": news.type.title,
    "articleSection": Array.isArray(news.categories) ? news.categories[0].title : news.type.title,
    "contentLocation": {
      "@type": "Place",
      "name": news.country.title,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": news.country.title,
        "addressCountry": news.country.code
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": news.thumbnail.url
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical.canonical
    },
    "url": canonical.canonical,
    "articleBody": news.content,
    "review": reviews.map((review) => {
      return ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.guest
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5"
        },
        "reviewBody": review.comment
      })
    })
    ,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviewCount ? reviewPoint / reviewCount : 0 ,
      "reviewCount": reviewCount
    },
  }

  return (
    <Main schema={schema}>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${directionClass} px-4 py-12`}>
        <div className="lg:col-span-2">
          <NewsContent news={news} />
        </div>
        <div className="lg:col-span-1">
          <Sidebar locale={locale} />
        </div>
      </div>
    </Main>
  );
};

export default NewsPost;
