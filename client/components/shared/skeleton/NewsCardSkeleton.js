import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";


const NewsCardSkeleton = () => {
  return (
    <div className="group  flex lg:flex-row flex-col gap-4   p-4 rounded relative transition-colors delay-100 dark:hover:border-blue-500 dark:text-blue-500">
      <div className="flex flex-col gap-y-2">
        <div className="w-full h-[200px] md:w-[150px] md:h-[150px]">
          <SkeletonImage
            showSize={false}
            borderRadius="rounded-xl"
            className="w-full h-full"
          />
        </div>
      </div>

      <article className="flex flex-col gap-y-2.5 dark:text-white w-full">
        <h3 className="text-base line-clamp-2">
          <SkeletonText lines={1} />
        </h3>
        <div className="flex flex-col gap-y-1">
          <div className="text-sm pb-0">
            <SkeletonText lines={4} />
          </div>
        </div>
        <SkeletonText lines={1} />
        <div className="flex flex-row flex-wrap justify-between"></div>
      </article>
    </div>
  );
};

export default NewsCardSkeleton;
