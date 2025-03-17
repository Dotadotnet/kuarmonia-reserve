import Dropdown from "@/components/shared/dropdownmenu/Dropdown";
import React from "react";
import { Controller } from "react-hook-form";
import { useGetSaleTypesQuery } from "@/services/saleType/saleTypeApi";
import { useGetAllTradeTypesQuery } from "@/services/tradeType/tradeTypeApi";
const Step1 = ({ register, errors, control }) => {
  const {
    data: tradeTypesData,
    isLoading: isLoadingTradeTypes,
    error: errorTradeTypes
  } = useGetAllTradeTypesQuery();
  const {
    data: saleTypesData,
    isLoading: isLoadingSaleTypes,
    error: errorSaleTypes
  } = useGetSaleTypesQuery();

  const tradeTypes = tradeTypesData?.data || [];
  const saleTypes = saleTypesData?.data || [];
  const currencies = [
    { _id: 1, title: "TRY", value: "TRY", description: "لیر ترکیه" },
    { _id: 2, title: "USD", value: "USD", description: "دلار آمریکا" },
    { _id: 3, title: "EUR", value: "EUR", description: "یورو اتحادیه اروپا" },
    { _id: 4, title: "IRR", value: "IRR", description: "ریال ایران" }
  ];
  

  return (
    <>
      <label htmlFor="tradeType" className="flex flex-col gap-y-1 w-full">
        نوع معامله و بهره‌برداری
        <Controller
          control={control}
          name="tradeType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={tradeTypes}
              placeholder="نوع معامله و بهره‌برداری"
              value={value?._id}
              prop={"priceFields"}
              onChange={(selectedOption) => {
                onChange(selectedOption);
              }}
              className="w-full"
              height="py-3"
              error={errors.tradeType}
            />
          )}
        />
        {errors.tradeType && (
          <span className="text-red-500 text-sm">
            {errors.tradeType.message}
          </span>
        )}
      </label>
      {/* Dynamic price field based on tradeType */}
      <Controller
        control={control}
        name="tradeType"
        render={({ field: { onChange, value } }) => {
          const selectedTrade = tradeTypes.find((t) => t._id === value?._id);

          if (!selectedTrade) return null;

          return (
            <>
              {/* بررسی و نمایش فیلدهای مختلف بر اساس priceFields */}
              {selectedTrade.priceFields.includes("deposit") && (
                <label
                  htmlFor="deposit"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">مبلغ ودیعه (رهن)</span>
                  <input
                    type="number"
                    name="deposit"
                    id="deposit"
                    {...register("deposit", {
                      required: "مبلغ ودیعه الزامی است"
                    })}
                    placeholder="مبلغ ودیعه (رهن)"
                    className="p-2 rounded border w-full"
                  />
                  {errors.deposit && (
                    <span className="text-red-500 text-sm">
                      {errors.deposit.message}
                    </span>
                  )}
                </label>
              )}

              {selectedTrade.priceFields.includes("monthlyRent") && (
                <label
                  htmlFor="monthlyRent"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">مبلغ اجاره ماهانه</span>
                  <input
                    type="number"
                    name="monthlyRent"
                    id="monthlyRent"
                    {...register("monthlyRent", {
                      required: "مبلغ اجاره ماهانه الزامی است"
                    })}
                    placeholder="مبلغ اجاره ماهانه"
                    className="p-2 rounded border w-full"
                  />
                  {errors.monthlyRent && (
                    <span className="text-red-500 text-sm">
                      {errors.monthlyRent.message}
                    </span>
                  )}
                </label>
              )}

              {selectedTrade.priceFields.includes("totalPrice") && (
                <label
                  htmlFor="totalPrice"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">ارزش کل</span>
                  <input
                    type="number"
                    name="totalPrice"
                    id="totalPrice"
                    {...register("totalPrice", {
                      required: "ارزش کل الزامی است"
                    })}
                    placeholder="ارزش کل"
                    className="p-2 rounded border w-full"
                  />
                  {errors.totalPrice && (
                    <span className="text-red-500 text-sm">
                      {errors.totalPrice.message}
                    </span>
                  )}
                </label>
              )}

              {selectedTrade.priceFields.includes("installmentAmount") && (
                <label
                  htmlFor="installmentAmount"
                  className="flex flex-col gap-y-1 w-full"
                >
                  <span className="text-sm">مبلغ قسط</span>
                  <input
                    type="number"
                    name="installmentAmount"
                    id="installmentAmount"
                    {...register("installmentAmount", {
                      required: "مبلغ قسط الزامی است"
                    })}
                    placeholder="مبلغ هر قسط"
                    className="p-2 rounded border w-full"
                  />
                  {errors.installmentAmount && (
                    <span className="text-red-500 text-sm">
                      {errors.installmentAmount.message}
                    </span>
                  )}
                </label>
              )}
            </>
          );
        }}
      />

      <Controller
        control={control}
        name="currency"
        render={({ field: { onChange, value } }) => (
          <Dropdown
            options={currencies}
            placeholder="انتخاب ارز"
            value={value?._id}
            onChange={(selectedOption) => {
              onChange(selectedOption);
            }}
            className="w-full mt-2"
            height="py-3"
            error={errors.currency}
          />
        )}
      />
      {errors.currency && (
        <span className="text-red-500 text-sm">{errors.currency.message}</span>
      )}

      <label htmlFor="saleType" className="flex flex-col gap-y-2 w-full">
        نوع فروش
        <Controller
          control={control}
          name="saleType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={saleTypes}
              placeholder="نوع فروش ملک"
              value={value?._id}
              onChange={(selectedOption) => {
                onChange(selectedOption);
              }}
              className="w-full"
              height="py-3"
              error={errors.saleType}
            />
          )}
        />
        {errors.saleType && (
          <span className="text-red-500 text-sm">
            {errors.saleType.message}
          </span>
        )}
      </label>
    </>
  );
};

export default Step1;
