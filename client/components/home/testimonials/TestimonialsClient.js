"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "./Style.css"
import { useTranslations } from "next-intl";
export default function Testimonials({ testimonials }) {
  const t = useTranslations("HomePage")
  const middleSlide = Math.floor(testimonials.length / 2);

  return (
    <Swiper
      loop={true}
      effect="coverflow"
      grabCursor
      centeredSlides
      initialSlide={middleSlide}
      slidesPerView="auto"
      spaceBetween={80}
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
      className="w-full max-w-7xl px-4"
    >
      {testimonials.map((item, index) => (
        <SwiperSlide
          key={index}
          className="!w-75 md:80 bg-white dark:bg-black rounded-3xl shadow-xl p-6 flex flex-col !justify-center items-center h-[34rem] transition-all duration-300 ease-in-out"
        >
          <div className="flex w-full justify-center">
            <div className="w-40 h-40 border-4 border-[#9176FF] p-1 rounded-full mb-6">
              <img
                src={item.image}
                alt="نظریه مشتری"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <h3 className="text-xl text-center font-semibold mb-1">{item.title}</h3>
          <p className="text-[#9176FF] text-center font-medium">{item.name}</p>
          <p className="text-center text-base my-4 text-gray-700 dark:text-gray-300">
            {item.text}
          </p>
          <div className="flex justify-center items-center">
            <button className="bg-[#9176FF] text-white px-4 py-2 rounded-md mt-2 uppercase font-semibold">
              {t("100")}
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
