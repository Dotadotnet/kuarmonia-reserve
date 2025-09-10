"use client";


import BlogCard from "@/components/shared/card/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BlogCardSkeleton from "@/components/shared/skeleton/BlogCardSkeleton";

const BlogsClient = ({ blogs }) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      slidesPerView={1}
      spaceBetween={24}
      autoplay={{ delay: 4500 }}
      breakpoints={{
        0: { slidesPerView: 1.1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }}
    >
      {blogs && blogs.length === 0
        ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <BlogCardSkeleton />
            </SwiperSlide>
          ))
        : blogs.slice(0, 8).map((blogItem) => (
            <SwiperSlide key={blogItem._id}>
              <BlogCard data={blogItem} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default BlogsClient;
