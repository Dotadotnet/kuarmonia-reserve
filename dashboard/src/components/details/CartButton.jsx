
import React, {  useState } from "react";
import Bag from "../icons/Bag";
import Spinner from "../shared/Spinner";
import OutlinePlus from "../icons/OutlinePlus";
import OutlineMinus from "../icons/OutlineMinus";

const CartButton = ({ product }) => {
  const [qty, setQty] = useState(1);


  const [selectedUnit, setSelectedUnit] = useState(product?.variations?.[0]);

  // تغییر واحد زمانی که کاربر روی دکمه کلیک می‌کند
  const handleUnitClick = (unit) => {
    setSelectedUnit(unit);
  };
  const originalPrice = selectedUnit?.price || 0;
  const discountedPrice =
    product?.discountAmount > 0
      ? originalPrice * (1 - product.discountAmount / 100)
      : originalPrice;
  return (
    <section className="flex flex-row items-center gap-x-4">
      <div className="flex-flex-col gap-y-8">
        <div className="flex flex-col gap-y-12">
          <div className="flex  flex-wrap gap-4  items-center">
            {" "}
            {[...(product?.variations || [])]
              .sort((a, b) => Number(a.unit.value) - Number(b.unit.value))
              .map((variation) => (
                <div key={variation?._id} className="relative">
                  <button
                    onClick={() => handleUnitClick(variation)}
                    className={`relative rounded-full flex items-center justify-center text-xl transition-all duration-300 ease-in-out
                  ${
                    selectedUnit?.unit._id === variation.unit._id
                      ? "bg-primary outline-none ring-2 ring-primary dark:ring-green-300 ring-offset-4 dark:ring-offset-gray-800"
                      : "bg-red-300"
                  }`}
                    style={{
                      width: `${20 + variation.unit.value * 10}px`,
                      height: `${20 + variation.unit.value * 10}px`
                    }}
                  >
                    {/* Tooltip */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-secondary text-white text-sm rounded shadow-lg transition-opacity duration-300  whitespace-nowrap
                  ${
                    selectedUnit?.unit._id === variation.unit._id
                      ? "opacity-100 visible"
                      : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                  }`}
                    >
                      {variation?.unit?.title}
                      {/* فلش Tooltip */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-secondary"></div>
                    </div>
                  </button>
                </div>
              ))}
          </div>
          <div className="flex gap-x-2 items-center">
            {discountedPrice < originalPrice && (
              <span className="text-red-500 block line-through text-sm">
                {originalPrice.toLocaleString("fa-IR")} ریال
              </span>
            )}

            <span className="text-green-500 block text-lg !leading-none">
              {discountedPrice > 0
                ? `${discountedPrice.toLocaleString("fa-IR")} ریال`
                : `${originalPrice.toLocaleString("fa-IR")} ریال`}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-4 items-center gap-4">
          <div className="flex flex-row gap-x-2 items-center border px-1 py-0.5 rounded-secondary h-full">
            <button
              className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
              onClick={() => setQty(qty - 1)}
              disabled={qty === 1}
            >
              <OutlineMinus className="w-4 h-4" />
            </button>
            <span className="px-2 py-0.5 rounded-primary border w-12 inline-block text-center">
              {qty}
            </span>
            <button
              className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
              onClick={() => setQty(qty + 1)}
            >
              <OutlinePlus className="w-4 h-4" />
            </button>
          </div>
          <button
            className="px-8 py-2 border border-primary rounded-secondary bg-primary hover:bg-primary/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
            disabled={qty === 0}
            onClick={() => {
              addToCart({
                product: product._id,
                quantity: qty,
                unit: selectedUnit?.unit._id
              });
            }}
          >
           
                <Bag />
                <span className="md:hidden text-white">افزودن</span>
                <span className="md:flex hidden text-white">
                  اضافه کردن به سبد خرید{" "}
                </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartButton;
