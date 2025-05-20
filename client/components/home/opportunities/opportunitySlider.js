'use client'

import React from "react";
import OpportunityCard from "@/components/shared/card/OpportunityCard";
import OpportunityCardSkeleton from "@/components/shared/skeleton/OpportunityCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const OpportunitySlider = ({ opportunity }) => {

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
        spaceBetween: 40, 
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
    className="w-full max-w-6xl px-4"
  >
      {opportunity && opportunity.length === 0
        ? Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-70 md:!w-[450px]">
              <OpportunityCardSkeleton />
            </SwiperSlide>
          ))
        : opportunity.slice(0, 8).map((opportunityItem) => (
            <SwiperSlide key={opportunityItem._id } className="!w-70 md:!w-[450px]">
              <OpportunityCard opportunity={opportunityItem}  />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default OpportunitySlider;
