import { useMemo, useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import { useGetCitizenshipOutcomesQuery } from "@/services/citizenshipOutcome/citizenshipOutcomeApi";
import { useForm } from "react-hook-form";

import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";
const Step1 = ({
  nextStep,
  errors,
  register,
  setThumbnail,
  setThumbnailPreview,
  setValue,
  control
}) => {
  const {
    isLoading: fetchingCitizenshipOutcomes,
    data: fetchCitizenshipOutcomesData,
    error: fetchCitizenshipOutcomesError
  } = useGetCitizenshipOutcomesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const citizenshipOutcomes = useMemo(
    () =>
      fetchCitizenshipOutcomesData?.data?.map((job) => ({
        id: job._id,
        value: job.translations[0].translation?.fields.title,
        description: job.translations[0].translation?.fields.description
      })),
    [fetchCitizenshipOutcomesData]
  );
   const {
    watch,
  } = useForm();
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
      <label htmlFor="description" className="flex flex-col gap-y-2 w-full">
        توضیحات
        <textarea
          name="description"
          id="description"
          maxLength={300}
          rows={3}
          placeholder="توضیحات مجله را وارد کنید..."
          className="p-2 rounded
       border w-full form-textarea"
          {...register("description", {
            // اصلاح نام فیلد
            required: "توضیحات الزامی است",
            minLength: {
              value: 30,
              message: "توضیحات باید حداقل ۳۰ کاراکتر باشد"
            },
            maxLength: {
              value: 300,
              message: "توضیحات نباید بیشتر از 300 کاراکتر باشد"
            }
          })}
        />
        {errors?.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </label>
      <label
        htmlFor="citizenshipOutcome"
        className="flex flex-col gap-y-2 w-full"
      >
        مزایای اقامتی{" "}
        <Controller
          control={control}
          name="citizenshipOutcome"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              items={citizenshipOutcomes}
              placeholder="انتخاب مزایای اقامتی"
              value={value?.value}
              onChange={onChange}
              className="w-full mt-2"
              height="py-3"
              error={errors?.citizenshipOutcomes}
            />
          )}
        />
        {errors?.citizenshipOutcomes && (
          <span className="text-red-500 text-sm">
            {errors.citizenshipOutcomes.message}
          </span>
        )}
      </label>
      <div className="flex text-start flex-col md:flex-row gap-4">
        {/* آغاز ثبت‌نام */}
        <label htmlFor="startDate" className="flex flex-col w-full">
          آغاز ثبت‌نام
          <input
            type="date"
            id="startDate"
            className="rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("startDate", {
              required: "تاریخ آغاز الزامی است"
            })}
          />
          {errors?.startDate && (
            <span className="text-red-500 text-xs mt-1">
              {errors.startDate.message}
            </span>
          )}
        </label>

        {/* پایان ثبت‌نام */}
        <label htmlFor="endDate" className="flex flex-col w-full">
          پایان ثبت‌نام
          <input
            type="date"
            id="endDate"
            className="rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("endDate", {
              required: "تاریخ پایان الزامی است",
              validate: (value) =>
                !startDate ||
                value >= startDate ||
                "تاریخ پایان نباید قبل از آغاز باشد"
            })}
          />
          {errors?.endDate && (
            <span className="text-red-500 text-xs mt-1">
              {errors.endDate.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex justify-start 2">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default Step1;
