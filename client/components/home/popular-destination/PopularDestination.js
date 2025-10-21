import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";

import DestinationByMonth from "./DestinationByMonth";
import Image from 'next/image'
import { useTranslations } from "next-intl";

const PopularDestination = () => {
  const t = useTranslations("HomePage")
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
                <HighlightText title={t("79")} />

              </h2>
              <p className="text-base px-4">
                {t("80")}
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
