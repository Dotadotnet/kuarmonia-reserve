// Step4.js

import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";
import StatusSwitch from "@/components/shared/button/StatusSwitch";

const Step4 = ({register , errors, control, setSocialLinksData, socialLinksData }) => {
  const timeOptions = Array.from({ length: 60 }, (_, index) => {
    const minutes = index + 1;
    const label = minutes === 60 ? "1 ساعت" : `${minutes} دقیقه`;
    return {
      id: minutes,
      value: label,
      description: `زمان تخمینی خواندن: ${label}`
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
            render={({ field: { onChange } }) => (
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
      </div>

      <SocialLinksInput
        socialLinksData={socialLinksData}
        setSocialLinksData={setSocialLinksData}
      />
    </>
  );
};

export default Step4;
