import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import React from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";
import Image from "next/image";
import Link from "next/link";
const NewsCard = ({ news }) => {
  return (
<Link 
 href={`/news/${news.slug}/${news._id}`} 
  className="group bg-white dark:bg-gray-800 flex lg:flex-row flex-col gap-4 border border-secondary dark:border-gray-500 p-4 rounded relative hover:border-primary transition-colors delay-100 dark:hover:border-blue-500 dark:text-blue-500"
>

      <div className="flex flex-col gap-y-2 ">
        {!news?.thumbnail ? (
          <div className="md:w-[150px] w-[450px] h-[450px] md:h-[150px]">
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
            width={256}
            height={144}
            className="object-cover h-full w-full md:w-[250px] md:h-[150px] rounded"
          />
        )}
        <div className="flex flex-row lg:justify-center gap-x-2">
          {news?.categories?.map((item) => (
            <Tooltip position={"bottom"} key={item._id} text={item.title} txtColor="text-white">
              <div  className="relative group">
                <span  className="custom-button  p-2  ease-linear delay-100 transition-colors w-10 h-10 dark:border-blue-800 border-secondary border rounded-primary flex items-center justify-center ">
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

      <article className="flex flex-col gap-y-2.5 dark:text-white w-full">
        <h3 className="text-base line-clamp-1 md:text-sx  ">
          {news?.title || <SkeletonText lines={1} />}
        </h3>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm pb-0">
            {news?.summary || <SkeletonText lines={4} />}
          </p>
          <p className="text-sm pb-0 flex gap-x-0.5 items-baseline"></p>
        </div>
        {news?.publishDate?.length > 3 ? (
          <div className="border group-hover:border-primary dark:border-gray-600  dark:group-hover:border-blue-500 dark:hover:border-blue-500 dark:text-gray-100 transition-colors delay-100 px-4 py-0.5 rounded-primary flex items-center gap-x-1 text-xs w-fit">
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
                  const today = new Date();
                  const daysDiff = Math.floor(
                    (today - publishDate) / (1000 * 60 * 60 * 24)
                  );
                  const weekday = publishDate.toLocaleDateString("fa-IR", {
                    weekday: "long"
                  });

                  if (daysDiff === 0) {
                    return `امروز - ${weekday}`;
                  }

                  return `${daysDiff.toLocaleString(
                    "fa-IR"
                  )} روز پیش - ${weekday}`;
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
