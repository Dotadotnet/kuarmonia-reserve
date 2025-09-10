
import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import Introduction from "./Introduction";
import HeaderSection from "./HeaderSection";
import TeamSection from "./TeamSection";
import CompanyResults from "./CompanyResult";
import UserTestimonials from "./UserTestimonials";
import TeamSlider from "./TeamMembers";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import canonicalUrl from "@/components/shared/seo/canonical";
import { getLocale, getTranslations } from "next-intl/server";
import language from "@/app/language";

export async function generateMetadata() {
  const canonical = await canonicalUrl()
  const seoTranslations = await getTranslations('Seo');
  const locale = await getLocale();
  const class_language = new language(locale);
  const lang = class_language.getInfo()
  const metadata = {
    title: seoTranslations("pageAboutTitle"),
    description: seoTranslations("pageAboutDis"),
    openGraph: {
      title: seoTranslations("pageAboutTitle"),
      description: seoTranslations("pageAboutDis"),
      url: canonical.canonical,
      siteName: seoTranslations("siteName"),
      images: "https://s3-console.kuarmonia.com/main/e58b2333-8860-4f68-a9a2-522004e2cfe8.webp", // لینک تصویر
      locale: lang.lang + "-" + lang.loc,
      type: "website"
    },
    alternates: canonical
  };
  return metadata
}

async function AboutUs() {

  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const t = await getTranslations("ForAll");
  const seoTranslations = await getTranslations('Seo');
  const canonical = await canonicalUrl()
  const locale = await getLocale();
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t("4"),
    "url": hostLang + "/about",
    "description": seoTranslations("pageAboutDis"),
    "mainEntity": {
      "@type": "Organization",
      "@id": hostLang + "/#organization"
    }
  }

  return (
    <Main schema={schema}>
      <HeaderSection />
      <Container
        className={"max-w-full bg-blue-100 relative dark:bg-gray-900"}
      >
        <Introduction />
        <TeamSection />
        <CompanyResults />
        <UserTestimonials />
        <TeamSlider />
        <NewsLetter />
      </Container>
    </Main>
  );
}

export default AboutUs;
