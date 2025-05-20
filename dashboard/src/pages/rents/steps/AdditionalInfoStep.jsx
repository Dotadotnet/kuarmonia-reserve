// components/signup/steps/PasswordStep.jsx

import { useMemo } from "react";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import NavigationButton from "@/components/shared/button/NavigationButton";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import ArrayInput from "@/components/shared/tools/ArrayInput";

const AdditionalInfoStep = ({
  register,
  errors,
  control,
  prevStep,
  nextStep
}) => {
  const { data, isLoading, error, refetch } = useGetCategoriesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });

  const categories = useMemo(
    () =>
      data?.data?.map((type) => ({
        id: type._id,
        value: type.translations[0].translation?.fields.title,
        label: type.title,
        icon: type.icon
      })) || [],
    [data]
  );

  return (
    <>
      <div className="flex flex-col  gap-y-4 h-3/4 max-h-3/4  overflow-y-auto p-2">
        <label htmlFor="category" className="flex flex-col gap-y-2 ">
          دسته بندی{" "}
          <Controller
            control={control}
            name="category"
            rules={{ required: "انتخاب دسته بندی الزامی است" }}
            render={({ field: { onChange } }) => (
              <Dropdown
                items={categories}
                handleSelect={onChange}
                placeholder="یک مورد انتخاب کنید"
                className={"w-full h-12"}
                returnType="id"
              />
            )}
          />
        </label>
        <label htmlFor="members" className="flex flex-col gap-y-1">
          <span className="text-sm">* تعداد تخت </span>
          <input
            type="number"
            name="members"
            id="members"
            {...register("members", {
              required: "وارد کردن تعداد تخت الزامی است",
              min: {
                value: 1,
                message: "تعداد تخت باید حداقل 1 رقمی باشد"
              },
              max: {
                value: new Date().getFullYear(),
                message: "تعداد تخت نباید بیشتر از سال جاری باشد"
              }
            })}
            placeholder="تعداد تخت "
            className="p-2 rounded border "
          />
          {errors.members && (
            <span className="text-red-500 text-sm">
              {errors.members.message}
            </span>
          )}
        </label>
        <div className="flex md:flex-row flex-col gap-4 w-full">
          {/* start date */}
          <label htmlFor="startDate" className="flex flex-col gap-y-2 w-full">
            *زمان آغاز اجاره
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="rounded"
              {...register("duration.startDate", { required: true })}
            />
          </label>

          {/* end date */}
          <label htmlFor="endDate" className="flex flex-col gap-y-2 w-full">
            *زمان پایان اجاره
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="rounded"
              {...register("duration.endDate", { required: true })}
            />
          </label>
        </div>
      </div>
      <StatusSwitch
        label={"آیا این  هتل  ویژه است؟"}
        id="isFeature"
        register={register}
        defaultChecked={false}
      />
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default AdditionalInfoStep;
