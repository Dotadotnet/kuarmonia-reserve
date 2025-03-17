// Step4.js
import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import  Plus  from "@/components/icons/Plus";
import SocialLink  from "./SocialLink"; 
const Step4 = ({ register, errors, control,getValues }) => {
  const {
    fields: informationFields,
    append: informationAppend,
    remove: informationRemove,
  } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const timeOptions = Array.from({ length: 60 }, (_, index) => {
    const minutes = index + 1;
    const label = minutes === 60 ? "1 ساعت" : `${minutes} دقیقه`;
    return {
      id: minutes,
      value: label,
      description: `زمان تخمینی خواندن: ${label}`,
    };
  });

  const maxInformationCount = 3; // حداکثر تعداد لینک‌ها

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-4 w-full">
        {/* دسترسی */}
        <label htmlFor="visibility" className="flex flex-col gap-y-2 w-full">
          دسترسی
           <Controller
            control={control}
            name="visibility"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={[
                  {
                    id: 1,
                    value: "public",
                    label: "عمومی",
                    description: "عمومی",
                  },
                  {
                    id: 2,
                    value: "private",
                    label: "خصوصی",
                    description: "خصوصی",
                  },
                ]}
                placeholder="به صورت پیش فرض عمومی است"
                value={value}
                onChange={onChange}
                className="w-full"
                height="py-3"
                error={errors.visibility}
              />
            )}
          />
          {errors.visibility && (
            <span className="text-red-500 text-sm">
              {errors.visibility.message}
            </span>
          )}
        </label>

        {/* تخمین مدت زمان مطالعه */}
        <label htmlFor="readTime" className="flex flex-col gap-y-2 w-full">
          تخمین مدت زمان مطالعه
         <Controller
            control={control}
            name="readTime"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={timeOptions}
                placeholder="انتخاب مدت زمان مطالعه"
                value={value}
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
      </div>

      <label
          htmlFor="variations"
          className="flex w-full flex-col gap-y-2 p-2 max-h-[200px] overflow-y-auto"
        >
          <span className="text-sm">
           درج شبکه اجتماعی

          </span>

          <div className="flex flex-col gap-y-4  ">
            {informationFields.map((field, index) => (
              <SocialLink
                key={field.id}
                control={control}
                index={index}
                remove={informationRemove}
                errors={errors}
              />
            ))}

            {/* دکمه افزودن واحد جدید */}
            <button
              type="button"
              className="bg-green-100 dark:bg-blue-100 border border-green-900 dark:border-blue-900 text-green-900 dark:text-blue-900 py-1 rounded flex flex-row gap-x-1 items-center px-2 w-fit text-xs"
              onClick={() => {
                informationAppend({ name: "", url: ""  });
              }}
            >
              <Plus className="w-4 h-4" /> افزودن 
            </button>
          </div>
        </label>
    </>
  );
};

export default Step4;
