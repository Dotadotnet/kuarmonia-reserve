"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import VisaTypeCard from "@/components/shared/card/VisaTypeCard";
import { useLocale } from "next-intl";

const VisaTypeSlider = ({ visaTypes }) => {
  const locale = useLocale();

  if (!visaTypes || visaTypes.length === 0) {
    return (
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={15}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 25 }
        }}
        className="w-full"
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView="auto"
      spaceBetween={15}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 2, spaceBetween: 15 },
        640: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 25 }
      }}
      className="w-full"
    >
      {visaTypes.map((item) => {
        const itemTitle = item?.translations?.find(
          (t) => t.language === locale
        )?.translation?.fields?.title;

        return (
          <SwiperSlide key={item._id}>
            <VisaTypeCard
              visaType={item}
              title={itemTitle}
              summary={null}
              locale={locale}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default VisaTypeSlider;
