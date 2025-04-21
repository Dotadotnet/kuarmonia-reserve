import PropertiesClient from "./PropertiesClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { BiRightArrowAlt } from "react-icons/bi";
import Link from "next/link";

const PropertiesServer = async () => {
  const api = `${process.env.API}/property/get-properties`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["properties"] }
  });
  const res = await response.json();
  const properties = res.data;

  return (
    <section
      id="properties"
      className="bg-clip-border h-full pt-12 dark:bg-gray-900"
      style={{
        backgroundImage:
          "url(/assets/home-page/properties-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-2">
          <div className="flex flex-row justify-between items-center">
            <article className="flex flex-col gap-y-4">
              <h2 className="lg:text-5xl md:text-4xl text-4xl whitespace-normal">
                <HighlightText title={"فرصت های سرمایه گذاری"} />
              </h2>
            </article>
            <div className="text-primary border-b-2 border-b-transparent hover:border-b-primary transition-all">
              <Link
                href="/news"
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                بیشتر ببینید <BiRightArrowAlt />
              </Link>
            </div>
          </div>
          <p className="text-base">بهترین ها برای خرید ملک و سرمایه گذاری</p>
          <PropertiesClient properties={properties} />
        </section>
      </Container>
    </section>
  );
};

export default PropertiesServer;
