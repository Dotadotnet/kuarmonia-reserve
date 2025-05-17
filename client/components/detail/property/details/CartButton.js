import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Bag from "@/components/icons/Bag";
import Spinner from "@/components/shared/spinner/Spinner";
import { useAddToCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { FaBed, FaRegCalendarAlt, FaBath } from "react-icons/fa";
import Square from "@/components/icons/Square";

const CartButton = ({ property }) => {
  const t = useTranslations("Property");

  const [
    addToCart,
    { isLoading: addingToCart, data: cartData, error: cartError }
  ] = useAddToCartMutation();

  const handleUnitClick = (unit) => {};
  console.log("property?.building", property?.building);
  return (
    <section className="flex flex-row items-center gap-x-4">
      <div className="flex-flex-col gap-y-8">
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center flex-wrap justify-start gap-2 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className=" flex items-center justify-center text-lg text-gray-700 dark:text-gray-200 gap-x-2">
              <FaBed className="text-xl text-gray-600 dark:text-gray-400" />{" "}
              {t("bedrooms")}
              {property?.building?.bedrooms?.map((bedroom, index) => (
                <span
                  key={index}
                  className="text-sm flex md:flex-row flex-col justify-center items-center gap-2    rounded-lg  bg-cyan-100 text-cyan-500  px-2 py-2  "
                >
                  <span>{bedroom}</span>
                  <span className="text-xs md:text-base">{t("bedroom")}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className=" flex items-center justify-center text-lg text-gray-700 dark:text-gray-200 gap-x-1">
              <Square className="text-xl text-gray-600 dark:text-gray-400" />{" "}
              {t("squares")}
              {property?.building?.square?.map((square, index) => (
                <span
                  key={index}
                  className="text-sm flex md:flex-row flex-col  da rounded-lg bg-cyan-100 text-cyan-500 p-3 px-4 gap-x-1 ml-2"
                >
                  <span>{square}</span>
                  <span className="text-xs md:text-base">{t("metr")}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-start gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className=" flex items-center justify-center text-lg text-gray-700 dark:text-gray-200 gap-x-2">
              <FaRegCalendarAlt className="text-xl text-gray-600 dark:text-gray-400" />{" "}
              {t("createDate")}
              <span className="text-sm  da rounded-lg bg-cyan-100 text-cyan-500 px-4 py-2  ml-2">
                {property?.createDate} {t("year")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-start mt-4 flex-wrap items-center gap-4">
          {property?.currency &&
            property?.variants.map((variant, index) => {
              if (!variant?.value) return null;

              let label = "";
              switch (variant.type) {
                case "deposit":
                  label = t("deposit");
                  break;
                case "monthlyRent":
                  label = t("monthlyRent");
                  break;
                case "totalPrice":
                  label = t("totalPrice");
                  break;
                case "installmentAmount":
                  label = t("installmentAmount");
                  break;
                case "installments":
                  label = t("installments");
                  break;
                case "propertyValue":
                  label = t("propertyValue");
                  break;
                default:
                  label = t("totalPrice");
              }

              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-center items-center">
                    <div className="w-7 h-7 flex items-center justify-center text-lg text-gray-700 dark:text-gray-200">
                      {property.currency?.symbol ? (
                        <span
                          className="w-6 h-6"
                          dangerouslySetInnerHTML={{
                            __html: property.currency.symbol
                          }}
                        />
                      ) : (
                        <span className="text-sm">
                          {property.currency?.title}
                        </span>
                      )}
                    </div>
                    <p className="text-xl  text-gray-900 dark:text-gray-100">
                      {variant.value}
                    </p>
                  </div>

                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {label}
                  </span>
                </div>
              );
            })}

          <button
            className="px-8 py-2 border border-primary rounded-secondary bg-primary hover:bg-primary/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
            disabled={addingToCart}
            onClick={() => {}}
          >
            {addingToCart ? (
              <Spinner />
            ) : (
              <>
                <Bag />
                <span className="flex  text-white">
                  {" "}
                  {t("request-Consultation")}{" "}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartButton;
