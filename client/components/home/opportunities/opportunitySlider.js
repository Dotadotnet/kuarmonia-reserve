'use client'

import OpportunityCard from "@/components/shared/card/OpportunityCard";
import OpportunityCardSkeleton from "@/components/shared/skeleton/opportunityCardSkeleton";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const OpportunitySlider = ({ opportunity }) => {
  const breakpoints = {
    "(max-width: 640px)": {
      slides: { perView: 1.1, spacing: 15 }
    },
    "(min-width: 640px)": {
      slides: { perView: 2, spacing: 20 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 4, spacing: 25 }
    }
  };

  return (
    <KeenSlider 
      className="w-full h-fit my-2"
      breakpoints={breakpoints}
      autoPlay={true}
      autoPlayDelay={4000}
    >
      {opportunity && opportunity.length === 0
        ? Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="keen-slider__slide w-[250px]">
              <OpportunityCardSkeleton />
            </div>
          ))
        : opportunity.slice(0, 8).map((opportunityItem) => (
            <div key={opportunityItem._id} className="keen-slider__slide w-[250px]">
              <OpportunityCard opportunity={opportunityItem} />
            </div>
          ))}
    </KeenSlider>
  );
};

export default OpportunitySlider;
