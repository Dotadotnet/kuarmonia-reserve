"use client";
import React from "react";
import Image from "next/image";

const DynamicGallery = ({ gallery }) => {
  if (!gallery || gallery.length === 0) return null;

  const getGridClasses = (length) => {
    switch (length) {
      case 1:
        return "grid-cols-1 grid-rows-1";
      case 2:
        return "grid-cols-[50vw_1fr] grid-rows-1";
      case 3:
        return "grid-cols-[50vw_1fr] grid-rows-2";
      case 4:
        return "grid-cols-[50vw_1fr_1fr] grid-rows-2";
      case 5:
        return "grid-cols-[50vw_1fr_1fr] grid-rows-2";
      case 6:
        return "grid-cols-[50vw_1fr_1fr] grid-rows-3";
      default:
        return "grid-cols-[50vw_1fr_1fr] grid-rows-3";
    }
  };

  const getImageStyles = (index, length) => {
    if (length === 1) {
      return "col-span-1 row-span-1";
    } else if (length === 2) {
      return "col-span-1 row-span-1";
    } else if (length === 3) {
      if (index === 0) return "col-span-1 row-span-2";
      return "col-span-1 row-span-1";
    } else if (length === 4) {
      if (index === 0) return "col-span-1 row-span-2";
      if (index === 1 || index === 2) return "col-span-1 row-span-1";
      return "col-span-1 row-span-2";
    } else if (length === 5) {
      if (index === 0) return "col-span-1 row-span-2";
      return "col-span-1 row-span-1";
    } else if (length === 6) {
      if (index === 0) return "col-span-1 row-span-3";
      if (index === 1 || index === 2 || index === 3) return "col-span-1 row-span-1";
      if (index === 4) return "col-span-1 row-span-2 row-start-1";
      if (index === 5) return "col-span-1 row-span-2 row-start-2";
    }
    return "col-span-1 row-span-1";
  };

  return (
    <div className="container mx-auto h-[50vh] lg:h-[30vw] md:h-[30vw] px-5 py-4">
      <div
        className={`grid ${getGridClasses(
          gallery.length
        )} gap-4 w-full h-full`}
        style={
          gallery.length === 6
            ? { gridTemplateRows: "repeat(3, 1fr)" }
            : {}
        }
      >
        {gallery.map((img, index) => (
          <div
            key={img?.public_id || index}
            className={`relative rounded-lg overflow-hidden ${getImageStyles(
              index,
              gallery.length
            )}`}
          >
            <Image
              src={img.url}
              alt={img.public_id || `gallery image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicGallery;