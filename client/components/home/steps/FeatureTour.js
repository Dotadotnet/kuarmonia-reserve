"use client";
import Button from "@/components/shared/button/Button";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillCar } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { FaPlaneDeparture } from "react-icons/fa";
import { FiGift } from "react-icons/fi";
import Image from 'next/image'
import { useTranslations } from "next-intl";

const FeatureTour = () => {
  const [gift, setGift] = useState(false);
  const router = useRouter();
  const t = useTranslations("HomePage")

  const handleOutsideClick = () => {
    setGift(!gift);
  };

  return (
    <>
      <section className="group flex lg:flex-row flex-col gap-4 border border-secondary dark:border-gray-600 p-4 rounded relative hover:border-primary transition-colors delay-100 dark:hover:border-blue-500 dark:text-blue-500">
        <div className="flex flex-col gap-y-2">
          <Image
            src="/assets/static/migration-to-canada.png" // آدرس تصویر جدید
            alt="feature tour"
            width={256}
            height={144}
            className="object-cover w-full rounded"
          />
          <p className="flex flex-row lg:justify-center gap-x-2">
            <span className="p-1.5 hover:border-primary dark:hover:border-blue-500  ease-linear delay-100 transition-colors  border-secondary border rounded-primary">
              <BiMap className="w-6 h-6 text-primary dark:text-blue-500" />
            </span>
            <span className="p-1.5 hover:border-primary dark:hover:border-blue-500  ease-linear delay-100 transition-colors border-secondary border rounded-primary">
              <FaPlaneDeparture className="w-6 h-6 text-primary dark:text-blue-500" />
            </span>
            <span className="p-1.5 hover:border-primary dark:hover:border-blue-500  ease-linear delay-100 transition-colors border-secondary border rounded-primary dark:text-blue-500">
              <AiFillCar className="w-6 h-6 text-primary dark:text-blue-500" />
            </span>
          </p>
        </div>

        <article className="flex flex-col gap-y-2.5">
          <h1 className="text-base line-clamp-2">
            {t("58")}
          </h1>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm pb-0">
            {t("59")}
            </p>
            <p className="text-sm pb-0 flex gap-x-0.5 items-baseline">
             
            </p>
          </div>
          <span className="border group-hover:border-primary   dark:group-hover:border-blue-500 dark:hover:border-blue-500 dark:text-gray-100 transition-colors delay-100 px-4 py-0.5 rounded-primary flex items-center text-xs w-fit">
          {t("60")}
          </span>
          <div className="flex flex-row flex-wrap justify-between">
            <Button
              className="px-8 py-2 text-base mt-2"
              disabled
              onClick={() =>
                router.push(
                  `/tours/5f3e1e7e3f3d5b1b7e7b5d6e?tour_title=Migration_to_Canada`
                )
              }
            >
              <del>            {t("61")}              </del>
            </Button>
            <Button
              className="px-4 py-2 rounded text-base mt-2"
              onClick={() => setGift(!gift)}
            >
              <FiGift className="h-5 w-5" />
            </Button>
          </div>
        </article>

        {gift && (
          <div className="absolute top-0 left-0 w-full h-full rounded bg-secondary/20 backdrop-blur-sm backdrop-filter">
            <div className="h-full w-full rounded flex justify-center items-center">
              <OutsideClick onOutsideClick={handleOutsideClick}>
                <div className="flex flex-row gap-x-4 border border-primary dark::border-blue-500  p-4 rounded bg-white">
                  <Image
                    src="/assets/static/migration-update.png" // تصویر آپدیت مهاجرت
                    alt="avatar"
                    width={85.3}
                    height={48}
                    className="rounded object-cover w-[85.3px] h-[48px]"
                  />
                  <div className="flex flex-col gap-y-4">
                    <article className="flex flex-col gap-y-1.5">
                      <div className="flex flex-col gap-y-2">
                        <p className="text-sm">در حال حاضر!</p>
                        <h1 className="text-base line-clamp-2 font-semibold">
                          آپدیت مهاجرت به کانادا
                        </h1>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <p className="text-sm">60% تکمیل شده</p>
                        <p className="border h-1.5 w-full bg-gray-200 rounded">
                          <span className="h-full bg-primary dark:bg-blue-500 block w-[60%] rounded"></span>
                        </p>
                      </div>
                    </article>
                    <span className="border group-hover:border-primary dark:group-hover:border-blue-500 transition-colors delay-100 px-4 py-0.5 rounded flex items-center text-xs w-fit">
                      مهاجرت به کانادا
                    </span>
                  </div>
                </div>
              </OutsideClick>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FeatureTour;
