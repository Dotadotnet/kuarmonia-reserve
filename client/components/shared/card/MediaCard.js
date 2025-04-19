import React from "react";
import Image from "next/image";
import Link from "next/link";
const MediaCard = ({
  media
}) => {
  return (
    <Link
      key={media?.id || media?.index}
      href={`/media/${media?.mediaId}/${media?.slug.replace(' ','-')}`}
      className="group cursor-pointer flex flex-col gap-y-4  border border-secondary shadow-lg dark:border-gray-600 rounded h-fit md:h-96 break-inside-avoid bg-white dark:bg-gray-800 transition-color ease-linear delay-100 hover:border-primary dark:hover:border-blue-500 relative "
    >
      <div className="relative w-full  ">
        <Image
          src={media?.thumbnail?.url}
          alt={media?.title}
          width={600}
          height={600}
          className="rounded-t h-full"
          controls
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2.85em"
            height="2em"
            viewBox="0 0 256 180"
          >
            <path
              fill="#f00"
              d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"
            />
            <path
              fill="#fff"
              d="m102.421 128.06l66.328-38.418l-66.328-38.418z"
            />
          </svg>
        </span>
        <p className="absolute right-2 bottom-2 mb-2 flex items-center bg-gray-900/70 text-gray-100 text-xs px-1 py">
          1:15
        </p>
      </div>

      <article className="flex flex-col gap-y-2.5 px-4 pb-4 h-full justify-between">
        <div>
          <h2 className="text-lg line-clamp-1">{media?.title}</h2>
          <p className="text-sm line-clamp-2">{media?.description}</p>
        </div>
        <div className="mt-auto flex flex-col gap-y-2.5">
          <div className="text-xs border border-secondary transition-colors ease-linear delay-100 group-hover:border-primary dark:group-hover:border-blue-500 px-1  py-0.5 rounded-primary text-slate-500 flex items-center justify-between relative">
            <span>
              {new Date(media?.createdAt).toLocaleDateString("fa-IR", {
                weekday: "long"
              })}{" "}
              - {new Date(media?.createdAt).toLocaleDateString("fa-IR")}
            </span>
            <div className="flex items-center space-x-3">
              <Image
                alt={media?.authorId?.name ||  "avatar"}
                title={media?.authorId?.name}
                src={media?.authorId?.avatar?.url}
                width={36}
                height={36}
                className="relative inline-block rounded-full   object-cover object-center hover:z-10"
              />
              {media?.author !== media?.superAdmin?.name && (
                <Image
                  alt={media?.superAdmin?.url || "avatar"}
                  title={media?.superAdmin?.name}
                  src={media?.avatar}
                  width={36}
                  height={36} 
                  className="relative inline-block rounded-full   object-cover object-center hover:z-10"
                />
              )} 
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MediaCard;
