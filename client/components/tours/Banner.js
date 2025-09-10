'use client'
import { useEffect, useMemo, useState } from "react";
import Search from "./Search";

const Banner = () => {
  const bannerImages = useMemo(
    () => ["/assets/slide/1.jpg", "/assets/slide/2.jpg", "/assets/slide/3.jpg"],
    []
  );

  const [backgroundImage, setBackgroundImage] = useState(
    bannerImages[Math.floor(Math.random() * bannerImages.length)]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundImage(
        bannerImages[Math.floor(Math.random() * bannerImages.length)]
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [bannerImages]);

  return (
    <section
      className="bg-no-repeat bg-auto bg-bottom relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black/60 before:top-0 before:left-0 before:-z-10 z-20 flex flex-col gap-y-12 h-[70vh] justify-center px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover", // یا 'contain' برای تنظیم اندازه
        backgroundPosition: "center"
      }}
    >
      <article className="flex flex-col items-center gap-y-8">
        <h1 className="text-white text-center lg:text-7xl md:text-5xl text-xl">
          مسیر مهاجرت خود را پیدا کنید
        </h1>
        <p className="lg:w-1/2 md:w-3/4 w-full text-white text-center lg:text-base md:text-sm text-xs">
          با انتخاب مسیری مناسب برای مهاجرت می‌توانید زندگی بهتری برای خود و
          خانواده‌تان فراهم کنید. این فرآیند شامل یافتن کشورهایی است که بهترین
          امکانات، امنیت و فرصت‌ها را برای آینده‌ای روشن‌تر در اختیار مهاجرین
          قرار می‌دهند.
        </p>
      </article>

      {/* <Search /> */}
    </section>
  );
};

export default Banner;
