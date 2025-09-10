import { useEffect, useMemo, useState, useCallback } from "react";
import Button from "@/components/shared/button/Button";
import { useAddCurrencyMutation } from "@/services/currency/currencyApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useForm } from "react-hook-form";
import AddButton from "@/components/shared/button/AddButton";

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
      country: data.country,
      category: data.category
    };
    console.log(formData);

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
                      }
                    })}
                  />
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
                        value: 3,
                        message: "کد ارز باید حداقل ۳ کاراکتر باشد"
                      }
                    })}
                  />
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
                </label>

                {/* country */}
                <label
                  htmlFor="country"
                  className="w-full flex flex-col gap-y-1"
                >
                  <span className="text-sm">کشور*</span>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    maxLength="100"
                    required
                    {...register("country", {
                      required: "کشور الزامی است",
                      minLength: {
                        value: 3,
                        message: "نام کشور باید حداقل ۳ کاراکتر باشد"
                      }
                    })}
                  />
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
