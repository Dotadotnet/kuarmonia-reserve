import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step1 = ({ nextStep, errors, register ,watch }) => {
  const icon = watch("icon");

  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
      <label htmlFor="title" className="flex flex-col gap-y-1">
        <span className="text-sm">* عنوان خدمت</span>
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
          <span className="text-red-500 text-sm">{errors?.title.message}</span>
        )}
      </label>
      <label htmlFor="summary" className="flex flex-col gap-y-2 w-full">
        خلاصه
        <textarea
          name="summary"
          id="summary"
          maxLength={160}
          rows={2}
          placeholder="خلاصه مجله را وارد کنید..."
          className="p-2 rounded 
       border w-full form-textarea"
          {...register("summary", {
            // اصلاح نام فیلد
            required: "خلاصه الزامی است",
            minLength: {
              value: 30,
              message: "خلاصه باید حداقل ۳۰ کاراکتر باشد"
            },
            maxLength: {
              value: 225,
              message: "خلاصه نباید بیشتر از ۲۲۵ کاراکتر باشد"
            }
          })}
        />
        {errors?.summary && (
          <span className="text-red-500 text-sm">
            {errors?.summary.message}
          </span>
        )}
      </label>
      <label htmlFor="icon" className="flex flex-col gap-y-2">
        کد SVG آیکون
        <textarea
          id="icon"
          placeholder="<svg>...</svg>"
          className="rounded h-32 font-mono text-xs"
          {...register("icon")}
        />
      </label>

      {/* نمایش پیش‌نمایش SVG */}
      {icon && (
        <div className="border rounded p-4 mt-2 flex justify-center items-center">
          <div dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
      )}
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step1;
