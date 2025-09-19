"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import VisaTypeCard from "@/components/shared/card/VisaTypeCard";
import { useLocale } from "next-intl";

const VisaTypeSlider = ({ visaTypes }) => {
  const locale = useLocale();

  if (!visaTypes || visaTypes.length === 0) {
    return (
      <Swiper
        modules={[Grid]}
        grid={{ rows: 2, fill: "row" }}
        slidesPerView={2.5}
        spaceBetween={12}
        breakpoints={{
          0: { slidesPerView: 2.5, spaceBetween: 12 },
          1024: { slidesPerView: 4.5, spaceBetween: 16 }
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
      modules={[Grid, Autoplay]}
      grid={{ rows: 2, fill: "row" }}
      slidesPerView={2.5}
      spaceBetween={12}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      breakpoints={{
        0: { slidesPerView: 2.5, spaceBetween: 12 },
        1024: { slidesPerView: 4.5, spaceBetween: 16 }
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
