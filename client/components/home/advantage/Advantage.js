

import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import AdvantageArticle from "./AdvantageArticle";
import AdvantageBanner from "./AdvantageBanner";
import Image from 'next/image'

const Advantage = () => {
  return (
    <section
      className="bg-no-repeat bg-center h-full py-12 dark:bg-gray-900 "
      style={{
        backgroundImage: "url(/assets/home-page/advantage/manDirect.svg)",
        backgroundPosition: "125% 80%",
        backgroundSize: "50% 50%",
        
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <p className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>چرا</HighlightText> کارمونیا
                <Image
        src="/assets/home-page/destination/underline.svg"
        alt="arrow"
        height={7}
        width={275}
        className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
        />
              </p>
              <p className="text-base">
              چرا انتخاب ما برای مهاجرت و اخذ ویزا بهترین تصمیم شماست؟
              </p>
            </article>

            <div className="grid md:grid-cols-2 md:items-center grid-cols-1 gap-8">
              <AdvantageArticle />
              <AdvantageBanner />
            </div>
          </div>
        </section>
      </Container>
    </section>
  );
};

export default Advantage;
