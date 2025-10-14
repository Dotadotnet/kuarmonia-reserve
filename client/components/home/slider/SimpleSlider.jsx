"use client"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper, useSwiper } from "swiper/react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export default function SimpleSlider({ slides }) {
  const [page, setPage] = useState(0);
  const swiper = useSwiper();
  const sliderRef = useRef(null);

  useEffect(() => {
    setInterval(() => {
      document.querySelectorAll("img.banner-images-swiper").forEach((image) => {
        let height = image.offsetWidth / 3;
        image.style.height = (height + "px")
      })
    }, 100)
  })
  return (
    <div className="mt-6 sm:mt-12">
      <div className="relative">
        <div className="h-full absolute sm:right-10 right-5 -top-3 mb:top-0 flex justify-center items-center">
          <button type="button"
            onClick={() => {
              sliderRef.current.swiper.slidePrev()
            }}
            className="text-3xl z-10 p-1 sm:p-2 transition-all cursor-pointer hover:scale-125   sm:text-4xl font-bold dark:text-white dark:border-white  text-blue-600 border-blue-600 border-2  rounded-full hover:bg-gradient-to-bl  focus:outline-none   text-center">
            <GrFormNext />
          </button>
        </div>
        <div className="h-full absolute sm:left-10 left-5 -top-3 mb:top-0 flex justify-center items-center">
          <button
            onClick={() => {
              sliderRef.current.swiper.slideNext()
            }}

            type="button" className="text-3xl  z-10 p-1 sm:p-2 transition-all cursor-pointer hover:scale-125   sm:text-4xl font-bold dark:text-white dark:border-white  text-blue-600 border-blue-600 border-2  rounded-full hover:bg-gradient-to-bl  focus:outline-none   text-center">
            <GrFormPrevious />
          </button>
        </div>
        <Swiper
          className="w-full  px-4 !flex !justify-center"
          autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          onSlideChange={(event) => {
            setPage(event.realIndex)
          }}
          ref={sliderRef}
          loop={true}
          speed={1300}
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
        >
          {slides.map((slide, index) => {
            return (
              <SwiperSlide key={index} >
                <div className="size-full flex justify-center items-center">
                  <Link href={slide.link}>
                    <Image width={1200} height={400} src={slide.image.url} alt="Banner" className="banner-images-swiper lg:rounded-2xl" style="aspect-ratio: 4 / 1; width: 100%; object-fit: cover;" />
                  </Link>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper >
      </div>
      <div className="flex flex-wrap px-2 justify-center items-center gap-4 sm:gap-8">
        {slides.map((slide, index) => {
          return (
            <Image key={index} onClick={() => {
              sliderRef.current.swiper.slideToLoop(index)
            }} width={200} height={200} src={slide.image.url} alt="Banner" className={"rounded-xl object-cover cursor-pointer size-16 md:size-28 "
              + (page == index ? " shadow-xl scale-110 dark:shadow-gray-500 shadow-gray-600  " : "")
            } />
          );
        })}
      </div>
    </div>
  );
}


