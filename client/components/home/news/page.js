import React from "react";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import NewsCard from "@/components/shared/card/NewsCard";
import NewsCardSkeleton from "@/components/shared/skeleton/NewsCardSkeleton"; // اضافه کردن Skeleton
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const News = async () => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/news/get-news`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["news"] }
  });
  const res = await response.json();
  const news = res.data;

  return (
    <section id="flights" className="py-12 dark:bg-gray-900">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>جدید ترین</HighlightText> اخبار
              </p>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/news"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                بیشتر ببینید <BiRightArrowAlt />
              </Link>
            </div>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {/* اگر خبری وجود نداشته باشد، Skeleton‌ها را نمایش بده */}
            {news && news.length === 0
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <NewsCardSkeleton />
                  </SwiperSlide>
                ))
              : news.slice(0, 8).map((newsItem) => (
                  <SwiperSlide key={newsItem._id || newsItem.id}>
                    <NewsCard news={newsItem} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </section>
      </Container>
    </section>
  );
};

export default News;
