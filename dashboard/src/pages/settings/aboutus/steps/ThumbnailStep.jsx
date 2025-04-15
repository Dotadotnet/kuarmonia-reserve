import React, { useState } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";

const ThumbnailStep = ({ nextStep, errors, register, setThumbnail }) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
      <div className="flex flex-col items-center ">
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
          تصویر عضو
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            fullName={"لطفا یک تصویر انتخاب کنید"}
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
      <label htmlFor="fullName" className="flex flex-col gap-y-1">
        <span className="text-sm">* نام و نام خانوادگی </span>
        <input
          type="text"
          name="fullName"
          id="fullName"
          {...register("fullName", {
            required: "وارد کردن نام و نام خانوادگی الزامی است",
            minLength: {
              value: 3,
              message: "نام و نام خانوادگی باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "نام و نام خانوادگی  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="نام و نام خانوادگی"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.fullName && (
          <span className="text-red-500 text-sm">
            {errors?.fullName.message}
          </span>
        )}
      </label>
      <label htmlFor="description" className="flex flex-col gap-y-2 w-full">
        توضیحات
        <textarea
          name="description"
          id="description"
          maxLength={160}
          placeholder="توضیحات مجله را وارد کنید..."
          className="p-2 rounded h-[170px]
       border w-full form-textarea"
          {...register("description", {
            // اصلاح نام فیلد
            required: "توضیحات الزامی است",
            minLength: {
              value: 30,
              message: "توضیحات باید حداقل ۳۰ کاراکتر باشد"
            },
            maxLength: {
              value: 225,
              message: "توضیحات نباید بیشتر از ۲۲۵ کاراکتر باشد"
            }
          })}
        />
        {errors?.description && (
          <span className="text-red-500 text-sm">
            {errors?.description.message}
          </span>
        )}
      </label>
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default ThumbnailStep;
