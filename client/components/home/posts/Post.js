// import Image from "next/image";
"use client";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import Posts from "./Posts";
import Image from "next/image";

const Post = (params) => {
  return (
    <section
      className="bg-no-repeat bg-contain bg-center h-full py-12 dark:bg-gray-900 "
      style={{
        backgroundImage:
          "url(/assets/home-page/offer/tree1.svg), url(/assets/home-page/offer/tree2.svg)",
        backgroundPosition: "0% 0%, 100% 100%",
        backgroundSize: "251px 300px, 251px 300px"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
              <HighlightText>پست های </HighlightText> جدید
              <Image
                src="/assets/home-page/destination/underline.svg"
                alt="arrow"
                height={7}
                width={275}
                className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
              />
            </p>
            <p className="text-base">
              پست های ما شامل جدیدترین اطلاعات و تغییرات در قوانین مهاجرت و اخذ
              ویزا هستند که می‌توانند به شما در تصمیم‌گیری‌های مهم کمک کنند.{" "}
            </p>
          </article>
          <div>
            <Posts posts={params.posts} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Post;
