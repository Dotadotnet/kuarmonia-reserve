import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";

const VisaTypeCard = ({ visaType, title, locale }) => {
  return (
    <Link
      href={`/${locale}/visa-types/${visaType.visaTypeId}/${visaType.slug_en}`}
      className="group block my-4  transition-all rounded-primary shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between gap-2 p-3">
        {/* Left: Title (short text) */}

        {/* Right: Small image */}
        <div className="relative w-14 h-14 md:w-32 md:h-32 rounded-md overflow-hidden flex-shrink-0">
          {visaType.thumbnail?.url ? (
            <Image
              src={visaType.thumbnail.url}
              alt={title || "نوع ویزا"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <Users className="w-6 h-6 text-white opacity-70" />
            </div>
          )}
        </div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
          {title || "نوع ویزا"}
        </h3>
      </div>
    </Link>
  );
};

export default VisaTypeCard;
