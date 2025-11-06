import { useEffect, useMemo, useState } from "react";
import Button from "@/components/shared/button/Button";
import { useAddCurrencyMutation } from "@/services/currency/currencyApi";
import { useGetCountriesQuery } from "@/services/country/countryApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useForm, Controller } from "react-hook-form";
import AddButton from "@/components/shared/button/AddButton";
import Dropdown from "@/components/shared/dropDown/Dropdown";

const AddCurrency = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors }
  } = useForm();

  const [addCurrency, { isLoading: isAdding, data: addData, error: addError }] =
    useAddCurrencyMutation();
    
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
    if (isAdding) {
      toast.loading("در حال افزودن ارز...", { id: "addCurrency" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "addCurrency" });
      setIsOpen(false)
      reset()
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "addCurrency" });
    }
  }, [isAdding, addData, addError]);

  function handleAddCurrency(data) {
    const formData = {
      title: data.title,
      code: data.code,
      symbol: data.symbol,
      exchangeRate: data.exchangeRate,
      country: data.country.id,
    };

    addCurrency(formData);
  }
  const symbol = watch("symbol");

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 h-fit"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto"
            onSubmit={handleSubmit(handleAddCurrency)}
          >
            <div className="flex gap-4 flex-col">
              <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
                {/* title */}
                <label htmlFor="title" className="w-full flex flex-col gap-y-1">
                  <span className="text-sm">نام ارز*</span>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    maxLength="50"
                    required
                    {...register("title", {
                      required: "نام ارز الزامی است",
                      minLength: {
                        value: 3,
                        message: "نام ارز باید حداقل ۳ کاراکتر باشد"
                      },
                      maxLength: {
                        value: 50,
                        message: "نام ارز نمی‌تواند بیش از ۵۰ کاراکتر باشد"
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
                    name="code"
                    id="code"
                    maxLength="10"
                    required
                    {...register("code", {
                      required: "کد ارز الزامی است",
                      minLength: {
                        value: 2,
                        message: "کد ارز باید حداقل 2 کاراکتر باشد"
                      },
                      maxLength: {
                        value: 10,
                        message: "کد ارز نمی‌تواند بیش از ۱۰ کاراکتر باشد"
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
                {/* فیلد کد SVG */}
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
                {symbol && (
                  <div className="border rounded p-4 mt-2 flex justify-center items-center ">
                    <div  dangerouslySetInnerHTML={{ __html: symbol }} 
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
                    name="exchangeRate"
                    id="exchangeRate"
                    step="any"
                    required
                    {...register("exchangeRate", {
                      required: "نرخ تبدیل ارز الزامی است",
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
              <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
                ایجاد کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddCurrency;