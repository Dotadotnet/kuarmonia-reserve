import React from "react";
import StepAddVenue from "./steps/StepAddVenue";
import Logo from "@/components/shared/logo/Logo";
import ThemeToggle from "@/components/shared/navbar/ThemeToggle/ThemeToggle";
import ProductCard from "@/components/shared/card/ProductCard";
function AddVenue() {
  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c]  w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center md:flex-row flex-col items-center p-4`}
    >
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="max-w-md w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-5 sm:p-8 rounded-primary shadow-lg z-10">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />

          <Logo />
          <hr className="w-full" />
        </div>

        <StepAddVenue />
        <ThemeToggle />
      </div>
      <ProductCard />
    </section>
  );
}

export default AddVenue;
