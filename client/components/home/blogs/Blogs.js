"use client";
import React, { useState, useMemo } from "react";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import BlogCard from "@/components/shared/card/BlogCard";
import Image from 'next/image';
import { useGetAllBlogsQuery } from "@/services/blog/blogApi";
import Pagination from "@/components/shared/pagination/Pagination";

const Blogs = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = blogs ? Math.ceil(blogs.total / itemsPerPage) : 1;
  const superAdmin = useMemo(() => blogs?.superAdmin || [], [blogs]);
console.log(blogs.data);

  return (
    <section
      id="blogs"
      className="bg-clip-border h-full py-12 dark:bg-gray-900 "
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%",
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>بلاگ</HighlightText> & راهنما
                <Image
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
                />
              </h1>
              <p className="text-base">
                این بلاگ‌ها به موضوعات مهاجرت، اخذ ویزا ازدواج و سرمایه‌گذاری در کشورهای خارجی می‌پردازند و اطلاعات مفیدی برای افرادی که قصد تغییر و تحول در زندگی خود دارند، ارائه می‌دهند. مطالب ما راهنمایی‌های کاربردی و به‌روزی برای شروع یک زندگی جدید در کشورهای مختلف فراهم می‌کنند.
              </p>
            </article>
          </div>
          <section className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 place-items-center">

          {blogs.data.length === 0
            ? Array.from({ length: 6 }, (_, index) => (
                <BlogCard key={index} />
              ))
            : blogs.data.map((blog, index) => (
                <BlogCard
                  key={index}
                  id={blog.id}
                  title={blog?.title}
                  slug={blog?.slug}
                  description={blog?.description}
                  thumbnailPreview={blog?.featuredImage?.url}
                  publishDate={blog?.publishDate}
                  creator={blog?.creator}
                  superAdmin={superAdmin}
                />
              ))
          }
</section>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </Container>
    </section>
  );
};

export default Blogs;
