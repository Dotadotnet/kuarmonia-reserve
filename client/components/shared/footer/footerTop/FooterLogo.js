import React from "react";
import Logo from "../../logo/Logo";
import FooterPayment from "./FooterPayment";
import { useTranslations } from "next-intl";

const FooterLogo = () => {
  const t = useTranslations('ForAll')
  return (
    <section>
      <article className="flex md:flex-col md:justify-normal md:items-start flex-row justify-between items-center gap-y-4">
        <Logo justify="start" />
        <p className="text-xs md:block hidden">
         {t("25")}
        </p>
        <div className="lg:hidden block">
          <FooterPayment />
        </div>
      </article>
    </section>
  );
};

export default FooterLogo;
