"use client";

import BlogCard from "@/components/shared/card/BlogCard";
import BlogCardSkeleton from "@/components/shared/skeleton/BlogCardSkeleton";
import KeenSlider from "@/components/shared/slider/KeenSlider";

const BlogsClient = ({ blogs }) => {
  const breakpoints = {
    "(max-width: 768px)": {
      slides: { perView: 1.1, spacing: 24 }
    },
    "(min-width: 768px)": {
      slides: { perView: 2, spacing: 24 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 3, spacing: 24 }
    }
  };

  return (
    <KeenSlider
      breakpoints={breakpoints}
      autoPlay={true}
      autoPlayDelay={4500}
    >
      {blogs && blogs.length === 0
        ? Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="keen-slider__slide">
              <BlogCardSkeleton />
            </div>
          ))
        : blogs.slice(0, 8).map((blogItem) => (
            <div key={blogItem._id} className="keen-slider__slide">
              <BlogCard data={blogItem} />
            </div>
          ))}
    </KeenSlider>
  );
};

export default BlogsClient;
