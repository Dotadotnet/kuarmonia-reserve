import { FaTag } from "react-icons/fa";
import {
  FaLink,
  FaTelegramPlane,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import "./Style.css";
import TickerTape from "@/components/[locale]/tickerTape/TickerTape";
import StatusIndicator from "../tools/StatusIndicator";
import Image from "next/image";
import SocialIcons from "../socialIcons";
import AllReviews from "@/components/detail/AllReviews";
import TagBox from "../utils/TagBox";
const NewsHeader = async ({ news, locale }) => {
  const t = await getTranslations("News", locale);
  const { title, summary } = news;
  const typeTitle = news.type.title

  return (
    <header className=" max-w-screen-xl flex flex-col gap-y-4 pt-8 text-center px-4">
      <div className="flex items-center justify-start gap-6">
        <span className=" bg-primary text-white w-fit h-fit dark:bg-blue-500 p-1  rounded-md">
          {typeTitle}
        </span>
        <span className="flex items-center gap-1 justify-start">
          <StatusIndicator />
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
                  return `${t("publishedAt")} ${t("hoursAgo", {
                    count: diffHours
                  })} - ${weekday}`;
                } else {
                  return `${t("publishedAt")} ${t("minutesAgo", {
                    count: diffMinutes
                  })} - ${weekday}`;
                }
              }

              return `${t("publishedAt")} ${t("daysAgo", {
                count: diffDays
              })} - ${weekday}`;
            })()}
        </span>
      </div>
      {title && (
        <h1 className=" text-2xl font-bold text-gray-900 sm:text-4xl dark:!text-gray-100 font-source-serif">
          {title}
        </h1>
      )}
      {summary && (
        <h2 className=" text-lg text-gray-700 dark:text-blue-200">{summary}</h2>
      )}
    </header>
  );
};

const NewsMedia = ({ news }) => {
  const { thumbnail, tags } = news;
  return (
    <div className="flex flex-col gap-y-2 max-w-screen-xl  px-4">
      <div className="  flex justify-center items-center w-full  overflow-hidden rounded-md article-image-container">
        <Image
          width={1000}
          height={500}
          className="w-full rounded-md object-contain article-image"
          src={thumbnail.url}
          alt="Featured Image"
        />
        <div className="image-caption"></div>
      </div>
    </div>
  );
};

const NewsContent = async ({ news }) => {
  const locale = useLocale();
  const { name, bio } = news.creator;
  return (
    <div className="px-4   text-lg tracking-wide text-gray-700 dark:text-gray-100 flex flex-col gap-y-8 max-w-screen-xl">
      <div
        dangerouslySetInnerHTML={{ __html: news.content }}
        className="dark:text-gray-100"
      />
      <br />
      <TagBox tags={news.tags} />
      <br />
      <div className="flex gap-x-4 bg-gray-100 p-4  dark:bg-gray-800 rounded-sm items-center">
        <div className="!w-[115px] !h-[115px] flex-shrink-0 profile-container shine-effect rounded-full flex justify-center mb-4">
          <Image
            className="profile-pic !h-[100px] !w-[100px] rounded-full"
            width={100}
            height={100}
            src={news.creator?.avatar?.url}
            alt={name}
          />
        </div>
        <div className="flex-1">
          <h3>{name}</h3>
          <p className="text-sm">{bio}</p>
        </div>
      </div>
    </div>
  );
};

const NewsFooter = async ({ news, locale }) => {
  const { source, shortLink, sourceLink } = news;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const t = await getTranslations("News", locale);

  const encodedTitle = encodeURIComponent(news?.title || "");
  const encodedURL = encodeURIComponent(shortLink || currentUrl);

  return (
    <div className="border-t border-2 border-gray-100   max-w-screen-md  px-4">
      <h4 className="text-lg   mb-2 text-gray-800 dark:text-gray-200"></h4>
      {source && (
        <div className="flex gap-x-2">
          <p className="text-md text-blue-600  mb-4">
            {t("source")}:
            <br />
          </p>
          <a
            href={news?.source?.link}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 "
          >
            {news.source.name}{" "}
          </a>
        </div>
      )}

      <div className="flex items-center gap-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
        <FaLink />
        <span className="break-all">{shortLink || currentUrl}</span>
      </div>
      <SocialIcons />
    </div>
  );
};

const NewsComments = async ({ news, locale }) => {
  const { comments } = news;
  const t = await getTranslations("News", locale);
  return (
    <section className="bg-gray-100 py-8 dark:bg-gray-800 dark:text-gray-100">
      <AllReviews
        className="!px-0"
        targetId={news._id}
        targetType="news"
        reviews={Array.isArray(news.reviews) ? news.reviews : typeof news.reviews == "object" ? [news.reviews] : []}
      />

    </section>
  );
};

const News = ({ news }) => {
  const locale = useLocale();

  return (
    <main className="shadow-lg  rounded-lg  hover:shadow-xl dark:bg-gray-900 mt-18 overflow-y-auto  bg-white scrollbar-hide">
      <article className="flex flex-col gap-y-4">
        <TickerTape locale={locale} />
        <NewsHeader news={news} locale={locale} />
        <NewsMedia news={news} />
        <NewsContent news={news} locale={locale} />
        <NewsFooter news={news} locale={locale} />
        <NewsComments news={news} locale={locale} />
      </article>
    </main>
  );
};

export default News;
