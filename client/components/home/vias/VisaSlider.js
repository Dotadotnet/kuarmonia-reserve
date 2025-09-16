"use client";


import VisaCard from "@/components/shared/card/VisaCard";
import VisaCardSkeleton from "@/components/shared/skeleton/VisaCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const VisaSlider = ({ visa }) => {
  return (
    <Swiper
      loop={true}
      effect="coverflow"
      grabCursor
      centeredSlides
      initialSlide={1}
      slidesPerView="auto"
      spaceBetween={80}
      modules={[EffectCoverflow, Autoplay]}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false
      }}
      className="w-full  px-4 !flex !justify-center"
    >
      {visa && visa.length === 0
        ? Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-fit ">
              <VisaCardSkeleton />
            </SwiperSlide>
          ))
        : visa.map((visaItem) => (
            <SwiperSlide key={visaItem._id} className="!w-fit !my-8 !m-0">
              <VisaCard visa={visaItem} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default VisaSlider;
