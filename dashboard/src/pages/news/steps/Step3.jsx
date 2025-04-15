import React from "react";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";

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

  return (
    <>
      <label htmlFor="name" className="flex flex-col gap-y-1 mb-4">
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
              value: /^(https?:\/\/)([\w.-]+)(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,

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
