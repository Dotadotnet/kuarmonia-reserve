import React from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import Bag from "@/components/icons/Bag";
import Dollar from "@/components/icons/Dollars";
import Location from "@/components/icons/Location";
import OfficeBag from "@/components/icons/OfficeBag";
import Chart from "@/components/icons/Chart";
import Desktop from "@/components/icons/Desktop";
import OpportunityThumbnailCard from "./OpportunityThumbnailCard";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function OpportunityCard({ opportunity }) {
  const locale = useLocale();
  const t = useTranslations("opportunity");
  const { title, summary, slug, skills } = opportunity;
  const experienceLevel = typeof opportunity?.refId?.experienceLevel == "object" ? Array.isArray(opportunity?.refId?.experienceLevel) ? opportunity?.refId.experienceLevel : [opportunity?.refId.experienceLevel] : []

  return (
    <div className="max-w-xs min-w-[280px] m-4 p-4 bg-white dark:bg-gray-800 relative overflow-hidden  rounded-xl shadow-md">
      <Link href={`/opportunity/${opportunity?.opportunityId}/${encodeURIComponent(opportunity.translations.en.slug.trim())}`}>
        <span
          className={`absolute top-0 left-1 w-32 -translate-x-12 translate-y-3 -rotate-45 bg-green-500 text-white text-center text-xs py-[1px] z-50 `}
        >
          {
            opportunity.citizenshipOutcome.title
          }
        </span>
        <div className="grid grid-cols-2">
          <div className="flex flex-col col-span-1 gap-y-2 w-full">
            <h3 className="text-medium line-clamp-1 ">
              {title || <SkeletonText lines={1} />}
            </h3>
            <div className="flex items-center w-fit text-end gap-1 px-2 py-1 h-8  bg-red-100 text-red-500 rounded-sm ">
              <span className="min-w-10 text-red-500 text-sm flex gap-x-1">
                <span
                  className="text-red-500 w-5 h-5"
                  dangerouslySetInnerHTML={{
                    __html: opportunity?.refId?.jobType?.icon
                  }}
                />
                <span className="text-red-500">
                  {
                    opportunity?.refId?.jobType?.translations.title
                  }
                </span>
              </span>
            </div>
            <div className="flex items-center w-fit text-end gap-1 px-2 py-1 h-8  bg-green-100 text-green-500 rounded-sm ">
              <Bag />
              <span className="min-w-10 text-green-500 text-sm">
                {
                  opportunity?.refId?.employmentType?.title
                }
              </span>
            </div>
            <span className="flex items-center w-fit gap-1 px-2 py-1 h-7 bg-orange-100 text-orange-500 rounded-sm whitespace-nowrap">
              <Dollar />
              <span className="min-w-10 flex mt-1 text-sm text-orange-500">
                {opportunity?.refId?.salary?.min} {"- "}
                <span
                  className="w-5 h-5 text-orange-500"
                  dangerouslySetInnerHTML={{
                    __html: opportunity?.refId?.currency?.symbol
                  }}
                />
                {opportunity?.refId?.salary?.min}{" "}
              </span>
            </span>
            <div className="flex items-center w-fit text-end gap-1 px-2 py-1 h-8  bg-gray-100 text-gray-500 text-sm rounded-sm ">
              <Location />
              {
                opportunity?.city?.city
              }{" "}
            </div>
          </div>
          <OpportunityThumbnailCard opportunity={opportunity} locale={locale} />
        </div>
        <div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2 ">
            {summary || <SkeletonText lines={3} />}
          </p>
        </div>

        {/* محتوا */}
        <div className="flex justify-start gap-x-1 mt-4 overflow-x-auto custom-scrollbar h-10">
          <span className="flex items-center gap-1 px-2 py-1 h-7  bg-cyan-100 text-cyan-500  rounded-sm whitespace-nowrap">
            <OfficeBag />
            <span className="min-w-10 text-cyan-500 text-sm">
              {
                opportunity?.refId?.jobTime?.title
              }{" "}
            </span>
          </span>
          <span className="flex items-center gap-1 px-2 py-1 h-7 bg-cyan-100 text-cyan-500 rounded-sm whitespace-nowrap">
            <Chart />
            <span className="min-w-10">
              {experienceLevel?.map((item, index) => (
                <span key={index} className="mr-1 text-sm text-sky-500">
                  {
                    item?.title
                  }{" "}
                </span>
              ))}
            </span>
          </span>
          <span className="flex items-center gap-1 px-2 py-1 h-7 bg-cyan-100 text-cyan-500 rounded-sm whitespace-nowrap">
            <Desktop />
            <span className="min-w-10 text-sm text-cyan-500">
              {
                opportunity?.refId?.jobMode?.title
              }{" "}
            </span>
          </span>
        </div>
        <div className="flex justify-start gap-x-1 mt-2 overflow-x-auto custom-scrollbar h-10">
          {skills?.map((item, index) => (
            <span
              key={index}
              className="flex items-center w-fit gap-1 px-2 py-1 h-7 bg-blue-100 text-blue-500 rounded-sm whitespace-nowrap"
            >
              <span className="mr-1 text-sm text-blue-500">{item}</span>
            </span>
          ))}
        </div>
        <div className="max-w-xl mx-auto">
          <label className="text-gray-400"> {t("request")}</label>
          <div className="relative  max-w-sm mx-auto">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-cyan-600">
                  50
                </span>
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold inline-block text-cyan-600">
                  50
                </span>
              </div>
            </div>
            <div className="flex rounded-full h-2 bg-gray-200">
              <div
                className="rounded-full bg-cyan-500"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
