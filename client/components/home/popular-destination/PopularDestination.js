import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import DestinationByMonth from "./DestinationByMonth";
import Image from 'next/image'

const PopularDestination = () => {
  return (
    <section
      className="bg-no-repeat bg-cover h-full py-4 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/popular-destination/bg.svg)",
      }}
    >
      <Container>
        <section id="hotels" className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4 items-start">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={"فرصت ها براساس ماه"} />
              
              </h2>
              <p className="text-base">
                  محبوب ترین فرصت های ما در تمام مقاصدمان.
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
