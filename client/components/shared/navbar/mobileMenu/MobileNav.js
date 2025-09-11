import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Shop from "@/components/icons/Shop";
import Home from "@/components/icons/Home";
import User from "@/components/icons/User";
import Category from "@/components/icons/Category";
import Rules from "@/components/icons/Rules";
import About from "@/components/icons/About";
import Phone from "@/components/icons/Phone";
import { useLocale, useTranslations } from "next-intl";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Auth from "../auth/Auth";
import Search from "../searchTrio/Search";

const MobileNav = ({ isOpen, setIsOpen , setSearchIsOpen }) => {
  const t = useTranslations("ForAll");
  const locale = useLocale();
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={
        "fixed  z-50  inset-0 flex-col backdrop-blur-sm items-start justify-start w-screen h-screen overflow-y-hidden" +
        " " +
        (isOpen ? "flex" : "hidden")
      }
    >
      <section className="relative w-full h-full">
        <div
          id="outlineNavMobail" className="relative z-[999999] w-full h-full"
          onClick={(event) => {
            if (event.target.id == "outlineNavMobail") {
              setIsOpen(false);
              event.stopPropagation();
            }
          }}
        >
          {isOpen ? (
            <div className="flex absolute w-2/3  items-center rounded-xl bg-white justify-start dark:bg-gray-900  flex-col top-32 h-[clac(100vh - 140px)] left-5  rtl:right-5">
              <div className="overflow-auto w-full gap-10 flex h-full flex-col py-5  overflow-x-hidden">
                {[
                  {
                    href: `/${locale}/`,
                    icon: <Home className="text-[#22b973]" />,
                    text: t("5")
                  },
                  { href: `/${locale}`, icon: <Category />, text: t("6") },
                  { href: `/${locale}/store`, icon: <Shop />, text: t("7") },
                  {
                    href: `/${locale}/auth/signin`,
                    icon: <User />,
                    text: t("8")
                  },
                  { href: `/${locale}/terms`, icon: <Rules />, text: t("9") },
                  { href: `/${locale}/about`, icon: <About />, text: t("4") },
                  { href: `/${locale}/contact`, icon: <Phone />, text: t("3") }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, x: 200 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }}
                    exit={{ opacity: 0, x: 200 }}
                    className="w-full"
                  >
                    <Link
                      onClick={() => setIsOpen(false)} // Close the menu when a link is clicked
                      href={item.href}
                      rel="nofollow"
                      className="flex items-center text-base text-textColor cursor-pointer hover:text-headingColor w-full px-5 gap-3 duration-100 transition-all ease-in-out"
                    >
                      {item.icon}
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-b-xl p-4 justify-around w-full">
                <Search setSearchIsOpen={setSearchIsOpen} />
                <ThemeToggle />
                <Auth />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default MobileNav;
