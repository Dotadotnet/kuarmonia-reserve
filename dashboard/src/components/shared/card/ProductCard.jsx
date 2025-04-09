import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import Button from "@/components/shared/button/Button";
import React, { useState } from "react";
import OutsideClick from "@/components/OutsideClick";
import Tooltip from "@/components/shared/tooltip/Tooltip";
const ProductCard = ({ venue }) => {
  const [gift, setGift] = useState(false);
  const handleOutsideClick = () => {
    setGift(!gift);
  };
  return (
    <div className="group  bg-white dark:bg-gray-800 flex lg:flex-row flex-col gap-4 border border-secondary p-4 rounded relative hover:border-primary transition-colors delay-100 dark:hover:border-blue-500 dark:text-blue-500">
      <div className="flex flex-col gap-y-2 ">
        {!venue?.thumbnail ? (
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
          <img
            src={venue.thumbnail}
            alt="feature tour"
            width={256}
            height={144}
            className="object-cover h-full w-full md:w-[250px] md:h-[150px] rounded"
          />
        )}
        <div className="flex flex-row lg:justify-center gap-x-2">
          {venue?.venueTypes?.map((item) => (
            <Tooltip text={item.label} txtColor="text-white">
              <div key={item.id} className="relative group">
                {/* آیکون دکمه */}
                <span className="p-2 hover:border-primary dark:hover:border-blue-500 ease-linear delay-100 transition-colors w-10 h-10 dark:border-blue-800 border-secondary border rounded-primary flex items-center justify-center">
                  <span
                    className="text-sm text-primary dark:text-blue-500"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                </span>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      <article className="flex flex-col gap-y-2.5 dark:text-white w-full">
        <h3 className="text-base line-clamp-2 ">
          {venue?.title || <SkeletonText lines={1} />}
        </h3>
        <div className="flex flex-col gap-y-1">
          <p className="text-sm pb-0">
            {venue?.summary || <SkeletonText lines={1} />}
          </p>
          <p className="text-sm pb-0 flex gap-x-0.5 items-baseline"></p>
        </div>
        {venue?.address?.length > 18 ? (
          <div className="border group-hover:border-primary   dark:group-hover:border-blue-500 dark:hover:border-blue-500 dark:text-gray-100 transition-colors delay-100 px-4 py-0.5 rounded-primary flex items-center gap-x-1 text-xs w-fit">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="m12.065 21.243l-.006-.005zm.182-.274a29 29 0 0 0 3.183-3.392c2.04-2.563 3.281-5.09 3.365-7.337a6.8 6.8 0 1 0-13.591 0c.085 2.247 1.327 4.774 3.366 7.337a29 29 0 0 0 3.183 3.392q.166.15.247.218zm-.985 1.165S4 16.018 4 10a8 8 0 1 1 16 0c0 6.018-7.262 12.134-7.262 12.134c-.404.372-1.069.368-1.476 0M12 12.8a2.8 2.8 0 1 0 0-5.6a2.8 2.8 0 0 0 0 5.6m0 1.2a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                />
              </svg>
            </span>
            <span>{venue?.address}</span>
          </div>
        ) : (
          <SkeletonText lines={1} />
        )}
        <div className="flex flex-row flex-wrap justify-between">
          <Button
            className="flex justify-center items-center px-4 py-2 text-base mt-2"
            disabled
          >
            {venue?.campaignState === "limited-offer" && (
              <del className="text-white text-sm">{venue?.basePrice}</del>
            )}
            <span
              className="w-6 h-6 text-lg  inline-block text-left  text-white font-semibold"
              dangerouslySetInnerHTML={{
                __html: venue?.currency?.symbol
              }}
            />
            <span className="text-white font-bold">
              {venue?.campaignState === "limited-offer"
                ? venue?.basePrice && venue?.discountAmount
                  ? venue?.basePrice -
                    (venue?.basePrice * venue?.discountAmount) / 100
                  : 0
                : venue?.basePrice}
            </span>
          </Button>

          <Button
            className="px-4 py-2 rounded text-base mt-2"
            onClick={() => setGift(!gift)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              >
                <path d="M12 21v-9m0-5H7.95c-2.77 0-2.94-4 0-4C11.1 3 12 7 12 7m0 0h4.05c2.896 0 2.896-4 0-4C12.9 3 12 7 12 7"></path>
                <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7m17 0V9a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3z"></path>
              </g>
            </svg>{" "}
          </Button>
        </div>
        <div className="flex justify-end items-center text-orange-500 text-sm mt-1">
          <div className="flex space-x-1 text-orange-500 text-sm ">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < venue?.star ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </article>

      {gift && (
        <div className="absolute top-0 left-0 w-full h-full rounded bg-secondary/20 backdrop-blur-sm backdrop-filter">
          <div className="h-full w-full rounded flex justify-center items-center">
            <OutsideClick onOutsideClick={handleOutsideClick}>
              <div className="flex flex-row gap-x-4 border border-primary dark::border-blue-500  p-4 rounded bg-white">
                <img
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
    </div>
  );
};

export default ProductCard;
