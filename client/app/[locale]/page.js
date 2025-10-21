import NewsSection from "@/components/home/news/News";
// import Hero from "@/components/home/hero/Hero";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import Properties from "@/components/home/properties/Properties";
import Main from "@/layouts/Main";
// import KeyServices from "@/components/home/steps/KeyServices";
import Opportunity from "../../components/home/opportunities/Opportunity";
import Rent from "@/components/home/bestSelling/rent";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "../language";
import Stories from "@/components/home/story/page";
import Visa from "@/components/home/visa/page";
import VisaTypes from "@/components/home/visa-types/page";
import Intro from "@/components/home/intro/page";
import Api from "@/utils/api";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "@/components/home/slider/page";
import KeyServices from "@/components/home/steps/KeyServicesSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const canonical = await canonicalUrl()
  const class_lang = new language(locale);
  const lang = class_lang.getInfo();
  const seoTranslations = await getTranslations('Seo');
  const metadata = {
    title: seoTranslations("defaultTitle"),
    description: seoTranslations("defaultDis"),
    keywords: seoTranslations("defaultKeywords"),
    openGraph: {
      title: seoTranslations("defaultTitle"),
      description: seoTranslations("defaultDis"),
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: host + "/banners/1.jpg",
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      site: "@kuarmonia",
      title: seoTranslations("defaultTitle"),
      description: seoTranslations("defaultDis"),
      image: host + "/banners/1.jpg"
    },
    alternates: canonical
  };

  return metadata
}

export default async function Home({ params }) {
  const { locale } = await params;
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);
  
  // Handle API response safely
  let apiResponse;
  try {
    apiResponse = await Api('/page/home');
  } catch (error) {
    console.error('Error fetching home page data:', error);
    // Provide default empty values to prevent destructuring errors
    apiResponse = { 
      banner: [], 
      service: [], 
      rent: [], 
      opportunity: [], 
      news: [], 
      visa: [], 
      blog: [], 
      property: [] 
    };
  }
  
  // Check if apiResponse is valid before destructuring
  const { banner = [], service = [], rent = [], opportunity = [], news = [], visa = [], blog = [], property = [] } = apiResponse || {};
  
  const websiteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": hostLang + "/#website",
        "url": hostLang,
        "name": seoTranslations("siteName"),
        "description": seoTranslations("siteDis"),
        "publisher": {
          "@id": hostLang + "/#organization"
        },
        "inLanguage": lang.lang + "-" + lang.loc,
        "potentialAction": {
          "@type": "SearchAction",
          "target": hostLang + "/search/{search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "mainEntity": service.map((serviceItem) => {
          return (
            {
              "@type": "SiteNavigationElement",
              "name": serviceItem.title,
              "url": hostLang + "/service/" + serviceItem.serviceId + "/" + encodeURIComponent(serviceItem.slug)
            }
          )
        })
      },
      {
        "@type": "Organization",
        "@id": hostLang + "/#organization",
        "name": seoTranslations("siteName"),
        "url": hostLang,
        "logo": {
          "@type": "ImageObject",
          "url": host + "/logo2.png",
          "width": 765,
          "height": 700
        },
        "image": {
          "@type": "ImageObject",
          "url": host + "/banners/1.jpg",
          "width": 1200,
          "height": 400
        },
        "email": "info@kuarmonia.com",
        "founder": {
          "@type": "Person",
          "name": "marjan gharegoozloo"
        },
        "location": [
          {
            "@type": "Place",
            "name": "Head Office",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "St Lillian 65",
              "addressLocality": "Toronto",
              "addressRegion": "Toronto",
              "addressCountry": "CA"
            },
          },
          {
            "@type": "Place",
            "name": "Turkey Branch",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Gaziosmanpaşa kazım Özalp mahallesi kuleli Sokak no 14 / 15",
              "addressLocality": "istanbul",
              "addressRegion": "istanbul",
              "addressCountry": "TR"
            },
          }
        ],
        "telephone": "+905433575933",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+905433575933",
            "contactType": "customer service",
            "areaServed": "CA",
            "availableLanguage": ["fa", "en", "tr"]
          },
          {
            "@type": "ContactPoint",
            "telephone": "+14376675933",
            "contactType": "customer service",
            "areaServed": "CA",
            "availableLanguage": ["fa", "en", "tr"]
          }
        ]
        ,
        "sameAs": [
          "https://www.facebook.com/kuarmonia",
          "https://www.instagram.com/kuarmonia",
          "https://t.me/kuarmonia",
          "https://wa.me/905433575933"
        ]
      }
    ]
  }    
  return (
    <Main schema={websiteSchema}  >
      <>
        <Stories params={params} />
        <Slider params={params} />
        {/* <Hero /> */}
        <KeyServices params={params} />
        <VisaTypes params={params} />
        <Visa params={params} />
     <NewsSection params={params} /> 
        <Properties params={params} />
        <Opportunity params={params} />
        <Rent params={params} />
        <NewsLetter />
        <Intro params={params} /> 
      </>
   </Main>
  );
}