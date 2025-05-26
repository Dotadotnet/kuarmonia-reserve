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

export default async function Home({ params }) {
  return (
    <Main >
      <Hero  />
      <KeyServices params={params}   />
      <News params={params}  />
      <Properties params={params} />
      <Opportunity  params={params} />
      <Rent  params={params} />
      <Gallery />
      {/* <Testimonials /> */}
      <FAQ />
      <Destination />
      <NewsLetter />
    </Main>
  );
}
