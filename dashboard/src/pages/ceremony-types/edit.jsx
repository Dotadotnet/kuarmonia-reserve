import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useUpdateCeremonyTypeMutation, useGetCeremonyTypeQuery } from "@/services/ceremonyType/ceremonyTypeApi";
import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import EditButton from "@/components/shared/button/EditButton";

const EditCeremonyType = ({ id }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [editCeremonyType, { isLoading: isEditing, data: editData, error: editError }] =
    useUpdateCeremonyTypeMutation();

  const { data, isLoading, error, refetch } = useGetCeremonyTypeQuery(id, {
    skip: !isOpen || !id, 
  });

  const ceremonyType = useMemo(() => data?.data || {}, [data]);

  useEffect(() => {
    if (ceremonyType && isOpen) {
      setValue("name", ceremonyType.title || "");
      setValue("description", ceremonyType.description || "");
      setValue("svgIcon", ceremonyType.icon || "");
    }
  }, [ceremonyType, isOpen, setValue]);

  const handleEditCeremonyType = (formData) => {
    const requestData = {
      id,
      title: formData.name,
      description: formData.description,
      icon: formData.svgIcon,
    };
    editCeremonyType(requestData);
  };

  useEffect(() => {
    if (isEditing) {
      toast.loading("در حال پردازش...", { id: "type" });
    }
    if (editData) {
      toast.success(editData?.description, { id: "type" });
      reset();
      setIsOpen(false);
    }
    if (editError) {
      toast.error(editError?.data?.description, { id: "type" });
    }
  }, [editData, editError, isEditing, reset]);

  const svgIcon = watch("svgIcon");

  return (
    <>
      <EditButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleEditCeremonyType)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="name" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  id="name"
                  maxLength={50}
                  placeholder="عنوان نوع مراسم را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("name", { required: "عنوان الزامی است" })}
                />
              </label>

              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  id="description"
                  maxLength={200}
                  placeholder="توضیحات نوع مراسم را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>

              <label htmlFor="svgIcon" className="flex flex-col gap-y-2">
                کد SVG آیکون
                <textarea
                  id="svgIcon"
                  placeholder="<svg>...</svg>"
                  className="rounded h-32 font-mono text-xs"
                  {...register("svgIcon")}
                />
              </label>

              {svgIcon && (
                <div className="border rounded p-4 mt-2 flex justify-center items-center">
                  <div dangerouslySetInnerHTML={{ __html: svgIcon }} />
                </div>
              )}

              <Button type="submit" className="py-2 mt-4">
                ویرایش کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default EditCeremonyType;
