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
