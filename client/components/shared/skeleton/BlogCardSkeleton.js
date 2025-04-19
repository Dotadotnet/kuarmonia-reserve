import React from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const BlogCardSkeleton = () => {
  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl  0 dark:border-gray-700  h-[550px] animate-pulse">
      {/* تصویر اصلی */}
      <div className="relative mx-4 mt-4 h-60 overflow-hidden rounded-xl">
        <SkeletonImage
          width={"100%"}
          height={"100%"}
          showSize={false}
          borderRadius="rounded-xl"
          className="w-full h-full"
        />
      </div>

      {/* محتوا */}
      <div className="px-6 py-4 flex flex-col gap-3">
        <SkeletonText lines={1} />
        <SkeletonText lines={4} />

        {/* آیکون‌ها */}
        <div className="flex gap-3 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-300 dark:bg-gray-600 rounded-full w-10 h-10"
            />
          ))}
        </div>

        {/* تاریخ و نویسنده */}
        <div className="flex justify-between items-center mt-4">
          <SkeletonText lines={1} className="w-1/2" />
          <SkeletonImage
            height={36}
            width={36}
            borderRadius="rounded-full"
            showSize={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
