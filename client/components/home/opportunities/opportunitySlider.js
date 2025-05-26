'use client'

import React from "react";
import OpportunityCard from "@/components/shared/card/OpportunityCard";
import OpportunityCardSkeleton from "@/components/shared/skeleton/opportunityCardSkeleton";
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
      initialSlide={1}
      slidesPerView="auto"
      spaceBetween={50}
      modules={[EffectCoverflow, Autoplay]}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false,
      }}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      }}
      className="w-full  px-4"
  >
      {opportunity && opportunity.length === 0
        ? Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} className="!w-fit">
              <OpportunityCardSkeleton />
            </SwiperSlide>
          ))
        : opportunity.slice(0, 8).map((opportunityItem) => (
            <SwiperSlide key={opportunityItem._id } className="!w-fit">
              <OpportunityCard opportunity={opportunityItem}  />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default OpportunitySlider;
