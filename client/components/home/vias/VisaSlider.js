"use client";


import VisaCard from "@/components/shared/card/VisaCard";
import VisaCardSkeleton from "@/components/shared/skeleton/VisaCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const VisaSlider = ({ visa }) => {
  return (
    <Swiper
      className="w-full px-4"
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
      slidesPerView="auto"
      spaceBetween={20}
      breakpoints={{
        0: { slidesPerView: 1.2, spaceBetween: 15 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 25 }
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
