import PropertiesClient from "./PropertiesClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";

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
      className="bg-clip-border h-full py-12 dark:bg-gray-900"
      style={{
        backgroundImage:
          "url(/assets/home-page/properties-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >
      <Container>
        <section className="w-full h-full flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-12">
            <article className="flex flex-col gap-y-4">
              <h1 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
                <HighlightText>فرصت های سرمایه گذاری</HighlightText>
              </h1>
              <p className="text-base">
                بهترین گزینه‌ها برای خرید، فروش، رهن و اجاره در یک نگاه
              </p>
            </article>
          </div>
          <PropertiesClient properties={properties} />
        </section>
      </Container>
    </section>
  );
};

export default PropertiesServer;
