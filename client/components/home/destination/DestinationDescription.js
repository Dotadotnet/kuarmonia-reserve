import HighlightText from "@/components/shared/highlightText/HighlightText";
import React from "react";
import Image from 'next/image'

const DestinationDescription = () => {
  return (
    <section
      className="lg:col-span-7 md:col-span-6 bg-no-repeat bg-contain bg-center h-full"
      style={{
        backgroundImage:
          "url(/assets/home-page/destination/map.svg), url(/assets/home-page/destination/flight.svg), url(/assets/home-page/destination/lucid.svg)",
        backgroundPosition: "50% 30%, 30% 100px, 30% 380px",
        backgroundSize: "80%, 50px, 50px",
      }}
    >
      <div className="w-full h-full flex flex-col justify-center">
        <article className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
            <HighlightText>محبوب ترین</HighlightText> فرصت ها
            <Image
              src="/assets/home-page/destination/underline.svg"
              alt="arrow"
              height={7}
              width={275}
              className="mt-1.5"
            />
          </h1>
          <p className="text-base">
            در اینجا برخی از محبوب‌ترین مقاصد ما را مشاهده می‌کنید که می‌توانید
            در آن‌ها <br />{" "}
            فرصت‌های مهاجرت و اخذ ویزا را پیدا کنید. شامل تورها و تجارب
            منحصر به فرد ما.
          </p>
        </article>
      </div>
    </section>
  );
};

export default DestinationDescription;
