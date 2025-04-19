"use client";

import React from "react";
import PostCard from "@/components/shared/card/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropCardSkeleton from "@/components/shared/card/PropCardSkeleton";

const PostsClient = ({ posts }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={24}
      autoPlay={{ delay: 4500 }}
      breakpoints={{
        0: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 2.2 }
      }}
      className="my-1.5"
    >
      {posts && posts.length === 0
        ? Array.from({ length: 6 }).map((_, index) => (
            <SwiperSlide key={index}>
              <PropCardSkeleton />
            </SwiperSlide>
          ))
        : posts.slice(0, 8).map((post) => (
            <SwiperSlide key={post._id}>
              <PostCard post={post} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default PostsClient;
