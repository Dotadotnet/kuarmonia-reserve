import React from "react";
import { toPersianNumbers } from "@/utils/convertNumbers";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import Calendar from "@/components/icons/Calendar";
import Square from "@/components/icons/Square";
import Bed from "@/components/icons/Bed";
import Bath from "@/components/icons/Bath";
const PropertyCard = ({ property }) => {
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

  return (
    <div className="max-w-sm w-full  z-49 ">
      <div className="bg-white dark:bg-gray-800  relative   shadow-xl rounded-lg overflow-hidden ">
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
            {property?.citizenshipStatus === "citizenship" && "اخذ شهروندی"}
            {property?.citizenshipStatus === "residency" && "اخذ اقامت"}
            {property?.citizenshipStatus === "goldenVisa" && "اخذ ویزای طلایی"}
          </span>
        </div>
        <div className="bg-cover w-full relative bg-center h-56">
          {!property?.thumbnail ? (
            <div className="w-full h-full">
              <SkeletonImage
                width={500}
                height={500}
                showSize={true}
                txtSize="text-3xl"
                className="z-0  w-full h-full"
              />
            </div>
          ) : (
            <img
              src={property?.thumbnail || "/placeholder.png"}
              height={600}
              width={600}
              className="w-full h-full"
              alt="تصویر ملک"
            />
          )}
        </div>
        <div className="flex w-full gap-1 pt-2 px-2 justify-between h-fit">
          {property?.type && (
            <Badge className="text-green-800 dark:text-green-100 bg-green-100 dark:bg-green-600 flex flex-row items-center gap-x-1">
              {property?.type?.title}
            </Badge>
          )}
          <div className="flex gap-2">
            {property?.saleType && (
              <Badge className="text-rose-800 dark:text-rose-100 bg-rose-100 dark:bg-rose-600 flex flex-row items-center gap-x-1">
                {property?.saleType.title}
              </Badge>
            )}
            {property?.tradeType && (
              <Badge className="text-cyan-800 dark:text-cyan-100 bg-cyan-100 dark:bg-cyan-600 flex flex-row items-center gap-x-1">
                {property?.tradeType.title}
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4 text-right">
          <div className="flex flex-col  justify-between">
            <h3 className=" tracking-wide text-2xl font-nozha text-gray-900 dark:text-gray-100">
              {toPersianNumbers(property?.title)}
            </h3>
            <h4 className="text-gray-700 text-justify dark:text-gray-300 ">
              {property?.summary}
            </h4>
          </div>
          {updatedFinalPrice && property?.currency && (
            <>
              <span className="text-3xl font-extrabold font-nozha text-blue-800 dark:text-blue-300">
                {" "}
                {toPersianNumbers(
                  Number(updatedFinalPrice).toLocaleString("fa-IR")
                )}
              </span>
              <span className="text-gray-500 dark:text-gray-300">
                {property?.currency}
              </span>
              <strong className="text-blue-600 dark:text-blue-400 text-sm">
                {updatedFinalPriceLabel}
              </strong>
            </>
          )}
        </div>
        <div className="flex gap-x-2 justify-start pt-1 px-4 pb-10 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
          {property?.square && (
            <Tooltip
              data-tooltip-target="square "
              aria-label="مساحت"
              title="مساحت"
              value={property.square}
              icon={<Square className="h-6 w-6 " />}
            />
          )}

          {property?.createDate && (
            <Tooltip
              data-tooltip-target="createDate"
              aria-label="سال ساخت"
              title="سال ساخت"
              value={property?.createDate}
              icon={<Calendar className="h-6 w-6 " />}
            />
          )}
          {property?.bedrooms > 0 && (
            <Tooltip
              data-tooltip-target="bedrooms"
              aria-label="اتاق"
              title="اتاق"
              value={property?.bedrooms}
              icon={<Bed className="h-6 w-6 " />}
            />
          )}

          {property?.bathrooms > 0 && (
            <Tooltip
              data-tooltip-target="bathrooms"
              aria-label="حمام"
              title="حمام"
              value={property?.bathrooms}
              icon={<Bath className="h-6 w-6 " />}
            />
          )}
        </div>
      </div>
    </div>
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
        className={`absolute  top-full left-1/2 -translate-x-1/2 mt-2 !px-4 bg-green-300 text-green-500 text-sm rounded  transition-opacity duration-300  whitespace-nowrap !py-0 cursor-pointer  border border-green-500/5 dark:border-blue-500/5 bg-green-500/5 dark:bg-blue-500/5 p-2  dark:text-blue-500  hover:border-green-500/10 dark:hover:border-blue-500/10 hover:bg-green-500/10 dark:hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70
        `}
      >
        {value}
        <div className="absolute  top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-green-500/5 dark:border-b-blue-500/5 cursor-pointer"></div>
      </div>
    </span>
  );
}

export default PropertyCard;
