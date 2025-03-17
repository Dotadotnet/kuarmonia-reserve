// Step4.js
import React from "react";
import { useFieldArray } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import SocialInformationField from "./SocialInformationField";
import { toast } from "react-hot-toast";

const Step8 = ({ register, errors, control, getValues }) => {
  const {
    fields: informationFields,
    append: informationAppend,
    remove: informationRemove
  } = useFieldArray({
    control,
    name: "socialLinks"
  });

  const maxInformationCount = 3; // حداکثر تعداد لینک‌ها

  return (
    <>
      {/* افزودن لینک شبکه‌های اجتماعی */}
      <label htmlFor="socialLinks" className="flex w-full flex-col gap-y-2">
        افزودن لینک شبکه های اجتماعی*
        <div className="flex flex-col gap-y-4">
          {informationFields.map((field, index) => (
            <SocialInformationField
              key={field.id}
              control={control}
              register={register}
              index={index}
              remove={informationRemove}
              errors={errors}
              getValues={getValues}
            />
          ))}

          {/* دکمه افزودن */}
          <button
            type="button"
            className="bg-green-100 dark:bg-blue-100 border border-green-900 dark:border-blue-900 text-green-900 dark:text-blue-900 py-1 rounded-secondary flex flex-row gap-x-1 items-center px-2 w-fit text-xs"
            onClick={() => {
              if (informationFields.length < maxInformationCount) {
                informationAppend({ name: "FaInstagram" });
              } else {
                toast.error(
                  `شما نمی‌توانید بیش از ${maxInformationCount} مورد اضافه کنید.`
                );
              }
            }}
          >
            <FiPlus className="w-4 h-4" /> افزودن
          </button>
        </div>
      </label>
    </>
  );
};

export default Step8;
