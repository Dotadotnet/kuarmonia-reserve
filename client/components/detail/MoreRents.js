"use client";
import Container from "../shared/container/Container";
import HighlightText from "../shared/highlightText/HighlightText";
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import SkeletonCard from "../shared/card/SkeletonCard";
import { useLocale, useTranslations } from "next-intl";
import RentCard from "../shared/card/RentCard";

const MoreRents = ({ className }) => {
  const t = useTranslations("rent");

  return (
    <section id="flights" className="py-12">
      <Container className={`${className}`}>
        <section className="w-full h-full flex flex-col gap-y-12">
          <article className="flex flex-col gap-y-4">
            <h2 className="lg:text-5xl w-fit md:text-4xl text-3xl whitespace-normal">
              <HighlightText title={t("sameRentTitle")} />
            </h2>
            <p className="text-base px-4">{t("sameRentDescription")}</p>
          </article>

          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
};

export default MoreRents;
