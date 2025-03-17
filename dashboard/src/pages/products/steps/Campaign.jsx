import { useGetUnitsQuery } from "@/services/unit/unitApi";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import Plus from "@/components/icons/Plus";
import UnitPrice from "./UnitPrice";
import { useFieldArray } from "react-hook-form";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Campaign = ({ register, errors, watch, control, prevStep, nextStep }) => {
  const {
    isLoading: fetchingUnits,
    data: fetchUnitsData,
    error: fetchUnitsError,
  } = useGetUnitsQuery();

  const {
    fields: variations,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variations",
  });

  const units = useMemo(() => fetchUnitsData?.data || [], [fetchUnitsData]);
  useEffect(() => {
    if (fetchingUnits) {
      toast.loading("در حال دریافت واحد ...", { id: "fetchUnits" });
    }

    if (fetchUnitsData) {
      toast.success(fetchUnitsData?.description, {
        id: "fetchUnits",
      });
    }

    if (fetchUnitsError) {
      toast.error(fetchUnitsError?.data?.description, {
        id: "fetchUnits",
      });
    }
  }, [fetchingUnits, fetchUnitsData, fetchUnitsError]);
  const campaignState = watch("campaignState");
  return (
    <>
      <div className="w-full flex flex-col gap-y-4   ">
        {/* campaign */}
        <label
          htmlFor="campaign"
          className="w-full flex p-4 rounded flex-col border gap-y-1"
        >
          <span className="text-sm">کمپین فروش*</span>
          <p className="flex flex-row gap-x-4">
            <input
              type="text"
              name="campaignTitle"
              id="campaignTitle"
              {...register("campaignTitle", {
                required: "وارد کردن عنوان کمپین الزامی است",
                minLength: {
                  value: 3,
                  message: "عنوان کمپین  باید حداقل ۳ حرف داشته باشد",
                },
                maxLength: {
                  value: 30,
                  message: "عنوان کمپین  نباید بیشتر از ۳۰ حرف باشد",
                },
              })}
              className="w-full"
              placeholder="عنوان کمپین فروش را وارد کنید"
              required
            />

            <select
              name="campaignState"
              id="campaignState"
              {...register("campaignState", {
                required: "وارد کردن وضعیت کمپین الزامی است",
                minLength: {
                  value: 3,
                  message: "وضعیت کمپین باید حداقل ۳ حرف داشته باشد",
                },
                maxLength: {
                  value: 30,
                  message: "وضعیت کمپین نباید بیشتر از ۳۰ حرف باشد",
                },
              })}
              className="w-fit"
              defaultValue="choose-state"
              required
            >
              <option value="choose-state" disabled>
                انتخاب وضعیت کمپین
              </option>
              <option value="new-arrival">جدید</option>
              <option value="discount">تخفیف‌دار</option>
              <option value="sold-out">تمام‌شده</option>
              <option value="on-sale">در حال فروش</option>
            </select>
          </p>
          {campaignState === "discount" && (
            <input
              type="number"
              name="discountAmount"
              id="discountAmount"
              {...register("discountAmount", {
                required: "وارد کردن درصد تخفیف الزامی است",
                min: { value: 1, message: "درصد تخفیف باید حداقل ۱ باشد" },
                max: {
                  value: 99,
                  message: "درصد تخفیف نباید بیشتر از ۹۹ باشد",
                },
              })}
              className="w-full border p-2 rounded mt-2"
              placeholder="درصد تخفیف را وارد کنید"
            />
          )}
        </label>
        <label
          htmlFor="variations"
          className="flex w-full flex-col gap-y-2 p-2 max-h-[300px] overflow-y-auto"
        >
          <span className="text-sm">درج قیمت بر اساس واحد*</span>

          <div className="flex flex-col gap-y-4  ">
            {variations.map((field, index) => (
              <UnitPrice
                key={field.id}
                control={control}
                index={index}
                remove={remove}
                errors={errors}
                units={units}
              />
            ))}

            {/* دکمه افزودن واحد جدید */}
            <button
              type="button"
              className="bg-green-100 dark:bg-blue-100 border border-green-900 dark:border-blue-900 text-green-900 dark:text-blue-900 py-1 rounded flex flex-row gap-x-1 items-center px-2 w-fit text-xs"
              onClick={() => {
                append({ unit: "", price: "" ,stock:0,lowStockThreshold:10 });
              }}
            >
              <Plus className="w-4 h-4" /> افزودن واحد و قیمت
            </button>
          </div>
        </label>
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Campaign;
