"use client";
import React from "react";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
export default function CompanyResults() {
    const t = useTranslations("About")
    const cardsData = [
        {
            percentage: "240%",
            title: t("21"),
            description: t("22") ,
        },
        {
            percentage: "175+",
            title: t("23"),
            description:t("24"),
        },
        {
            percentage: "625+",
            title: t("25"),
            description:t("26"),
        },
    ];

    return (
        <section className="py-20 rounded-primary bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 dark:bg-gray-900 mt-8">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <p className="text-4xl text-center text-gray-700 font-extrabold mb-14 dark:text-gray-100">
                    {t("20")}
                </p>
                <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
                    {cardsData.map((card, index) => (
                        <Card key={index} card={card} delay={index * 0.2} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Card({ card, delay }) {
    const { ref, inView } = useInView({
        threshold: 0.2, // 20% از کارت باید دیده شود تا انیمیشن اجرا شود
        triggerOnce: true, // فقط یکبار انیمیشن اجرا شود
    });

    return (
        <div
            ref={ref}
            className={`w-full max-lg:max-w-2xl  mx-auto lg:mx-0 lg:w-1/3 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl transform transition-all duration-700 ease-in-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
            style={{ transitionDelay: `${delay}s` }}
        >
            <div className="flex gap-5 items-start">
                <div className="text-4xl font-extrabold text-indigo-600 animate-pulse">
                    {card.percentage}
                </div>
                <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                        {card.title}
                    </h4>
                    <p className="text-sm text-gray-500 leading-6 dark:text-gray-400">
                        {card.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
