"use client";
import { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";
import LargeMenu from "./largeMenu/LargeMenu";
import ProgressBar from "@/components/shared/loading/ProgressBar";
import MobileMenu from "@/components/shared/navbar/mobileMenu/MobileMenu";
import MobileNav from "./mobileMenu/MobileNav";
import { useTranslations } from "next-intl";
import Modal from "../modal/Modal";
import SearchFilter from "./searchTrio/SearchFilter";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setSearchIsOpen] = useState(false);
  const t = useTranslations("HomePage");
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    const whatsAppLogo = document.querySelector("div.floating-whatsapp");
    if (isOpen) {
      document.documentElement.classList.add('overflow-hidden');
      if (whatsAppLogo) {
        whatsAppLogo.style.display = "none"
      }
    } else {
      document.documentElement.classList.remove('overflow-hidden');
      if (whatsAppLogo) {
        whatsAppLogo.style.display = "inline-block"
      }
    }
    return () => window.removeEventListener("resize", checkScreenSize);
  });


  return (
    <>
      {isMobile && <MobileNav setSearchIsOpen={setSearchIsOpen} isSearchOpen={isSearchOpen} isOpen={isOpen} setIsOpen={setIsOpen} />}

      <header>
        <Container>
          <ProgressBar />
          <nav className="fixed top-0 mx-4 mt-16 md:mt-6 left-0 flex flex-row justify-between right-0 shadow-lg lg:grid lg:grid-cols-12 items-center z-50 px-4 py-2 bg-white dark:bg-gray-900 rounded-xl dark:text-gray-100">
            {isMobile ? (
              <>
                <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
              </>
            ) : (
              <>
                <UserMenu setSearchIsOpen={setSearchIsOpen} isSearchOpen={isSearchOpen} />
                <LargeMenu />
              </>
            )}

            <Modal
              isOpen={isSearchOpen}
              onClose={() => {
                setSearchIsOpen(false)
              }}
              className="z-50"
            >
              <div className="flex flex-col gap-y-4 h-full">
                <p className="text-2xl drop-shadow">{t("search.title")}</p>
                <SearchFilter />
              </div>
            </Modal>
            <Logo justify="end" />
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Navbar;
