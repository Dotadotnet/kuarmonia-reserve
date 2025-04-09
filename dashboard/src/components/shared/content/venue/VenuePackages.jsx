import { useState } from "react";

const VenuePackages = ({ venue }) => {
  const packages = venue?.packages || [];
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="flex flex-wrap gap-4">
      {packages.map((pack, index) => (
        <div
          key={index}
          className=" shadow-lg rounded-xl p-4 w-full flex flex-col justify-between gap-y-2"
        >
          <div className="flex flex-col gap-y-2">
            <p className="text-lg text-black dark:text-white">
              {translateType(pack.type)}
            </p>
            <p className="text-sm text-gray-600">
              {pack.guest?.min || "-"} - {pack.guest?.max || "-"} مهمان
            </p>
            <p className="text-xs text-gray-600 flex items-center">
              قیمت زمان پرتقاضـا&nbsp;${pack.pricing?.peak || "-"}
              &nbsp;{" "}
              <span className="border-b border-black dark:border-white pb-0.2">
                برای هر نفر
              </span>
            </p>
            <p className="text-xs text-gray-600 flex items-center">
              قیمت زمان کم تقاضا&nbsp;${pack.pricing?.offPeak || "-"}
              &nbsp;{" "}
              <span className="border-b border-black dark:border-white pb-0.2 ">
                برای هر نفر
              </span>
            </p>
          </div>
          <button
            onClick={() => setSelectedPackage(pack)}
            className="mt-4 px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            مشاهده بیشتر
          </button>
        </div>
      ))}

      {/* Modal نمایش جزئیات پکیج */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
            <p className="text-sm mb-2">
              🏷️ نوع: {translateType(selectedPackage.type)}
            </p>
            <p className="text-sm mb-2">
              👥 مهمان‌ها: {selectedPackage.guest?.min || "-"} تا{" "}
              {selectedPackage.guest?.max || "-"}
            </p>
            <p className="text-sm mb-2">
              💸 قیمت اوج: {selectedPackage.pricing?.peak || "-"}
            </p>
            <p className="text-sm mb-2">
              🕒 قیمت غیراوج: {selectedPackage.pricing?.offPeak || "-"}
            </p>

            {selectedPackage.description && (
              <p className="text-sm text-gray-700 mt-2 mb-3">
                ✍️ توضیحات: {selectedPackage.description}
              </p>
            )}

            {selectedPackage.whatsIncluded?.length > 0 && (
              <ul className="text-sm text-gray-700 list-disc pr-5 mb-3 space-y-1">
                {selectedPackage.whatsIncluded.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setSelectedPackage(null)}
              className="mt-4 px-4 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 w-full"
            >
              بستن
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function translateType(type) {
  switch (type) {
    case "rental":
      return "اجاره";
    case "beverage":
      return "نوشیدنی";
    case "catering":
      return "پذیرایی";
    case "vendor":
      return "تأمین‌کننده خدمات جانبی";
    default:
      return "نامشخص";
  }
}

export default VenuePackages;
