import React, { useState, useEffect } from "react";

function Banner() {
  const [bannerOpen, setBannerOpen] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setBannerOpen(false);
    }, 10000); 
    return () => clearTimeout(timer); 
  }, []);

  const query = new URLSearchParams(location.search);
  const template = query.get("template");
  const liteLink =
    template === "laravel"
      ? "https://github.com/cruip/laravel-tailwindcss-admin-dashboard-template"
      : "https://github.com/cruip/tailwind-dashboard-template";

  return (
    <>
      {bannerOpen && (
        <div className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-50">
          <div className="dark:bg-gray-800 bg-gray-100 border border-transparent dark:border-gray-700/60 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
            <div className="text-gray-500 inline-flex">
              <a
                className="font-medium hover:underline text-gray-50"
                href={liteLink}
                target="_blank"
                rel="noreferrer"
              ></a>
              <p>
                {"کلیه حقوق این اثر متعلق به شرکت "}
                <span className="text-red-500 text-lg">کارمونیا</span>
                {
                  " می‌باشد. هرگونه کپی‌برداری یا استفاده غیرقانونی و ورود غیرمجاز پیگرد قانونی دارد."
                }
              </p>
              <span className="italic px-1.5"></span>
            </div>
            <button
              className="text-gray-500 hover:text-gray-400 pl-2 ml-3 border-l border-gray-700/60"
              onClick={() => setBannerOpen(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4 shrink-0 fill-current"
                viewBox="0 0 16 16"
              >
                <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;
