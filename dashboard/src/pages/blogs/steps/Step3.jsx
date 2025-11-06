// Step3.js
import { useEffect } from "react";
import Plus from "@/components/icons/Plus";
import NavigationButton from "@/components/shared/button/NavigationButton";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import FormTagsSelect from "@/components/shared/input/FormTagsSelect";
import FormCategorySelect from "@/components/shared/input/FormCategorySelect";

const Step3 = ({
  errors,
  selectedTags,
  setSelectedTags,
  nextStep,
  prevStep,
  register,
  control
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 gap-y-4 w-full">
        {/* بخش تگ‌ها */}
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <FormTagsSelect
              label="تگ‌ها"
              id="tags"
              control={control}
              error={errors?.tags}
              required={true}
            />
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن تگ جدید"
              >
                <Plus />
              </button>
            </div>
          </div>
        </div>

        {/* بخش دسته‌بندی */}
        <div className="flex flex-col gap-y-2 w-full">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <FormCategorySelect
              label="دسته‌بندی"
              id="category"
              control={control}
              error={errors?.category}
            />
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن دسته‌بندی جدید"
              >
                <Plus />
              </button>
            </div>
          </div>
        </div>
        <StatusSwitch
          label="آیا این پست ویژه است"
          id="isFeatured"
          register={register}
        />
      </div>
      <div className="flex justify-between mt-12 right-0 absolute bottom-2 w-full px-8">
        {" "}
        <NavigationButton direction="next" onClick={nextStep} />{" "}
        <NavigationButton direction="prev" onClick={prevStep} />{" "}
      </div>
    </>
  );
};

export default Step3;
