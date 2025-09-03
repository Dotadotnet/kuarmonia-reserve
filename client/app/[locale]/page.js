import FAQ from "@/components/home/faqs/FAQWrapper";
import Advantage from "@/components/home/advantage/Advantage";
import News from "@/components/home/news/News";
import Blogs from "@/components/home/blogs/Blogs";
import Gallery from "@/components/home/gallery/Gallery";
import Banner1 from "@/components/home/hero/Banner1";
import Hero from "@/components/home/hero/Hero";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import PopularDestination from "@/components/home/popular-destination/PopularDestination";
import Posts from "@/components/home/posts/Posts";
import Properties from "@/components/home/properties/Properties";
import Steps from "@/components/home/steps/Steps";
import Medias from "@/components/home/medias/Medias";
import Reviews from "@/components/shared/review/Reviews";
import Main from "@/layouts/Main";
import Testimonials from "@/components/home/testimonials/Testimonials";
import KeyServices from "@/components/home/steps/KeyServices";
import Destination from "@/components/home/destination/Destination";
import TravelAvailability from "@/components/home/hero/travelAvailability/TravelAvailability";
import Opportunity from "../../components/home/opportunities/Opportunity";
import Rent from "@/components/home/bestSelling/rent";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getLocale, getTranslations } from "next-intl/server";
import language from "../language";
import StoriesSectionServer from "@/components/home/story/page";
import Api from "@/utils/api";
import BlogsServer from "@/components/home/blogs/Blogs";

export async function generateMetadata() {
  const canonical = await canonicalUrl()
  const metadata = {
    alternates: canonical
  };

  return metadata
}



export default async function Home({ params }) {
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const seoTranslations = await getTranslations('Seo');
  const locale = await getLocale();
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);
  const services = await Api('/dynamic/get-all/service');
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
        "mainEntity": services.map((service) => {
          return (
            {
              "@type": "SiteNavigationElement",
              "name": service.title,
              "url": hostLang + "/service/" + service.serviceId + "/" + encodeURIComponent(service.translations.en.slug)
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
    <Main schema={websiteSchema} >
      <StoriesSectionServer params={params} />
      {/* <Hero /> */}
      <KeyServices params={params} />
      <BlogsServer params={params} />
      <News params={params} />
      <Properties params={params} />
      <Opportunity params={params} />
      <Rent params={params} />
      <Visa params={params} />
      <NewsLetter />
    </Main>
  );
}
