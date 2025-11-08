"use client";
import IntroClient from "./IntroClient";
import { getLocalizedIntroData, conclusion } from "./Data";

export default function HomeIntroSection({ params }) {
  const locale = params?.locale || 'fa';
  const { hero, about, seo, keyFeatures, productCategories, additionalCategories } = getLocalizedIntroData(locale);
  
  return (
    <IntroClient 
      hero={hero}
      about={about}
      seo={seo}
      keyFeatures={keyFeatures}
      productCategories={productCategories}
      additionalCategories={additionalCategories}
      conclusion={conclusion}
    />
  );
}
