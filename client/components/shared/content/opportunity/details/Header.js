"use client";
import { useState } from "react";
import Image from "next/image";
import Location from "@/components/icons/Location";
import { useLocale } from "next-intl";

const OpportunityHeader = ({ opportunity }) => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const locale = useLocale();

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  const thumbnailUrl =
    opportunity?.thumbnail.url || opportunity?.jobType?.thumbnail?.url;
  console.log("opportunity", opportunity);
  return (
      <div className="flex items-center gap-x-2 p-4 space-x-4">
        <div>
          {thumbnailUrl ? (
            <div className="w-24 h-24 rounded relative">
              <Image
                src={thumbnailUrl}
                alt="feature tour"
                width={96}
                height={96}
                className="object-cover h-24 w-24 rounded"
              />
              <span
                className="cursor-pointer absolute top-1/4 right-1/4 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
                onClick={toggleAdditionalContent}
              />
              {showAdditionalContent && (
                <div className="bg-white flex flex-col w-64 gap-y-3 border p-4 rounded absolute top-1/3 left-1/4 mt-5 z-50">
                  <article className="flex flex-row gap-x-2">
                    <Image
                      src={thumbnailUrl}
                      alt="thumbnail"
                      width={35}
                      height={35}
                      className="rounded-[5px] object-cover border border-primary"
                    />
                    <div className="flex flex-col gap-y-1">
                      <div className="text-sm text-gray-600 line-clamp-1">
                        {opportunity?.company?.name || ""}
                      </div>
                      <p className="flex flex-row gap-x-0.5 items-center text-xs line-clamp-1">
                        {opportunity?.country || ""}
                      </p>
                    </div>
                  </article>
                  <p className="text-xs flex flex-row justify-between items-center whitespace-nowrap">
                    <span className="flex flex-row gap-x-0.5 items-baseline">
                      <span className="text-sm text-primary"></span>
                    </span>
                    <span className="min-w-[1rem]" />
                    <span className="border px-3 py-0.5 text-wrap rounded">
                      {opportunity?.company?.bio || ""}
                    </span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="w-24 h-24 bg-gray-100 rounded" />
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="text-2xl">
            {
              opportunity?.translations?.find(
                (t) => t.translation?.language === locale
              )?.translation?.fields.title
            }
          </h3>
          <div className="text-sm flex gap-2 flex-wrap text-gray-500">
            <span className="w-full flex items-center gap-x-1">
              <Location />
              {
                opportunity?.city?.translations?.find(
                  (t) => t.translation?.language === locale
                )?.translation?.fields.city
              }{" "}
            </span>
          </div>
        </div>
   
    </div>
  );
};

export default OpportunityHeader;
