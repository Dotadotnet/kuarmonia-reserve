"use client";
import React, { useState, useEffect } from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import { TfiHeart } from "react-icons/tfi";
import { PiBookmarkSimpleDuotone } from "react-icons/pi";
import { Star } from "@/utils/SaveIcon";
import { FaStar } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";

import Image from "next/image";
import {
  MdOutlineFlight,
  MdTravelExplore,
  MdLocationOn,
  MdLuggage,
  MdOutlineLanguage
} from "react-icons/md";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import analizeComments from "../seo/analizeComments";
import language from "@/app/language";

const BlogCard = ({ data }) => {
  const locale = useLocale();
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);
  const url = hostLang + "/blog/" + data.blogId + "/" + encodeURIComponent(data.translations.en.slug.trim())
  const { reviews, reviewCount, reviewPoint } = analizeComments(data);
  const class_language = new language(locale);
  const lang = class_language.getInfo()

  return (
    <Link href={url}>
      <div
        key={data._id}
        className="relative flex w-full scale-90 max-w-[26rem] flex-col rounded-xl bg-white dark:bg-gray-800  border-gray-200 dark:border-gray-700 bg-clip-border text-gray-700 shadow-lg  hover:border-primary cursor-pointer dark:hover:border-blue-500"
      >
        <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white">
          <Image
            src={data.thumbnail.url}
            alt="Blog Image"
            width={1150}
            height={500}
            className="w-full h-64 object-cover object-center rounded-xl"
          />
          <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
          {/* <button
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
          </button> */}
        </div>


        <div className="px-6 py-2">
          <div className="mb-3 flex items-center justify-between">
            <h5 className="block  text-md font-black tracking-normal text-black dark:text-white w-full ">
              {data.title ? `${data.title}` : <SkeletonText lines={1} />}
            </h5>

          </div>
          <div className="  text-base text-justify leading-relaxed text-gray-700 dark:text-blue-100 antialiased line-clamp-4  overflow-hidden text-ellipsis break-words">
            {data.description ? data.description : <SkeletonText lines={5} />}
          </div>
          <div className=" w-full px-3">
            <div className="flex items-center justify-between w-full mt-3">
              {/* تاریخ */}
              <div className="text-sm flex items-center dark:text-gray-100 w-full ml-2">
                <span>
                  {new Date(data.publishDate).toLocaleDateString(lang.lang + "-" + lang.loc)}
                </span>
              </div>

              <p className="flex flex-row-reverse items-center text-black  dark:text-white  text-base font-normal l mx-1">
                <FaStar className="text-yellow-400" />
                <span className="flex mx-1 font-sans items-center">
                  {reviewPoint / reviewCount}
                </span>
              </p>
               <p className="flex flex-row-reverse items-center text-black  dark:text-white  text-base font-normal l ml-1">
                <BiSolidCommentDetail className="text-blue-600" />
                <span className="flex mx-1 font-sans items-center">
                  { reviewCount }
                </span>
              </p>
              {/* عکس نویسنده */}
              <div className="flex mx-2 items-center h-full">
                <div className="items-center h-full rounded-full flex justify-center">
                  <Image
                    alt={data.creator.name}
                    title={data.creator.name}
                    src={data.creator.avatar?.url}
                    width={36}
                    height={36}
                    className="relative inline-block rounded-full object-cover object-center hover:z-10"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
