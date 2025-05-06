import PropertiesClient from "./PropertiesClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const PropertiesServer = async ({ params }) => {
  const locale = params.locale;

  const api = `${process.env.NEXT_PUBLIC_API}/property/get-properties`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["properties"] },
    headers: {
      "Accept-Language": locale
    }
  });
  const res = await response.json();
  const properties = res.data;
  const t = await getTranslations("HomePage")
  return (
    <Container>
      <div
        id="properties"
        className="bg-clip-border h-full pt-12 dark:bg-gray-900"
        style={{
          backgroundImage:
            "url(/assets/home-page/properties-and-travel-guide/bg.svg)",
          backgroundPosition: "125% 80%"
        }}
      >
        <div className="w-full h-full flex flex-col gap-y-2">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-4xl ">
                <HighlightText title={t("20")} />
              </h2>
              <p className="text-sm">
              {t("101")}
              </p>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/news"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap mt-4"
              >
                {t("19")} <BiRightArrowAlt />
              </Link>
            </div>
          </div>
          <PropertiesClient properties={properties} />
        </div>
      </div>
    </Container>
  );
};

export default PropertiesServer;
