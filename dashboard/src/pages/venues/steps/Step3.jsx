import NavigationButton from "@/components/shared/button/NavigationButton";
import { useGetCurrenciesQuery } from "@/services/currency/currencyApi";
import React, { useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import Dropdown from "@/components/shared/dropDown/Dropdown";

import StatusSwitch from "@/components/shared/button/StatusSwitch";
const Step3 = ({ register, errors, prevStep, nextStep, watch, control }) => {
  const campaignState = watch("campaignState");
  const {
    isLoading: fetchingCurrencies,
    data: fetchCurrenciesData,
    error: fetchCurrenciesError
  } = useGetCurrenciesQuery();
  const currencies = useMemo(
    () =>
      fetchCurrenciesData?.data?.map((currency) => ({
        id: currency._id,
        value: currency.title,
        symbol: currency.symbol,
        label: currency.title,
        code: currency.code,
        description: currency.description
      })),
    [fetchCurrenciesData]
  );
  useEffect(() => {
    if (fetchingCurrencies) {
      toast.loading("در حال دریافت واحد ...", { id: "fetchcurrencies" });
    }

    if (fetchCurrenciesData) {
      toast.success(fetchCurrenciesData?.description, {
        id: "fetchcurrencies"
      });
    }

    if (fetchCurrenciesError) {
      toast.error(fetchCurrenciesError?.data?.description, {
        id: "fetchcurrencies"
      });
    }
  }, [fetchingCurrencies, fetchCurrenciesData, fetchCurrenciesError]);

  return (
    <>
      <div className="flex flex-col flex-1">
        <label htmlFor="currency" className="flex flex-col gap-y-2">
          واحد ارز
          <Controller
            control={control}
            name="currency"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                value={value}
                onChange={onChange}
                items={currencies}
                sendId={true}
                errors={errors.currency}
                className={"w-full h-12"}
              />
            )}
          />
        </label>
      </div>
      {/* قیمت واحد */}
      <div className="col-span-5">
        <span> شروع قیمت از</span>
        <div className="flex flex-row">
          <Controller
            control={control}
            name={`basePrice`}
            rules={{
              required: "وارد کردن قیمت الزامی است",
              min: { value: 1, message: "قیمت باید بزرگتر از ۰ باشد" }
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue)); // مقدار را عددی ذخیره کن
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full "
                placeholder="قیمت را وارد کنید..."
              />
            )}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <Controller
          control={control}
          name="isReception"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <StatusSwitch
              label={"آیا با این مبلغ مراسم و پذیرائی را برگزار می کند؟"}
              id="isReception"
              onChange={(e) => onChange(e.target.checked)}
              defaultChecked={value}
            />
          )}
        />
      </div>
      {/* campaign */}
      <label
        htmlFor="campaign"
        className="w-full flex p-4 rounded flex-col border gap-y-1"
      >
        <span className="text-sm">کمپین فروش*</span>
        <div className="flex justify-center gap-x-2">
          <input
            type="text"
            name="campaignTitle"
            id="campaignTitle"
            {...register("campaignTitle", {
              required: "وارد کردن عنوان کمپین الزامی است",
              minLength: {
                value: 3,
                message: "عنوان کمپین  باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 30,
                message: "عنوان کمپین  نباید بیشتر از ۳۰ حرف باشد"
              }
            })}
            className="w-full"
            placeholder="عنوان کمپین فروش را وارد کنید"
            required
          />

          <select
            name="campaignState"
            id="campaignState"
            {...register("campaignState", {
              required: "وارد کردن نوع مزایده الزامی است",
              minLength: {
                value: 3,
                message: "نوع مزایده باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 30,
                message: "نوع مزایده نباید بیشتر از ۳۰ حرف باشد"
              }
            })}
            className="w-fit"
            defaultValue="choose-state"
            required
          >
            <option value="choose-state" disabled>
              انتخاب نوع مزایده
            </option>
            <option value="auction">مزایده‌ای</option>
            <option value="fixed-price">قیمت ثابت</option>
            <option value="negotiable">قابل مذاکره</option>
            <option value="limited-offer">پیشنهاد محدود</option>
            <option value="exclusive">اختصاصی</option>
          </select>
        </div>
        {campaignState === "limited-offer" && (
          <input
            type="number"
            name="discountAmount"
            id="discountAmount"
            {...register("discountAmount", {
              required: "وارد کردن درصد تخفیف  الزامی است",
              min: {
                value: 100000,
                message: " درصد تخفیف باید حداقل ۱۰۰,۰۰۰ باشد"
              },
              valueAsNumber: true
            })}
            className="w-full border p-2 rounded mt-2"
            placeholder=" درصد تخفیف را وارد کنید"
          />
        )}
      </label>
      <div className="flex gap-4 w-full mt-6">
        <div className="w-1/2">
          <label>
            * حداقل ظرفیت
            <Controller
              name="minCapacity"
              control={control}
              rules={{
                required: "حداقل ظرفیت الزامی است",
                valueAsNumber: true
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="number"
                    placeholder="حداقل ظرفیت"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 text-justify dark:text-white"
                  />
                  {errors.minCapacity && (
                    <span className="text-red-500 text-sm">
                      {errors.minCapacity.message}
                    </span>
                  )}
                </>
              )}
            />
          </label>
        </div>

        <div className="w-1/2">
          <label>
            * حداکثر ظرفیت
            <Controller
              name="maxCapacity"
              control={control}
              rules={{
                required: "حداکثر ظرفیت الزامی است",
                valueAsNumber: true,
                validate: (value) =>
                  value >= (control.getValues("minCapacity") || 0) ||
                  "حداکثر ظرفیت نباید کمتر از حداقل ظرفیت باشد"
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="number"
                    placeholder="حداکثر ظرفیت"
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 text-justify dark:text-white"
                  />
                  {errors.maxCapacity && (
                    <span className="text-red-500 text-sm">
                      {errors.maxCapacity.message}
                    </span>
                  )}
                </>
              )}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step3;
