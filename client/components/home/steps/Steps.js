import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import BreakdownArticle from "./BreakdownArticle";
import FeatureTour from "./FeatureTour";

const Steps = () => {
  return (
    <section className="py-4 dark:bg-gray-900">
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12 ">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col items-start gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={"مراحل مهاجرت با کارمونیا"} />
              </h2>
              <p className="text-base">
                رویای مهاجرت شما تنها در ۳ مرحله است!
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
