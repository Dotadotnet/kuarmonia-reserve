import OpportunityContent from "@/components/shared/content/opportunity/OpportunityContent";
import Main from "@/layouts/Main";
import "./Style.css";
import Api from "@/utils/api";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getTranslations } from "next-intl/server";
import language from "@/app/language";
import RedirectOpportunity from "../page";


export async function generateMetadata({ params }) {
  const { id, locale, slug } = params;
  const opportunity = await Api(`/dynamic/get-one/opportunity/opportunityId/${id}?fields=metaTitle,refId,metaDescription,creator,tags,title,summary,thumbnail`);
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: opportunity.metaTitle,
    description: opportunity.metaDescription,
    category: opportunity.refId.jobType.title,
    creator: opportunity.creator.name,
    keywords: Array.isArray(opportunity.tags) ? opportunity.tags.map(tag => { return tag.title }).join(" , ") : opportunity.tags.keynotes.map(tag => { return tag }).join(" , "),
    openGraph: {
      title: opportunity.title,
      description: opportunity.summary,
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: opportunity.thumbnail.url,
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}


const OpportunityPost = async ({ params }) => {

  const { id, locale, slug } = await params;

  const opportunity = await Api(`/dynamic/get-one/opportunity/opportunityId/${id}`);
  const hostLang = process.env.NEXT_PUBLIC_BASE_URL + (locale == "fa" ? "" : "/" + locale);
  const seoTranslations = await getTranslations('Seo');
  const canonical = await canonicalUrl();

  if (!opportunity || opportunity.slug !== slug) {
    return <RedirectOpportunity params={params} />
  }

  const directionClass = locale === "fa" ? "rtl" : "ltr";
  const schema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": opportunity.title,
    "image": {
      "@type": "ImageObject",
      "url": opportunity.thumbnail.url
    },
    "description": opportunity.summary,
    "datePosted": opportunity.createdAt,
    "employmentType": opportunity.refId.jobTime.title,
    "workHours": opportunity.refId.jobTime.description,
    "jobBenefits": opportunity.benefits,
    "url": canonical.canonical,
    "@id": canonical.canonical + "#main",
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": opportunity.city.city,
        "addressRegion": opportunity.country.country,
        "addressCountry": opportunity.country.country
      }
    },
    "applicantLocationRequirements": {
      "@type": "Country",
      "name": opportunity.country.country
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": opportunity.refId.currency.code,
      "value": {
        "@type": "QuantitativeValue",
        "value": opportunity.refId.salary.max,
        "unitText": "MONTH"
      }
    },
    "hiringOrganization": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    },
    "industry": opportunity.refId.jobType.title,
    "skills": opportunity.skills,
    "educationRequirements": opportunity.documents.join(" , "),
    "experienceRequirements": opportunity.refId.experienceLevel[0].title,
    "directApply": true
  }


  return (
    <Main schema={schema}>
      <div
        className={`grid grid-cols-1  h-full md:pt-20 lg:grid-cols-3 gap-6 ${directionClass} md:px-4 pt-20`}
      >
        <div className="lg:col-span-3">
          <OpportunityContent opportunity={opportunity} />
        </div>

      </div>
    </Main>
  );
};

export default OpportunityPost;
