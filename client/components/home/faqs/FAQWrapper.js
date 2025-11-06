// app/components/faq/FAQWrapper.jsx
import FAQ from "./FAQ";
import Container from "../../shared/container/Container";
import { getTranslations } from "next-intl/server";
import HighlightText from "../../shared/highlightText/page";

const FAQWrapper = async () => {
  const api = `${process.env.NEXT_PUBLIC_API}/faqs/get-faqs`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["faqs"] }
  });
  const res = await response.json();
  const t = await getTranslations("HomePage");

  return (
    <Container>
      <div className="w-full h-full flex flex-col gap-y-12 dark:bg-gray-900">
        <article className="flex flex-col gap-y-4 items-start">
          <h2 className="lg:text-5xl md:text-4xl text-3xl whitespace-normal">
            <HighlightText title={t("67")} />
          </h2>
          <p className="text-base px-4"> {t("86")} </p>
        </article>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <FAQ faqs={res.data} />
        </div>
      </div>
    </Container>
  );
};

export default FAQWrapper;
