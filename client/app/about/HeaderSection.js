"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
  Autoplay
} from "swiper/modules";

const HeaderSection = () => {
  const TypingAnimation = ({ texts, speed = 9000, pause = 12000 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        if (displayedText.length > 0) {
          const timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, speed / 2);
          return () => clearTimeout(timeout);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        if (displayedText.length < currentText.length) {
          const timeout = setTimeout(() => {
            setDisplayedText(
              (prev) => prev + currentText[displayedText.length]
            );
          }, speed);
          return () => clearTimeout(timeout);
        } else {
          const timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pause);
          return () => clearTimeout(timeout);
        }
      }
    }, [displayedText, isDeleting, texts, textIndex, speed, pause]);
    return (
      <div style={{ direction: "rtl" }}>
        {displayedText}
        <span className="cursor font-thin">|</span>
      </div>
    );
  };

  const sliders = [
    {
      title: "ازدواج بین المللی",
      description:
        "ارائه مشاوره و راهنمایی جهت انجام مراحل قانونی ازدواج بین‌المللی"
    },
    {
      title: "مهاجرت",
      description:
        "برنامه‌ریزی، تهیه مدارک و مشاوره برای مهاجرت به کشورهای مختلف"
    },
    {
      title: "سرمایه گذاری",
      description:
        "کمک به انتخاب فرصت‌های سرمایه‌گذاری امن و مناسب در کشورهای مقصد"
    },
    {
      title: "اخذ ویزا",
      description: "راهنمایی و خدمات اخذ انواع ویزا متناسب با نیاز شما"
    },
    {
      title: "پی گیری امور وکالتی",
      description: "پیگیری امور وکالتی و قانونی مرتبط با مهاجرت و سرمایه‌گذاری"
    }
  ];


  return (
    <div
      className="bg-blue-100  h-[1000px] md:h-screen dark:bg-gray-900 pt-36 bg-no-repeat bg-center relative"
      style={{
        backgroundImage: "url('/assets/about/mainBanner.jpg')",
        backgroundAttachment: "fixed", // این ویژگی باعث می‌شود که پس‌زمینه حرکت نکند
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
<div className="absolute inset-0 h-[1000px] md:h-screen bg-[rgba(59,130,246,0.7)]"></div>

      <section className=" grid grid-cols-1 md:grid md:grid-cols-2  ">
        <div className="container h-fit">
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
              enabled: true
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            breakpoints={{
              769: {
                slidesPerView: 1,
                slidesPerGroup: 1
              }
            }}
            scrollbar={true}
            navigation={false}
            pagination={{
              renderBullet: (index, className) => {
                return `<span className="${className} custom-pagination-dot"></span>`;
              }
            }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
            className="h-full"
          >
            {sliders.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="headline pera-content  text-center">
                  <div className="flex flex-col gap-2 justify-center">
                    <h1 className="text-3xl rounded-sm  bg-cyan-300 text-white w-fit py-2 text-right px-6  bg-opacity-70	 ">
                      کارمونیا
                    </h1>

                    <h1 className=" text-4xl md:text-6xl rounded-sm bg-cyan-300 text-white  md:w-[550px] py-4 text-right px-2 font-bold bg-opacity-70	w-[350px] ">
                      {slide.title}
                    </h1>
                    <p className=" text-md md:text-lg rounded-sm bg-cyan-300 text-white  md:w-[550px] py-4 mb-8 text-right px-2  bg-opacity-70	w-fit ">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="h-screen flex-1 ">
          <motion.div
            className="gt-banner-men absolute z-10"
            initial={{ opacity: 0,x: 0  }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.5,
              duration: 1.5,
              type: "tween"
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <motion.div
              className="gt-banner-men position-absolute"
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0]
              }}
              transition={{
                delay: 0.5,
                duration: 1.5,
                type: "tween",
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <Image
                src={"/assets/about/men.png"}
                alt="men"
                width={550}
                height={550}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className=" absolute translate-y-28 translate-x-28 left-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2,
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <Image
              src="/assets/about/glass.png"
              width={300}
              height={300}
              alt="glass"
              className="w-10 h-10"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2,
              duration: 2,
              ease: "easeInOut"
            }}
            className=" absolute  translate-y-96  left-0"
          >
           <Image
              src="/assets/about/plane1.png"
              width={800}
              height={800}
              alt="plane1"
              className="w-36 h-36"
            />
          </motion.div>
          <div className="parent" style={{ position: "relative", overflow: "hidden" }}>

          <motion.div
            className=" fixed  z-0 top-24"
            initial={{ opacity: 1, x: 300 }}
            animate={{
              opacity: 1,
              x: [-200, -800, -200]
            }}
            transition={{
              delay: 2,
              duration: 30,
              type: "tween",
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <img
              src="https://tragod.com/wp-content/uploads/2024/04/cloud2.webp"
              alt="Banner"
            />
          </motion.div>
          </div>

          <div className="absolute ">
            {/* <img decodin
               
               g="async" src="https://tragod.com/wp-content/uploads/2024/04/banner_img_3.webp" alt=""  /> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeaderSection;
