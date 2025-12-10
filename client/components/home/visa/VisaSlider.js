"use client";

import React from "react";
import VisaCard from "@/components/shared/card/VisaCard";
import { useLocale } from "next-intl";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const VisaSlider = ({ visas }) => {
  const locale = useLocale();
  const isRTL = ["ar", "fa", "he"].includes(locale);

  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true,
        }}
        dir={isRTL ? "rtl" : "ltr"}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        className="mySwiper"
      >
        {visas.map((visa, index) => (
          <SwiperSlide key={visa._id || index}>
            <div className="">
              <VisaCard visa={visa} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    
    </section>
  );
};

export default VisaSlider;