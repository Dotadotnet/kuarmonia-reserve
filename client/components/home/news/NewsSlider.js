"use client";

import NewsCard from "@/components/shared/card/NewsCard";
import NewsCardSkeleton from "@/components/shared/skeleton/NewsCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const NewsSlider = ({ news }) => {

  return (
    <Swiper
    loop={true}
    slidesPerView="auto"
    spaceBetween={20}
    modules={[Autoplay]}
    autoplay={{
      delay: 4000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      0: { slidesPerView: 1.2, spaceBetween: 15 },
      640: { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 25 }
    }}
    className="w-full max-w-6xl px-4"
  >
      {news && news.length === 0
        ? Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-70 md:!w-[450px]">
              <NewsCardSkeleton />
            </SwiperSlide>
          ))
        : news.slice(0, 8).map((newsItem) => (
            <SwiperSlide key={newsItem._id } className="!w-70 md:!w-[450px]">
              <NewsCard news={newsItem}  />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default NewsSlider;
