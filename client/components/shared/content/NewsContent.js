import React from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import { FaTag } from "react-icons/fa";
import {
  FaLink,
  FaShareAlt,
  FaTelegramPlane,
  FaWhatsapp,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";
import { useLocale } from "next-intl";

const NewsHeader = ({ news }) => {
  const locale = useLocale();
  const {  publishDate, avatar, creator, tags } = news;

  const { title, summary } =
    news?.translations?.find((t) => t.language === locale)?.translation
      ?.fields || {};
  return (
    <header className="mx-auto max-w-screen-xl  text-center px-2">
      {publishDate ? (
        <p className="text-gray-500">
          {publishDate &&
            `منتشر شده در ${new Date(publishDate).toLocaleDateString("fa-IR", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })}`}
        </p>
      ) : (
        <div className="p-2">
          <SkeletonText lines={1} className="!w-1/2 flex" />
        </div>
      )}
      {title ? (
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100">
          {title}
        </h1>
      ) : (
        <div className="p-2">
          <SkeletonText lines={1} />
        </div>
      )}
      {summary ? (
        <h2 className="mt-6 text-lg text-gray-700 dark:text-blue-200">
          {summary}
        </h2>
      ) : (
        <div className="p-2">
          <SkeletonText lines={1} />
        </div>
      )}
    </header>
  );
};

const NewsMedia = ({ news }) => {
  const { thumbnail, tags } = news;

  return (
    <>
      <div
        className="mt-6 flex  justify-start w-full overflow-x-hidden scroll-hide gap-2"
        aria-label="Tags"
      >
        {tags?.length > 0 ? (
          tags.map((item, index) => (
            <button
              key={index}
              className="rounded-lg px-1 flex justify-center items-center gap-x-2 bg-gray-100 py-1 text-xs text-gray-600  cursor-pointer dark:text-gray-300 dark:bg-black"
            >
              <FaTag className="w-4 h-4 text-gray-500" />
              {item.title}
            </button>
          ))
        ) : (
          <div className="flex items-center w-full justify-center gap-2">
            <SkeletonText lines={1} />
            <SkeletonText lines={1} />
            <SkeletonText lines={1} />
          </div>
        )}
      </div>
      <div className="mt-2">
        {!thumbnail ? (
          <div className="flex justify-center items-center h-96">
            <SkeletonImage
              showSize={false}
              width={200}
              height={200}
              className="h-96 w-full object-contain"
            />
          </div>
        ) : (
          <img
            className="w-full object-contain"
            src={thumbnail.url}
            alt="Featured Image"
          />
        )}
      </div>
    </>
  );
};

const NewsContent = ({ news }) => {
  const locale = useLocale();

  const { content } =
    news?.translations?.find((t) => t.language === locale)?.translation
      ?.fields || {};
  return (
    <div className="mx-auto max-w-screen-md space-y-12 px-4 py-10  text-lg tracking-wide text-gray-700 dark:text-gray-100">
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <SkeletonText lines={10} />
      )}
    </div>
  );
};

const NewsFooter = ({ news }) => {
  const { source, shortLink, sourceLink } = news;
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const encodedTitle = encodeURIComponent(news?.title || "");
  const encodedURL = encodeURIComponent(shortLink || currentUrl);

  return (
    <div className="border-t mt-8 pt-6 pb-12 max-w-screen-md mx-auto px-4">
      <h4 className="text-lg   mb-2 text-gray-800 dark:text-gray-200"></h4>
      {source ? (
        <div className="flex gap-x-2">
          <p className="text-md text-blue-600  mb-4">
            منبع خبر : <br />
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
      ) : (
        <p className="text-sm text-gray-500 mb-4">منبعی ثبت نشده است.</p>
      )}

      <div className="flex items-center gap-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
        <FaLink />
        <span className="break-all">{shortLink || currentUrl}</span>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <span className="text-gray-600 dark:text-gray-300 text-sm">
          اشتراک‌گذاری:
        </span>

        <a
          href={`https://t.me/share/url?url=${encodedURL}&text=${encodedTitle}`}
          target="_blank"
          rel="noreferrer"
          title="اشتراک در تلگرام"
        >
          <FaTelegramPlane className="w-5 h-5 text-blue-500 hover:text-blue-700" />
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedURL}`}
          target="_blank"
          rel="noreferrer"
          title="اشتراک در واتساپ"
        >
          <FaWhatsapp className="w-5 h-5 text-green-500 hover:text-green-600" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`}
          target="_blank"
          rel="noreferrer"
          title="اشتراک در توییتر"
        >
          <FaTwitter className="w-5 h-5 text-sky-500 hover:text-sky-600" />
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}`}
          target="_blank"
          rel="noreferrer"
          title="اشتراک در لینکدین"
        >
          <FaLinkedin className="w-5 h-5 text-blue-700 hover:text-blue-900" />
        </a>
      </div>
    </div>
  );
};

const NewsComments = ({ news }) => {
  const { comments } = news;

  return (
    <section className="bg-gray-100 py-8 dark:bg-gray-800 dark:text-gray-100">
      <div className="mx-auto max-w-screen-md px-4">
        <h3 className="text-xl font-semibold mb-6 text-center">
          نظرات کاربران
        </h3>
        <div className="space-y-4">
          {!comments ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 p-4 rounded-lg shadow dark:bg-gray-600 animate-pulse"
                >
                  <div className="h-4 bg-gray-400 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            comments.map((comment, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow dark:bg-gray-700 dark:border dark:border-gray-600"
              >
                <div className="flex items-center mb-2">
                  <img
                    src={comment.userAvatar || "https://via.placeholder.com/40"}
                    alt="تصویر کاربر"
                    className="w-10 h-10 rounded-full ml-3"
                  />
                  <div>
                    <h4 className="font-semibold">{comment.userName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      ارسال شده در{" "}
                      {new Date(comment.date).toLocaleDateString("fa-IR")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-200">
                  {comment.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
const TickerTape = () => {
  return (
    <div className="bg-primary text-white py-1 overflow-hidden whitespace-nowrap relative">
      <div className="inline-block animate-ticker pl-full">
        🔴 BREAKING: Fusion Energy Record Set | 🌍 Climate Summit Scheduled for
        June | 📈 Markets Respond to Energy Breakthrough | 🔬 Scientists
        Announce Quantum Computing Milestone | 🚀 Mars Mission Set for 2026
        Launch
      </div>
    </div>
  );
};
const News = ({ params, news }) => {
  return (
    <main className="h-[650px] mt-18 overflow-y-auto dark:bg-gray-900 bg-white scrollbar-hide">
      <article>
        <TickerTape />
        <div className="flex flex-col md:flex-row items-center gap-4 max-w-screen-xl mx-auto px-4 pt-4">
          <div className="md:w-1/2 w-full order-1 md:order-2">
            <NewsMedia news={news} />
          </div>
          <div className="md:w-1/2 w-full order-2 md:order-1">
            <NewsHeader news={news} />
          </div>
        </div>
        <NewsContent news={news} />
        <NewsFooter news={news} />
        <NewsComments news={news} />
      </article>
    </main>
  );
};

export default News;
