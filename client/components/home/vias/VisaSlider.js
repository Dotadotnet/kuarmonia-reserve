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
     
      className="w-full  px-4 !flex !justify-center"
    >
      {visa && visa.length === 0
        ? Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index} >
              <VisaCardSkeleton />
            </SwiperSlide>
          ))
        : visa.map((visaItem) => (
            <SwiperSlide key={visaItem._id} className="!my-8">
              <VisaCard visa={visaItem} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default VisaSlider;
