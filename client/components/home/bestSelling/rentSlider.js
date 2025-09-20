"use client";


import RentCard from "@/components/shared/card/RentCard";
import RentCardSkeleton from "@/components/shared/skeleton/RentCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const RentSlider = ({ rent }) => {
  return (
    <Swiper
    loop={true}
    slidesPerView="auto"
    spaceBetween={20} // فاصله بین اسلایدها
    modules={[Autoplay]}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false
    }}
    breakpoints={{
      0: { slidesPerView: 1.2, spaceBetween: 5 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 20 }
    }}
    className="w-full px-4"
  >
    {rent && rent.length === 0
      ? Array.from({ length: 8 }).map((_, index) => (
          <SwiperSlide key={index}>
            <RentCardSkeleton />
          </SwiperSlide>
        ))
      : rent.map((rentItem) => (
          <SwiperSlide key={rentItem._id}>
            <RentCard tour={rentItem} />
          </SwiperSlide>
        ))}
  </Swiper>
  
  );
};

export default RentSlider;
