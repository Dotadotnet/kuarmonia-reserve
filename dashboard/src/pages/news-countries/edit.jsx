// UpdateNewsCountry.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import {
  useUpdateNewsCountryMutation,
  useGetNewsCountryQuery
} from "@/services/newsCountry/newsCountryApi";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import Edit from "@/components/icons/Edit";

const UpdateNewsCountry = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error } = useGetNewsCountryQuery(id, { skip: !isOpen });
  const newsCountry = useMemo(() => data?.data || {}, [data]);

  const { register, handleSubmit, reset, watch } = useForm();
  const [
    updateNewsCountry,
    { isLoading: isUpdateing, data: updateData, error: updateError }
  ] = useUpdateNewsCountryMutation();

  useEffect(() => {
    if (data?.data) {
      const { title, code, icon } = data.data;
      reset({ title, code, icon });
    }
    if (isLoading) {
      toast.loading("در حال دریافت  ...", { id: "newsCountry-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "newsCountry-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "newsCountry-loading" });
    }

    if (isUpdateing) {
      toast.loading("در حال پردازش...", { id: "newsCountry" });
    }
    console.log(updateData)
    if (updateData &&updateData.acknowledgement) {
      toast.success(updateData?.description, { id: "newsCountry" });
      reset();
      setIsOpen(false);
    }

    if (updateData && !updateData?.acknowledgement) {
      toast.error(updateData?.description, { id: "newsCountry" });
    }
    if (updateError?.data) {
      toast.error(updateError?.data?.description, { id: "newsCountry" });
    }
  }, [isLoading, error, isUpdateing, updateError,updateData,data]);

  const onSubmit = async (data) => {
    const requestData = {
      id: newsCountry._id,
      title: data.title,
      code: data.code,
      icon:data.icon
    };

    updateNewsCountry(requestData);
  };
  const icon = watch("icon") || newsCountry.icon;
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
                  defaultValue={newsCountry?.title}
                  maxLength={50}
                  placeholder="عنوان کشور خبر را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="code" className="flex flex-col gap-y-2">
                کد کشور خبر
                <input
                  type="text"
                  id="code"
                  defaultValue={newsCountry?.code}
                  maxLength={50}
                  placeholder=" کد کشور خبر را تایپ کنید... برای مثال CA یا IR"
                  className="rounded"
                  autoFocus
                  {...register("code", { required: " الزامی است" })}
                />
              </label>

              {/* فیلد کد SVG */}
              <label htmlFor="icon" className="flex flex-col gap-y-2">
                کد SVG آیکون
                <textarea
                  id="icon"
                  defaultValue={newsCountry?.icon}
                  placeholder="<svg>...</svg>"
                  className="rounded h-32 font-mono text-xs"
                  {...register("icon")}
                />
              </label>

              {/* نمایش پیش‌نمایش SVG */}
              {icon && (
                <div       className="w-full h-full [&>svg]:w-full [&>svg]:h-full"
>
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

export default UpdateNewsCountry;
