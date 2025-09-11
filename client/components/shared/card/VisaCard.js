
import { MdOutlineAccessTime, MdCalendarToday, MdRemoveRedEye, MdStar } from "react-icons/md";
import { FaHeart, FaPlane, FaSuitcase, FaGraduationCap, FaMapMarkerAlt, FaChartBar } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const VisaCard = ({ visa }) => {
  const getDifficultyColor = (level) => {
    if (level <= 2) return "bg-green-50 text-green-700 border-green-200";
    if (level <= 3) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-red-50 text-red-700 border-red-200";
  };
  const locale = useLocale();
  const { title, summary, slug, processingTime, validity, difficultyLevel, country } =
    visa?.translations?.find((t) => t.translation?.language === locale)
      ?.translation?.fields || {};
  const typeTitle = visa?.type?.translations?.find(
    (t) => t.translation && t.language === locale
  )?.translation?.fields?.title;
  return (
    <Link href={`/visas/${visa.visaId}/${visa.slug_en}`}
      dir="rtl"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden group">

        {/* Image Section */}
        <div className="relative h-40 overflow-hidden">
          <Image
            priority={false}
            quality={2}
            width={0}
            height={0}
            alt={title}
            style={{ width: '100%', height: 'auto' }}
            src={visa.thumbnail.url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          <div className="absolute top-3 right-3">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${getDifficultyColor(
                difficultyLevel
              )}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart3 w-3 h-3"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>            {difficultyLevel}
            </div>
          </div>
          <div className="absolute bottom-3 right-3 text-white">
            <div className="flex items-center gap-1 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>            <span>{country}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <h3 className="text-lg  text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-2 leading-relaxed text-sm">
            {summary}
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1 mb-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
              <span
                className="w-4 h-4 text-blue-500"
                dangerouslySetInnerHTML={{ __html: visa.type?.icon }}
              />
              <span>{typeTitle}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-200">
              <MdOutlineAccessTime className="w-3 h-3" />
              <span>{processingTime}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
              <MdCalendarToday className="w-3 h-3" />
              <span>{validity}</span>
            </div>
          </div>


        </div>
      </div>
    </Link>
  );
};

export default VisaCard;
