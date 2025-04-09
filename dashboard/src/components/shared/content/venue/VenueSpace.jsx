import { Swiper, SwiperSlide } from "swiper/react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const VenuePrice = ({ venue }) => {
  const eventSpaces = venue?.ourEventSpaces || [];

  const meaningfulSpaces = eventSpaces.filter(
    (space) =>
      space.name || space.intro || space.description || space.spaces.length > 0
  );
  return (
    <div className="flex flex-wrap gap-y-6 md:gap-x-6">
      {meaningfulSpaces.length === 0 ? (
        <SkeletonText lines={3} />
      ) : (
        meaningfulSpaces.map((space, index) => (
          <div key={index} className="w-full bg-white  ">
            <div className=" flex justify-between gap-y-2 items-center">
              <h3 className="text-lg font-semibold">
                {space.name || "نام نامشخص"}
              </h3>
            </div>
            {space?.previewSpaces?.length > 0 && (
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="rounded-lg overflow-hidden relative mb-2 pb-8"
              >
                {space.previewSpaces.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img.url}
                      alt={`فضا ${idx + 1}`}
                      className="w-full h-60 object-cover rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {space.intro && (
              <p className="text-sm text-gray-700 mb-1">{space.intro}</p>
            )}
            {space.description && (
              <p className="text-sm text-gray-600 mb-3">{space.description}</p>
            )}
            {space.isPriceIncluded && (
              <p className="text-sm mb-2 text-green-600 bg-green-100 px-2 py-1 rounded-md">
              هزینه این فضا در قیمت کلی مکان برگزاری لحاظ شده است
              </p>
            )}
            <ul className="text-sm text-gray-700 space-y-1 mb-3">
              {space.seatedCapacity && (
                <li>🪑 ظرفیت نشسته: {space.seatedCapacity}</li>
              )}
              {space.standingCapacity && (
                <li>🚶 ظرفیت ایستاده: {space.standingCapacity}</li>
              )}
              {space.squareFootage && (
                <li>📏 متراژ: {space.squareFootage} فوت مربع</li>
              )}
              {space.roomCost && <li>💰 هزینه فضا: {space.roomCost}</li>}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default VenuePrice;
