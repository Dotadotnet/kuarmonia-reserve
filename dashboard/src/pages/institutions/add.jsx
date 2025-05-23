import React from "react";
import StepAddInstitution from "./steps/StepAddInstitution";
import Logo from "@/components/shared/logo/Logo";
import ToggleThemeButton from "@/components/ThemeToggle"
import BackButton from "@/components/shared/button/BackButton";

function AddInstitution() {
  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center items-center p-4`}
    >
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="max-w-md w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-5 sm:p-8 rounded-primary shadow-lg z-10">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <BackButton />

        </div>

        <StepAddInstitution />
      <ToggleThemeButton />
      </div>

    </section>
  );
}

export default AddInstitution;
