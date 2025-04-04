import React from "react";
import Logo from "../../logo/Logo";
import FooterPayment from "./FooterPayment";

const FooterLogo = () => {
  return (
    <section>
      <article className="flex md:flex-col md:justify-normal md:items-start flex-row justify-between items-center gap-y-4">
        <Logo justify="start" />
        <p className="text-xs md:block hidden">
          ما در **شرکت مهاجرتی کارمونیا، به شما در تمامی مراحل مهاجرت کمک می‌کنیم. 
          خدمات ما شامل مشاوره تخصصی، ثبت درخواست و پیگیری وضعیت درخواست‌هاست. 
          هدف ما ارائه بهترین خدمات به شما و کمک به تحقق اهداف مهاجرتی‌تان است. 
          با ما همراه باشید تا یک آینده بهتر را بسازید.
        </p>
        <div className="lg:hidden block">
          <FooterPayment />
        </div>
      </article>
    </section>
  );
};

export default FooterLogo;
