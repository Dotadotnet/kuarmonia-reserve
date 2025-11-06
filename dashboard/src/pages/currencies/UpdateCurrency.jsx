import Button from "@/components/shared/button/Button";
import { useGetCurrencyQuery, useUpdateCurrencyMutation } from "@/services/currency/currencyApi";
import { useGetCountriesQuery } from "@/services/country/countryApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useEffect, useMemo, useState } from "react";
import Edit from "@/components/icons/Edit";
import { useDispatch } from "react-redux";
import { setCurrency } from "@/features/currency/currencySlice";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useForm, Controller } from "react-hook-form";

const UpdateCurrency = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetCurrencyQuery(id);
  const [
    updateCurrency,
    { isLoading: isUpdateing, data: updateData, error: updateError },
  ] = useUpdateCurrencyMutation();
  
  const {
    isLoading: fetchingCountries,
    data: fetchCountriesData,
    error: fetchCountriesError
  } = useGetCountriesQuery();
  
  const countries = useMemo(
    () =>
      fetchCountriesData?.data?.map((country) => ({
        id: country._id,
        value: country.name,
        icon: country.icon,
        description: country.code
      })),
    [fetchCountriesData]
  );

  useEffect(() => {
    if (isUpdateing) {
      toast.loading("در حال به‌روزرسانی ...", {
        id: "fetchCurrency",
      });
    }
    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchCurrency" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchCurrency" });
    }

    if (updateData) {
      toast.success(updateData?.message, { id: "updateCurrency" });
      setIsOpen(false);
    }

    if (updateError?.data) {
      toast.error(updateError?.data?.message, { id: "updateCurrency" });
    }
  }, [fetching, fetchData, fetchError, isUpdateing, updateData, updateError]);

  useEffect(() => {
    if (fetchData?.data) {
      reset({
        title: fetchData.data.title,
        code: fetchData.data.code,
        symbol: fetchData.data.symbol,
        exchangeRate: fetchData.data.exchangeRate,
        country: fetchData.data.country?._id,
        status: fetchData.data.status === "active"
      });
    }
  }, [fetchData, reset]);

  const handleUpdateCurrency = (data) => {
    const formData = {
      title: data.title,
      code: data.code,
      symbol: data.symbol,
      exchangeRate: data.exchangeRate,
      country: data.country,
      status: data.status ? "active" : "inactive"
    };

    updateCurrency({ id, body: formData });
  };

  return (
    <>
      <span
        type="button"
        disabled={fetching ? true : undefined}
        className="edit-button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Edit className="w-5 h-5" />
      </span>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          action=""
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-md overflow-y-hidden"
        >
          <form
            action=""
            className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto text-right"
            onSubmit={handleSubmit(handleUpdateCurrency)}
          >
            <div className="flex gap-4 flex-col">
              <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
                {/* title */}
                <label htmlFor="title" className="w-full flex flex-col gap-y-1">
                  <span className="text-sm">نام ارز*</span>
                  <input
                    type="text"
                    id="title"
                    maxLength="50"
                    {...register("title", {
                      required: "نام ارز الزامی است!",
                      minLength: {
                        value: 3,
                        message: "نام ارز باید حداقل ۳ کاراکتر باشد!",
                      },
                      maxLength: {
                        value: 50,
                        message: "نام ارز نمی‌تواند بیش از ۵۰ کاراکتر باشد!",
                      }
                    })}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-xs">
                      {errors.title.message}
                    </span>
                  )}
                </label>
                
                {/* code */}
                <label htmlFor="code" className="w-full flex flex-col gap-y-1">
                  <span className="text-sm">کد ارز*</span>
                  <input
                    type="text"
                    id="code"
                    maxLength="10"
                    {...register("code", {
                      required: "کد ارز الزامی است!",
                      minLength: {
                        value: 3,
                        message: "کد ارز باید حداقل ۳ کاراکتر باشد!",
                      },
                      maxLength: {
                        value: 10,
                        message: "کد ارز نمی‌تواند بیش از ۱۰ کاراکتر باشد!",
                      }
                    })}
                  />
                  {errors.code && (
                    <span className="text-red-500 text-xs">
                      {errors.code.message}
                    </span>
                  )}
                </label>
                
                {/* symbol */}
                <label htmlFor="symbol" className="flex flex-col gap-y-2">
                  نماد ارز{" "}
                  <textarea
                    id="symbol"
                    placeholder="<svg>...</svg>"
                    className="rounded h-32 font-mono text-xs"
                    {...register("symbol")}
                  />
                </label>
                
                {/* نمایش پیش‌نمایش SVG */}
                {fetchData?.data?.symbol && (
                  <div className="border rounded p-4 mt-2 flex justify-center items-center ">
                    <div  
                      dangerouslySetInnerHTML={{ __html: fetchData?.data?.symbol }} 
                      style={{ width: "44px", height: "44px" }} 
                    />
                  </div>
                )}
                
                {/* exchangeRate */}
                <label
                  htmlFor="exchangeRate"
                  className="w-full flex flex-col gap-y-1"
                >
                  <span className="text-sm">نرخ تبدیل ارز*</span>
                  <input
                    type="number"
                    id="exchangeRate"
                    step="any"
                    {...register("exchangeRate", {
                      required: "نرخ تبدیل ارز الزامی است!",
                      min: {
                        value: 0,
                        message: "نرخ تبدیل نمی‌تواند منفی باشد"
                      },
                      valueAsNumber: true
                    })}
                  />
                  {errors.exchangeRate && (
                    <span className="text-red-500 text-xs">
                      {errors.exchangeRate.message}
                    </span>
                  )}
                </label>
                
                {/* country */}
                <label
                  htmlFor="country"
                  className="w-full flex flex-col gap-y-1"
                >
                  <span className="text-sm">کشور*</span>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ required: "کشور الزامی است" }}
                    render={({ field }) => (
                      <Dropdown
                        items={countries}
                        placeholder="انتخاب کشور"
                        value={field.value}
                        className="w-full mt-2"
                        height="py-3"
                        error={errors.country}
                      />
                    )}
                  />
                  {errors.country && (
                    <span className="text-red-500 text-xs">
                      {errors.country.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="flex flex-col gap-y-2 w-full ">
                <StatusSwitch
                  label="وضعیت"
                  id="status"
                  register={register}
                />
              </div>
              <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
                ویرایش کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateCurrency;