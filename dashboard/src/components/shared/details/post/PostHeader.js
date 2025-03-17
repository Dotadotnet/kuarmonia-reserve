import SkeletonText from "@/components/shared/skeletonLoading/SkeletonText";
import SkeletonImage from "@/components/shared/skeletonLoading/SkeletonImage";

const PostHeader = ({ isLoading, creator, publishDate }) => (
    <div className="flex flex-row-reverse col-span-1 justify-between items-center py-2 px-2">
      <div className="flex items-center flex-row-reverse">
        {isLoading || !creator ? (
          <>
            <SkeletonImage
              height={200}
              width={200}
              showSize={false}
              borderRadius="rounded-full"
              className="!w-10 !h-10"
            />
            <div className="ml-3">
              <SkeletonText lines={1} />
            </div>
          </>
        ) : (
          <>
            <img
              src={creator?.avatar?.url}
              alt="User"
              width={40} // عرض تصویر به پیکسل
              height={40} // ارتفاع تصویر به پیکسل
              className="rounded-full object-cover"
            />
            <div className="ml-3 flex flex-col gap-y-2">
              <p className="text-gray-900 text-left text-sm">{creator?.name}</p>
              <p className="text-gray-900 text-left text-xs">
                {new Date(publishDate).toLocaleDateString("fa-IR", {
                  weekday: "long"
                })}{" "}
                - {new Date(publishDate).toLocaleDateString("fa-IR")}
              </p>
            </div>
          </>
        )}
      </div>
      <button
        type="button"
        className="rounded-full dark:text-gray-100 text-gray-700"
      >
      </button>
    </div>
  );

  export default PostHeader;