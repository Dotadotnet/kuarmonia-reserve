import React, { useMemo, useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
const Step1 = ({
  nextStep,
  errors,
  register,
  setThumbnail,
  setThumbnailPreview,
  setValue,
  control,
  publishDate
}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <label
          htmlFor="thumbnail"
          className="flex flex-col text-center gap-y-2"
        >
          تصویر کارت
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
      <label htmlFor="publishDate" className="flex flex-col gap-y-2 w-full">
        تاریخ انتشار
        <input
          type="date"
          name="publishDate"
          id="publishDate"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("publishDate", { required: "تاریخ انتشار الزامی است" })}
          defaultValue={publishDate}
        />
        {errors?.publishDate && (
          <span className="text-red-500 text-sm">
            {errors?.publishDate.message}
          </span>
        )}
      </label>
      
      <div className="flex justify-start 2">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default Step1;
