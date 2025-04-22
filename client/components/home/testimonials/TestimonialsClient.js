"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Container from "@/components/shared/container/Container";

const testimonials = [
  {
    image: "/assets/images/user1.jpg",
    title: "طراح وب",
    name: "ونسا مارتینز",
    text: "همکاری با تیم شما تجربه فوق‌العاده‌ای بود. طراحی دقیق و پشتیبانی عالی داشتید."
  },
  {
    image: "/assets/images/user2.jpg",
    title: "طراح رابط کاربری",
    name: "سارا بوئن",
    text: "از کیفیت کار و حرفه‌ای بودن تیم شگفت‌زده شدم. مطمئناً دوباره همکاری خواهم کرد."
  },
  {
    image: "/assets/images/user3.jpg",
    title: "توسعه‌دهنده وب",
    name: "دیوید مورفی",
    text: "پروژه دقیقاً همونی شد که انتظار داشتم. خیلی ممنون از زحمات شما."
  },
  {
    image: "/assets/images/user4.jpg",
    title: "طراح موبایل",
    name: "کِلسی وست",
    text: "پیشنهاد می‌کنم با این تیم همکاری کنید. نتیجه‌ عالی خواهد بود."
  },
  {
    image: "/assets/images/user4.jpg",
    title: "طراح موبایل",
    name: "کِلسی وست",
    text: "پیشنهاد می‌کنم با این تیم همکاری کنید. نتیجه‌ عالی خواهد بود."
  }
];

export default function Testimonials() {
  return (
    <Container className="bg-clip-border h-full pt-12 dark:bg-gray-900">
      <section className="w-full flex flex-col items-center ">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
          نظریات مشتریان
        </h2>

        <Swiper
          loop={true}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          spaceBetween={80} // فاصله منفی برای هم‌پوشانی جذاب‌تر
          modules={[EffectCoverflow]}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: false
          }}
          className="w-full max-w-6xl px-4"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!w-80 bg-white dark:bg-black rounded-3xl shadow-xl p-6 flex flex-col !justify-center items-center h-[34rem] transition-all  duration-300 ease-in-out"
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
              <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
              <p className="text-[#9176FF] font-medium">{item.name}</p>
              <p className="text-center text-base my-4 text-gray-700 dark:text-gray-300">
                {item.text}
              </p>
              <button className="bg-[#9176FF] text-white px-4 py-2 rounded-md mt-2 uppercase font-semibold">
                مشاهده بیشتر
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Container>
  );
}
