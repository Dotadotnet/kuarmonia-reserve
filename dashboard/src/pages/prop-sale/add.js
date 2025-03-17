// AddSaleType.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddSaleTypeMutation } from "@/services/saleType/saleTypeApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";

const AddSaleType = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [addSaleType, { isLoading: isAdding, data: addData, error: addError }] =
    useAddSaleTypeMutation();

  const handleAddSale = (data) => {
    const requestData = {
      title: data.title,
      description: data.description
    };
    addSaleType(requestData);
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
            onSubmit={handleSubmit(handleAddSale)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="عنوان نوع فروش را تایپ کنید..."
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
                  placeholder="توضیحات نوع فروش را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>

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

export default AddSaleType;
