"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TeamSection() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
      {/* Section 1 */}
      <section className="py-8 lg:py-24 relative mt-8  text-justify rounded-primary bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800  dark:to-gray-900 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-9"
            ref={ref1}
            initial="hidden"
            animate={inView1 ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <div className="img-box">
              <Image
                alt="مدیر شرکت کارمونیا"
                width={600}
                height={600}
                src="/assets/about/marjan.jpg"
                className="max-lg:mx-auto rounded-primary object-cover"
              />
            </div>
            <div className="lg:pr-[100px] flex items-center text">
              <div className="data w-full">
                <h2 className="font-manrope font-bold md:text-4xl text-2xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
                  رهبر تیم
                </h2>
                <p className="md:text-xl text-md leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  شرکت کارمونیا با هدایت مرجان قره گیزلی، متخصص در زمینه مهاجرت و
                  سرمایه‌گذاری، به ارائه خدمات حرفه‌ای در این حوزه‌ها پرداخته
                  است. مرجان قره گیزلی با چندین سال تجربه در این زمینه‌ها، به
                  تیم کارمونیا کمک می‌کند تا راهکارهای مناسب برای مهاجرت و
                  سرمایه‌گذاری در کشورهای ترکیه و کانادا ارائه دهند.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-14 lg:py-24 relative text-justify rounded-primary bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-900 p-4 dark:to-gray-800 dark:bg-gray-900 mt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9"
            ref={ref2}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={fadeInUp}
          >
             <div className="lg:pl-24 flex mt-4 items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold md:text-4xl text-2xl lg:text-5xl text-black mb-4 md:mb-8 max-lg:text-center relative">
                  تیم ما
                </h2>
                <p className="md:text-xl text-md leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  تیم کارمونیا متشکل از افراد با تخصص‌های مختلف در زمینه‌های
                  مهاجرت و سرمایه‌گذاری است. هر عضو تیم با تلاش و تعهد بالا به
                  ارائه بهترین خدمات به مشتریان می‌پردازد. ما در کارمونیا به
                  توانمندی و تخصص‌های هر فرد احترام می‌گذاریم و تلاش می‌کنیم تا
                  راهکارهایی حرفه‌ای، قابل اعتماد و موثر برای مهاجرت و
                  سرمایه‌گذاری ارائه دهیم. از مشاوران حقوقی گرفته تا متخصصین
                  مالی، تمامی اعضای تیم در کنار هم هستند تا تجربیات مفیدی برای
                  متقاضیان فراهم کنند.
                </p>
              </div>
            </div>
             <div className="img-box">
              <Image
                alt="مدیر شرکت کارمونیا"
                width={600}
                height={600}
                src="/assets/about/management.png"
                className="max-lg:mx-auto rounded-primary object-cover"
              />
            </div>
           
           
          </motion.div>
        </div>
      </section>
    </div>
  );
}
