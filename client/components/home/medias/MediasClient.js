"use client";

import MediaCard from "@/components/shared/card/MediaCard";
import SkeletonCard from "@/components/shared/card/SkeletonCard";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const MediasClient = ({ medias }) => {
  const breakpoints = {
    "(max-width: 768px)": {
      slides: { perView: 1.2, spacing: 24 }
    },
    "(min-width: 768px)": {
      slides: { perView: 2, spacing: 24 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 4, spacing: 24 }
    }
  };

  return (
    <KeenSlider
      breakpoints={breakpoints}
      autoPlay={true}
      autoPlayDelay={4500}
    >
      {medias && medias.length === 0
        ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="keen-slider__slide">
              <SkeletonCard />
            </div>
          ))
        : medias.slice(0, 8).map((media) => (
            <div key={media._id} className="keen-slider__slide">
              <MediaCard media={media} />
            </div>
          ))}
    </KeenSlider>
  );
};

export default MediasClient;
