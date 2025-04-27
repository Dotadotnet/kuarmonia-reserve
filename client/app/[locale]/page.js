import FAQ from "@/components/detail/FAQ";
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

export default async function Home() {

  return (
    <>
      <Main>
        <Hero />
        <News />
        <Advantage />
        <Properties />
        <Medias  />
        <Posts/>
        <Blogs  />
        <Steps />
        <PopularDestination />
        <Gallery />
        <Testimonials />
        <FAQ />
        <NewsLetter />
      </Main>
    </>
  );
}
