"use client";

import React from "react";
import PostCard from "@/components/shared/card/PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropCardSkeleton from "@/components/shared/card/PropCardSkeleton";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const PostsClient = ({ posts }) => {
  return (
    <div className="relative h-full">
      <div className="custom-prev right-5 -top-1  absolute flex justify-center items-center !p-4 border-2 rounded-full cursor-pointer  custom-button w-6 h-6 b border-white  text-lg ">
        <span>
          <IoIosArrowForward size={20}  />
        </span>
      </div>
      <div className="custom-next left-5 -top-1  absolute flex justify-center items-center !p-4 border-2 rounded-full cursor-pointer  custom-button   w-6 h-6 b border-white  text-lg ">
        <span>
          <IoIosArrowBack size={20}   />
        </span>
      </div>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={24}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev"
        }}
        autoPlay={{ delay: 4500 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.2 }
        }}
        className="my-1.5  !mt-12"
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
