import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { BiRightArrowAlt } from "react-icons/bi";
import NewsSlider from "./NewsSlider";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Api from "@/utils/api";

const News = async ({ news }) => {
  const t = await getTranslations("HomePage");

  return (
    <section
      id="flights"
      className="pt-12 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-6">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                {/* <HighlightText title={t("17")} /> */}
              </h2>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link 
                href={`/all/news`}
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                {t("19")} <BiRightArrowAlt className="rotate-0 rtl:rotate-180" />
              </Link>
            </div>
          </div>
          <p className="text-base">{t("18")}</p>
          <NewsSlider news={news} />
        </div>
      </Container>
    </section>
  );
};

export default News;
