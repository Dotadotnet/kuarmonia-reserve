import Main from "@/layouts/Main";
import PropertyDetail from "@/components/shared/content/PropertyContent";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "@/app/language";


export async function generateMetadata({ params }) {
  const { id, locale, slug } = params;
  const property = await Api(`/dynamic/get-one/property/propertyId/${id}?fields=metaTitle,type,metaDescription,category,creator,tags,title,summary,thumbnail`);
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: property.metaTitle,
    description: property.metaDescription,
    category: property.type.title,
    creator: property.creator.name,
    keywords: Array.isArray(property.tags) ? property.tags.map(tag => { return tag.title }).join(" , ") : property.tags.keynotes.map(tag => { return tag }).join(" , "),
    openGraph: {
      title: property.title,
      description: property.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: property.thumbnail.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}


const Property = async ({ params }) => {

  const { id, locale, slug } = await params;

  const property = await Api(`/dynamic/get-one/property/propertyId/${id}`);
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const seoTranslations = await getTranslations('Seo');
  const canonical = await canonicalUrl();

  if (!property || property.slug !== slug) {
    return <RedirectProperty params={params} />
  }

  const directionClass = locale === "fa" ? "rtl" : "ltr";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Residence",
    "@id": canonical.canonical + "#main",
    "propertyType": property.type.title,
    "builtYear": "",
    "name": property.title,
    "description": property.summary,
    "image": {
      "@type": "ImageObject",
      "url": property.thumbnail.url
    },
    "url": canonical.canonical,
    "numberOfBedrooms": property.building.bedrooms.length,
    "totalUnits": property.building.totalUnits,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": property.address.street,
      "addressLocality": property.address.state,
      "addressRegion": property.address.city,
      "postalCode": property.address.postalCode,
      "addressCountry": property.address.country,
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "PlaqueNumber",
          "value": property.address.plateNumber
        }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": property.location.lat,
      "longitude": property.location.lng
    },
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": String(property.building.square.at(-1)),
      "unitCode": "MTK"
    },
    "numberOfBedrooms": property.building.bedrooms.length,
    "petsAllowed": "yes",
    "amenityFeature": [[...property.features, ...property.amenities].map(feature => { return { "@type": "LocationFeatureSpecification", "name": feature.title, "value": true } })],
    "offers": {
      "@type": "Offer",
      "price": property.variants[0].value,
      "priceCurrency": property.currency.code,
      "availability": "https://schema.org/InStock",
      "dealType": property.tradeType.title
    },
    "availability": "https://schema.org/InStock",
    "isAccessibleForFree": true,
    "seller": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    }
  }


  // {
  //   "@context": "https://schema.org",
  //   "@type": "Residence",
  //   "headline": property.title,
  //   "dateModified": property.updatedAt,
  //   "keywords": property.tags.map(tag => { return tag.title }).join(" , "),
  //   "description": property.summary,
  //   "publisher": {
  //     "@type": "Organization",
  //     "@id": hostLang + "/#organization"
  //   }
  // }

  return (
    <Main schema={schema}>
      <div className="pt-28"></div>
      <PropertyDetail property={property} />
    </Main>
  );
};

export default Property;
