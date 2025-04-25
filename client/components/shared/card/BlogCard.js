"use client";
import React, { useState, useEffect } from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import { TfiHeart } from "react-icons/tfi";
import { PiBookmarkSimpleDuotone } from "react-icons/pi";
import { Star } from "@/utils/SaveIcon";
import Image from "next/image";
import {
  MdOutlineFlight,
  MdTravelExplore,
  MdLocationOn,
  MdLuggage,
  MdOutlineLanguage
} from "react-icons/md";

const BlogCard = ({
  id,
  index,
  title,
  description,
  thumbnailPreview,
  publishDate,
  creator,
  superAdmin,
  isLoading,
  slug
}) => {  
  return ( 
    <a href={'/blog/' + slug?.replaceAll(" ","-")}>
      <div
        key={id || index}
        className="relative flex w-full scale-90 max-w-[26rem] flex-col rounded-xl bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 bg-clip-border text-gray-700 shadow-lg h-[550px] hover:border-primary cursor-pointer dark:hover:border-blue-500"
      >
        <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          {!thumbnailPreview && (
            <SkeletonImage
              width={1150}
              height={500}
              showSize={true}
              borderRadius="rounded-xl"
              className="z-0"
            />
          )}
          <Image
            src={thumbnailPreview || "/placeholder.png"}
            alt="Blog Image"
            width={1150}
            height={500}
            className="w-full h-64 object-cover object-center rounded-xl"
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
          <button
            className="!absolute top-4 right-4 h-12 max-h-[40px] w-12 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <TfiHeart size={30} />
            </span>
          </button>
          <button
            className="!absolute top-4 left-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-dark="true"
          >
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <PiBookmarkSimpleDuotone size={30} />
            </span>
          </button>
        </div>
        <div className="px-6 py-2">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="block  text-md tracking-normal dark:text-blue-100 min-w-[80%] ">
              {title ? `${title}` : <SkeletonText lines={1} />}
            </h5>
            <p className="flex items-center gap-1.5 text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
              <Star />
              5.0
            </p>
          </div>
          <div className="  text-base text-justify leading-relaxed text-gray-700 dark:text-blue-100 antialiased line-clamp-4  overflow-hidden text-ellipsis break-words">
            {description ? description : <SkeletonText lines={5} />}
          </div>
          <div className="absolute bottom-1 right-1 w-full px-3">
            {/* آیکون‌ها */}
            <div className="group inline-flex flex-wrap items-center gap-3">
              <span
                data-tooltip-target="flight"
                aria-label="پرواز"
                title="پرواز"
                className="custom-button !p-3"
              >
                <MdOutlineFlight className="h-6 w-6" />
              </span>
              <span
                data-tooltip-target="explore"
                aria-label="جهان‌گردی"
                title="جهان‌گردی"
                className="custom-button !p-3"
              >
                <MdTravelExplore className="h-6 w-6" />
              </span>
              <span
                data-tooltip-target="location"
                aria-label="موقعیت مکانی"
                title="موقعیت مکانی"
                className="custom-button !p-3"
              >
                <MdLocationOn className="h-6 w-6" />
              </span>
              <span
                data-tooltip-target="luggage"
                aria-label="چمدان"
                title="چمدان"
                className="custom-button !p-3"
              >
                <MdLuggage className="h-6 w-6" />
              </span>
              {/* <span
                data-tooltip-target="language"
                aria-label="زبان و ارتباطات"
                title="زبان و ارتباطات"
                className="custom-button !p-3"
              >
                <MdOutlineLanguage className="h-6 w-6" />
              </span> */}
            </div>

            {/* تاریخ و عکس */}
            <div className="flex items-center justify-between w-full mt-3">
              {/* تاریخ */}
              <div className="text-sm dark:text-gray-100 w-full ml-2">
                {publishDate ? (
                  <span>
                    {new Date(publishDate).toLocaleDateString("fa-IR", {
                      weekday: "long"
                    })}{" "}
                    - {new Date(publishDate).toLocaleDateString("fa-IR")}
                  </span>
                ) : (
                  <SkeletonText lines={1} />
                )}
              </div>

              {/* عکس نویسنده */}
              <div className="flex items-center">
                {isLoading || !creator ? (
                  <div className="dark:!border-gray-600 text-center rounded-full flex justify-center">
                    <SkeletonImage
                      height={30}
                      width={30}
                      showSize={false}
                      borderRadius="rounded-full lg:!w-9 lg:!h-9"
                    />
                  </div>
                ) : (
                  <div className="text-center rounded-full flex justify-center">
                    <Image
                      alt={creator?.name}
                      title={creator?.name}
                      src={creator?.avatar?.url}
                      width={36}
                      height={36}
                      className="relative inline-block rounded-full object-cover object-center hover:z-10"
                    />
                    {creator?.name !== superAdmin?.name && (
                      <Image
                        alt={creator?.name}
                        title={creator?.name}
                        src={creator?.avatar?.url}
                        width={36}
                        height={36}
                        className="relative inline-block rounded-full object-cover object-center hover:z-10"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </a>
  );
};

export default BlogCard;
