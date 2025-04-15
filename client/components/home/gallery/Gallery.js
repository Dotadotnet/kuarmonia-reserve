"use client";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
import {
  useGetFirstGalleryQuery,
  useGetGalleryQuery
} from "@/services/gallery/galleryApi";
import Image from "next/image";
import Container from "@/components/shared/container/Container";

const Gallery = () => {
  const { data, isLoading, error } = useGetFirstGalleryQuery();
  const galleries = data?.data || [];
  const [selectedGalleryId, setSelectedGalleryId] = useState(galleries[0]?._id);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetGalleryQuery(selectedGalleryId, {
    skip: !selectedGalleryId
  });
  const galleryData = useMemo(() => fetchData?.data || {}, [fetchData]);
 console.log(galleryData)
  const containerRef = useRef(null);
  const [tab, setTab] = useState(null);
  useEffect(() => {
    if (data) {
      setSelectedGalleryId(galleries[0]?._id);
    }
    if (tab) {
      setSelectedGalleryId(tab);
    }
  }, [isLoading, [tab]]);



  const renderSkeleton = () => {
    return (
      <section className="w-full h-full flex flex-col gap-y-12  dark:bg-gray-900">
        <div className="flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText>گالری</HighlightText> تصاویر
              <Image
                src="/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5"
              />
            </p>
            <p className="text-base">
              با مرور گالری تصاویر، شما با کیفیت خدمات و راهکارهای ما آشنا
              می‌شوید و می‌توانید ببینید که چگونه ما به مشتریان خود ارزش افزوده
              می‌دهیم.
            </p>
          </article>
        </div>

        <div className="border border-primary/30  rounded-2xl bg-secondary/30  lg:p-12 md:p-6 p-3 animate-pulse">
          <div className="grid grid-cols-12 items-center gap-4 h-[720px] overflow-hidden">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className={`lg:col-span-3 md:col-span-6 col-span-12 border w-full bg-gray-300 drop-shadow rounded ${
                  index % 2 === 0 ? "row-span-2 h-[364px]" : "h-[159px]"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  };


  return (
    <section id="deals" className="h-full py-12 dark:bg-gray-900">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>گالری</HighlightText> تصاویر
                <Image
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
                  />
              </p>
              <p className="text-base">
                با مرور گالری تصاویر، شما با کیفیت خدمات و راهکارهای ما آشنا
                می‌شوید و می‌توانید ببینید که چگونه ما به مشتریان خود ارزش
                افزوده می‌دهیم.
              </p>
            </article>
          </div>

          <div className="border border-primary/30 dark:border-blue-500 rounded-2xl bg-secondary/30  lg:p-12 md:p-6 p-3 dark:text-gray-100 dark:bg-[#0a2d4d]">
            <div className="flex flex-col gap-y-8">
              {/* تب‌های دسته‌بندی */}
              <div className="flex flex-row flex-wrap gap-4">
                {galleries.map((galleryItem) => (
                  <span
                    key={galleryItem?._id}
                    className={
                      "border border-primary dark:border-blue-500 px-4 py-1 rounded-secondary text-sm hover:bg-primary dark:hover:bg-blue-500 hover:border-secondary hover:text-white transition-colors cursor-pointer" +
                      " " +
                      (tab === galleryItem?._id
                        ? "bg-primary dark:bg-blue-500 border-secondary text-white"
                        : "")
                    }
                    onClick={() => setTab(galleryItem?._id)}
                  >
                    {galleryItem?.title}
                  </span>
                ))}
              </div>

              {/* گالری تصاویر */}
              <div className="relative">
                {/* گالری تصاویر */}
                <div className="relative">
                  <div
                    className="grid grid-cols-12 items-center gap-4 h-[720px] overflow-y-hidden scrollbar-hide"
                    ref={containerRef}
                  >
                    {galleryData?.gallery && galleryData.gallery.length > 0
                      ? galleryData.gallery.map((image, index) => (
                          <Image
                            key={`${image._id}-${index}`}
                            src={image.url}
                            alt=""
                            height={(index + 1) % 2 === 0 ? 364 : 159}
                            width={267}
                            className={`lg:col-span-3 md:col-span-6 col-span-6 border w-full object-cover border-primary/30 drop-shadow rounded ${
                              index % 2 === 0
                                ? "row-span-2 h-[364px]"
                                : "h-[159px]"
                            }`}
                          />
                        ))
                      : Array.from({ length: 9 }).map((_, index) => (
                          <div
                            key={index}
                            className={`lg:col-span-3 md:col-span-6 col-span-12 border w-full bg-gray-300 drop-shadow rounded animate-pulse ${
                              index % 2 === 0
                                ? "row-span-2 h-[364px]"
                                : "h-[159px]"
                            }`}
                          ></div>
                        ))}
                  </div>
                </div>

                {/* دکمه‌های اسکرول */}
                <div className="absolute top-4 right-4 flex flex-col gap-y-2">
                  <span
                    className="p-1.5 border border-primary dark:border-blue-500 rounded-secondary bg-secondary dark:bg-blue-500/80 hover:bg-primary dark:hover:bg-blue-500 hover:border-secondary hover:text-white  transition-colors cursor-pointer"
                    onClick={() => {
                      const container = containerRef.current;
                      const scrollAmount = -512;
                      container.scrollBy({
                        top: scrollAmount,
                        behavior: "smooth"
                      });
                    }}
                  >
                    <BiUpArrowAlt className="h-6 w-6 text-white" />
                  </span>
                  <span
                    className="p-1.5 border border-primary dark:border-blue-500 rounded-secondary bg-secondary dark:bg-blue-500/30 hover:bg-primary dark:hover:bg-blue-500 hover:border-secondary hover:text-white  transition-colors cursor-pointer"
                    onClick={() => {
                      const container = containerRef.current;
                      const scrollAmount = 512;
                      container.scrollBy({
                        top: scrollAmount,
                        behavior: "smooth"
                      });
                    }}
                  >
                    <BiDownArrowAlt className="h-6 w-6 text-white" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Gallery;
