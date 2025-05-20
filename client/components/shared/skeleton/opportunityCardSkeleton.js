import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import React from "react";

const OpportunityCardSkeleton = () => {
  return (
    <div className="max-w-xs min-w-[280px] m-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md animate-pulse">
      <div className="grid grid-cols-2 gap-2">
        {/* اطلاعات سمت چپ */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-36 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        {/* لوگو یا تصویر */}
        <div className="flex justify-center items-center">
          <div className="h-24 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>

      {/* توضیحات پایین */}
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* دکمه‌ها */}
      <div className="flex gap-2 mt-4">
        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* تگ‌ها */}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded"
          />
        ))}
      </div>

      {/* نوار وضعیت */}
      <div className="mt-4 space-y-1">
        <div className="h-3 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default OpportunityCardSkeleton;
