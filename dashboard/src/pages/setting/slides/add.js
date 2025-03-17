import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import Modal from "@/components/shared/modal/Modal";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import { toast } from "react-hot-toast";
import {
  useAddSlideMutation,
  useUpdateSlideMutation
} from "@/services/slide/slideApi";
import { useSelector } from "react-redux";

const AddSlide = ({ isOpen, onClose, onSuccess, SlideToEdit = null }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm();
  const [addSlide, { isLoading: isAdding, data: addData, error: addError }] = useAddSlideMutation();
  const [updateSlide, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateSlideMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [url, setUrl] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const admin = useSelector((state) => state?.auth);

  useEffect(() => {
    if (SlideToEdit) {
      setValue("title", SlideToEdit.title);
      setValue("description", SlideToEdit.description);
      setThumbnailPreview(SlideToEdit.bgImg);
      setUrl(SlideToEdit.url);
      setIsFeatured(SlideToEdit.isFeatured);
    } else {
      reset();
    }
  }, [SlideToEdit, setValue, reset]);

  const defaultValues = useMemo(() => {
    return {
      name: admin?.name,
      avatar: admin?.avatar,
      id: admin?._id
    };
  }, [admin]);

  const handleAddOrUpdateSlide = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("bgImg", thumbnail);
    formData.append("url", data.url);
    formData.append("creator", admin?._id);
    formData.append("isFeatured", data.isFeatured);

    try {
      if (SlideToEdit) {
        await updateSlide({ id: SlideToEdit._id, ...formData }).unwrap();
      } else {
        await addSlide(formData).unwrap();
      }
    } catch (error) {
      console.error("Error: ", error);
    }

  };

console.log(addData)
  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;
    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "slide" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "slide" });
      reset();
      onSuccess();
      onClose();
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "slide" });
    }
  }, [addData, updateData, addError, updateError, isAdding, isUpdating, reset, onSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/3 w-full z-50"
    >
      <form
        className="text-sm flex flex-col gap-y-4"
        onSubmit={handleSubmit(handleAddOrUpdateSlide)}
      >
        <div className="flex flex-col gap-y-2">
          {/* عنوان */}
          <label htmlFor="title" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm">عنوان</span>
            <input
              type="text"
              name="title"
              id="title"
              {...register("title", {
                required: "وارد کردن عنوان الزامی است",
                minLength: {
                  value: 3,
                  message: "عنوان باید حداقل ۳ حرف داشته باشد"
                },
                maxLength: {
                  value: 50,
                  message: "عنوان نباید بیشتر از ۵۰ حرف باشد"
                }
              })}
              placeholder="عنوان اسلاید"
              maxLength="50"
              className="p-2 rounded border w-full"
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </label>

          {/* توضیحات */}
          <label htmlFor="description">
            توضیحات
            <textarea
              id="description"
              {...register("description", {
                required: "توضیحات الزامی است",
                minLength: {
                  value: 10,
                  message: "توضیحات باید حداقل ۱۰ کاراکتر داشته باشد."
                },
                maxLength: {
                  value: 500,
                  message: "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد."
                }
              })}
              className="rounded h-32 w-full"
              placeholder="توضیحات اسلاید را تایپ کنید..."
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </label>

          {/* آپلود تصویر */}
          <ThumbnailUpload
              setThumbnailPreview={setThumbnailPreview}
              setThumbnail={setThumbnail}
              register={register('Thumbnail', { required: 'آپلود تصویر عنوان الزامی است' })}
              maxFiles={1}
              />
              {errors.Thumbnail && (
                <span className="text-red-500">{errors.Thumbnail.message}</span>
              )}
            {thumbnailPreview && <DisplayImages galleryPreview={[thumbnailPreview]} imageSize={150} />}
       

          {/* لینک مقصد */}
          <label htmlFor="url" className="flex flex-col gap-y-1 w-full">
            <span className="text-sm">آدرس مقصد</span>
            <input
              type="text"
              name="url"
              id="url"
              {...register("url", {
                required: "وارد کردن لینک مقصد الزامی است",
                minLength: {
                  value: 3,
                  message: "لینک مقصد باید حداقل ۳ حرف داشته باشد"
                },
                maxLength: {
                  value: 100,
                  message: "لینک مقصد نباید بیشتر از ۱۰۰ حرف باشد"
                }
              })}
              placeholder="لینک مقصد"
              maxLength="100"
              className="p-2 rounded border w-full"
            />
            {errors.url && (
              <span className="text-red-500 text-sm">{errors.url.message}</span>
            )}
          </label>

          {/* اسلاید ویژه */}
          <div className="flex flex-col gap-y-2 w-full">
            <label className="inline-flex items-center cursor-pointer justify-start w-full">
              <span className="ml-3 text-right">آیا این اسلاید ویژه است؟</span>
              <input
                type="checkbox"
                className="sr-only peer"
                id="isFeatured"
                {...register("isFeatured")}
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          {/* دکمه ارسال */}
          <Button
            type="submit"
            className="py-2 mt-4"
            isLoading={isAdding || isUpdating}
          >
            {SlideToEdit ? "ویرایش کردن" : "ایجاد کردن"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddSlide;
