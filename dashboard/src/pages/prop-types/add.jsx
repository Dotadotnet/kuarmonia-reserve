// AddType.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddTypeMutation } from "@/services/type/typeApi";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AminitiesInput from "@/components/shared/tools/AminitiesInput";
import AddButton from "@/components/shared/button/AddButton";

const AddType = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const [addType, { isLoading: isAdding, data: addData, error: addError }] =
    useAddTypeMutation();
  const [amenities, setAmenities] = useState([""]);
  const handleAddType = (data) => {
    const requestData = {
      title: data.title,
      description: data.description,
      amenities: amenities
    };
    addType(requestData);
  };

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال پردازش...", { id: "type" });
    }
    if (addData?.acknowledgement) {
      toast.success(addData?.description, { id: "type" });
      reset();
      setIsOpen(false);
    }

    if (addData && !addData?.acknowledgement) {
      toast.error(addData?.description, { id: "type" });
    }
    if (addError?.data) {
      toast.error(addError?.message, { id: "type" });
    }
  }, [addData, addError, isAdding, reset]);

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 h-fit"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleAddType)}
          >
            <div className="flex gap-4 flex-col">
              {/* فیلد عنوان */}
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="عنوان نوع ملک را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: "عنوان الزامی است" })}
                />
              </label>

              {/* فیلد توضیحات */}
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  name="description"
                  id="description"
                  maxLength={200}
                  placeholder="توضیحات نوع ملک را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>

              {/* امکانات ملک */}
              <AminitiesInput
                title="امکانات"
                aminities={amenities}
                setAminities={setAmenities}
              />

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

export default AddType;
