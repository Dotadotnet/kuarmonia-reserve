"use client";

import { motion } from "framer-motion";

const HighlightText = ({ title, center = false }) => {
  return (
    <div className={`relative ${center ? "text-center" : "text-right"}`}>
      <motion.p
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.5 }}
        className={`text-headingColor flex justify-start items-center gap-x-2 font-nozha md:text-4xl text-4xl fld capitalize`}
      >
        <span className=" size-4 md:size-6  bg-primary dark:bg-blue-500 rounded-sm" />
        {title}
      </motion.p>

      {/* خط زیر متن */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: false, amount: 0.5 }} // مشابه تنظیمات بالا
        className="absolute rounded-[1px] top-12 right-0 w-full h-1 md:h-1.5 dark:bg-blue-500  bg-primary transform origin-right"
      />
    </div>
  );
};

export default HighlightText;
