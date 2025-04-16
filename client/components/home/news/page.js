import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import NewsCardSkeleton from "@/components/shared/skeleton/NewsCardSkeleton";
import NewsCard from "@/components/shared/card/NewsCard";
import Link from "next/link";
import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";

const News = async () => {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}/news/get-news`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["news"] }
  });

  const res = await response.json();
  const news = res.data;

  return (
    <section id="flights" className="py-12 dark:bg-gray-900">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>جدید ترین</HighlightText> اخبار
              </p>
              <p className="text-base">
                اخبار ما شامل اطلاعات درباره فرصت‌های شغلی و تحصیلی جدید در
                کشورهای مختلف است که می‌تواند به شما در یافتن بهترین گزینه‌های
                موجود کمک کند.
              </p>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/news"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                بیشتر ببینید <BiRightArrowAlt />
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {!news?.length
              ? Array.from({ length: 4 }, (_, index) => (
                  <NewsCardSkeleton key={index} />
                ))
              : news.slice(0, 8).map((newsItem) => (
                  <NewsCard key={newsItem._id || newsItem.id} news={newsItem} />
                ))}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default News;
