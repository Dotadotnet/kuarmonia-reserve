"use client";

import language from "@/app/language";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const HighlightText = ({ title, center = false }) => {
    const lang = useLocale();
    const class_lang = new language(lang);
    const dir = class_lang.getInfo().dir;
  return (
    <div className={`relative ${center ? "text-center" : "text-right"}`}>
      <motion.p
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }}
        className={`text-headingColor  flex justify-start items-center gap-x-2 font-nozha md:text-4xl text-4xl fld capitalize`}
      >
        <span className=" size-4 md:size-6   bg-primary dark:bg-blue-500 rounded-sm" />
        {title}
      </motion.p>

      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: dir == 'ltr' ? -1 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.5 }} 
        className="absolute ltr:-translate-x-[100%] rounded-[1px] top-12 right-0 w-full h-1 md:h-1.5 dark:bg-blue-500  bg-primary transform origin-right"
      />
    </div>
  );
};

export default HighlightText;
