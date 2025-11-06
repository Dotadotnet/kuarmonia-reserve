import React from "react";
import VisaTypeClient from "./VisaTypeClient";

export default async function Page({ params }) {
  const locale = params?.locale || "fa";
  const api = `${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypes`;

  let visaTypes = [];

  try {
    const response = await fetch(api, {
      cache: "no-store",
      next: { tags: ["visaType"] },
      headers: {
        "Accept-Language": locale,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    const data = await response.json();
    visaTypes = data.data || [];
  } catch (error) {
    console.error("❌ Error fetching visa types:", error.message);
  }

  // 🌀 حالت Skeleton Loader کوچک‌تر
  if (visaTypes.length === 0) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-white border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md hover:shadow-gray-100 dark:hover:border-blue-500 dark:bg-gray-800 flex flex-col p-2 transition-all duration-300 ease-in-out h-[180px]"
          >
            <div className="flex flex-col gap-y-1">
              <div className="flex w-full justify-center">
                <div className="w-full p-1 rounded-lg">
                  <div className="bg-gray-200 dark:bg-gray-600 animate-pulse rounded-md w-full h-24" />
                </div>
              </div>
            </div>

            <article className="flex flex-col gap-y-2 items-center dark:text-white w-full mt-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-600 animate-pulse rounded w-2/3"></div>
            </article>
          </div>
        ))}
      </section>
    );
  }

  // ✅ حالت عادی
  return <VisaTypeClient visaTypes={visaTypes} locale={locale} />;
}
