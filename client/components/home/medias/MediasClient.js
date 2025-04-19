"use client";

import React from "react";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import MediaCard from "@/components/shared/card/MediaCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SkeletonCard from "@/components/shared/card/SkeletonCard";

const MediasClient = ({ medias }) => {
  return (
    <section
      id="medias"
      className="bg-clip-border h-full py-12 dark:bg-gray-900"
      style={{
        backgroundImage:
          "url(/assets/home-page/medias-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText> نمایشگاه </HighlightText> رسانه
              </p>
              <p className="text-base">
                در این ویدئوها، با خدمات تخصصی شرکت ما در زمینه مهاجرت آشنا
                می‌شوید. ما شما را در انتخاب مسیر مناسب برای مهاجرت، آشنایی با
                قوانین جدید و ارائه مشاوره‌های تخصصی همراهی می‌کنیم. این ویدئوها
                می‌توانند به شما در فرآیند تصمیم‌گیری و مهاجرت کمک کنند.
              </p>
            </article>
          </div>

          <Swiper
            modules={[ Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 4500 }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {medias && medias.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <SkeletonCard />
                  </SwiperSlide>
                ))
              : medias.slice(0, 8).map((media) => (
                  <SwiperSlide key={media._id}>
                    <MediaCard media={media} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </section>
      </Container>
    </section>
  );
};

export default MediasClient;
