import { useState } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import User from "../../icons/User";
import Bag from "../../icons/Bag";
import Dollar from "../../icons/Dollars";
import Location from "../../icons/Location";
import Time from "../../icons/Time";
import OfficeBag from "../../icons/OfficeBag";
import Chart from "../../icons/Chart";
import Desktop from "../../icons/Desktop";
export default function OpportunityCard({ opportunity }) {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);

  const toggleAdditionalContent = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };
  const daysLeft = opportunity?.endDate
    ? Math.ceil(
        (new Date(opportunity?.endDate).setHours(0, 0, 0, 0) -
          new Date().setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      )
    : null;
  return (
    <div className="max-w-xs min-w-[280px] m-4 p-4 bg-white dark:bg-gray-800 relative overflow-hidden  rounded-xl shadow-md">
      <span
        className={`absolute top-0 left-1 w-32 -translate-x-12 translate-y-3 -rotate-45 bg-green-500 text-white text-center text-xs py-[1px] z-50 `}
      >
        {opportunity?.citizenshipOutcome?.value}
      </span>
      <div className="grid grid-cols-2">
        <div className="flex flex-col col-span-1 gap-y-2 w-full">
          <h3 className="text-medium line-clamp-1 ">
            {opportunity?.title || <SkeletonText lines={1} />}
          </h3>
          <div className="flex items-center w-fit text-end gap-1 px-2 py-1 h-8  bg-red-100 text-red-500 rounded-sm ">
            <span className="min-w-10 text-red-500 text-sm flex gap-x-1">
              <span
                className="text-red-500"
                dangerouslySetInnerHTML={{ __html: opportunity?.jobType?.icon }}
              />
              <span className="text-red-500">
                {opportunity?.jobType?.value}
              </span>
            </span>
          </div>
          <div className="flex items-center w-fit text-end gap-1 px-2 py-1 h-8  bg-green-100 text-green-500 rounded-sm ">
            <Bag />
            <span className="min-w-10 text-green-500 text-sm">
              {opportunity?.employmentType?.value}
            </span>
          </div>
          <span className="flex items-center w-fit gap-1 px-2 py-1 h-7 bg-orange-100 text-orange-500 rounded-sm whitespace-nowrap">
            <Dollar />
            <span className="min-w-10 flex mt-1 text-orange-500">
              {opportunity?.minSalary} {"- "}
              <span
                className="w-5 h-5 text-orange-500"
                dangerouslySetInnerHTML={{
                  __html: opportunity?.currency?.icon
                }}
              />
              {opportunity?.maxSalary}{" "}
            </span>
          </span>
          <div className="flex items-center w-fit text-end gap-1 px-2 py-1 h-8  bg-gray-100 text-gray-500 rounded-sm ">
            <Location />

            <span className="min-w-10 text-sm">{opportunity?.city}</span>
          </div>
        </div>
        <div className="flex justify-between items-end gap-y-2 flex-col cols-span-1 ">
          {!opportunity?.thumbnail ? (
            opportunity?.jobType?.thumbnail ? (
              <div className="w-32 h-32 rounded-full">
                <img
                  src={opportunity?.jobType?.thumbnail?.url}
                  alt="feature tour"
                  width={256}
                  height={144}
                  className="object-cover h-full w-full  rounded-full"
                />
                <span
                  className="cursor-pointer absolute top-1/4 right-1/4 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
                  onClick={toggleAdditionalContent}
                />
              </div>
            ) : (
              <SkeletonImage
                width={500}
                height={500}
                showSize={false}
                txtSize="text-3xl"
                borderRadius="rounded-full"
                className="z-0  w-full h-full"
              />
            )
          ) : (
            <div className="w-32 h-32 rounded-full relative">
              <img
                src={opportunity.thumbnail}
                alt="feature tour"
                width={256}
                height={144}
                className="object-cover h-full w-full  rounded-full"
              />
              <span
                className="cursor-pointer absolute top-1/4 right-1/4 h-4 w-4 bg-secondary border-2 border-primary rounded-secondary"
                onClick={toggleAdditionalContent}
              />
              {showAdditionalContent && (
                <div className="bg-white flex flex-col w-64 gap-y-3 border p-4 rounded absolute top-1/3 left-1/4 mt-5 z-50">
                  <article className="flex flex-row gap-x-2">
                    <img
                      src={opportunity.thumbnail}
                      alt="thumbnail"
                      height={300}
                      width={300}
                      className="rounded-[5px] object-cover h-[35px] w-[35px] border border-primary"
                    />
                    <div className="flex flex-col gap-y-1">
                      <div className="text-sm text-gray-600 line-clamp-1 ">
                        {opportunity?.company.name || (
                          <SkeletonText lines={1} />
                        )}
                      </div>
                      <p className="flex flex-row gap-x-0.5 items-center text-xs line-clamp-1">
                        {opportunity?.country}
                      </p>
                    </div>
                  </article>
                  <p className="text-xs flex flex-row justify-between items-center whitespace-nowrap">
                    <span className="flex flex-row gap-x-0.5 items-baseline">
                      <span className="text-sm text-primary "></span>
                    </span>
                    <span className="min-w-[1rem]" />
                    <span className="border px-3 py-0.5 text-wrap rounded-">
                      {opportunity?.company?.bio}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
          <span className="flex items-center justify-center gap-1 px-2 py-1 h-7  bg-gray-100 text-gray-500  rounded-sm whitespace-nowrap">
            <span className="min-w-10 text-sm">
              {opportunity?.endDate
                ? new Date(opportunity.endDate).toLocaleDateString(
                    "fa-IR-u-ca-persian",
                    {
                      day: "numeric",
                      month: "long"
                    }
                  )
                : ""}
            </span>
            <span className="text-xs text-gray-700">
              {" - "}{" "}
              {opportunity?.startDate
                ? new Date(opportunity.startDate).toLocaleDateString(
                    "fa-IR-u-ca-persian",
                    {
                      day: "numeric",
                      month: "long"
                    }
                  )
                : ""}
            </span>
            <Time />
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 ">
          {opportunity?.summary || <SkeletonText lines={3} />}
        </p>
      </div>

      {/* محتوا */}
      <div className="flex justify-start gap-x-1 mt-4 overflow-x-auto custom-scrollbar h-10">
        <span className="flex items-center gap-1 px-2 py-1 h-7  bg-cyan-100 text-cyan-500  rounded-sm whitespace-nowrap">
          <OfficeBag />
          <span className="min-w-10 text-cyan-500 text-sm">
            {opportunity?.jobTime?.value}
          </span>
        </span>
        <span className="flex items-center gap-1 px-2 py-1 h-7 bg-cyan-100 text-cyan-500 rounded-sm whitespace-nowrap">
          <Chart />
          <span className="min-w-10">
            {opportunity?.experienceLevel?.map((item, index) => (
              <span key={index} className="mr-1 text-sm text-sky-500">
                {item.value} {"- "}
              </span>
            ))}
          </span>
        </span>
        <span className="flex items-center gap-1 px-2 py-1 h-7 bg-cyan-100 text-cyan-500 rounded-sm whitespace-nowrap">
        <Desktop />
          <span className="min-w-10 text-sm text-cyan-500">
            {opportunity?.jobMode?.value}
          </span>
        </span>
      </div>
      <div className="flex justify-start gap-x-1 mt-2 overflow-x-auto custom-scrollbar h-10">
        {opportunity?.skills?.map((item, index) => (
          <span
            key={index}
            className="flex items-center w-fit gap-1 px-2 py-1 h-7 bg-blue-100 text-blue-500 rounded-sm whitespace-nowrap"
          >
            <span className="mr-1 text-sm text-blue-500">{item}</span>
          </span>
        ))}
      </div>
      <div className="max-w-xl mx-auto">
        <label className="text-gray-400">درخواست ها</label>
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
    </div>
  );
}
