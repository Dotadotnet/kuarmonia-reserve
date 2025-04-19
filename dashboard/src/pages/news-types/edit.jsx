// UpdateNewsType.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import {
  useUpdateNewsTypeMutation,
  useGetNewsTypeQuery
} from "@/services/newsType/newsTypeApi";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import Edit from "@/components/icons/Edit";

const UpdateNewsType = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error } = useGetNewsTypeQuery(id, { skip: !isOpen });
  const newsType = useMemo(() => data?.data || {}, [data]);

  const { register, handleSubmit, reset, watch } = useForm();
  const [
    updateNewsType,
    { isLoading: isUpdateing, data: updateData, error: updateError }
  ] = useUpdateNewsTypeMutation();

  useEffect(() => {
    if (data?.data) {
      const { title, description, icon } = data.data;
      reset({ title, description, icon });
    }

    if (isLoading) {
      toast.loading("در حال دریافت  ...", { id: "newsType-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "newsType-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "newsType-loading" });
    }

    if (isUpdateing) {
      toast.loading("در حال پردازش...", { id: "newsType" });
    }
    console.log(updateData)
    if (updateData &&updateData.acknowledgement) {
      toast.success(updateData?.description, { id: "newsType" });
      reset();
      setIsOpen(false);
    }

    if (updateData && !updateData?.acknowledgement) {
      toast.error(updateData?.description, { id: "newsType" });
    }
    if (updateError?.data) {
      toast.error(updateError?.data?.description, { id: "newsType" });
    }
  }, [isLoading, error, isUpdateing, updateError,updateData,data, reset]);

  const onSubmit = async (data) => {
    const requestData = {
      id: newsType._id,
      title: data.title,
      description: data.description,
      icon:data.icon
    };

    updateNewsType(requestData);
  };
  const icon = watch("icon") || newsType.icon;
  return (
    <>
      <span
        className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
        onClick={() => setIsOpen(true)}
      >
        <Edit className="w-5 h-5" />
      </span>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 h-fit"
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
                  defaultValue={newsType?.title}
                  maxLength={50}
                  placeholder="عنوان نوع خبر را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  id="description"
                  maxLength={200}
                  defaultValue={newsType?.description}
                  placeholder="توضیحات نوع خبر را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>

              {/* فیلد کد SVG */}
              <label htmlFor="icon" className="flex flex-col gap-y-2">
                کد SVG آیکون
                <textarea
                  id="icon"
                  defaultValue={newsType?.icon}
                  placeholder="<svg>...</svg>"
                  className="rounded h-32 font-mono text-xs"
                  {...register("icon")}
                />
              </label>

              {/* نمایش پیش‌نمایش SVG */}
              {icon && (
                <div className="border rounded  p-4 mt-2 flex justify-center items-center">
                  <div dangerouslySetInnerHTML={{ __html: icon }} />
                </div>
              )}

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

export default UpdateNewsType;
