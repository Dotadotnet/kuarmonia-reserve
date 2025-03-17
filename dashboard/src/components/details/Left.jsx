import React, { useState } from "react";
import Discount from "../icons/Discount";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import DetailCard from "./DetailCard";

const Left = ({ product }) => {
  // State to manage the main image
  const [mainImage, setMainImage] = useState(product.thumbnail?.url);

  const hashTags = [...(product?.category?.tags || [])].filter(
    (tag) => tag !== undefined
  );

  return (
    <section className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4">
        <img
          src={mainImage}
          alt="Main product"
          width={480}
          height={200}
          className="rounded w-full h-full object-cover"
        />
        <div className="grid grid-cols-7 gap-4">
          {product?.gallery?.map((thumbnail, index) => (
            <img
              src={thumbnail?.url}
              key={index}
              alt={thumbnail?.public_id}
              className={
                "rounded object-cover max-w-full w-full h-full cursor-pointer"
              }
              width={480}
              height={200}
              onClick={() => setMainImage(thumbnail?.url)}
            />
          ))}
        </div>
      </div>
      <article className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-x-2.5">
          <Badge className="text-purple-800 bg-purple-100">
            {"در " + product?.variations?.length.toLocaleString('fa-IR') + " " + "وزن"}
          </Badge>
          {product?.campaign?.state === "discount" && (
            <Badge className="text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1">
              <Discount /> {product?.campaign?.title}
            </Badge>
          )}
          {product?.campaign?.state === "sold-out" && (
            <Badge className="text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1">
              <SoldOut /> {product?.campaign?.title}
            </Badge>
          )}
          {product?.campaign?.state === "arrival" && (
            <Badge className="text-cyan-800 bg-cyan-100 flex flex-row items-center gap-x-1">
              <Arrival /> {product?.campaign?.title}
            </Badge>
          )}
          {product?.campaign?.state === "on-sale" && (
            <Badge className="text-blue-800 bg-blue-100 flex flex-row items-center gap-x-1">
              <Arrival /> {product?.campaign?.title}
            </Badge>
          )}
        </div>
        <div className="flex flex-col gap-y-2.5">
          <DetailCard
            title={`از دسته بندی ${product?.category?.title}`}
            content={product?.category?.keynotes}
          />
          <div className="flex flex-row flex-wrap gap-1 mt-4">
            {hashTags.map((hashTag, index) => (
              <span
                key={index}
                className="!text-xs border px-2 py-0.5 rounded-sm"
              >{`#${hashTag}`}</span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

function Badge({ props, children, className }) {
  return (
    <span
      className={
        "px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </span>
  );
}

export default Left;
