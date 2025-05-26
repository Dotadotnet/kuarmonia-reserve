"use client";

import React from "react";
import RentCard from "@/components/shared/card/RentCard";
import RentCardSkeleton from "@/components/shared/skeleton/RentCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const RentSlider = ({ rent }) => {
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
      {rent && rent.length === 0
        ? Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-fit ">
              <RentCardSkeleton />
            </SwiperSlide>
          ))
        : rent.slice(0, 8).map((rentItem) => (
            <SwiperSlide key={rentItem._id} className="!w-fit ">
              <RentCard tour={rentItem} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default RentSlider;
