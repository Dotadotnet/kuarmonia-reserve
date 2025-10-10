"use client";

import VisaCard from "@/components/shared/card/VisaCard";
import VisaCardSkeleton from "@/components/shared/skeleton/VisaCardSkeleton";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const VisaSlider = ({ visa }) => {
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

  // اگه دیتا وجود نداره یا خالیه → فقط اسکلتون‌ها
  if (!visa || visa.length === 0) {
    return (
      <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-[250px]">
            <VisaCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // وقتی دیتا هست → اسلایدر
  return (
    <KeenSlider
      className="w-full px-4"
      breakpoints={breakpoints}
      autoPlay={true}
      autoPlayDelay={4000}
    >
      {visa.slice(0, 8).map((visaItem) => (
        <div key={visaItem._id} className="keen-slider__slide my-8">
          <VisaCard visa={visaItem} />
        </div>
      ))}
    </KeenSlider>
  );
};

export default VisaSlider;