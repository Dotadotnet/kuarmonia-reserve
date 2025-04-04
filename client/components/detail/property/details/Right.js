import React from "react";
import dynamic from "next/dynamic";
import { AiFillStar } from "react-icons/ai";
import CartButton from "./CartButton";
import Description from "./Description";
import { toPersianNumbers } from "@/utils/convertNumbers";

// لود داینامیک کامپوننت GeoLocation
const GeoLocation = dynamic(() => import("./Location"), {
  loading: () => <p className="font-sans">نقشه در حال آماده سازی...</p>,
  ssr: false,
});
const Right = ({ property}) => {
  return (
    <section className="col-span-1 flex flex-col gap-y-8">
      <article className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-4">
          <h1 className="lg:text-5xl md:text-3xl text-xl">
            {toPersianNumbers(property?.title)}
          </h1>
          <p className="text-xl">
            {toPersianNumbers(property?.description) }
          </p>
          
        </div>
        <CartButton property={property} />
      </article>

      <Description property={property} />
      <div className=" flex justify-center items-center">
        <GeoLocation property={property} />
      </div>
    </section>
  );
};

export default Right;
