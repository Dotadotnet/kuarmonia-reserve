import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";

const VisaTypeCard = ({ visaType, title, locale }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <Link
        href={`/${locale}/visa-types/${visaType.visaTypeId}/${visaType.slug_en}`}
        className="group block my-4  transition-all rounded-primary hover:shadow-xl shadow-lg dark:shadow-gray-600 group border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col items-center justify-between gap-2 p-3 md:p-5">
          {/* Left: Title (short text) */}

          {/* Right: Small image */}
          <div className="relative size-28 md:size-32 rounded-primary overflow-hidden flex-shrink-0">
            {visaType.thumbnail?.url ? (
              <Image
                src={visaType.thumbnail.url}
                alt={title || "نوع ویزا"}
                fill
                className="object-cover group-hover:scale-110 transition-all size-full"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white opacity-70" />
              </div>
            )}
          </div>
          <h3 className="text-sm md:text-md font-bold  mt-1 md:mt-2 text-gray-900 dark:text-white line-clamp-1">
            {title || "نوع ویزا"}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default VisaTypeCard;
