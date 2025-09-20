'use client'

import OpportunityCard from "@/components/shared/card/OpportunityCard";
import OpportunityCardSkeleton from "@/components/shared/skeleton/opportunityCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const OpportunitySlider = ({ opportunity }) => {
  return (
    <Swiper
      slidesPerView="auto"
      loop={true}
      spaceBetween={20} // فاصله بین اسلایدها
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 1.1, spaceBetween: 15 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 25 },
      }}
      className="w-full h-fit my-2"
    >
      {opportunity && opportunity.length === 0
        ? Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index} className="w-[250px]"> {/* عرض ثابت برای کنترل فاصله */}
              <OpportunityCardSkeleton />
            </SwiperSlide>
          ))
        : opportunity.slice(0, 8).map((opportunityItem) => (
            <SwiperSlide key={opportunityItem._id} className="w-[250px]">
              <OpportunityCard opportunity={opportunityItem} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default OpportunitySlider;
