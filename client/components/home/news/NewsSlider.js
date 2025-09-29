"use client";

import NewsCard from "@/components/shared/card/NewsCard";
import NewsCardSkeleton from "@/components/shared/skeleton/NewsCardSkeleton";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const NewsSlider = ({ news }) => {
  const breakpoints = {
    "(max-width: 640px)": {
      slides: { perView: 1.2, spacing: 15 }
    },
    "(min-width: 640px)": {
      slides: { perView: 2, spacing: 20 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 3, spacing: 25 }
    }
  };

  return (
    <KeenSlider
      className="w-full max-w-6xl px-4"
      breakpoints={breakpoints}
      autoPlay={true}
      autoPlayDelay={4000}
    >
      {news && news.length === 0
        ? Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="keen-slider__slide w-70 md:w-[450px]">
              <NewsCardSkeleton />
            </div>
          ))
        : news.slice(0, 8).map((newsItem) => (
            <div key={newsItem._id} className="keen-slider__slide w-70 md:w-[450px]">
              <NewsCard news={newsItem} />
            </div>
          ))}
    </KeenSlider>
  );
};

export default NewsSlider;
