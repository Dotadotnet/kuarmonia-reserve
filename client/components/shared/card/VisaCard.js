
import { MdOutlineAccessTime, MdCalendarToday, MdRemoveRedEye, MdStar } from "react-icons/md";
import { FaHeart, FaPlane, FaSuitcase, FaGraduationCap, FaMapMarkerAlt, FaChartBar } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import ScrollInfinity from "../utils/ScrollInfinity";

const VisaCard = ({ visa }) => {
  const getDifficultyColor = (level) => {
    if (level <= 2) return "bg-green-50 text-green-700 border-green-200";
    if (level <= 3) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-red-50 text-red-700 border-red-200";
  };
  const locale = useLocale();
  const { title, summary, processingTime, validity, difficultyLevel, country } = visa;
  const typeTitle = visa.type.title;
  return (
    <Link href={`/visas/${visa.visaId}/${visa.slug_en}`}
    >
      <div className="flex">
        <div className="md:size-28 rounded-xl overflow-hidden  size-24">
          <Image
            src={visa.thumbnail.url}
            alt={title || "نوع ویزا"}
            width={200}
            height={200}
            className="object-cover group-hover:scale-110 transition-all size-full "
          />
        </div>
        <div className="flex flex-col justify-between pl-3 sm:pl-5 rtl:pr-3 rtl:sm:pr-5 py-1 sm:py-2.5" >
          <div className="flex w-fit items-center  gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
            <span
              className="w-4 h-4 text-blue-500"
              dangerouslySetInnerHTML={{ __html: visa.type?.icon }}
            />
            <span>{typeTitle}</span>
          </div>
          <div className="font-bold text-sm sm:text-md ">
            {title}
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>          
                <span>{typeof country == "object" ? country.name : country}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VisaCard;
