"use client";
import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLocale, useTranslations } from "next-intl";
import { useGetTeamLeaderQuery } from "@/services/teamMember/teamMemberApi";

export default function TeamSection() {
  const t = useTranslations("About");
  const locale = useLocale();

  const { data, isLoading, error } = useGetTeamLeaderQuery({ locale });
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  const leader = useMemo(() => data?.data || [], [data]);
  
  // Now we can access fields directly since they're already localized by the API
  const { fullName, description } = leader[0] || {};

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
                src={leader[0]?.avatar.url || "/assets/about/management.png"}
                className="max-lg:mx-auto rounded-primary object-cover"
              />
            </div>
            <div className="lg:pr-[100px] flex items-center text">
              <div className="data w-full">
                <p className="font-manrope items-center flex justify-center md:justify-start font-bold md:text-4xl text-2xl lg:text-5xl mb-9 max-lg:text-center relative">
                  {fullName}
                </p>
                <p className="md:text-xl items-center flex justify-center md:justify-start text-md leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  {description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center lg:justify-start max-sm:bottom-0 relative">
              {leader[0]?.socialLinks?.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-gray-900 dark:text-gray-400 hover:text-white group w-12 h-12 rounded-full flex justify-center items-center dark:bg-black bg-gray-100 transition-all duration-500 hover:bg-indigo-600"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: social?.network?.icon
                    }}
                    className="w-7 h-7"
                  />
                </a>
              ))}
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
                <h2 className="font-manrope items-center flex justify-center md:justify-start font-bold md:text-4xl text-2xl lg:text-5xl text-black mb-4 md:mb-8 max-lg:text-center relative">
                  {t("18")}
                </h2>
                <p className="md:text-xl items-center flex justify-center md:justify-start text-md leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                  {t("19")}
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