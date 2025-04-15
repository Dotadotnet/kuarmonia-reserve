import FAQ from "@/components/detail/FAQ";
import Advantage from "@/components/home/advantage/Advantage";
import BestSelling from "@/components/home/bestSelling/BestSelling";
import Blogs from "@/components/home/blogs/Blogs";
import Gallery from "@/components/home/gallery/Gallery";
import Banner1 from "@/components/home/hero/Banner1";
import Hero from "@/components/home/hero/Hero";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import PopularDestination from "@/components/home/popular-destination/PopularDestination";
import Post from "@/components/home/posts/Post";
import Properties from "@/components/home/properties/Properties";
import KeyServices from "@/components/home/steps/KeyServices";
import Steps from "@/components/home/steps/Steps";
import Video from "@/components/home/video-gallery/VideoGallery";
import Container from "@/components/shared/container/Container";
import Reviews from "@/components/shared/review/Reviews";
import Main from "@/layouts/Main";

export default async function Home() {
  const res_blog = await fetch(process.env.API + '/blog/get-blogs');
  const blogs = await res_blog.json();
  const res_post = await fetch(process.env.API + '/post/get-posts');
  const posts = await res_post.json();
  const res_properties = await fetch(process.env.API + '/property/get-propertys');
  const properties = await res_properties.json();
  const res_media = await fetch(process.env.API + '/media/get-medias');
  const medias = await res_media.json();
  return (
    <>
      <Main>
        <Hero />
        <Properties Properties={properties}/>
        <Video medias={medias} />
        <Advantage />
        <Post posts={posts} />
        <Blogs blogs={blogs} />
        <Gallery />
        <BestSelling />
        <Reviews />
        <Steps />
        <PopularDestination />
        <NewsLetter />
        <FAQ />
      </Main>
    </>
  );
}
