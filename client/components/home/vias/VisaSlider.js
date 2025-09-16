"use client";


import VisaCard from "@/components/shared/card/VisaCard";
import VisaCardSkeleton from "@/components/shared/skeleton/VisaCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
const VisaSlider = ({ visa }) => {
  return (
    <Swiper
      className="w-full  px-4 !flex !justify-center"
      autoplay={{
        delay: 1000,
        disableOnInteraction: true,
      }}
      loop={true}
      speed={1300}
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        400: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        // when window width is >= 480px
        640: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // when window width is >= 640px
        960: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 50
        }
      }}
    >
      {visa.map((visaItem) => (
        <SwiperSlide key={visaItem._id} className="!my-8">
          <VisaCard visa={visaItem} />
        </SwiperSlide>
      ))
      }
    </Swiper >
  );
};

export default VisaSlider;
