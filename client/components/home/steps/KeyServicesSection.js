import KeyServicesClient from "./KeyServicesClient";
import { getTranslations } from "next-intl/server";

export default async function KeyServices({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/service/get-services/?page=${page}&limit=${limit}`;

  let services = [];

  try {
    const response = await fetch(api, {
      cache: "no-store",
      next: { tags: ["service"] },
      headers: {
        "Accept-Language": locale,
      },
    });

    // اگر سرور در دسترس نیست یا پاسخ خطاست
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const res = await response.json();
    services = res.data || [];
  } catch (error) {
    console.error("❌ Error fetching services:", error.message);
    // مانع کرش شدن SSR میشه
  }

  // اگر داده نداریم (سرور خاموشه یا خطا داده)
  if (!services || services.length === 0) {
    return (
      <section className="max-w-7xl mx-auto ">
        <div className="relative flex mt-2 justify-around overflow-x-auto scrollbar-hide flex-nowrap">
          <picture className="hidden md:block absolute inset-x-0 top-10">
            <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
            <img src="/assets/home-page/keyservice/step-bg.svg" alt="vector" />
          </picture>

          {/* Render 4 skeleton items */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="my-4 mx-2 z-40 py-2 px-2 w-fit flex flex-col items-center justify-center rounded-[40px] 
              cursor-pointer flex-shrink-0 animate-pulse"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-2">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600" />
                </div>
              </div>
              <div className="text-center transition-colors duration-300">
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>

      </section>
    );
  }

  return <KeyServicesClient services={services} />;
}
