// AddCategory.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddCategoryMutation } from "@/services/category/categoryApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";

const AddCategory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const [addCategory, { isLoading: isAdding, data: addData, error: addError }] =
    useAddCategoryMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال پردازش...", { id: "category" });
    }
    if (addData?.success) {
      toast.success(addData?.message, { id: "category" });
      reset()
      setIsOpen(false)
    }
    if (addData && !addData?.success) {
      toast.error(addData?.message, { id: "category" });
    }

    if (addError?.data) {
      toast.error(addError?.data?.message, { id: "category" });
    }
  }, [addData, , addError, , isAdding, , reset]);
  const onSubmit = async (data) => {
    const requestData = {
      title: data.title,
      description: data.description
    };

    addCategory(requestData);
  };
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
            className="text-sm w-full h-full flex flex-col gap-y-4 p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="عنوان دسته‌بندی را تایپ کنید..."
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
                  placeholder="توضیحات دسته‌بندی را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>

              <Button type="submit" className="py-2 mt-4">
                ایجاد کردن{" "}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddCategory;
