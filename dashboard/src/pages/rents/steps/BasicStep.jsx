import React, { useState } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";

const BasicStep = ({ nextStep, errors, register, gallery, setGallery }) => {
  const [galleryPreview, setGalleryPreview] = useState(null);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="  rounded-full flex justify-center mb-4">
          {galleryPreview ? (
            <span className="flex -space-x-4">
              {galleryPreview?.map((gallery, index) => (
                <img
                  key={index}
                  src={gallery.url}
                  className="h-[80px] w-[80px] rounded-secondary border border-primary object-cover"
                />
              ))}
            </span>
          ) : (
            <SkeletonImage />
          )}
        </div>
        <label htmlFor="gallery" className="flex flex-col text-center gap-y-2">
          گالری هتل و سوئیت
          <GalleryUpload
            setGallery={setGallery}
            setGalleryPreview={setGalleryPreview}
            maxFiles={36}
            register={register}
            title="آپلود تصاویر گالری"
          />
        </label>
        {errors?.gallery && (
          <span className="text-red-500 text-sm">
            {errors?.gallery.message}
          </span>
        )}
      </div>
      <label htmlFor="title" className="flex flex-col gap-y-1">
        <span className="text-sm">* عنوان </span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "عنوان  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="عنوان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>
      <label htmlFor="summary" className="w-full flex flex-col gap-y-1">
        <span className="text-sm">خلاصه*</span>
        <input
          type="text"
          name="summary"
          id="summary"
          maxLength="500"
          {...register("summary", {
            required: "وارد کردن خلاصه الزامی است",
            minLength: {
              value: 50,
              message: "خلاصه باید حداقل ۵۰ کاراکتر باشد"
            },
            maxLength: {
              value: 500,
              message: "خلاصه نباید بیشتر از ۵۰۰ کاراکتر باشد"
            }
          })}
          required
        />
        {errors?.summary && (
          <span className="text-red-500 text-sm">{errors.summary.message}</span>
        )}
      </label>
      <label htmlFor="price" className="flex flex-col gap-y-2">
        قیمت برای هر شب{" "}
        <input
          type="number"
          name="price"
          id="price"
          placeholder="قیمت هر شب راوارد کنید..."
          className="rounded"
          min={5}
          max={500}
          {...register("price", { required: true })}
        />
      </label>

      <label htmlFor="description" className="w-full flex flex-col gap-y-1">
        <span className="text-sm">توضیحات*</span>
        <textarea
          name="description"
          id="description"
          rows="4"
          maxLength="500"
          {...register("description", {
            required: "وارد کردن توضیحات الزامی است",
            minLength: {
              value: 50,
              message: "توضیحات باید حداقل ۵۰ کاراکتر باشد"
            },
            maxLength: {
              value: 500,
              message: "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد"
            }
          })}
          required
        />
        {errors?.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </label>
      <div className="flex justify-start mt-2">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default BasicStep;
