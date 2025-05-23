// Signup.jsx
import Logo from "@/components/shared/logo/Logo";
import ThemeToggle from "@/components/shared/navbar/ThemeToggle/ThemeToggle";
import GoogleLogin from "../user/GoogleLogin";
import PhoneLogin from "../user/phoneLogin/PhoneLogin";
import LanguageSwitcher from "@/components/shared/navbar/languageSwitch/page";
import { useTranslations } from "next-intl";
const signin = () => {
  const t = useTranslations("Auth")
  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center items-center p-4`}
    >
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="max-w-md w-full  dark:bg-slate-800 p-5 sm:p-8 bg-white flex flex-col gap-y-4 rounded-primary shadow-lg z-10">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <div className="flex justify-center w-full">
            <Logo />
          </div>
          <hr className="w-full" />
        </div>
        <div className="w-full">
          <GoogleLogin />

          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center text-textColor text-sm font-semibold mx-4 mb-0">
               {t("1")}
            </p>
          </div>
          <PhoneLogin />
        </div>{" "}
        <div className="flex justify-center">
          <ThemeToggle />
          <span className="mr-2">
          <LanguageSwitcher />
          </span>
        </div>
      </div>
    </section>
  );
};

export default signin;
