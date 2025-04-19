import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import React from "react";

const NewsCardSkeleton = ({index}) => {
  return (
    <div className="group bg-white dark:bg-gray-800 flex lg:flex-row flex-col gap-4 border border-secondary dark:border-gray-500 p-4 rounded relative hover:border-primary transition-colors delay-100 dark:hover:border-blue-500 dark:text-blue-500">
      <div className="flex flex-col gap-y-2">
        <div className="md:w-[150px] w-[450px] h-[450px] md:h-[150px]">
          <SkeletonImage
            width={500}
            height={500}
            showSize={true}
            txtSize="text-3xl"
            borderRadius="rounded-xl"
            className="z-0 w-full h-full"
          />
        </div>
        <div className="flex flex-row lg:justify-center gap-x-2">
            <div key={index} className="relative group">
              <span className="p-2 w-10 h-10 border border-secondary rounded-primary flex items-center justify-center">
                <SkeletonText lines={3} />
              </span>
            </div>
        </div>
      </div>

      <article className="flex flex-col gap-y-2.5 dark:text-white w-full">
        <h3 className="text-base line-clamp-2">
          <SkeletonText lines={1} />
        </h3>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm pb-0">
            <SkeletonText lines={4} />
          </p>
        </div>
        <SkeletonText lines={1} />
        <div className="flex flex-row flex-wrap justify-between"></div>
      </article>
    </div>
  );
};

export default NewsCardSkeleton;
