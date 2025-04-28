"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function KarmoniaTestimonials() {
  const t = useTranslations("About")
  const [activeTestimonial, setActiveTestimonial] = useState("");
  const testimonials = [
    {
      id: 1,
      name: "Client 1",
      image: "/assets/about/client1.png",
      text: t("28")
    },
    {
      id: 2,
      name: "Client 2",
      image: "/assets/about/client3.png",
      text: t("29")
    },
    {
      id: 3,
      name: "Client 3",
      image: "/assets/about/client2.png",
      text: t("30") 
    }
  ];

  useEffect(() => {
    setActiveTestimonial(testimonials[0].text);
  }, []);

  const handleProfileClick = (testimonialText) => {
    setActiveTestimonial(testimonialText);
  };

  return (
    <section className="py-14  rounded-primary bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 dark:bg-gray-900 lg:py-24 bg-blue-100 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 rounded-full">
          <h2 className="text-4xl font-manrope font-bold text-gray-900 text-center">
            {t("27")}
          </h2>
        </div>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          className="mySwiper2"
        >
          <SwiperSlide>
            <motion.div
              key={activeTestimonial} // برای انیمیشن تغییر
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mb-20"
            >
              <div className="max-w-max mx-auto lg:max-w-4xl">
                <p className="text-lg text-gray-500 leading-8 mb-8 text-center">
                  {activeTestimonial}
                </p>
              </div>
            </motion.div>
          </SwiperSlide>
        </Swiper>

        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          loop={true}
          className="mySwiper max-w-[320px]"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide
              key={testimonial.id}
              onClick={() => handleProfileClick(testimonial.text)}
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={600}
                height={600}
                className="mx-auto scale-90 transition-transform duration-300 hover:scale-100 w-16 border rounded-full border-indigo-600 object-cover cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
