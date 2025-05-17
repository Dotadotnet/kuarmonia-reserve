import React from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import Dollar from "@/components/icons/Dollars";
import Location from "@/components/icons/Location";
import Time from "@/components/icons/Time";
import OfficeBag from "@/components/icons/OfficeBag";
import Chart from "@/components/icons/Chart";
import Desktop from "@/components/icons/Desktop";
export default function Option({opportunity }) {
  return (
    <div className=" mx-auto px-4 py-2 grid md:grid-cols-3 gap-8 relative">
      <div className="md:col-span-3 space-y-2">
        <div className="flex justify-start gap-x-1  overflow-x-auto custom-scrollbar h-10">
          {opportunity?.skills?.map((item, index) => (
            <span
              key={index}
              className="flex items-center w-fit gap-1 px-1 py-4  h-5 bg-blue-100 text-blue-500 rounded whitespace-nowrap"
            >
              <span className="mr-1 text-sm text-blue-500">{item}</span>
            </span>
          ))}
        </div>
        <div className="grid w-full grid-cols-12 rounded-md gap-x-2 p-4 px-1 bg-green-50  ">
          <div className=" gap-y-2 col-span-5 flex flex-col">
            <span className="min-w-10  text-sm flex items-center gap-x-1">
              <OfficeBag className="text-green-300 w-5 h-5" />
              {opportunity?.employmentType?.value || <SkeletonText lines={1} />}
            </span>
            <span className=" flex items-center gap-x-1">
              {opportunity?.minSalary ? (
                <>
                  <Dollar className="text-green-300" />
                  <span className="mt-1">{opportunity.minSalary} -</span>

                  <span className="mt-1">{opportunity.maxSalary}</span>
                  <span
                    className="w-5 h-5 inline-block"
                    dangerouslySetInnerHTML={{
                      __html: opportunity?.currency?.icon
                    }}
                  />
                </>
              ) : (
                <SkeletonText lines={1} />
              )}
            </span>
            <span className=" flex items-center gap-x-1">
              <OfficeBag className="text-green-300" />
              {opportunity?.jobTime?.value || <SkeletonText lines={1} />}
            </span>
            <span className=" flex items-center gap-x-1">
              <OfficeBag className="text-green-300" />
              {opportunity?.vacancy ? (
                "ظرفیت : " + opportunity?.vacancy
              ) : (
                <SkeletonText lines={1} />
              )}
            </span>
          </div>
          <div className=" gap-y-2 col-span-7 flex flex-col">
            <span className="flex items-center gap-x-1 ">
              <Desktop className="text-green-300 w-5 h-5" />

              {opportunity?.jobMode?.value || <SkeletonText lines={1} />}
            </span>
            <span className=" flex items-center">
              {opportunity?.startDate ? (
                <div className="flex gap-x-1 items-center">
                  <Time className="text-green-300" />
                  <span className="mt-1">
                    {" "}
                    {opportunity?.endDate
                      ? new Date(opportunity.endDate).toLocaleDateString(
                          "fa-IR-u-ca-persian",
                          {
                            day: "numeric",
                            month: "long"
                          }
                        )
                      : ""}{" "}
                    -
                  </span>

                  <span className="mt-1">
                    {" "}
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
                </div>
              ) : (
                <SkeletonText lines={1} />
              )}
            </span>
            <span className="min-w-10 flex items-center gap-1">
              {opportunity?.experienceLevel ? (
                <>
                  <Chart className="text-green-300" />
                  {opportunity.experienceLevel
                    .map((item) => item.value)
                    .join(" - ")}
                </>
              ) : (
                <SkeletonText lines={1} />
              )}
            </span>
            {opportunity?.languages && opportunity.languages.length > 1 ? (
              <span className="min-w-10 flex items-center gap-1">
                <Chart className="text-green-300" />
                <span className="mt-1">
                  {opportunity.languages.map((item) => item).join(" - ")}
                </span>
              </span>
            ) : (
              <SkeletonText lines={1} />
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
    </div>
  );
}
