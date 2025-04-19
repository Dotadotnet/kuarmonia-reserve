import NewsCardSkeleton from "@/components/shared/skeleton/NewsCardSkeleton";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const NewsLoading = () => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <SwiperSlide key={index}>
            <NewsCardSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default NewsLoading;
