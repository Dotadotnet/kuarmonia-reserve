"use client";


import PropCard from "@/components/shared/card/PropCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PropCardSkeleton from "@/components/shared/card/PropCardSkeleton";

const PropertiesClient = ({ properties }) => {
  return (
    <div className="h-fit ">
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 25 }
        }}
        className="w-full h-fit my-2"
      >
        {properties && properties.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <PropCardSkeleton />
            </SwiperSlide>
          ))
          : properties.slice(0, 8).map((property) => (
            <SwiperSlide key={property._id}>
              <PropCard property={property} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default PropertiesClient;
