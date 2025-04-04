import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import DestinationByMonth from "./DestinationByMonth";
import Image from 'next/image'

const PopularDestination = () => {
  return (
    <section
      className="bg-no-repeat bg-cover h-full py-12 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/popular-destination/bg.svg)",
      }}
    >
      <Container>
        <section id="hotels" className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>فرصت ها</HighlightText> بر اساس ماه
                <Image
                  src="/assets/home-page/destination/underline.svg"
                  alt="arrow"
                  height={7}
                  width={275}
                  className="mt-1.5 filter dark:invert  dark:brightness-0 dark:sepia dark:hue-rotate-180"
                  />
              </h1>
              <p className="text-base">
                در اینجا برخی از  محبوب ترین فرصت های ما در تمام مقاصدمان را مشاهده می‌کنید
                که شامل فرصت‌های مهاجرت نیز می‌شود.
              </p>
            </article>

            <DestinationByMonth />
          </div>
        </section>
      </Container>
    </section>
  );
};

export default PopularDestination;
