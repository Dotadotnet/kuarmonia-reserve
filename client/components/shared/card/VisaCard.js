import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const VisaCard = ({ visa ,locale}) => {

  
  return (
    <Link
      href={`${visa.canonicalUrl}`}
      className="group relative overflow-hidden bg-white border  border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-xl hover:shadow-gray-200 dark:hover:border-blue-500 dark:hover:shadow-none dark:bg-gray-800 flex flex-col gap-4  p-4 delay-100 dark:text-blue-500 transition-all duration-300 ease-in-out h-fit"
    >
      <div className="flex flex-col border-gray-400 relative">
        <div className="w-full aspect-video rounded-xl overflow-hidden border-gray-100 relative">
          <Image
            src={visa.thumbnail.url}
            alt={visa.title || "نوع ویزا"}
            width={400}
            height={300}
            className="object-cover group-hover:scale-110 transition-all w-full h-full"
          />
          <div className=" flex flex-wrap gap-2">
            <div className="absolute top-2 left-2 font-medium   flex items-center gap-1 px-2 py-1 rounded-full border bg-primary/10 text-primary border-primary/20 text-xs">
              {visa.type.title}
            </div>
            <div className="absolute bottom-2 right-2   font-medium   flex items-center gap-1 px-2 py-1 rounded-full border bg-primary/10 text-primary border-primary/20 text-xs">
              {visa.country.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between ">
          <div className="text-sm sm:text-md mt-2">
            {visa.title}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VisaCard;