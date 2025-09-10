
import { AiFillStar } from "react-icons/ai";
import { BsSignTurnRight } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

import { useLocale, useTranslations } from "next-intl";
import Location from "../Location";

const Right = ({ rent }) => {
  const locale = useLocale();
  const { title, summary, slug } = rent;
  const t = useTranslations("rent");

  return (
    <div className="lg:col-span-7 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <article className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-3xl text-xl">{title}</h1>
          <p className="flex flex-row items-center gap-x-2">
            <span className="text-xs py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary capitalize">
              {rent?.address?.city}
            </span>
            <span className="text-xs flex items-center gap-x-1 py-0.5 px-2 bg-purple-50 text-purple-800 border border-purple-500 rounded-secondary">
              <AiFillStar className="w-4 h-4 text-yellow-500" /> (
              {rent?.reviews?.length})
            </span>
            <span className="text-xs flex items-center gap-x-1 py-0.5 px-2 bg-indigo-50 text-indigo-800 border border-indigo-500 rounded-secondary">
              <FaUsers className="w-4 h-4 text-yellow-500" /> (
              {rent?.users?.length})
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">{t("summary")}</h2>
            <p className="text-sm">{summary}</p>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">{t("importantInfo")}</h2>
            <div className="flex flex-col gap-y-1">
              {rent.information.map((feature, index) => (
                  <p
                    key={index}
                    className="flex flex-row gap-x-2 items-start text-sm"
                  >
                    <span className="p-0.5">
                      <BsSignTurnRight className="h-3.5 w-3.5" />
                    </span>
                    {feature}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <h2 className="md:text-xl text-lg">{t("openTime")}</h2>
            <div className="flex flex-col gap-y-1">
              {rent?.times?.map((time, index) => (
                <p
                  key={index}
                  className="flex flex-row gap-x-2 items-center text-sm"
                >
                  <span className="p-0.5">
                    <BsSignTurnRight className="h-3.5 w-3.5" />
                  </span>
                  {time}
                </p>
              ))}
            </div>
          </div>
          <Location property={rent.location} />
        </div>
      </article>
      <div className=""></div>
    </div>
  );
};

export default Right;
