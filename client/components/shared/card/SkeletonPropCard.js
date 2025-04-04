import React from "react";

const SkeletonPropCard = () => {
  return (
    <div className="max-w-sm w-full lg:w-full z-50">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
        {/* تصویر اسکلتون */}
        <div className="bg-gray-300 dark:bg-gray-700 animate-pulse w-full h-56"></div>
        
        {/* بخش اطلاعات */}
        <div className="p-4 flex flex-col gap-2">
          <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="w-2/3 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>

        {/* بخش قیمت و مشخصات */}
        <div className="p-4 flex flex-col gap-2">
          <div className="w-full h-8 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="w-1/3 h-4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>

        {/* بخش اتاق‌ها و حمام */}
        <div className="flex p-4 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 gap-4">
          <div className="w-1/4 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
          <div className="w-1/4 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPropCard;
