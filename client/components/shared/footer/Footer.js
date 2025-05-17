import React from "react";
import FooterTop from "./footerTop/FooterTop";
import Container from "../container/Container";
import FooterBottom from "./footerBottom/FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-secondary dark:bg-gray-800 ">
        <div className="flex flex-col gap-y-8 p-7">
          <FooterTop />
          <hr className="border-primary dark:border-blue-500" />
          <FooterBottom />
        </div>
    </footer>
  );
};

export default Footer;
