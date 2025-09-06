import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { BiRightArrowAlt } from "react-icons/bi";
import OpportunitySlider from "./opportunitySlider";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Api from "@/utils/api";


const Opportunity = async ({ opportunity }) => {
  const t = await getTranslations("opportunity");
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
                <HighlightText title={t("title")} />
              </h2>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href={`/all/opportunity`}
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                {t("more")} <BiRightArrowAlt className="rotate-0 rtl:rotate-180" />
              </Link>
            </div>
          </div>
          <p className="text-base">{t("description")}</p>

          <OpportunitySlider opportunity={opportunity} />
        </div>
      </Container>
    </section>
  );
};

export default Opportunity;
