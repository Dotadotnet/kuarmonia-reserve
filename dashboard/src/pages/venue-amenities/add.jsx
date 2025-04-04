"use client";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddVenueAmenityMutation } from "@/services/venueAmenity/venueAmenityApi";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";

const AddVenueAmenity = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [addVenueAmenity, { isLoading: isAdding, data: addData, error: addError }] =
    useAddVenueAmenityMutation();

  const handleAddVenueAmenity = (data) => {
    const requestData = {
      title: data.name,
      description: data.description,
      icon: data.svgIcon, 
    };
    addVenueAmenity(requestData);
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
      toast.error(addError?.description, { id: "type" });
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
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleAddVenueAmenity)}
          >
            <div className="flex gap-4 flex-col">
              {/* فیلد  */}
              <label htmlFor="name" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  id="name"
                  maxLength={50}
                  placeholder=" نوع امکانات را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("name", { required: " الزامی است" })}
                />
              </label>

              {/* فیلد توضیحات */}
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  id="description"
                  maxLength={200}
                  placeholder="توضیحات نوع امکانات را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
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
                  <div dangerouslySetInnerHTML={{ __html: svgIcon }} />
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

export default AddVenueAmenity;
