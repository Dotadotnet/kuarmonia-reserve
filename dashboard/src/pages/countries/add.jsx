import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddCountryMutation } from "@/services/Country/CountryApi";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";

const AddCountry = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [
    addCountry,
    { isLoading: isAdding, data: addData, error: addError }
  ] = useAddCountryMutation();

  const handleAddCountry = (data) => {
    const requestData = {
      name: data.name,
      code: data.code,
      icon: data.svgIcon
    };
    addCountry(requestData);
  };

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال پردازش...", { id: "type" });
    }
    if (addData) {
      toast.success(addData?.description, { id: "type" });
      reset();
      setIsOpen(false);
    }
    if (addError?.data) {
      toast.error(addError?.data.description, { id: "type" });
    }
  }, [addData, addError, isAdding, reset]);

  const svgIcon = watch("svgIcon");

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
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleAddCountry)}
          >
            <div className="flex gap-4 flex-col">
              {/* فیلد  */}
              <label htmlFor="name" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  id="name"
                  maxLength={50}
                  placeholder=" نام کشور خبر را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("name", { required: " الزامی است" })}
                />
              </label>

              {/* فیلد  */}
              <label htmlFor="code" className="flex flex-col gap-y-2">
                کد کشور خبر
                <input
                  type="text"
                  id="code"
                  maxLength={50}
                  placeholder=" کد کشور خبر را تایپ کنید... برای مثال CA یا IR"
                  className="rounded"
                  autoFocus
                  {...register("code", { required: " الزامی است" })}
                />
              </label>

              {/* فیلد کد SVG */}
              <label htmlFor="svgIcon" className="flex flex-col gap-y-2">
                کد SVG آیکون
                <textarea
                  id="svgIcon"
                  placeholder="<svg>...</svg>"
                  className="rounded h-32 font-mono text-xs"
                  {...register("svgIcon")}
                />
              </label>

              {/* نمایش پیش‌نمایش SVG */}
              {svgIcon && (
                <div className="border rounded p-4 mt-2 flex justify-center items-center">
                  <div
                    dangerouslySetInnerHTML={{ __html: svgIcon }}
                    style={{ width: "56px", height: "56px" }}
                  />
                </div>
              )}

              {/* دکمه ارسال */}
              <Button type="submit" className="py-2 mt-4">
                ایجاد کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddCountry;
