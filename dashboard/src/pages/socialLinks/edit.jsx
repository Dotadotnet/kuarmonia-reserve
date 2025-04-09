// UpdateSocialLink.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import {
  useUpdateSocialLinkMutation,
  useGetSocialLinkQuery
} from "@/services/socialLink/socialLinkApi";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import Edit from "@/components/icons/Edit";

const UpdateSocialLink = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error } = useGetSocialLinkQuery(id, { skip: !isOpen });
  const socialLink = useMemo(() => data?.data || {}, [data]);

  const { register, handleSubmit, reset } = useForm();
  const [
    updateSocialLink,
    { isLoading: isUpdateing, data: updateData, error: updateError }
  ] = useUpdateSocialLinkMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ...", { id: "socialLink-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "socialLink-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "socialLink-loading" });
    }

    if (isUpdateing) {
      toast.loading("در حال پردازش...", { id: "socialLink" });
    }
    if (updateData) {
      toast.success(updateData?.description, { id: "socialLink" });
      reset();
      setIsOpen(false);
    }
    if (updateData && !updateData) {
      toast.error(updateData?.description, { id: "socialLink" });
    }
    if (updateError?.data) {
      toast.error(updateError?.data?.description, { id: "socialLink" });
    }
  }, [isLoading, error, isUpdateing, updateError,updateData,data]);

  const onSubmit = async (data) => {
    const requestData = {
      id: socialLink._id,
      title: data.title,
      description: data.description
    };

    updateSocialLink(requestData);
  };
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
                  defaultValue={socialLink?.title}
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
                  defaultValue={socialLink?.description}
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

export default UpdateSocialLink;
