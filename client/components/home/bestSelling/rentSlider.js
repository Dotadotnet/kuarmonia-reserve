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
      initialSlide={0}
      slidesPerView="auto"
      spaceBetween={80}
      modules={[EffectCoverflow, Autoplay]}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false
      }}
      breakpoints={{
        0: {
          spaceBetween: 40
        },
        640: {
          spaceBetween: 60
        },
        1024: {
          spaceBetween: 80
        }
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false
      }}
      className="w-full max-w-6xl px-4"
    >
      {rent && rent.length === 0
        ? Array.from({ length: 8 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-70 md:!w-[450px]">
              <RentCardSkeleton />
            </SwiperSlide>
          ))
        : rent.slice(0, 8).map((rentItem) => (
            <SwiperSlide key={rentItem._id} className="!w-70 md:!w-[450px]">
              <RentCard tour={rentItem} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default RentSlider;
