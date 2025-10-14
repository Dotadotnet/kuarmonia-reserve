"use client";


import VisaCard from "@/components/shared/card/VisaCard";
import VisaCardSkeleton from "@/components/shared/skeleton/VisaCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

const VisaSlider = ({ visa }) => {
  return (
    <div>
      <Swiper
       
        loop={true}
        speed={1300}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          300: {
            slidesPerView: 1.5,
            spaceBetween: 10,
            simulateTouch: true,
            centeredSlides: true,
            centeredSlidesBounds: true,
            centerInsufficientSlides: false,
            speed: 600,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          960: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20
          }
        }}

      >
        {
          visa.map((visaItem, index) => {
            if (index % 2 == 0) {
              if (visa[index + 1]) {
                return (
                  <SwiperSlide  >
                    <VisaCard key={visaItem._id} visa={visaItem} />
                    <div className="mt-5"></div>
                    <VisaCard key={visa[index + 1]._id} visa={visa[index + 1]} />
                  </SwiperSlide>
                )
              } else {
                return (
                  <SwiperSlide  >
                    <div className="size-full flex justify-center items-center">
                      <VisaCard key={visaItem._id} visa={visaItem} />
                    </div>
                  </SwiperSlide>
                )
              }
            }
          })
        }
      </Swiper >
    </div>
  );
};

export default VisaSlider;