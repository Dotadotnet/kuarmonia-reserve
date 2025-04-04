"use client";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import Card from "@/components/shared/card/Card";
import SkeletonCard from "@/components/shared/card/SkeletonCard";
import { useGetRentsQuery } from "@/services/rent/rentApi";
import Image from 'next/image'

const BestSelling = ({ className }) => {
  const { data, isLoading, error } = useGetRentsQuery();
  const tours = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    if (error) {
      console.log(error?.data?.message);
    }
  }, [error]);

  return (
    <section id="flights" className="py-12 dark:bg-gray-900">
      <Container className={`${className}`}>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>جدید ترین</HighlightText> اخبار
                <Image
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
                  />
              </p>
              <p className="text-base">
              اخبار ما شامل اطلاعات درباره فرصت‌های شغلی و تحصیلی جدید در کشورهای مختلف است که می‌تواند به شما در یافتن بهترین گزینه‌های موجود کمک کند.
              </p>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/tours"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
    بیشتر ببینید <BiRightArrowAlt />
    </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
            {tours?.length === 0 || isLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <SkeletonCard key={index} />
                ))
              : tours
                  ?.slice(0, 8)
                  ?.map((tour) => <Card key={tour._id} tour={tour} />)}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default BestSelling;
