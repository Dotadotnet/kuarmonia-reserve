import News from "@/components/home/news/News";
import Hero from "@/components/home/hero/Hero";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import Properties from "@/components/home/properties/Properties";
import Main from "@/layouts/Main";
import KeyServices from "@/components/home/steps/KeyServices";
import Opportunity from "../../components/home/opportunities/Opportunity";
import Rent from "@/components/home/bestSelling/rent";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "../language";
import StoriesSectionServer from "@/components/home/story/page";
import homepageApiService from "@/services/api/homepage.service";
import opportunityApiService from "@/services/api/opportunity.service";
import newsApiService from "@/services/api/news.service";
import propertyApiService from "@/services/api/property.service";
import BlogsServer from "@/components/home/blogs/Blogs";
import Visa from "@/components/home/visa/page";
import VisaTypes from "@/components/home/visa-types/page";
import Intro from "@/components/home/intro/page";
import SimpleSlider from "@/components/home/slider/SimpleSlider";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const canonical = await canonicalUrl()
  const class_lang = new language(locale);
  const lang = class_lang.getInfo();
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);
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
  const [homepageData, opportunities, news, properties] = await Promise.all([
    homepageApiService.getHomepageData(locale),
    opportunityApiService.getHomepageOpportunities(locale),
    newsApiService.getHomepageNews(locale),
    propertyApiService.getHomepageProperties(locale)
  ]);

  const { service, rent, blog } = homepageData;
  const opportunity = opportunities;
  const property = properties;
  console.log(property)
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
    <Main  >
      <>
        <StoriesSectionServer params={params} />
        <SimpleSlider params={params} />
        <Hero />
       {/* <KeyServices  /> */}
        <VisaTypes params={params} />
        <Visa params={params} />
        <News params={params} /> 
        <Properties params={params} />
        <Opportunity params={params} />
        <Rent params={params} /> 
        <NewsLetter />
        <Intro params={params} />
      </>
   </Main>
  );
}
