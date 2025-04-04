import React from "react";

import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";

const Step4 = ({
  setGalleryPreview,
  setGallery,
  register,
  galleryPreview,
  setThumbnailPreview,
  setThumbnail,
  errors,
  useState,
}) => {

  return (
    <>
      <label htmlFor="thumbnail" className="flex flex-col text-center gap-y-2">
        تصویر عنوان وبلاگ
        <ThumbnailUpload
          setThumbnailPreview={setThumbnailPreview}
          setThumbnail={setThumbnail}
          register={register("thumbnail", {
            required: "آپلود تصویر عنوان الزامی است"
          })}
          maxFiles={1}
        />
      </label>
      {errors.gallery && (
        <span className="text-red-500 text-sm">{errors.gallery.message}</span>
      )}
      <div className="flex flex-col text-center gap-y-2">
        <GalleryUpload
          setGallery={setGallery}
          setGalleryPreview={setGalleryPreview}
          maxFiles={5}
          register={register("gallery", {
            required: "آپلود حداقل یک تصویر الزامی است"
          })}
          title="آپلود تصاویر گالری"
        />

        {/* نمایش پیش‌نمایش تصاویر */}
        <DisplayImages
          galleryPreview={galleryPreview.map((item) => item)}
          imageSize={150}
        />
      </div>
     
    </>
  );
};

export default Step4;
