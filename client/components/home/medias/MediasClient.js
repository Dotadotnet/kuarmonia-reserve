"use client";

import React from "react";

import MediaCard from "@/components/shared/card/MediaCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SkeletonCard from "@/components/shared/card/SkeletonCard";

const MediasClient = ({ medias }) => {
  return (
   
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 4500 }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 }
            }}
          >
            {medias && medias.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <SkeletonCard />
                  </SwiperSlide>
                ))
              : medias.slice(0, 8).map((media) => (
                  <SwiperSlide key={media._id}>
                    <MediaCard media={media} />
                  </SwiperSlide>
                ))}
          </Swiper>
    
  );
};

export default MediasClient;
