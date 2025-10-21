"use client";

import NewsCard from "@/components/shared/card/NewsCard";
import NewsCardSkeleton from "@/components/shared/skeleton/NewsCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

const NewsSlider = ({ news }) => {

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
      disableOnInteraction: false,
    }}
    breakpoints={{
      0: {
        spaceBetween: 20, 
      },
      640: {
        spaceBetween: 60, 
      },
      1024: {
        spaceBetween: 80, 
      }
    }}
    coverflowEffect={{
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    }}
    className="w-full max-w-7xl px-4"
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