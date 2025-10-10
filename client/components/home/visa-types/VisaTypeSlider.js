"use client";
import VisaTypeCard from "@/components/shared/card/VisaTypeCard";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
const VisaTypeSlider = ({ visaTypes }) => {
    const locale = useLocale();

    if (!visaTypes || visaTypes.length === 0) {
    return (
      <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }
  console.log(visaTypes);
  
  return (
    <Swiper
      className="w-full  px-4 !flex !justify-center"
      autoplay={{
        delay: 1000,
        disableOnInteraction: true,
      }}
      loop={true}
      speed={1300}
      modules={[Autoplay]}
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
        300: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        // when window width is >= 480px
        640: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // when window width is >= 640px
        960: {
          slidesPerView: 4,
          spaceBetween: 40
        },
        1280: {
          slidesPerView: 5,
          spaceBetween: 50
        }
      }}
    >
      {visaTypes.slice(0, 8).map((item) => {
        const itemTitle = item?.translations?.find(
          (t) => t.language === locale
        )?.translation?.fields?.title;
        return (
          <SwiperSlide key={item._id} className="">
            <div key={item._id}
              className="keen-slider__slide">
              <VisaTypeCard
                visaType={item}
                title={itemTitle}
                summary={null}
                locale={locale}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper >
  );
};

export default VisaTypeSlider;