import Main from "@/layouts/Main";
import "./Style.css";
import Head from "next/head";
import Container from "@/components/shared/container/Container";
import Left from "@/components/detail/rent/Left";
import Right from "@/components/detail/rent/Right";
import AllReviews from "@/components/detail/AllReviews";
import MoreRents from "@/components/detail/MoreRents";
import Api from "@/utils/api";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "@/app/language";
import RedirectRent from "../page";


export async function generateMetadata({ params }) {
  const { id, locale, slug } = params;
  const rent = await Api(`/dynamic/get-one/rent/rentId/${id}`);
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: rent.metaTitle,
    description: rent.metaDescription,
    creator: rent.creator.name,
    keywords: Array.isArray(rent.tags) ? rent.tags.map(tag => { return tag.title }).join(" , ") : rent.tags.keynotes.map(tag => { return tag }).join(" , "),
    openGraph: {
      title: rent.title,
      description: rent.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: rent.gallery[0].url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}

const RentPost = async ({ params }) => {
  const { id, locale, slug } = await params;

  const rent = await Api(`/dynamic/get-one/rent/rentId/${id}`);
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const seoTranslations = await getTranslations('Seo');
  const canonical = await canonicalUrl();
  if (!Array.isArray(rent.reviews)) {
    rent["reviews"] = [rent.reviews]
  }
  let reviewCount = 0;
  let reviewPoint = 0;
  rent.reviews.forEach(review => {
    reviewCount++;
    reviewPoint += review.rating
  });

  if (encodeURIComponent(rent.translations.en.slug) !== slug) {
    return <RedirectRent params={params} />
  }
  const directionClass = locale === "fa" ? "rtl" : "ltr";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": canonical.canonical + "#main",
    "name": rent.title,
    "description": rent.summary,
    "url": canonical.canonical,
    "image": rent.gallery[0].url,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": rent.address.street,
      "addressLocality": rent.address.state,
      "addressRegion": rent.address.city,
      "postalCode": rent.address.postalCode,
      "addressCountry": rent.address.country,
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "PlaqueNumber",
          "value": rent.address.plateNumber
        }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": rent.location?.lat,
      "longitude": rent.location?.lng
    },
    "telephone": rent.address.phone,
    "email": rent.address.email,
    "amenityFeature": rent.information.map((item) => { return { "@type": "LocationFeatureSpecification", "name": item, "value": true } }),
    "priceRange": `$${rent.price} - $${rent.price * rent.members}`,
    "review": rent.reviews.map((review) => {
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
      "ratingValue": reviewPoint / reviewCount,
      "reviewCount": reviewCount
    },
    "starRating": {
      "@type": "Rating",
      "ratingValue": Math.ceil(reviewPoint / reviewCount),
      "bestRating": "5"
    }
  };
  return (
    <Main schema={schema}>
      <div
        className={`  h-full md:pt-24  gap-6 ${directionClass} md:px-4 pt-20`}
      >
        <Container>
          <div className="h-full w-full flex flex-col gap-y-8">
            <div className="grid grid-cols-12 gap-8">
              <Left rent={rent} />
              <Right rent={rent} />
            </div>
            <AllReviews
              className="!px-0"
              targetId={rent._id}
              targetType="rent"
              reviews={Array.isArray(rent.reviews) ? rent.reviews : [rent.reviews]}
            />{" "}
            <MoreRents />
          </div>
        </Container>
      </div>
    </Main>
  );
};

export default RentPost;
