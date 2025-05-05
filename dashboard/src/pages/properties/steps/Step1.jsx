import React, { useEffect, useMemo } from "react";
import { Controller } from "react-hook-form";
import { useGetSaleTypesQuery } from "@/services/saleType/saleTypeApi";
import { useGetTradeTypesQuery } from "@/services/tradeType/tradeTypeApi";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import toast from "react-hot-toast";
import { useGetCurrenciesQuery } from "@/services/currency/currencyApi";

const Step1 = ({ register, errors, control }) => {
  const {
    data: tradeTypesData,
    isLoading: isLoadingTradeTypes,
    error: errorTradeTypes
  } = useGetTradeTypesQuery();

  const {
    data: saleTypesData,
    isLoading: isLoadingSaleTypes,
    error: errorSaleTypes
  } = useGetSaleTypesQuery();
  const {
    isLoading: fetchingCurrencies,
    data: fetchCurrenciesData,
    error: fetchCurrenciesError
  } = useGetCurrenciesQuery();
  useEffect(() => {
    if (isLoadingTradeTypes)
      toast.loading("در حال دریافت نوع معامله ...", { id: "tradeTypes" });
    if (tradeTypesData)
      toast.success(tradeTypesData?.about, { id: "tradeTypes" });
    if (errorTradeTypes)
      toast.error(errorTradeTypes?.data?.about || "خطا در دریافت نوع معامله", {
        id: "tradeTypes"
      });

    if (isLoadingSaleTypes)
      toast.loading("در حال دریافت نوع فروش ...", { id: "saleTypes" });
    if (saleTypesData) toast.success(saleTypesData?.about, { id: "saleTypes" });
    if (errorSaleTypes)
      toast.error(errorSaleTypes?.data?.about || "خطا در دریافت نوع فروش", {
        id: "saleTypes"
      });
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
  }, [
    isLoadingTradeTypes,
    tradeTypesData,
    errorTradeTypes,
    isLoadingSaleTypes,
    saleTypesData,
    errorSaleTypes,
    fetchingCurrencies,
    fetchCurrenciesData,
    fetchCurrenciesError
  ]);

  const tradeTypes = useMemo(
    () =>
      tradeTypesData?.data?.map((item) => ({
        id: item._id,
        title: item.translations[0].translation?.fields.title,
        value: item.title,
        priceFields: item.priceFields
      })) || [],
    [tradeTypesData]
  );
  console.log("tradeTypes", tradeTypes);
  const saleTypes = useMemo(
    () =>
      saleTypesData?.data?.map((item) => ({
        ...item,
        id: item._id,
        title:item.title,
        value: item.title
      })) || [],
    [saleTypesData]
  );
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

  return (
    <>
      <label htmlFor="tradeType" className="flex flex-col gap-y-1 w-full">
        نوع معامله و بهره‌برداری
        <Controller
          control={control}
          name="tradeType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              items={tradeTypes}
              placeholder="نوع معامله و بهره‌برداری"
              value={value?._id}
              prop="priceFields"
              onChange={onChange}
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

      {/* فیلدهای داینامیک قیمت */}
      <Controller
        control={control}
        name="tradeType"
        render={({ field: { value } }) => {
          const selectedTrade = tradeTypes.find((t) => t._id === value?._id);
          if (!selectedTrade) return null;

          return (
            <>
              {selectedTrade.priceFields.includes("deposit") && (
                <InputField
                  name="deposit"
                  label="مبلغ ودیعه (رهن)"
                  register={register}
                  error={errors.deposit}
                />
              )}
              {selectedTrade.priceFields.includes("monthlyRent") && (
                <InputField
                  name="monthlyRent"
                  label="مبلغ اجاره ماهانه"
                  register={register}
                  error={errors.monthlyRent}
                />
              )}
              {selectedTrade.priceFields.includes("totalPrice") && (
                <InputField
                  name="totalPrice"
                  label="ارزش کل"
                  register={register}
                  error={errors.totalPrice}
                />
              )}
              {selectedTrade.priceFields.includes("installmentAmount") && (
                <InputField
                  name="installmentAmount"
                  label="مبلغ قسط"
                  register={register}
                  error={errors.installmentAmount}
                />
              )}
            </>
          );
        }}
      />
      <label htmlFor="saleType" className="flex flex-col gap-y-2 w-full">
        نوع ارز
        <Controller
          control={control}
          name="currency"
          render={({ field: { onChange, value } }) => (
            <Dropdown
            items={currencies}
            placeholder="انتخاب ارز"
              value={value?.value}
              onChange={onChange}
              className="w-full mt-2"
              height="py-3"
              error={errors.currency}
            />
          )}
        />
        {errors.currency && (
          <span className="text-red-500 text-sm">
            {errors.currency.message}
          </span>
        )}
      </label>
      <label htmlFor="saleType" className="flex flex-col gap-y-2 w-full">
        نوع فروش
        <Controller
          control={control}
          name="saleType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              items={saleTypes}
              placeholder="نوع فروش ملک"
              onChange={onChange}
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

// کامپوننت کوچک شده برای فیلد ورودی عددی
const InputField = ({ name, label, register, error }) => (
  <label htmlFor={name} className="flex flex-col gap-y-1 w-full">
    <span className="text-sm">{label}</span>
    <input
      type="number"
      id={name}
      {...register(name, { required: `${label} الزامی است` })}
      placeholder={label}
      className="p-2 rounded border w-full"
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
  </label>
);

export default Step1;
