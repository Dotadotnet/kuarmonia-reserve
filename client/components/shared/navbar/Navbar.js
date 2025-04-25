"use client"
import React, { useState, useEffect } from "react";
import Logo from "../logo/Logo";
import Container from "../container/Container";
import UserMenu from "./userMenu/UserMenu";
import LargeMenu from "./largeMenu/LargeMenu";
import ProgressBar from "@/components/shared/loading/ProgressBar";
import MobileMenu from "@/components/shared/navbar/mobileMenu/MobileMenu";
import ToolBar from "./mobileMenu/ToolBar";
import MobileNav from "./mobileMenu/MobileNav";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  });

  return (
    <>
      {isMobile && <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />}
      <header>
        <Container>
          <ProgressBar />
          <nav className="fixed top-0 m-4  left-0 flex flex-row justify-between right-0 shadow-lg lg:grid lg:grid-cols-12 items-center z-50 px-4 py-2 bg-white dark:bg-gray-900 rounded-xl dark:text-gray-100">

            {isMobile ? <>
              <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

            </>
              : <>

                <UserMenu />
              
                <LargeMenu />
              </>}

            <Logo justify="end" />
          </nav>
        </Container>
      </header>
      <ToolBar />
    </>
  );
};

export default Navbar;
