import { Controller, useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddTradeTypeMutation } from "@/services/tradeType/tradeTypeApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import AddButton from "@/components/shared/button/AddButton";

const priceFieldsOptions = [
  { id: "1", title: "deposit", value: "deposit", label: "ودیعه (رهن)" },
  {
    id: "2",
    title: "monthlyRent",
    value: "monthlyRent",
    label: "اجاره ماهانه"
  },
  {
    id: "3",
    title: "propertyValue",
    value: "propertyValue",
    label: "ارزش ملک"
  },
  {
    id: "4",
    title: "installmentAmount",
    value: "installmentAmount",
    label: "مبلغ قسط"
  },
  { id: "5", title: "totalPrice", value: "totalPrice", label: "قیمت کل" }
];

const AddTradeType = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset, setValue, control } = useForm();
  const [
    addTradeType,
    { isLoading: isAdding, data: addData, error: addError }
  ] = useAddTradeTypeMutation();
  const handleAddTrade = (data) => {
    const requestData = {
      title: data.title,
      description: data.description,
      priceFields: data.priceFields
    };
    addTradeType(requestData);
  };

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال پردازش...", { id: "trade" });
    }
    if (addData?.success) {
      toast.success(addData?.message, { id: "trade" });
      reset();
      setIsOpen(false);
    }

    if (addData && !addData?.success) {
      toast.error(addData?.message, { id: "trade" });
    }
    if (addError?.data) {
      toast.error(addError?.message, { id: "trade" });
    }
  }, [addData, addError, isAdding, reset]);
  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleAddTrade)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="عنوان نوع معامله ملک را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  name="description"
                  id="description"
                  maxLength={200}
                  placeholder="توضیحات نوع معامله ملک را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>
              <div className="flex flex-col flex-1">
                <label htmlFor="priceFields" className="flex flex-col gap-y-2">
                  نوع قیمت‌گذاری{" "}
                  <Controller
                    control={control}
                    name="priceFields"
                    render={({ field: { onChange, value } }) => (
                      <MultiSelectDropdown
                        items={priceFieldsOptions}
                        selectedItems={value || []}
                        handleSelect={onChange}
                        placeholder="می‌توانید چند مورد را انتخاب کنید"
                        className="w-full h-12"
                        returnType="title"
                      />
                    )}
                  />
                </label>
              </div>
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

export default AddTradeType;
