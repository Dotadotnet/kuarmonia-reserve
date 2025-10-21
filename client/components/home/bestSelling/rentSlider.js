"use client";

import RentCard from "@/components/shared/card/RentCard";
import RentCardSkeleton from "@/components/shared/skeleton/RentCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const RentSlider = ({ rent }) => {
  return (
    <Swiper
      loop={true}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 4 }
      }}
      spaceBetween={10}
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 4500, disableOnInteraction: true, }}
      className="w-full h-fit z-50 my-2 "
    >
      {rent && rent.length === 0
        ? Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index}>
              <RentCardSkeleton />
            </SwiperSlide>
          ))
        : rent.slice(0, 8).map((rentItem) => (
            <SwiperSlide key={rentItem._id}>
              <RentCard tour={rentItem} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default RentSlider;