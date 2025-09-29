"use client";

import PropCard from "@/components/shared/card/PropCard";
import PropCardSkeleton from "@/components/shared/card/PropCardSkeleton";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const PropertiesClient = ({ properties }) => {
  const breakpoints = {
    "(max-width: 640px)": {
      slides: { perView: 1.2, spacing: 15 }
    },
    "(min-width: 640px)": {
      slides: { perView: 2, spacing: 20 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 4, spacing: 25 }
    }
  };

  return (
    <div className="h-fit">
      <KeenSlider
        className="w-full h-fit my-2"
        breakpoints={breakpoints}
        autoPlay={true}
        autoPlayDelay={4000}
      >
        {properties && properties.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="keen-slider__slide">
                <PropCardSkeleton />
              </div>
            ))
          : properties.slice(0, 8).map((property) => (
              <div key={property._id} className="keen-slider__slide">
                <PropCard property={property} />
              </div>
            ))}
      </KeenSlider>
    </div>
  );
};

export default PropertiesClient;
