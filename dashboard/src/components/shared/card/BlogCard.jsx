import React from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import Bottle from "@/components/icons/category/Bottle";
import Cake from "@/components/icons/category/Cake";
import Noghl1 from "@/components/icons/category/Noghl1";
import Noghl2 from "@/components/icons/category/Noghl2";
import Halva1 from "@/components/icons/category/Halva1";
import { HeartEmpty } from "@/components/icons/Heart";
import FillStar  from "@/components/icons/FillStar";
import Bookmark from "@/components/icons/Bookmark";
const BlogCard = ({
  id,
  index,
  title,
  description,
  thumbnailPreview,
  publishDate,
  authorId,
  superAdmin,
  isLoading,
  slug
}) => {
  return (
    <div
      key={id || index}
      onClick={() =>
        id ? router.push(`/blog/${slug}/${id}`) : console.log("ID is missing")
      }
      className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white dark:bg-gray-800  border dark:border-gray-700 bg-clip-border text-gray-700 shadow-lg h-[550px] hover:border-primary cursor-pointer dark:hover:border-blue-500"
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
        <img
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
            <HeartEmpty size={30} />
          </span>
        </button>
        <button
          className="!absolute top-4 left-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-red-500/10 active:bg-red-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-dark="true"
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Bookmark size={30} />
          </span>
        </button>
      </div>
      <div className="px-6 py-2">
        <div className="mb-3 flex items-center justify-between">
          <h5 className="block  text-md tracking-normal dark:text-blue-100 min-w-[80%] ">
            {title ? `${title}` : <SkeletonText lines={1} />}
          </h5>
          <p className="flex items-center gap-1.5 text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
            <FillStar />
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
              data-tooltip-target="noghl"
              aria-label="نقل و شیرینی"
              title="نقل و شیرینی"
              className="custom-button !p-3"
            >
              <Noghl1 className="!w-8 !h-8 "  />
            </span>
            <span
              data-tooltip-target="sweets"
              aria-label="شیرینی سنتی"
              title="شیرینی سنتی"
              className="custom-button !p-3"
            >
              <Noghl2 className="!w-8 !h-8" />
            </span>
            <span
              data-tooltip-target="herbal"
              aria-label="عرقیجات سنتی"
              title="عرقیجات سنتی"
              className="custom-button !p-3"
            >
              <Bottle className="!w-8 !h-8" />
            </span>
            <span
              data-tooltip-target="halva"
              aria-label="حلوا و دسر"
              title="حلوا و دسر"
              className="custom-button !p-3"
            >
              <Halva1 className="!w-8 !h-8" />
            </span>
            <span
              data-tooltip-target="cake"
              aria-label="کیک و دسر"
              title="کیک و دسر"
              className="custom-button !p-3"
            >
              <Cake className="!w-8 !h-8" />
            </span>
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
              {isLoading || !authorId ? (
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
                  <img
                    alt={authorId?.name}
                    title={authorId?.name}
                    src={authorId?.avatar?.url}
                    width={36}
                    height={36}
                    className="relative inline-block rounded-full object-cover object-center hover:z-10"
                  />
                  {authorId?.name !== superAdmin?.name && (
                    <img
                      alt={authorId?.name}
                      title={authorId?.name}
                      src={authorId?.avatar?.url}
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
  );
};

export default BlogCard;
