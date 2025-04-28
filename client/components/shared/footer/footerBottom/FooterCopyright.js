import React from "react";
import Logo from "../../logo/Logo";
import { useTranslations } from "next-intl";

const FooterCopyright = () => {
  const t = useTranslations("ForAll")
  return (
    <section>
      <footer className="text-center text-sm text-gray-500 mt-4 mb-12 lg:mb-0">
        © {new Date().getFullYear()} {t("23")}
        <br />
        {t("24")}
      </footer>
    </section>
  );
};

export default FooterCopyright;
