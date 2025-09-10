import  { useState, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const Left = ({ property, isLoading }) => {
    const locale = useLocale();
      const t = useTranslations("Property")
  
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (property?.gallery?.length > 0) {
      setMainImage(property?.gallery[0]?.url);
    }
  }, [property?.gallery]);

  const isVideo = (url) => {
    return (
      url?.includes(".mp4") || url?.includes(".mov") || url?.includes(".avi")
    );
  };

  return (
    <section className="col-span-1 flex flex-col gap-y-4 relative">
      <div className="  overflow-hidden absolute top-0 left-0 w-full h-full">
          <span
            className={`absolute top-2 left-0 w-32 translate-y-4 -translate-x-8 -rotate-45 text-center text-sm z-50 
    ${
      property?.citizenshipStatus === "citizenship"
        ? "bg-green-500 text-white"
        : property?.citizenshipStatus === "residency"
        ? "bg-blue-500 text-white"
        : property?.citizenshipStatus === "goldenVisa"
        ? "bg-yellow-500 text-white"
        : "bg-transparent text-transparent"
    }`}
          >
            {property?.citizenshipStatus === "citizenship" && t("citizenship")}
            {property?.citizenshipStatus === "residency" && t("residency")}
            {property?.citizenshipStatus === "goldenVisa" && t("goldenVisa")}
          </span>
        </div>

      <div className="flex flex-col gap-y-4 relative">
        
        {isLoading || !property?.gallery?.length > 0 ? (
          <>
            <div className="w-full h-[400px] relative bg-gray-300 dark:bg-gray-600 animate-pulse rounded" />
          </>
        ) : isVideo(mainImage) ? (
          <video
            controls
            className="rounded w-full h-full object-cover"
            src={mainImage || "/placeholder.png"}
            alt="Main video"
          />
        ) : (
          <Image
            src={mainImage || "/placeholder.png"}
            alt="Main product"
            width={480}
            height={200}
            className="rounded w-full h-full object-cover"
          />
        )}

        <div className="grid grid-cols-6 gap-3">
          {isLoading || !property?.gallery?.length
            ? Array(6)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="md:w-20 md:h-20 h-14 w-14 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"
                  />
                ))
            : property?.gallery.map((thumbnail, index) => {
                const thumbnailUrl = thumbnail?.url;
                return isVideo(thumbnailUrl) ? (
                  <video
                    key={index}
                    controls
                    className="rounded object-cover max-w-full w-full h-full cursor-pointer"
                    src={thumbnailUrl}
                    alt={thumbnail?.public_id}
                    onClick={() => setMainImage(thumbnailUrl)}
                  />
                ) : (
                  <Image
                    src={thumbnailUrl}
                    key={index}
                    alt={thumbnail?.public_id}
                    className="rounded object-cover max-w-full w-full h-full cursor-pointer"
                    width={480}
                    height={200}
                    onClick={() => setMainImage(thumbnailUrl)}
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Left;
