import React from "react";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step3 = ({
  setGalleryPreview,
  setGallery,
  errors,
  register,
  galleryPreview,
  setThumbnailPreview,
  setThumbnail,
  nextStep,
  prevStep,
  gallery
}) => {
  return (
    <>
      <div className="flex flex-col text-center gap-y-2">
        <label htmlFor="gallery" className="flex flex-col text-center gap-y-2">
          تصویر پست کارت
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            register={register("Thumbnail", {
              required: "آپلود تصویر عنوان الزامی است",
            })}
            maxFiles={1}
          />
        </label>
        {errors.gallery && (
          <span className="text-red-500 text-sm">{errors.gallery.message}</span>
        )}
        <GalleryUpload
          setGallery={setGallery}
          setGalleryPreview={setGalleryPreview}
          maxFiles={5}
          register={register("gallery", {
            required: "آپلود حداقل یک تصویر الزامی است",
          })}
          title="آپلود تصاویر گالری"
        />

        {/* نمایش پیش‌نمایش تصاویر */}
        <DisplayImages
          galleryPreview={galleryPreview.map((item) => item)}
          imageSize={150}
        />
      </div>
      <div className="flex justify-between mt-12 right-0 absolute bottom-2 w-full px-8">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step3;
