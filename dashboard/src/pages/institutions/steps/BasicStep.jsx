import React, { useState } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";

const BasicStep = ({
  nextStep,
  errors,
  register,
  thumbnail,
  setThumbnail
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
          {thumbnailPreview ? (
            <img
              src={thumbnailPreview}
              alt="standard"
              height={100}
              width={100}
              className="h-[100px] w-[100px] profile-pic rounded-full"
            />
          ) : (
            <SkeletonImage />
          )}
        </div>
        <label
          htmlFor="thumbnail"
          className="flex flex-col text-center gap-y-2"
        >
          تصویر دانشگاه
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            title={"لطفا یک تصویر انتخاب کنید"}
            maxFiles={1}
            register={register("thumbnail")}
          />
        </label>
        {errors?.thumbnail && (
          <span className="text-red-500 text-sm">
            {errors?.thumbnail.message}
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
