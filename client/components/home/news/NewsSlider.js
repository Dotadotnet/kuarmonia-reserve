"use client";
import React from "react";
import NewsCard from "@/components/shared/card/NewsCard";
import NewsCardSkeleton from "@/components/shared/skeleton/NewsCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const NewsSlider = ({ news }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
      breakpoints={{
        0: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {news && news.length === 0
        ? Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index}>
              <NewsCardSkeleton />
            </SwiperSlide>
          ))
        : news.slice(0, 8).map((newsItem) => (
            <SwiperSlide key={newsItem._id }>
              <NewsCard news={newsItem}  />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default NewsSlider;
