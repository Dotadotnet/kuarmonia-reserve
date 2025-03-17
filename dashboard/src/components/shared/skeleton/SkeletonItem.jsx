import React from "react";

const SkeletonItem = ({ repeat }) => {
  return (
    <>
      {Array(repeat)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700 animate-pulse"
          >
            {/* بخش وضعیت */}
            <div className="col-span-11 lg:col-span-3 text-center flex items-center">
              <div className="py-2 flex flex-row gap-x-2 rounded items-center">
                {/* اسکلت دایره‌ای برای تصویر */}
                <div className="rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse h-16 w-16" />
                <article className="flex-col flex gap-y-2">
                  {/* اسکلت برای نام نویسنده */}
                  <span className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
                  {/* اسکلت برای تاریخ */}
                  <span className="w-16 h-3 bg-gray-200 dark:bg-gray-700 rounded hidden lg:flex" />
                  {/* اسکلت برای تعداد لایک و بازدید */}
                  <span className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded flex lg:hidden" />
                </article>
              </div>
            </div>

            {/* عنوان بلاگ */}
            <div className="hidden lg:col-span-6 lg:flex text-center lg:first-letter:flex items-center">
              <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* متریک‌ها */}
            <div className="hidden lg:col-span-2 gap-2 text-center lg:flex justify-center items-center">
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* آیکون‌های پایانی */}
            <div className="col-span-1 text-gray-500 text-center flex justify-right flex-row-reverse items-center">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonItem;
