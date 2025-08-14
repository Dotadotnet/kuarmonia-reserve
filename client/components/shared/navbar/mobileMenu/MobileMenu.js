import React from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import LanguageSwitcher from "../languageSwitch/page";
import Search from "../searchTrio/Search";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Auth from "../auth/Auth";

const MobileMenu = ({ isOpen, setIsOpen }) => {
  return (
    <motion.div
      className="flex md:hidden w-full relative p-0 items-center justify-between"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
    >
      <div className="flex items-center gap-x-2 justify-start w-full">
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CgClose className="text-headingColor text-4xl" />
          ) : (
            <HiOutlineMenuAlt2 className="text-headingColor text-4xl" />
          )}
        </motion.div>
        <LanguageSwitcher />
      </div>
    
    </motion.div>
  );
};

export default MobileMenu;
