import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/page";
import { BiRightArrowAlt } from "react-icons/bi";
import VisaTypeSlider from "./VisaTypeSlider";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const VisaTypes = async ({ params }) => {
  const { locale } = await params;
  const api = `${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypes`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["visaType"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const visaTypes = res.data || [];  
  const t = await getTranslations("VisaType", locale);
  
  return (
    <section
      id="visa-types"
      className="pt-12 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <div className="w-full h-full flex flex-col gap-y-6">
          <div className="flex flex-row justify-between items-center px-4">
            <article className="flex flex-col gap-y-4 ">
              <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText title={t("Title")} />
              </h2>
            </article>
            <div className="text-primary border-b-2 border-transparent hover:border-b-primary transition-all">
              <Link
                href={`/visa-types`}
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                {t("More")} <BiRightArrowAlt className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
          <p className="text-base px-4 px-4">{t("Description")}</p>

          <VisaTypeSlider visaTypes={visaTypes} />
        </div>
      </Container>
    </section>
  );
};

export default VisaTypes;
