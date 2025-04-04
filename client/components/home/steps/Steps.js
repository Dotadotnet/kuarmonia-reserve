import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import BreakdownArticle from "./BreakdownArticle";
import FeatureTour from "./FeatureTour";
import Image from 'next/image'

const Steps = () => {
  return (
    <section className="py-12 dark:bg-gray-900">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12 ">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>مراحل</HighlightText> ساده و برتر
                <Image
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
                  />
              </h1>
              <p className="text-base">
                رویای مهاجرت شما تنها در ۳ مرحله است - همین حالا با سهولت اقدام کنید!
              </p>
            </article>
          </div>

          <div className="grid md:items-center gap-8 grid-cols-12">
            <div className="lg:col-span-7 md:col-span-6 col-span-12">
              <BreakdownArticle />
            </div>
            <div className="lg:col-span-5 md:col-span-6 col-span-12">
              <FeatureTour />
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Steps;
