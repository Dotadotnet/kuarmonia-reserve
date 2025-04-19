import React, { useMemo } from "react";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useGetNewsCountriesQuery } from "@/services/newsCountry/newsCountryApi";
import Plus from "@/components/icons/Plus";

const Step3 = ({
  register,
  errors,
  control,
  setSocialLinksData,
  socialLinksData
}) => {
  const timeOptions = Array.from({ length: 60 }, (_, index) => {
    const minutes = index + 1;
    const label = minutes === 60 ? "1 ساعت" : `${minutes} دقیقه`;
    return {
      id: minutes,
      value: label,
      description: `زمان تخمینی خواندن: ${label}`
    };
  });
  const {
    isLoading: fetchingNewsCountries,
    data: fetchNewsCountriesData,
    error: fetchNewsCountriesError
  } = useGetNewsCountriesQuery();

  const newsCountries = useMemo(
    () =>
      fetchNewsCountriesData?.data?.map((newsCountry) => ({
        id: newsCountry._id,
        value: newsCountry.title,
        label: newsCountry.title,
        icon: newsCountry.icon
      })) || [],
    [fetchNewsCountriesData]
  );
  return (
    <>
      <div className="flex flex-col gap-y-2 w-full  ">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="newsCountry" className="flex flex-col gap-y-2 ">
             کشور خبر
              <Controller
                control={control}
                name="newsCountry"
                rules={{ required: "انتخاب کشور خبر الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    items={newsCountries}
                    selectedItems={value || []}
                    handleSelect={onChange}
                    placeholder="یک مورد انتخاب کنید"
                    className={"w-full h-12"}
                    returnType="id"
                  />
                )}
              />
            </label>
          </div>
          <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              aria-label="افزودن دسته بندی جدید"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>
        </div>
        {errors.mainCategory && (
          <span className="text-red-500 text-sm">
            {errors.mainCategory.message}
          </span>
        )}
      </div>
      <label htmlFor="name" className="flex flex-col gap-y-1">
        <span className="text-sm">* منبع خبر</span>
        <input
          type="text"
          name="name"
          id="name"
          {...register("name", {
            minLength: {
              value: 3,
              message: "منبع خبر باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "منبع خبر نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="مثلاً BBC Persian"
          maxLength="100"
          className="p-2 rounded border"
        />
        {errors?.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </label>

      {/* لینک خبر */}
      <label htmlFor="link" className="flex flex-col gap-y-1">
        <span className="text-sm">* لینک خبر</span>
        <input
          type="url"
          name="link"
          id="link"
          {...register("link", {
            pattern: {
              value:
                /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,

              message: "فرمت لینک معتبر نیست"
            }
          })}
          placeholder="https://example.com/news"
          className="p-2 rounded "
        />
        {errors?.link && (
          <span className="text-red-500 text-sm">{errors.link.message}</span>
        )}
      </label>
      <div className="flex flex-col">
        <Controller
          control={control}
          name="isFeatured"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <StatusSwitch
              label={" ایا این خبر ویژه است؟"}
              id="isFeatured"
              register={register}
              onChange={(e) => onChange(e.target.checked)}
              defaultChecked={value}
            />
          )}
        />
      </div>
      <div className="flex flex-col">
        <Controller
          control={control}
          name="visibility"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <StatusSwitch
              label={" ایا این خبر عمومی است؟"}
              id="visibility"
              register={register}
              onChange={(e) => onChange(e.target.checked)}
              defaultChecked={true}
            />
          )}
        />
      </div>
      <SocialLinksInput
        socialLinksData={socialLinksData}
        setSocialLinksData={setSocialLinksData}
      />
      <label htmlFor="readTime" className="flex flex-col gap-y-2 w-full">
        تخمین مدت زمان مطالعه
        <Controller
          control={control}
          name="readTime"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              items={timeOptions}
              placeholder="انتخاب مدت زمان مطالعه"
              onChange={onChange}
              sendId={true} // تغییر به true
              className="w-full"
              error={errors?.variations?.[index]?.unit}
            />
          )}
        />
        {errors.readTime && (
          <span className="text-red-500 text-sm">
            {errors.readTime.message}
          </span>
        )}
      </label>
    </>
  );
};

export default Step3;
