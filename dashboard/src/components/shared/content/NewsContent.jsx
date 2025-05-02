import React from "react";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import Tag from "@/components/icons/Tag";
import "swiper/css";

const NewsHeader = ({ news }) => {
  const { isLoading, title, summary, publishDate, avatar, creator, tags } =
    news;

  return (
    <header className="mx-auto max-w-screen-xl pt-28 text-center px-2">
      {isLoading ? (
        <>
          <SkeletonText lines={5} />
        </>
      ) : (
        <>
          {publishDate ? (
            <p className="text-gray-500">
              {publishDate &&
                `منتشر شده در ${new Date(publishDate).toLocaleDateString(
                  "fa-IR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }
                )}`}
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
            <h2 class="mt-6  text-lg text-gray-700 dark:text-blue-200">
              {summary}
            </h2>
          ) : (
            <div className="p-2">
              <SkeletonText lines={1} />
            </div>
          )}
          <div
            className="mt-6  flex flex-wrap justify-start w-full overflow-x-hidden scroll-hide gap-2"
            aria-label="Tags"
          >
            {tags?.length > 0 ? (
              tags.map((item) => (
                <button
                  key={item.id}
                  className="rounded-lg px-1 flex justify-center items-center gap-x-2 bg-gray-100  py-1 text-xs text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:bg-black"
                >
                  <Tag className="w-4 h-4 text-gray-500" />
                  {item.value}
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
        </>
      )}
    </header>
  );
};

const NewsMedia = ({ news }) => {
  const { isLoading, thumbnail } = news;

  return (
    <div className="mt-2">
      {isLoading || !thumbnail ? (
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
          class="  w-full object-contain"
          src={thumbnail}
          alt="Featured Image"
        />
      )}
    </div>
  );
};

const NewsContent = ({ news }) => {
  const { content } = news;

  return (
    <div className="mx-auto  max-w-screen-md space-y-12 px-4 py-10 font-serif text-lg tracking-wide text-gray-700">
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }}  className="dark:!text-gray-100"/>
      ) : (
        <SkeletonText lines={10} />
      )}
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

const News = ({ news }) => {
  return (
    <main className="h-[650px] overflow-y-auto dark:bg-gray-900 bg-white scrollbar-hide">
      <article>
        <NewsHeader news={news} />
        <NewsMedia news={news} />
        <NewsContent news={news} />
        <NewsComments news={news} />
      </article>
    </main>
  );
};

export default News;
