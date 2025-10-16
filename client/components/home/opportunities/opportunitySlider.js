'use client'


import OpportunityCard from "@/components/shared/card/OpportunityCard";
import OpportunityCardSkeleton from "@/components/shared/skeleton/opportunityCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const OpportunitySlider = ({ opportunity }) => {

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
      {opportunity && opportunity.length === 0
        ? Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide key={index}>
            <OpportunityCardSkeleton />
          </SwiperSlide>
        ))
        : opportunity.slice(0, 8).map((opportunityItem) => (
          <SwiperSlide  key={opportunityItem._id}>
            <OpportunityCard opportunity={opportunityItem} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default OpportunitySlider;