'use client'
import { useEffect, useMemo, useState } from "react";
import Search from "./Search";

const Banner = () => {
  const bannerImages = useMemo(
    () => ["/assets/slide/property/1.webp", "/assets/slide/property/2.webp"],
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
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <article className="flex flex-col items-center gap-y-8">
        <h1 className="text-white text-center lg:text-7xl md:text-5xl text-xl">
          خانه‌ای در خارج از کشور خریداری کنید
        </h1>
        <p className="lg:w-1/2 md:w-3/4 w-full text-white text-center lg:text-base md:text-sm text-xs">
          خرید ملک در کشورهای مختلف مانند ترکیه، کانادا و آمریکا می‌تواند علاوه بر سرمایه‌گذاری مطمئن، فرصت‌هایی مانند اقامت و شهروندی را نیز برای شما به ارمغان بیاورد. بهترین گزینه‌های مسکن را با ما پیدا کنید.
        </p>
      </article>

      {/* <Search /> */}
      
    </section>
  );
};

export default Banner;
