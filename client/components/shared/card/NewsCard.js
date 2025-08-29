import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import React from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const NewsCard = ({ news }) => {
  const t = useTranslations("News");

  const locale = useLocale();
  const { title, summary, slug } =
    news?.translations?.find((t) => t.language === locale)?.translation
      ?.fields || {};
  return (
    <Link
      href={{
        pathname: `./news/${news.newsId}/${slug}`
      }}
      key={news._id}
      className="group relative overflow-hidden  bg-white border border-gray-100 dark:border-gray-800 rounded-lg hover:shadow-xl hover:shadow-gray-200 dark:hover:border-blue-500  dark:hover:shadow-none dark:bg-gray-800 flex lg:flex-row flex-col gap-4 md:h-fit  w-70 md:w-[450px] p-4 delay-100  dark:text-blue-500 transition-all duration-300 ease-in-out"
    >
      <div className="flex flex-col gap-y-2 ">
        <div className="flex w-full justify-center">
          <div className="md:w-40 h-40 w-full  p-1 rounded-full ">
            {!news?.thumbnail ? (
              <div className="flex w-full justify-center">
                <SkeletonImage
                  width={500}
                  height={500}
                  showSize={true}
                  txtSize="text-3xl"
                  borderRadius="rounded-xl"
                  className="z-0  w-full h-full"
                />
              </div>
            ) : (
              <Image
                src={news.thumbnail?.url}
                alt="feature tour"
                width={600}
                height={144}
                className="object-cover h-full w-full  rounded"
              />
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center gap-x-2">
          {news?.categories?.map((item) => (
            <Tooltip
              position={"bottom"}
              key={item._id}
              text={item.title}
              txtColor="text-white"
            >
              <div className="relative group">
                <span className="custom-button  p-2  ease-linear delay-100 transition-colors w-10 h-10 dark:border-blue-800 border-secondary border rounded-primary flex items-center justify-center ">
                  <span
                    className="h-6 w-6 text-sm"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </span>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <article className="flex flex-col gap-y-2.5 items-center dark:text-white w-full md:items-start">
        <h3 className="text-base line-clamp-2 md:text-sx text-center md:text-right ">
          {title || <SkeletonText lines={1} />}
        </h3>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm pb-0 line-clamp-2 md:line-clamp-2 md:block text-center md:!text-right">
            {summary || <SkeletonText lines={4} />}
          </p>
        </div>
        {news?.publishDate?.length > 3 ? (
          <div className="border-gray-200 border group-hover:border-primary dark:border-gray-600  dark:group-hover:border-blue-500 dark:hover:border-blue-500 dark:text-gray-100 transition-colors delay-100 px-4 py-0.5 rounded-primary flex items-center gap-x-1 text-xs w-fit">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7M8 2C4.69 2 2 4.69 2 8s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6"
                ></path>
                <path
                  fill="currentColor"
                  d="M10 10.5c-.09 0-.18-.02-.26-.07l-2.5-1.5A.5.5 0 0 1 7 8.5v-4c0-.28.22-.5.5-.5s.5.22.5.5v3.72l2.26 1.35a.502.502 0 0 1-.26.93"
                ></path>
              </svg>
            </span>
            <span className="flex items-center justify-center">
              {news?.publishDate &&
                (() => {
                  const publishDate = new Date(news.publishDate);
                  const now = new Date();

                  const diffMs = now - publishDate;
                  const diffMinutes = Math.floor(diffMs / (1000 * 60));
                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                  const weekday = publishDate.toLocaleDateString(locale, {
                    weekday: "long"
                  });

                  if (diffDays === 0) {
                    if (diffHours >= 1) {
                      return `${t("hoursAgo", {
                        count: diffHours
                      })} - ${weekday}`;
                    } else {
                      return `${t("minutesAgo", {
                        count: diffMinutes
                      })} - ${weekday}`;
                    }
                  }

                  return `${t("daysAgo", { count: diffDays })} - ${weekday}`;
                })()}
            </span>
          </div>
        ) : (
          <SkeletonText lines={1} />
        )}
        <div className="flex flex-row flex-wrap justify-between"></div>
      </article>
    </Link>
  );
};

export default NewsCard;
