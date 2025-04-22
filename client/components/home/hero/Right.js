"use client";
import React from 'react'
import { AiTwotoneFire } from "react-icons/ai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function Right() {
  const router = useRouter();

  return (
    <div className="col-span-2 h-full flex flex-col" dir="rtl" lang="fa">
      <div
        className="w-full md:mt-5 h-full rounded-primary relative flex flex-col gap-y-8 lg:px-2 lg:py-10 md:pt-4 pb-0"
        style={{
          backgroundImage:
            "url(/assets/home-page/banner/dots.svg), linear-gradient(to top right, #34D399, #3B82F6)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden"
        }}
      >
        {/* انیمیشن تصویر */}
        <motion.div
          className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
          initial={{ x: 200, opacity: 0 }}
          animate={{
            opacity: 1,
            x: 0,
            y: ["0px", "20px", "0px"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: 0,
            delay: 0.3
          }}
        >
          <motion.div
            animate={{ y: ["0px", "20px", "0px"] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 3 }}
          >
            <Image
              src="/assets/home-page/banner/model1.webp"
              alt="نمایی از مهاجرت موفق"
              height={872}
              width={500}
              className="lg:w-[400px] hidden md:block lg:ml-0 md:ml-auto"
            />
            <Image
              src="/assets/home-page/banner/model2.webp"
              alt="زوج مهاجر در مقصد جدید"
              height={872}
              width={500}
              className="lg:w-[400px] lg:ml-0 md:hidden block md:ml-auto"
            />
          </motion.div>
        </motion.div>

        <div className="md:grid md:grid-cols-12 gap-4">
          <div className="md:col-span-7 hidden md:flex p-4" aria-hidden="true"></div>

          <div className="md:col-span-5 flex flex-col gap-4 p-4">
            {/* عنوان اصلی */}
            <motion.h1
              className="md:text-6xl text-white font-nozha text-6xl w-full text-right"
            >
              کارمونیا
              <br />
              <span className="md:text-5xl text-black">
                مهاجرت و سرمایه‌گذاری
              </span>
            </motion.h1>

            {/* عنوان توضیحی */}
            <motion.h2
              className="md:text-3xl font-nozha text-4xl w-full text-right"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              برای <span className="text-white">آینده‌ای روشن</span> و{" "}
              <span className="text-white">سرمایه‌گذاری موفق</span>
            </motion.h2>

            {/* پاراگراف توضیحی */}
            <motion.p
              className="flex flex-row gap-x-0.5 items-center text-right justify-start md:text-md text-black"
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              در کارمونیا، راه‌های نوینی برای مهاجرت، دریافت اقامت، و ساخت آینده‌ای درخشان در
              کشورهایی مثل کانادا، ترکیه، و اروپا ارائه می‌دهیم.
              <AiTwotoneFire
                className="text-[#ffa384] w-12 h-12 drop-shadow"
                aria-hidden="true"
              />
            </motion.p>

            {/* دکمه CTA */}
            <motion.button
              className="px-8 py-4 border border-black justify-start rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
              onClick={() => router.push("/tours")}
              aria-label="مشاهده تورهای مهاجرت و سرمایه‌گذاری"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              شروع سفر موفقیت‌آمیز شما
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Right;
