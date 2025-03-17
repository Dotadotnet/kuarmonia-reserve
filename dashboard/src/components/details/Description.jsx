import React from "react";
import DetailCard from "./DetailCard";
const Description = ({ product }) => {
  return (
    <section className="flex flex-col gap-y-2.5">
      <div className="flex flex-row gap-x-2 items-center">
        <span className="whitespace-nowrap text-sm text-black">
          جزئیات این محصول
        </span>
        <hr className="w-full" />
      </div>
      <article className="flex flex-col gap-y-4">
        <p className="text-sm">{product?.summary}</p>
        <button className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center">
          نظرات
        </button>
        <div className="flex flex-row gap-x-2 items-center">
          <span className="whitespace-nowrap text-sm text-black">
            ویزگی های این محصول{" "}
          </span>
          <hr className="w-full" />
        </div>
        <div className="flex flex-col gap-y-4">
          {product?.features?.map((explanation, index) => (
            <DetailCard
              key={index}
              title={explanation?.title}
              content={explanation?.content}
            />
          ))}
        </div>
      </article>
    </section>
  );
};

export default Description;
