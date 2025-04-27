import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AdvantageArticle = () => {
  const t = useTranslations("HomePage");
  const items = [
    {
      _id: 1,
      icon: (
        <Image
          src={"/assets/home-page/advantage/earth.svg"}
          alt={"earth"}
          height={60}
          width={60}
          className="border flex justify-center items-center border-primary dark:border-none shadow-lg rounded-full"
        />
      ),
      title: t("27"),
      description: t("28")
    },
    {
      _id: 2,
      icon: (
        <Image
          src={"/assets/home-page/advantage/smile.svg"}
          alt={"smile"}
          height={60}
          width={60}
          className="border flex justify-center items-center border-primary dark:border-none shadow-lg rounded-full"
        />
      ),
      title: t("29"),
      description: t("30")
    },
    {
      _id: 3,
      icon: (
        <Image
          src={"/assets/home-page/advantage/star.svg"}
          alt={"star"}
          height={60}
          width={60}
          className="border flex justify-center items-center border-primary dark:border-none shadow-lg rounded-full"
        />
      ),
      title: t("31"),
      description: t("32")
    },
    {
      _id: 4,
      icon: (
        <Image
          src={"/assets/home-page/advantage/star.svg"}
          alt={"star"}
          height={60}
          width={60}
          className="border flex justify-center items-center border-primary dark:border-none shadow-lg rounded-full"
        />
      ),
      title: t("33"),
      description:t("34")
    }
  ];

  return (
    <article className="flex flex-col gap-y-8">

      <div className="flex flex-col gap-y-4">
        {items.map(({ _id, icon, title, description }) => (
          <div
            key={_id}
            className="flex gap-x-2 items-start bg-white/70 dark:bg-black shadow p-4 rounded-primary"
          >
            {icon}
            <div className="w-full flex flex-col gap-y-1">
              <h2 className="text-lg">{title}</h2>
              <p className="text-sm lg:line-clamp-none md:line-clamp-2 line-clamp-none">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default AdvantageArticle;
