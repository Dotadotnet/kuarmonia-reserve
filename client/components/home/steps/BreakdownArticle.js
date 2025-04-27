import React from "react";
import { BiCar } from "react-icons/bi";
import { MdLocationCity, MdPayment } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa"; // آیکون جدید برای مشاوره
import { useTranslations } from "next-intl";

const BreakdownArticle = () => {
  const t = useTranslations("HomePage"); 
  const items = [
    {
      title: t("50"),
      icon: <FaRegAddressCard className="w-8 h-8 text-primary dark:text-blue-500" />, 
      description: t("51"),
    },
    {
      title: t("52"),
      icon: <MdLocationCity className="w-8 h-8 text-primary dark:text-blue-500" />,
      description: t("53"),
    },
    {
      title: t("54"),
      icon: <MdPayment className="w-8 h-8 text-primary dark:text-blue-500" />,
      description:
      t("55"),
    },
    {
      title: "تماس با آژانس در تاریخ انتخابی",
      icon: <BiCar className="w-8 h-8 text-primary dark:text-blue-500" />,
      description:
        "با ما تماس بگیرید تا برنامه‌های مهاجرتی و سفر خود را نهایی کنید.",
    },
  ];

  return (
    <section className="flex lg:flex-wrap lg:flex-row flex-col gap-4">
      {items.map(({ title, icon, description }, index) => (
        <article
          key={index}
          className="group border border-secondary hover:border-primary dark:hover:border-blue-500 dark:border-blue-500 transition-colors delay-100 ease-linear p-4 rounded flex flex-col gap-y-2.5 relative overflow-hidden lg:flex-1 lg:basis-60"
        >
          <span className="border w-fit p-2 rounded-primary border-secondary group-hover:border-primary dark:group-hover:border-blue-500 transition-colors delay-100 ease-linear">
            {icon}
          </span>
          <div className="flex flex-col gap-y-0.5 z-10">
            <h2 className="text-lg">{title}</h2>
            <p className="text-sm">{description}</p>
          </div>
          <span className="absolute -bottom-10 right-4 text-secondary/50 text-9xl font-sans group-hover:-bottom-0 transition-all delay-100 ease-linear">
            0{index + 1}
          </span>
        </article>
      ))}
    </section>
  );
};

export default BreakdownArticle;
