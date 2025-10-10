"use client";

import VisaTypeCard from "@/components/shared/card/VisaTypeCard";
import { useLocale } from "next-intl";
import KeenSlider from "@/components/shared/slider/KeenSlider";
import { useKeenSlider } from "keen-slider/react";

const VisaTypeSlider = ({ visaTypes }) => {
  const locale = useLocale();
  const [sliderRef] = useKeenSlider({
    loop: true,
    initial: 0,
    created(s) {
      s.moveToIdx(5, true);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 15
        }
      },
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15
        }
      },
      "(min-width: 1080px)": {
        slides: {
          perView: 4.5,
          spacing: 15
        }
      }
    }
  });


  // اگه داده وجود نداره یا خالیه → grid اسکلتون‌ها
  if (!visaTypes || visaTypes.length === 0) {
    return (
      <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  // وقتی داده هست → اسلایدر
  return (
    <div
      className="w-full px-4 keen-slider"
      dir={'rtl'}
      ref={sliderRef}
    >
      {visaTypes.slice(0, 8).map((item) => {
        const itemTitle = item?.translations?.find(
          (t) => t.language === locale
        )?.translation?.fields?.title;

        return (
          <div key={item._id}
            className="keen-slider__slide my-8">
            <VisaTypeCard
              visaType={item}
              title={itemTitle}
              summary={null}
              locale={locale}
            />
          </div>
        );
      })}
    </div>
  );
};

export default VisaTypeSlider;