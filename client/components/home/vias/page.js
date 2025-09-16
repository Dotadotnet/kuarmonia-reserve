import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { BiRightArrowAlt } from "react-icons/bi";
import VisaSlider from "./VisaSlider";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const Visa = async ({ params }) => {
  const { locale } = await params;
  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["visa"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const visa = res.data;  
  const t = await getTranslations("Visa", locale);
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
                <HighlightText title={t("Title")} />
              </h2>
            </article>
            <div className="text-primary border-b-2 border-transparent hover:border-b-primary transition-all">
              <Link
                href={`/all/visa`}
                className="flex flex-row gap-x-1 items-center whitespace-nowrap"
              >
                {t("More")} <BiRightArrowAlt className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
          <p className="text-base">{t("Description")}</p>

          <VisaSlider visa={visa}  />
        </div>
      </Container>
    </section>
  );
};

export default Visa;
