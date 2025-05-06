import React from "react";
import Square from "@/components/icons/Square";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { FaBed, FaRegCalendarAlt, FaBath } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const locale = useLocale();
  const t = useTranslations("Property");

  let updatedFinalPrice = property?.finalPrice;
  let updatedFinalPriceLabel = property?.finalPriceLabel;
  if (property?.tradeType && property?.variants) {
    const deposit = property?.variants?.find(
      (variant) => variant?.type === "deposit"
    )?.value;
    const monthlyRent = property?.variants?.find(
      (variant) => variant?.type === "monthlyRent"
    )?.value;
    const totalPrice = property?.variants?.find(
      (variant) => variant?.type === "totalPrice"
    )?.value;
    const installmentAmount = property?.variants.find(
      (variant) => variant?.type === "installmentAmount"
    )?.value;

    if (deposit) {
      updatedFinalPriceLabel = " ودیعه";
      updatedFinalPrice = deposit;
    } else if (monthlyRent) {
      updatedFinalPriceLabel = "ماهانه";
      updatedFinalPrice = monthlyRent;
    } else if (totalPrice) {
      updatedFinalPriceLabel = "ارزش کل";
      updatedFinalPrice = totalPrice;
    } else if (installmentAmount) {
      updatedFinalPriceLabel = "";
      updatedFinalPrice = installmentAmount;
    }
  }
  console.log("property", property);
  const { title, summary, slug } =
    property?.translations?.find((t) => t.translation?.language === locale)
      ?.translation?.fields || {};
  const typeTitle = property?.type?.translations?.find(
    (t) => t.translation?.language === locale
  )?.translation?.fields?.title;

  const saleTypeTitle = property?.saleType?.translations?.find(
    (t) => t.translation?.language === locale
  )?.translation?.fields?.title;

  const tradeTypeTitle = property?.tradeType?.translations?.find(
    (t) => t.translation?.language === locale
  )?.translation?.fields?.title;
  console.log(title, summary, slug, typeTitle, saleTypeTitle, tradeTypeTitle);
  console.log(property?.propertyId);
  return (
    <Link
      key={property?._id}
      href={`/property/${property?.propertyId}/${slug}`}
      className="max-w-sm w-full  z-49 "
    >
      <div className="bg-white dark:bg-gray-800  relative   shadow-xl rounded overflow-hidden ">
        <div className="w-full absolute overflow-hidden h-full">
          <span
            className={`absolute top-2 left-0 w-32 translate-y-4 -translate-x-8 -rotate-45 text-center text-sm z-50 
            ${
              property?.citizenshipStatus === "citizenship"
                ? "bg-green-500 text-white"
                : property?.citizenshipStatus === "residency"
                ? "bg-blue-500 text-white"
                : property?.citizenshipStatus === "goldenVisa"
                ? "bg-yellow-500 text-white"
                : "bg-transparent text-transparent"
            }`}
          >
            {property?.citizenshipStatus === "citizenship" && t("citizenship")}
            {property?.citizenshipStatus === "residency" && t("residency")}
            {property?.citizenshipStatus === "goldenVisa" && t("goldenVisa")}
          </span>
        </div>
        <div className="bg-cover w-full relative bg-center h-56">
          <Image
            src={property?.thumbnail?.url || "/placeholder.png"}
            height={600}
            width={600}
            className="w-full h-full"
            alt="تصویر ملک"
          />
        </div>
        <div className="flex w-full gap-1 pt-2 px-2 justify-between h-fit">
          {typeTitle && (
            <Badge className="text-green-800 dark:text-green-100 bg-green-100 dark:bg-green-600 flex flex-row items-center gap-x-1">
              {typeTitle}
            </Badge>
          )}
          <div className="flex gap-2">
            {saleTypeTitle && (
              <Badge className="text-rose-800 dark:text-rose-100 bg-rose-100 dark:bg-rose-600 flex flex-row items-center gap-x-1">
                {saleTypeTitle}
              </Badge>
            )}

            {tradeTypeTitle && (
              <Badge className="text-cyan-800 dark:text-cyan-100 bg-cyan-100 dark:bg-cyan-600 flex flex-row items-center gap-x-1">
                {tradeTypeTitle}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4 text-right">
          <div className="flex flex-col  justify-between">
            <h3 className=" tracking-wide text-2xl font-nozha text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <h4 className="text-gray-700 text-justify dark:text-gray-300 ">
              {summary}
            </h4>
          </div>
          {updatedFinalPrice && property?.currency && (
            <div className="flex items-center justify-start">
              <span className="text-3xl font-extrabold font-nozha text-blue-800 dark:text-blue-300">
                {" "}
                {updatedFinalPrice}
              </span>
              <div className="flex items-center gap-x-1 w-6 h-6">
                <span
                  dangerouslySetInnerHTML={{
                    __html: property?.currency.symbol
                  }}
                  className="text-gray-500 dark:text-gray-300"
                ></span>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-x-2 justify-start pt-1 px-4 pb-10 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
          {property?.building?.square?.map((size, index) => (
            <Tooltip
              key={index}
              data-tooltip-target={`square-${index}`}
              aria-label="مساحت"
              title={`مساحت واحد ${index + 1}`}
              value={size}
              icon={<Square className="h-6 w-6" />}
            />
          ))}

          {property?.createDate && (
            <Tooltip
              data-tooltip-target="createDate"
              aria-label="سال ساخت"
              title="سال ساخت"
              value={property?.createDate}
              icon={<FaRegCalendarAlt className="h-6 w-6 " />}
            />
          )}
          {property?.building?.bedrooms?.map((bedroom, index) => (
            <Tooltip
              key={index}
              data-tooltip-target={`bedroom-${index}`}
              aria-label="اتاق"
              title={`اتاق ${index + 1}`}
              value={bedroom}
              icon={<FaBed className="h-6 w-6" />}
            />
          ))}

          {property?.bathrooms > 0 && (
            <Tooltip
              data-tooltip-target="bathrooms"
              aria-label="حمام"
              title="حمام"
              value={property?.bathrooms}
              icon={<FaBath className="h-6 w-6 " />}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

function Badge({ className, children, props }) {
  return (
    <span
      className={
        "text-xs text-gray-500 dark:text-gray-300 py-1 px-3 rounded-full " +
        className
      }
      {...props}
    >
      {children}
    </span>
  );
}

function Tooltip({ children, value, icon, ...props }) {
  return (
    <span {...props} className="custom-button !p-3 relative">
      {icon}
      <div
        className={`absolute  top-full left-1/2 -translate-x-1/2 mt-2 !px-4  text-green-500 text-sm rounded transition-opacity duration-300  whitespace-nowrap !py-0 cursor-pointer  border border-green-500/5 dark:border-blue-500/5 bg-green-500/5 dark:bg-blue-500/5 p-2  dark:text-blue-500  hover:border-green-500/10 dark:hover:border-blue-500/10 hover:bg-green-500/10 dark:hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70
        `}
      >
        {value}
        <div className="absolute  top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-green-500/5 dark:border-b-blue-500/5 cursor-pointer"></div>
      </div>
    </span>
  );
}

export default PropertyCard;
