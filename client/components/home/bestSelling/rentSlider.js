"use client";

import RentCard from "@/components/shared/card/RentCard";
import RentCardSkeleton from "@/components/shared/skeleton/RentCardSkeleton";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const RentSlider = ({ rent }) => {
  const breakpoints = {
    "(max-width: 640px)": {
      slides: { perView: 1.2, spacing: 5 }
    },
    "(min-width: 640px)": {
      slides: { perView: 2, spacing: 20 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 4, spacing: 20 }
    }
  };

  return (
    <KeenSlider
      className="w-full px-4"
      breakpoints={breakpoints}
      autoPlay={true}
      autoPlayDelay={4000}
    >
      {rent && rent.length === 0
        ? Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="keen-slider__slide">
              <RentCardSkeleton />
            </div>
          ))
        : rent.map((rentItem) => (
            <div key={rentItem._id} className="keen-slider__slide">
              <RentCard tour={rentItem} />
            </div>
          ))}
    </KeenSlider>
  );
};

export default RentSlider;
