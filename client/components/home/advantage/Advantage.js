import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/page";

import AdvantageArticle from "./AdvantageArticle";
import AdvantageBanner from "./AdvantageBanner";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Advantage = () => {
  const t = useTranslations("HomePage")
  return (
    <section
      className="bg-no-repeat bg-center h-full pt-12 dark:bg-gray-900 "
      style={{
        backgroundImage: "url(/assets/home-page/advantage/manDirect.svg)",
        backgroundPosition: "125% 80%",
        backgroundSize: "50% 50%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-4">
          <div className="flex flex-col justify-start items-start">
            <article className="flex items-start flex-col gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={t("24")} />
              </h2>
              <p className="text-base px-4">{t("25")}</p>
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
