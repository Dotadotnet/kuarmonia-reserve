'use client'
import { useState, useEffect } from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import { TagIcon } from "@/utils/SaveIcon";
import { FaInstagram, FaTwitter, FaTelegramPlane } from "react-icons/fa";
import Image from 'next/image';
import TagBox from "../utils/TagBox";
import AllReviews from "@/components/detail/AllReviews";

const Content = ({ data }) => {
  const { title, content, thumbnail, publishDate, avatar, selectedTags } = data;


  const colors = [
    { bg: "bg-orange-200", text: "text-orange-700" },
    { bg: "bg-green-200", text: "text-green-700" },
    { bg: "bg-blue-200", text: "text-blue-700" },
    { bg: "bg-red-200", text: "text-red-700" },
    { bg: "bg-purple-200", text: "text-purple-700" },
    { bg: "bg-yellow-200", text: "text-yellow-700" },
    { bg: "bg-pink-200", text: "text-pink-700" },
  ];
  return (
    <div className="col-span-1 md:col-span-10 shadow  mt-116 order-1 md:order-2">
      <div className="absolute inset-0  z-10">
        {!thumbnail && (
          <SkeletonImage width={1150} height={500} showSize={true} borderRadius="rounded-xl" className="z-50 h-[500px]"

          />
        )}
        {thumbnail && (

          <Image
            src={thumbnail.url}
            alt="Feature Image"
            width={1200}
            height={500}
            className="w-full object-cover  h-[500px]"
          />
        )
        }
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-full">
          <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
            {data.creator.avatar.url && (
              <div className="profile-container text-center shine-effect rounded-full flex justify-center mb-4">

                <Image
                  src={data.creator.avatar.url}
                  alt="avatar"
                  height={300}
                  width={300}
                  className="h-[100px] w-[100px] profile-pic rounded-full text-center"
                />
              </div>
            )}
          </div>

          <div className="relative bg-gray-50 z-10 dark:bg-gray-800 dark:text-gray-100 shadow-lg top-0 -mt-20 p-5 sm:p-10 ">
            <div className="flex items-center mt-14 justify-center text-center">
              <div className="text-gray-700 mt-6 md:mt-0">
                <p className="flex justify-center">
                  <span className="text-2xl text-center"> {data.creator.name}</span>
                </p>
                <p className="text-center text-sm mt-1">
                  <span className="font-medium">
                    {new Date(publishDate).toLocaleDateString("fa-IR", {
                      weekday: "long",
                    })}{" "}
                    - {new Date(publishDate).toLocaleDateString("fa-IR")}
                  </span>
                </p>
              </div>
            </div>
            <h1 className="font-bold text-3xl mb-2 mt-12 text-center">
              {title ? `${title}` : <SkeletonText lines={1} />}
            </h1>
            <div className="text-base leading-8 my-5 text-justify">
              {content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                ></div>
              ) : (
                <SkeletonText lines={22} />
              )}
            </div>

            <TagBox tags={data.tags} />




            <div className="absolute top-1/2 right-0 transform translate-x-1/2 translate-y-[-50%] bg-white dark:bg-slate-900 py-3 px-2 md:px-2 lg:px-3 rounded-full border border-gray-300 dark:border-gray-700">
              <a
                href="https://instagram.com"
                className="flex items-center mb-2"
                target="_blank"
                rel="nofollow"
              >
                <FaInstagram className="text-pink-500 w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="flex items-center mb-2"
                target="_blank"
                rel="nofollow"
              >
                <FaTwitter className="text-blue-500 w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                className="flex items-center"
                target="_blank"
                rel="nofollow"
              >
                <FaTelegramPlane className="text-blue-600 w-5 h-5" />
              </a>
            </div>
            <br />
            <AllReviews
              className="!px-0"
              targetId={data._id}
              targetType="blog"
              reviews={Array.isArray(data.reviews) ? data.reviews : [data.reviews]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Content;


