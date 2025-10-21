"use client"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Image from "next/image"
import Link from "next/link"
import React, { useRef, useState } from "react"
import { Autoplay } from "swiper/modules"
import { SwiperSlide, Swiper } from "swiper/react"
import VisaBanner from "./Banner"

export default function SimpleSliderClient({ slides }) {
  const sliderRef = useRef(null)
  const [page, setPage] = useState(0)

  if (!slides || slides.length === 0) {
    return (
      <div className="mt-2 sm:mt-4">
        <div className="relative w-full">
          <div className="w-full h-56 sm:h-64 md:h-80 lg:h-96 bg-gray-200 dark:bg-gray-700 rounded-xl sm:rounded-none animate-pulse"></div>
        </div>
        <br />
      </div>
    )
  }

  return (
    <div className="mt-2 sm:mt-4 w-full">
      <div className="relative mx-auto max-w-screen-2xl">
        {/* نقاط پایین اسلایدر */}
        <div className="absolute z-10 w-full flex bottom-3 sm:bottom-10 justify-center items-center">
          <div className="flex sm:scale-125 justify-center items-center rounded-lg py-1 px-1.5 bg-gray-600 gap-1.5">
            {slides.map((slide, index) => (
              <span
                key={index}
                onClick={() => sliderRef.current?.swiper?.slideToLoop(index)}
                className={`rounded-full cursor-pointer size-2 bg-gray-400 ${page === index ? "bg-white w-4" : ""
                  }`}
              />
            ))}
          </div>
        </div>

        <Swiper
          className="!w-full"
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          onSlideChange={(event) => setPage(event.realIndex)}
          onInit={() => {
            setTimeout(() => {
              const swiper = sliderRef.current?.swiper
              swiper?.autoplay.start()
              swiper?.slideNext()
            }, 1000)
          }}
          loop
          centeredSlides
          ref={sliderRef}
          speed={1300}
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
              spaceBetween: 10,
              centeredSlides: true,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
              centeredSlides: false,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="!flex !justify-center !items-center relative"
            >
              <Link href={slide.link} className="w-full">
                <div className="w-full h-56 sm:h-72 md:h-80 lg:h-[320px] relative overflow-hidden rounded-xl sm:rounded-none">
                  <Image
                    src={slide.image?.url || "/placeholder.jpg"}
                    alt={slide.title || "Banner"}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* متن روی تصویر */}
                  <div
                    className="
                      absolute inset-y-0 flex items-center
                      ltr:left-2 rtl:right-2 text-right rtl:text-left
                      max-w-[50%] p-4 space-y-3
              
                    "
                  >
                    <div className="space-y-2 flex flex-col">
                      {/* عنوان */}
                      {slide.title && (
                        <h2 className="text-white md:text-5xl w-fit text-2xl px-3  rounded-lg backdrop-blur-lg bg-black/50 md:py-4 py-1 inline-block">
                          {slide.title}
                        </h2>
                      )}
                      {/* زیرعنوان */}
                      {slide.subtitle && (
                        <p className="text-white text-lg px-3 md:py-2 py-1 rounded-lg backdrop-blur-lg w-fit bg-black/50 inline-block">
                          {slide.subtitle}
                        </p>
                      )}
                      {/* توضیح */}
                      {slide.description && (
                        <p className="text-white md:text-xl text-md px-3 md:py-4 py-1 rounded-lg w-fit backdrop-blur-lg bg-black/50 inline-block">
                          {slide.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Banner component - only visible on mobile */}
      <VisaBanner />
    </div>
  )
}