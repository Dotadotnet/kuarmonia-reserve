import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import language from "@/app/language";

function Left() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const t = useTranslations("HomePage");
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  var prev = null;
  var next = null;
  const lang = useLocale();
  const class_lang = new language(lang);
  if (class_lang.getInfo().dir == "ltr") {
    prev = "custom-next";
    next = "custom-prev";
  } else {
    prev = "custom-prev";
    next = "custom-next";
  }
  return (
    <div className="col-span-1 h-full min-h-[450px] w-full flex flex-col relative px-3 ">
      <div className="absolute w-full top-1/2  flex justify-between z-50">
        <div
          className={
            prev +
            " " +
            "hover:scale-125 transition-all  ltr:right-1 rtl:-right-5 absolute flex justify-center items-center p-4 border-4 rounded-full cursor-pointer text-gray-700 w-8 h-8 bg-white dark:bg-gray-700 border-white dark:border-gray-900 -lg text-lg"
          }
        >
          <span>
            <IoIosArrowForward size={30} className="dark:text-gray-100 " />
          </span>
        </div>
        <div
          className={
            next +
            " " +
            " hover:scale-125 transition-all ltr:-left-5 rtl:left-1 absolute flex justify-center items-center p-4 border-4 rounded-full cursor-pointer dark:border-gray-900 text-gray-700 w-8 h-8 bg-gray-100 border-white  text-lg dark:bg-gray-700"
          }
        >
          <span>
            <IoIosArrowBack size={30} className="dark:text-gray-100" />
          </span>
        </div>
      </div>
      <div
        className="w-full relative h-full rounded-primary md:rounded-primary mt-6 flex flex-col "
        style={{
          backgroundImage:
            "url(/assets/home-page/banner/dots.svg), linear-gradient(to bottom right, #2DD4BF, #2563EB)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden"
        }}
      >
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 9000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev"
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="flex flex-col gap-y-4 justify-start items-center p-4 text-right ">
          <h2
                className="text-5xl  text-white  w-full text-right"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="rtl:font-nozha ">{t("5")}</span>
                <br />{" "}
                <span className="text-2xl font-vazir text-black">
                  {t("6")}
                </span>
                <br />
              </h2>
            </div>

            <div
              className={`absolute  flex  -bottom-8 ${
                lang === "fa" ? "left-44" : "right-44"
              } md:flex`}
            >
              {" "}
              <motion.div
                animate={{
                  y: ["0px", "20px", "0px"]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3
                }}
              >
                <Image
                  src="/assets/home-page/banner/building1.webp"
                  height={872}
                  width={500}
                  alt="سرمایه گذاری"
                  className="w-40 block md:mr-auto"
                  style={{ aspectRatio: "500 / 872" }}
                  priority
                />
              </motion.div>
            </div>
            <div
              className={`absolute  flex  -bottom-8 ${
                lang === "fa" ? "-left-60" : "-right-44"
              } md:flex`}
            >
              {" "}
              <motion.div
                animate={{
                  y: ["0px", "20px", "0px"]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3
                }}
              >
                <Image
                  src="/assets/home-page/banner/marriage1.webp"
                  height={500}
                  width={500}
                  alt="ازدواج بین‌المللی"
                  className="w-80 ml-4 block md:mr-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col gap-y-4 p-4">
              <h2
                className="text-5xl [word-spacing:0.4rem] text-white  w-full text-right"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-nozha ">{t("11")}</span>
                <br />{" "}
                <span className="text-2xl [word-spacing:0.4rem] text-black">
                  {t("12")}
                </span>
                <br />
              </h2>
            </div>
            <div
              className={`absolute  flex  -bottom-8 ${
                lang === "fa" ? "-left-44" : "-right-44"
              } md:flex`}
            >
              <motion.div
                animate={{
                  y: ["0px", "20px", "0px"]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3
                }}
              >
                <Image
                  src="/assets/home-page/banner/marriage2.webp"
                  height={872}
                  width={500}
                  alt="ازدواج بین االمللی"
                  className="w-80  ml-4 block md:mr-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col p-4 gap-y-4">
              <h2
                className="text-5xl [word-spacing:0.4rem] text-white font-nozha w-full text-right"
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {t("9")}
                <br />{" "}
                <span className="text-4xl [word-spacing:0.4rem] text-black">
                  {t("10")}
                </span>
                <br />
              </h2>
            </div>
            <div
              className={`absolute  flex  -bottom-8 ${
                lang === "fa" ? "-left-44" : "-right-44"
              } md:flex`}
            >
              {" "}
              <motion.div
                animate={{
                  y: ["0px", "20px", "0px"]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 3
                }}
              >
                <Image
                  src="/assets/home-page/banner/tourism.webp"
                  height={872}
                  width={500}
                  alt="'گردشگری و تفریحی"
                  className="  ml-4 block md:mr-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>

          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Left;
