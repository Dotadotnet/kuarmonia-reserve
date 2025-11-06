// UpdateCategory.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import {
  useUpdateCategoryMutation,
  useGetCategoryQuery
} from "@/services/category/categoryApi";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import Edit from "@/components/icons/Edit";

const UpdateCategory = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error } = useGetCategoryQuery(id, { skip: !isOpen });
  const category = useMemo(() => data?.data || {}, [data]);

  const { register, handleSubmit, reset } = useForm();
  const [
    updateCategory,
    { isLoading: isUpdateing, data: updateData, error: updateError }
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ...", { id: "category-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "category-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "category-loading" });
    }

    if (isUpdateing) {
      toast.loading("در حال پردازش...", { id: "category" });
    }
    if (updateData) {
      toast.success(updateData?.description, { id: "category" });
      reset();
      setIsOpen(false);
    }
    if (updateData && !updateData) {
      toast.error(updateData?.description, { id: "category" });
    }
    if (updateError?.data) {
      toast.error(updateError?.data?.description, { id: "category" });
    }
  }, [isLoading, error, isUpdateing, updateError,updateData,data]);

  const onSubmit = async (data) => {
    const requestData = {
      id: category._id,
      title: data.title,
      description: data.description
    };
console.log(requestData);
    updateCategory(requestData);
  };
  return (
    <>
      <span
        className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
        onClick={() => setIsOpen(true)}
      >
        <Edit />
      </span>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={category?.title}
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
                  defaultValue={category?.description}
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

export default UpdateCategory;
