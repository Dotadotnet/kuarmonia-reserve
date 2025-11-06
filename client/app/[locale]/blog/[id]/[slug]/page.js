import Content from "@/components/shared/content/Content";
import LeftSidebar from "./leftSidebar";
import Main from "@/layouts/Main";
import RightSidebar from "./rightSidebar";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "@/app/language";
import analizeComments from "@/components/shared/seo/analizeComments";
// import { permanentRedirect } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { id, locale, slug } = params;
  
  // Use fetch instead of Api utility
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-one/blog/blogId/${id}?fields=metaTitle,metaDescription,category,creator,tags,title,description,thumbnail`);
  const blog = await response.json();
  
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: blog.metaTitle,
    description: blog.metaDescription,
    category: blog.category.title,
    creator: blog.creator.name,
    keywords: Array.isArray(blog.tags) ? blog.tags.map(tag => { return tag.title }).join(" , ") : blog.tags.keynotes.map(tag => { return tag }).join(" , "),
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: blog.thumbnail.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}


const BlogContent = async ({ params }) => {
  const { id, locale, slug } = params;
  
  // Use fetch instead of Api utility
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/dynamic/get-one/blog/blogId/${id}`);
  const blog = await response.json();
  
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const seoTranslations = await getTranslations('Seo');
  const canonical = await canonicalUrl()

  if (!blog || blog.slug !== slug) {
    return <RedirectBlog params={params} />
  }
  
  const { reviews, reviewCount, reviewPoint } = analizeComments(blog);

  const directionClass = locale === "fa" ? "rtl" : "ltr";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": canonical.canonical + "#main",
    "url": canonical.canonical,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical.canonical
    },
    "headline": blog.title,
    "alternativeHeadline": blog.metaDescription,
    "description": blog.description,
    "image": {
      "@type": "ImageObject",
      "url": blog.thumbnail.url
    },
    "author": {
      "@type": "Person",
      "name": blog.creator.name
    },
    "editor": blog.creator.name,
    "genre": blog.category.title,
    "keywords": Array.isArray(blog.tags) ? blog.tags.map(tag => { return tag.title }).join(" , ") : blog.tags.keynotes.map(tag => { return tag }).join(" , "),
    "publisher": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    },
    "datePublished": blog.publishDate,
    "dateModified": blog.updatedAt,
    "isAccessibleForFree": true,
    "commentCount": reviewCount,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/CommentAction",
      "userInteractionCount": reviewCount
    },

    "articleBody": blog.content,
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
      "ratingValue": reviewCount ? reviewPoint / reviewCount : 0,
      "reviewCount": reviewCount
    }
  }
  return (
    <main>
      <Main schema={schema}>
        <div className="grid grid-cols-1 md:grid-cols-20 gap-4 dark:bg-gray-900 p-4 relative mt-2">
          <LeftSidebar />
          <Content data={blog} />
          <RightSidebar />
        </div>
      </Main>
    </main>
  );
};

export default BlogContent;