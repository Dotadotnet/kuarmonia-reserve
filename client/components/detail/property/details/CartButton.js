import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Bag from "@/components/icons/Bag";
import Spinner from "@/components/shared/spinner/Spinner";
import { useAddToCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";

const CartButton = ({ property }) => {
  const [
    addToCart,
    { isLoading: addingToCart, data: cartData, error: cartError }
  ] = useAddToCartMutation();

  // تغییر واحد زمانی که کاربر روی دکمه کلیک می‌کند
  const handleUnitClick = (unit) => {};

  return (
    <section className="flex flex-row items-center gap-x-4">
      <div className="flex-flex-col gap-y-8">
        <div className="flex flex-col gap-y-12">
          <div className="flex gap-x-2 items-center"></div>
        </div>
        <div className="flex justify-center mt-4 items-center gap-4">
          {property?.currency &&
            property?.variants.map((variant, index) => {
              if (!variant?.value) return null; // اگر مقدار نیست، چیزی نمایش داده نشه

              let label = "";
              switch (variant.type) {
                case "deposit":
                  label = "ودیعه";
                  break;
                case "monthlyRent":
                  label = "برای هر ماه";
                  break;
                case "totalPrice":
                  label = "ارزش کل";
                  break;
                case "installmentAmount":
                  label = "مبلغ قسط";
                  break;
                case "installments":
                  label = "تعداد اقساط";
                  break;
                default:
                  label = "مقدار نامشخص";
              }

              return (
                <div className="flex justify-center gap-x-2 items-center">
                  <span>{property.currency}</span>
                  <p
                    key={index}
                    className=" text-xl md:text-4xl text-gray-900 dark:text-gray-100"
                  >
                    {` ${variant?.value?.toLocaleString("fa-IR")}  `}
                  </p>
                  <span className="text-xl ">{label}</span>
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
                <span className="flex  text-white">درخواست مشاروه </span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartButton;
