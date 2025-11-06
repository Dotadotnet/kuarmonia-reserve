import { Calendar, Clock } from "react-icons/fa";
import { useLocale } from "next-intl";

const Timeline = ({ items }) => {
  const locale = useLocale();
  const dir = locale === "fa" ? "rtl" : "ltr";
  
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-6">
      {items.map((step, index) => (
        <div key={index} className="relative">
          {index !== items.length - 1 && (
            <div className={"absolute top-14 w-0.5 h-16 bg-gradient-to-b from-purple-300 to-purple-100 " + (dir == "rtl" ? " right-6" : " left-6 ")}></div>
          )}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center  text-base shadow-lg">
              {index + 1}
            </div>
            <div className="flex-1 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border rounded-xl p-4 md:p-5 dark:shadow-gray-300 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-lg md:text-xl mb-2 md:mb-0">
                  {step.title}
                </h3>
                <span className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-medium border border-blue-200">
                  <Clock className="w-4 h-4" />
                  {step.duration}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-sm md:text-base">
                {step.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;