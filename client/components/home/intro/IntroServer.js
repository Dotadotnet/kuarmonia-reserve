import React from "react";
import { siteConfig, conclusion, getLocalizedIntroData } from "./Data";
import IntroClient from "./IntroClient";
import { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const locale = params?.locale || 'fa';
  const { hero, about, seo } = getLocalizedIntroData(locale);
  
  const title = `${hero.title} | مهاجرت، ویزا، ازدواج بین‌المللی و رزرو هتل`;
  const description = `${hero.subtitle} — ${hero.description}`;
  const keywords = "کارمونیا, مهاجرت, ویزا, ویزای شنگن, ویزای دانشجویی, ویزای کاری, ازدواج بین‌المللی, رزرو هتل, مشاوره مهاجرتی, ترجمه رسمی";
  
  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fa_IR',
      url: siteConfig.siteUrl,
      siteName: siteConfig.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function IntroServer({ params }) {
  const locale = params?.locale || 'fa';
  const { hero, about, seo, keyFeatures, productCategories, additionalCategories } = getLocalizedIntroData(locale);

  return (
    <div
      className=" p-4 md:p-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Pass data to client component */}
        <IntroClient 
          hero={hero}
          about={about}
          seo={seo}
          keyFeatures={keyFeatures}
          productCategories={productCategories}
          additionalCategories={additionalCategories}
          conclusion={conclusion}
        />
      </div>
    </div>
  );
}