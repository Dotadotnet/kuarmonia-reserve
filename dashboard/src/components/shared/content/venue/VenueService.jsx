import React from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";

function VenueService({ venue }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-x-2">
        <span className="text-sm">خدمات</span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        {/* ستون موارد فعال */}
        <div>
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-1">
            {venue?.services?.length > 0 ? (
              venue?.services
                ?.filter((item) => item.value)
                .map((item) => (
                  <span
                    key={item.id}
                    className="flex items-center gap-x-1 text-green-700 text-xs px-2 py-1 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                      >
                        <path d="M20.25 10.907V7.272c0-.829-.633-1.521-1.453-1.644c-.951-.142-2.18-.376-3.078-.722c-.907-.349-1.997-1.007-2.762-1.505a1.76 1.76 0 0 0-1.914 0c-.764.498-1.855 1.156-2.762 1.505c-.899.346-2.127.58-3.078.722c-.82.123-1.453.815-1.453 1.644v3.635a10.13 10.13 0 0 0 5.363 8.939l.23.123l1.962.946a1.6 1.6 0 0 0 1.39 0l1.961-.946l.23-.123a10.13 10.13 0 0 0 5.364-8.939"></path>
                        <path d="m15.509 10l-4.076 4.076a.6.6 0 0 1-.849 0l-2.093-2.09"></path>
                      </g>
                    </svg>
                    {item.label}
                  </span>
                ))
            ) : (
              <SkeletonText lines={1} />
            )}
          </div>
        </div>
        {/* ستون موارد غیرفعال */}
        <div>
          <div className="flex flex-wrap gap-x-2 gap-y-2 mt-1">
            {venue?.services?.length > 0 ? (
              venue?.services
                ?.filter((item) => !item.value)
                .map((item) => (
                  <span
                    key={item.id}
                    className="flex items-center gap-x-1 text-red-700 text-xs px-2 py-1 rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20.25 10.907V7.272c0-.829-.633-1.521-1.453-1.644c-.951-.142-2.18-.376-3.078-.722c-.907-.349-1.997-1.007-2.762-1.505a1.76 1.76 0 0 0-1.914 0c-.764.498-1.855 1.156-2.762 1.505c-.899.346-2.127.58-3.078.722c-.82.123-1.453.815-1.453 1.644v3.635a10.13 10.13 0 0 0 5.363 8.939l.23.123l1.962.946a1.6 1.6 0 0 0 1.39 0l1.961-.946l.23-.123a10.13 10.13 0 0 0 5.364-8.939M9.5 9.5l5 5m0-5l-5 5"
                      ></path>
                    </svg>
                    {item.label}
                  </span>
                ))
            ) : (
              <SkeletonText lines={1} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueService;
