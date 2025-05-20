// app/components/Sidebar.jsx
import React from "react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Button from "@/components/shared/button/Button";
import MediaCard from "@/components/shared/card/MediaCard";
import SkeletonCard from "@/components/shared/card/SkeletonCard";
import SubscribeForm from "./Subscribe";

const Sidebar = async ({ locale }) => {
  const t = await getTranslations("News");

  const apiNews = `${process.env.NEXT_PUBLIC_API}/news/get-news`;
  const responseNews = await fetch(apiNews, {
    cache: "no-store",
    next: { tags: ["news"] },
    headers: {
      "Accept-Language": locale
    }
  });

  if (!responseNews.ok) {
    throw new Error("Failed to fetch news");
  }

  const resNews = await responseNews.json();
  const news = resNews.data || [];

  const apiMedia = `${process.env.NEXT_PUBLIC_API}/media/get-medias`;
  const responseMedia = await fetch(apiMedia, {
    cache: "no-store",
    next: { tags: ["medias"] }
  });

  const resMedia = await responseMedia.json();
  const medias = resMedia.data || [];

  return (
    <aside className="sticky top-[90px] self-start mt-16 space-y-6">
      <h2 className="bg-primary dark:bg-blue-500 text-white px-4 py-3 rounded-t-lg shadow-md text-lg">
        {t("latestNews")}
      </h2>

      <div className="flex flex-col gap-8 shadow-lg rounded-lg bg-white hover:shadow-xl dark:bg-gray-900">
        {news.length > 0 ? (
          news.map((item, index) => {
            const translation =
              item?.translations?.find((t) => t.language === locale)
                ?.translation?.fields || {};
            const {
              title = t("noTitle"),
              summary = t("noSummary"),
              slug = "no-slug"
            } = translation;

            return (
              <article
                key={index}
                className="flex flex-col items-center gap-4 overflow-hidden p-4 transition-all duration-300 md:flex-row lg:gap-6"
              >
                <Link
                  href={`/${locale}/news/${item.newsId}/${slug}`}
                  className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
                >
                  <img
                    src={item.thumbnail?.url || "/placeholder.png"}
                    loading="lazy"
                    alt={title}
                    className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                  />
                </Link>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">
                    {item?.publishDate &&
                      (() => {
                        const publishDate = new Date(item.publishDate);
                        const now = new Date();
                        const diffMs = now - publishDate;
                        const diffMinutes = Math.floor(diffMs / (1000 * 60));
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        const diffDays = Math.floor(
                          diffMs / (1000 * 60 * 60 * 24)
                        );

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

                        return `${t("daysAgo", {
                          count: diffDays
                        })} - ${weekday}`;
                      })()}
                  </span>

                  <h2 className="text-xl font-bold text-gray-800">
                    <Link
                      href={`/${locale}/news/${item.newsId}/${slug}`}
                      className="hover:text-rose-500 active:text-rose-600 transition"
                    >
                      {title}
                    </Link>
                  </h2>

                  <p className="text-gray-500">{summary}</p>

                  <div>
                    <Link
                      href={`/${locale}/news/${item.newsId}/${slug}`}
                      className="font-semibold text-rose-500 hover:text-rose-600 active:text-rose-700 transition"
                    >
                      {t("readMore")}
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className="p-4 text-gray-500">{t("noNews")}</p>
        )}
      </div>

      <div className="shadow-lg rounded-lg">
        <h2 className="bg-primary dark:bg-blue-500 text-white px-4 py-3 rounded-t-lg shadow-md text-lg">
          {t("subscribe")}
        </h2>
        <div className="p-4 flex flex-col gap-y-2">
          <SubscribeForm />
        </div>
      </div>

      <div className="shadow-lg rounded-lg">
        <h2 className="bg-primary dark:bg-blue-500 text-white px-4 py-3 rounded-t-lg shadow-md text-lg">
          {t("latestVideo")}
        </h2>
        <div className="p-4 flex flex-col gap-y-2">
          {medias.length === 0
            ? Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : medias
                .slice(0, 8)
                .map((media) => <MediaCard key={media.id} media={media} />)}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
