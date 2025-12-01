import React from "react";
import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import { getTranslations } from "next-intl/server";
import canonicalUrl from "@/components/shared/seo/canonical";
import language from "@/app/language";
import { FaTags, FaPassport, FaBriefcase, FaHome, FaUniversity } from "react-icons/fa";
import Image from "next/image";
import TagItemCard from "@/components/shared/card/TagItemCard";

// Create a simple API utility function
async function fetchTagByTagId(tagId, locale) {
  const api = `${process.env.NEXT_PUBLIC_API}/tag/get-tag-by-id/${tagId}`;
  try {
    const response = await fetch(api, {
      cache: "no-store",
      headers: {
        "Accept-Language": locale
      }
    });
    
    // Check if response is OK
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return null;
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON:', contentType);
      return null;
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tag:", error);
    return null;
  }
}

async function fetchItemsByTag(tagId, locale, page = 1) {
  // First get the actual tag to get its _id
  const tag = await fetchTagByTagId(tagId, locale);
  if (!tag) {
    return { data: [], total: 0 };
  }
  
    const api = `${process.env.NEXT_PUBLIC_API}/tag/get-items/${page}/${tag._id}`;
  try {
    const response = await fetch(api, {
      cache: "no-store",
      headers: {
        "Accept-Language": locale
      }
    });
    
    // Check if response is OK
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { data: [], total: 0 };
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items by tag:", error);
    return { data: [], total: 0 };
  }
}

// New function to fetch visas by tag



export async function generateMetadata({ params }) {
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const { tagId, locale, slug } = params;
  const tag = await fetchTagByTagId(tagId, locale);
  
  // Return default metadata if tag not found
  if (!tag) {
    return {
      title: "Tag Not Found",
      description: "The requested tag could not be found.",
    };
  }
  
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: seoTranslations("TagName") + " | " + tag.title,
    description: tag.description,
    keywords: tag.keynotes ? tag.keynotes.map(kw => kw).join(" , ") : null,
    creator: tag.creator?.name,
    openGraph: {
      title: tag.title,
      description: tag.description,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: tag.thumbnail?.url || host + "/banners/1.jpg",
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}

export default async function TagPage({ params, searchParams }) {
  const { tagId, slug, locale } = params;
  const paramsGet = await searchParams;
  const page = paramsGet.page || 1;
  
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);
  
  // Fetch tag data
  const tag = await fetchTagByTagId(tagId, locale);
  
  // Redirect if tag not found or slug mismatch
  if (!tag) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tag Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">The requested tag could not be found.</p>
        <a 
          href="/" 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
        >
          Back to Home
        </a>
      </div>
    );
  }
  
  // Redirect if slug mismatch
  if (tag.slug !== slug) {
    // In a real app, you might want to redirect to the correct URL
    // For now, we'll show the content anyway since the ID is correct
    console.warn(`Slug mismatch: expected ${tag.slug}, got ${slug}`);
  }
  
  // Fetch items associated with this tag
  const itemsResponse = await fetchItemsByTag(tagId, locale, page);
  const items = itemsResponse.data || [];
  const totalItems = itemsResponse.total || 0;
  
  console.log("items",items)
  // Fetch services associated with this tag
  
  const canonical = await canonicalUrl()
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "keywords": tag.keynotes ? tag.keynotes.map(kw => kw).join(" , ") : null,
    "name": tag.title,
    "description": tag.description,
    "url": canonical.canonical,
    "image": {
      "@type": "ImageObject",
      "url": tag.thumbnail?.url || host + "/banners/1.jpg",
    },
    "publisher": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    },
    "hasPart": items?.data.map((item) => {
      return {
        "@type": "Article", // Default type, adjust based on actual item type
        "@id": item.canonicalUrl || (hostLang + "/item/" + item._id)
      }
    })
  };

  return (
    <Main schema={schema}>
      <Container className="pt-28 sm:pt-34">
        <div className="flex flex-col gap-6">
          {/* Tag Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            {/* Tag Thumbnail - Full width on mobile, fixed size on desktop */}
            {tag.thumbnail?.url ? (
              <div className="w-full md:w-auto">
                <div className="relative w-full h-48 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={tag.thumbnail.url}
                    alt={tag.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 128px, 160px"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full md:w-auto flex items-center justify-center h-48 md:h-32 lg:w-40 lg:h-40 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700">
                <FaTags className="text-4xl text-gray-400 dark:text-gray-500" />
              </div>
            )}
            
            {/* Tag Info */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-3">
                <FaTags className="text-2xl text-primary" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {tag.title}
                </h1>
              </div>
              
              {tag.description && (
                <p 
                  className="text-gray-700 dark:text-gray-300 mb-4"
                  style={{ textAlign: 'justify', textAlignLast: 'center' }}
                >
                  {tag.description}
                </p>
              )}
              
              {tag.keynotes && tag.keynotes.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tag.keynotes.map((keyword, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Items Section */}
          <div className="my-6 px-4">
            {items?.total > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items?.data.map((item) => (
                  <TagItemCard key={item._id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  محتوایی مرتبط با این تگ یافت نشد.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Main>
  );
}