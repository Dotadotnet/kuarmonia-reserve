import { useState } from "react";
import Location from "@/components/icons/Location";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const OpportunityHeader = ({ opportunity }) => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  return (
    <div className="flex items-center gap-x-2 p-4 space-x-4">
      <div>
        {!opportunity?.thumbnail ? (
          opportunity?.jobType?.thumbnail ? (
            <div className="w-24 h-24 rounded relative">
              <img
                src={opportunity?.jobType?.thumbnail?.url}
                alt="feature tour"
                width={256}
                height={256}
                className="object-cover h-full w-full rounded"
              />
              <span
                className="cursor-pointer absolute top-1/4 right-1/4 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
                onClick={toggleAdditionalContent}
              />
            </div>
          ) : (
            <div className="w-24 h-24">
              <SkeletonImage
                width={500}
                height={500}
                showSize={false}
                txtSize="text-3xl"
                borderRadius="rounded"
                className="z-0 w-full h-full"
              />
            </div>
          )
        ) : (
          <div className="w-24 h-24 rounded relative">
            <img
              src={opportunity.thumbnail}
              alt="feature tour"
              className="object-cover h-24 w-24 rounded"
            />
            <span
              className="cursor-pointer absolute top-1/4 right-1/4 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
              onClick={toggleAdditionalContent}
            />
            {showAdditionalContent && (
              <div className="bg-white flex flex-col w-64 gap-y-3 border p-4 rounded absolute top-1/3 left-1/4 mt-5 z-50">
                <article className="flex flex-row gap-x-2">
                  <img
                    src={opportunity.thumbnail}
                    alt="thumbnail"
                    height={300}
                    width={300}
                    className="rounded-[5px] object-cover h-[35px] w-[35px] border border-primary"
                  />
                  <div className="flex flex-col gap-y-1">
                    <div className="text-sm text-gray-600 line-clamp-1">
                      {opportunity?.company?.name || <SkeletonText lines={1} />}
                    </div>
                    <p className="flex flex-row gap-x-0.5 items-center text-xs line-clamp-1">
                      {opportunity?.country}
                    </p>
                  </div>
                </article>
                <p className="text-xs flex flex-row justify-between items-center whitespace-nowrap">
                  <span className="flex flex-row gap-x-0.5 items-baseline">
                    <span className="text-sm text-primary "></span>
                  </span>
                  <span className="min-w-[1rem]" />
                  <span className="border px-3 py-0.5 text-wrap rounded">
                    {opportunity?.company?.bio}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col -gap-y-1">
        <h3 className="text-2xl">
          {opportunity?.title || <SkeletonText lines={1} />}
        </h3>
        <div className="text-sm flex gap-2 flex-wrap gap-x-2 w-full text-gray-500 space-x-2">
          <span className="w-full flex items-center gap-x-1">
            <Location />
            {opportunity?.country || <SkeletonText lines={1} />}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OpportunityHeader;
