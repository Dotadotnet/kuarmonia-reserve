"use client";

import React from "react";
import PropCard from "@/components/shared/card/PropCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, FreeMode ,Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PropCardSkeleton from "@/components/shared/card/PropCardSkeleton";

const PropertiesClient = ({ properties }) => {

  return (

          <div className="h-fit ">
            <Swiper
              slidesPerView={1.7}
              breakpoints={{
                1024: { slidesPerView: 3.5 }
              }}
              spaceBetween={10}
              modules={[Pagination, FreeMode, Autoplay ]}
              freeMode={true}
              autoplay={{ delay: 4500 }}

              className="w-full h-fit z-50 my-2 "
            >
              {properties && properties.length === 0
                ? Array.from({ length: 6 }).map((_, index) => (
                    <SwiperSlide key={index}>
                      <PropCardSkeleton />
                    </SwiperSlide>
                  ))
                : properties.slice(0, 8).map((property) => (
                    <SwiperSlide key={property._id}>
                      <PropCard property={property} />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
   
  );
};

export default PropertiesClient;
