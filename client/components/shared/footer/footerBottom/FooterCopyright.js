import React from "react";
import Logo from "../../logo/Logo";

const FooterCopyright = () => {
  return (
    <section>
      <footer className="text-center text-sm text-gray-500 mt-4 mb-12 lg:mb-0">
        © {new Date().getFullYear()} کلیه حقوق این اثر متعلق به مجموعه{" "}
        <b>کارمونیا</b> می‌باشد.
        <br />
         طراحی و توسعه توسط{" "}
        <span className="font-bold">مجید پاشایی</span>
      </footer>
    </section>
  );
};

export default FooterCopyright;
