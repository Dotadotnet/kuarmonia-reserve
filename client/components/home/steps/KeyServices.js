import React from "react";
import Link from "next/link";
import { Marriege, Investment, Passport, Legal, Building, Tourism } from "@/utils/SaveIcon";
import { useTranslations } from "next-intl";

const KeyServices = () => {
  const t = useTranslations("HomePage")
  const steps = [
    {
      id: 1,
      title: t("11"),
      icon: <Marriege aria-label="آیکون ازدواج بین المللی" />,
      href: "/",
    },
    {
      id: 2,
      title: t("12"),
      icon: <Investment aria-label="آیکون سرمایه گذاری" />,
      href: "/",
    },
    {
      id: 3,
      title: t("13"),
      icon: <Passport aria-label="آیکون اخذ ویزا و اقامت" />,
      href: "/",
    },
    {
      id: 4,
      title: t("14"),
      icon: <Legal aria-label="آیکون امور وکالتی و اداری" />,
      href: "/service/4",
    },
    {
      id: 5,
      title: t("15"),
      icon: <Building aria-label="آیکون خرید ملک و مسکن" />,
      href: "/properties",
    },
    {
      id: 6,
      title: t("16"),
      icon: <Tourism />,
      href: "/",
    },
  ];

  return (
    <div className="relative grid grid-cols-2 mt-8 lg:grid-cols-6 gap-5 sm:gap-16 xl:gap-10">
      <picture className="hidden md:block absolute inset-x-0 top-5">
        <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
        <img src="/assets/home-page/keyservice/step-bg.svg" alt="vector" />
      </picture>
      {steps.map((step) => (
        <Link key={step.id} href={step.href} passHref>
          <div
            id={step.id}
            className="relative flex flex-col border hover:border-primary  transition-color ease-linear delay-100 cursor-pointer dark:bg-gray-800/70 dark:border-gray-900 dark:text-gray-100 shadow-lg bg-white/80 border-gray-200 w-[150px] lg:w-[170px] p-4 rounded-primary dark:hover:border-blue-500 items-center max-w-xs mx-auto"
          >
            <div className="max-w-[100px] mx-auto">
              <span>{step.icon}</span>
            </div>
            <div className="flex flex-col gap-y-8 items-center justify-center">
              <h2 className="text-sm text-center lg:text-base mt-4">{step.title}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default KeyServices;
