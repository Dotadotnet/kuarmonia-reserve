"use client";


import PostCard from "@/components/shared/card/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PropCardSkeleton from "@/components/shared/card/PropCardSkeleton";

const PostsClient = ({ posts }) => {
  return (
    <div className="h-full">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={20}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 1.2, spaceBetween: 15 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 25 }
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
    </div>
  );
};

export default PostsClient;
