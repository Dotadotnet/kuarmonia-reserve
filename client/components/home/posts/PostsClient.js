"use client";

import PostCard from "@/components/shared/card/PostCard";
import PropCardSkeleton from "@/components/shared/card/PropCardSkeleton";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const PostsClient = ({ posts }) => {
  const breakpoints = {
    "(max-width: 768px)": {
      slides: { perView: 1.2, spacing: 15 }
    },
    "(min-width: 768px)": {
      slides: { perView: 2, spacing: 20 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 3, spacing: 25 }
    }
  };

  return (
    <div className="h-full">
      <KeenSlider
        className="my-1.5"
        breakpoints={breakpoints}
        autoPlay={true}
        autoPlayDelay={4000}
      >
        {posts && posts.length === 0
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="keen-slider__slide">
                <PropCardSkeleton />
              </div>
            ))
          : posts.slice(0, 8).map((post) => (
              <div key={post._id} className="keen-slider__slide">
                <PostCard post={post} />
              </div>
            ))}
      </KeenSlider>
    </div>
  );
};

export default PostsClient;
