import NewsSection from "@/components/home/news/News";
// import Hero from "@/components/home/hero/Hero";
import NewsLetter from "@/components/home/news-letter/NewsLetter";
import Properties from "@/components/home/properties/Properties";
import Main from "@/layouts/Main";
import Stories from "@/components/home/story/page";
import Visa from "@/components/home/visa/page";
import VisaType from "@/components/home/visatype/page";
import Intro from "@/components/home/intro/page";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "@/components/home/slider/page";
import KeyServices from "@/components/home/steps/KeyServicesSection";



export default async function Home({ params }) {
  
  return (
    <Main   >
      <>
         <Stories params={params} />
       <Slider params={params} />
        <KeyServices params={params} />
       <VisaType params={params} />  

        <Visa params={params} />
     {/* <NewsSection params={params} />  */}
        {/* <Properties params={params} />
        <Opportunity params={params} />
        <Rent params={params} /> 
        <NewsLetter /> */}
        <Intro params={params} /> 
      </>
   </Main>
  );
}