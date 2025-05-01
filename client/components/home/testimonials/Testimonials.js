import TestimonialsClient from "./TestimonialsClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { getTranslations } from "next-intl/server";





const Testimonials = async () => {
  const t = await getTranslations("HomePage");
  const testimonials = [
    {
      image: "/assets/images/user1.jpg",
      title: t("89"),
      name: t("91"),
      text: t("82")
    },
    {
      image: "/assets/images/user2.jpg",
      title: t("93"),
      name: t("94"),
      text: t("95")
    },
    {
      image: "/assets/images/user3.jpg",
      title: t("89"),
      name: t("96"),
      text: t("97")
    },
    {
      image: "/assets/images/user4.jpg",
      title: t("93"),
      name: t("98"),
      text: t("99")
    },
    {
      image: "/assets/images/user4.jpg",
      title: t("93"),
      name: t("98"),
      text: t("99")
    },
    {
      image: "/assets/images/user4.jpg",
      title: t("93"),
      name: t("98"),
      text: t("99")
    },
    {
      image: "/assets/images/user4.jpg",
      title: t("93"),
      name: t("98"),
      text: t("99")
    }
  ];
  return (
    <Container className={"w-full m-0"}>
      <section className="w-full h-full flex flex-col gap-y-4 ">
        <div className="flex flex-row justify-between items-center">
          <article className="flex flex-col gap-y-4">
            <h2 className="lg:text-5xl md:text-4xl text-4xl whitespace-normal">
              <HighlightText title={t("83")} />
            </h2>
          </article>

        </div>
        <p className="text-base">{t("84")}</p>
        <TestimonialsClient testimonials={testimonials} />
      </section>
    </Container>
  );
};

export default Testimonials;
