import { motion } from "framer-motion";
import Link from "next/link";
import Shop from "@/components/icons/Shop";
import Home from "@/components/icons/Home";
import User from "@/components/icons/User";
import Category from "@/components/icons/Category";
import Rules from "@/components/icons/Rules";
import About from "@/components/icons/About";
import Phone from "@/components/icons/Phone";

const MobileNav = ({ isOpen, setIsOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={"fixed  z-50  inset-0 flex-col backdrop-blur-sm items-start justify-start w-screen h-screen overflow-y-hidden" + ' ' + (isOpen ? 'flex' : "hidden")}

    >
      <section className="relative w-full h-full">
        <div
          className="relative z-[999999] w-full h-full"
          onClick={(e) => {
            setIsOpen(false)
            e.stopPropagation()
          }} 
        >
          {isOpen ?

            <div className="flex absolute overflow-y-auto overflow-x-hidden w-2/3 h-2/3 items-center rounded-lg bg-white justify-start dark:bg-gray-900 gap-10 flex-col top-1/2 right-5 transform pt-8 -translate-y-1/2">
              {[
                { href: "/", icon: <Home className="text-[#22b973]" />, text: "صفحه اصلی" },
                { href: "/", icon: <Category />, text: "دسته بندی خدمات" },
                { href: "/store", icon: <Shop />, text: "فروشگاه" },
                { href: "/services", icon: <User />, text: "حساب کاربری" },
                { href: "/terms", icon: <Rules />, text: "قوانین و مقررات" },
                { href: "/about", icon: <About />, text: "درباره ما" },
                { href: "/contact", icon: <Phone />, text: "تماس با ما" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, x: 200 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: index * 0.1 } }}
                  exit={{ opacity: 0, x: 200 }}
                  className="w-full"
                >
                  <Link
                    onClick={() => setIsOpen(false)} // Close the menu when a link is clicked
                    href={item.href}
                    className="flex items-center text-base text-textColor cursor-pointer hover:text-headingColor w-full px-5 gap-3 duration-100 transition-all ease-in-out"
                  >
                    {item.icon}
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </div>
            :
            ''
}
        </div>
      </section>
    </motion.div>
  );
};

export default MobileNav;
