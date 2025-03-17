import React, { useEffect, useMemo, useState, useCallback } from "react";
import Plus from "@/components/icons/Plus";
import Button from "@/components/shared/button/Button";
import { useAddUnitMutation } from "@/services/unit/unitApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
 import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import { useForm, Controller } from "react-hook-form";

const AddUnit = ({ isOpen, onClose }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError,
  } = useGetCategoriesQuery();

  const categories = useMemo(
    () => fetchCategoriesData?.data || [],
    [fetchCategoriesData]
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (fetchingCategories) {
      toast.loading("در حال دریافت دسته بندی ...", { id: "fetchCategories" });
    }

    if (fetchCategoriesData) {
      toast.success(fetchCategoriesData?.description, {
        id: "fetchCategories",
      });
    }

    if (fetchCategoriesError) {
      toast.error(fetchCategoriesError?.data?.description, {
        id: "fetchCategories",
      });
    }
  }, [fetchingCategories, fetchCategoriesData, fetchCategoriesError]);
  const categoryOptions = categories?.map((category) => ({
    id: category._id,
    value: category.title,
    description: category.description,
  }));
  const openCategoryModal = useCallback(() => {
    setIsCategoryModalOpen(true);
  }, []);
  const [addUnit, { isLoading: isAdding, data: addData, error: addError }] =
    useAddUnitMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  برچسب...", { id: "addUnit" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "addUnit" });
      onClose();
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "addUnit" });
    }
  }, [isAdding, addData, addError]);

  function handleAddUnit(data) {
    const formData = {
      title: data.title,
      value: data.value,
      description: data.description,
      category: data.category,
    };
    console.log(formData);

    addUnit(formData);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-md overflow-y-hidden"
    >
      <form
        className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto"
        onSubmit={handleSubmit(handleAddUnit)}
      >
        <div className="flex gap-4 flex-col">
          <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
            {/* title */}
            <label htmlFor="title" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">عنوان*</span>
              <input
                type="text"
                name="title"
                id="title"
                maxLength="100"
                required
                {...register("title", {
                  required: "عنوان الزامی است",
                  minLength: {
                    value: 3,
                    message: "عنوان باید حداقل ۳ کاراکتر باشد",
                  },
                })}
              />
            </label>
            {/* value */}
            <label htmlFor="value" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">مقدار عددی*</span>
              <input
  type="number"
  name="value"
  id="value"
  step="any" // یا step="0.1"
  required
  {...register("value", {
    required: "مقدار عددی الزامی است",
    min: {
      value: 0,
      message: "مقدار عددی نمی‌تواند منفی باشد",
    },
    valueAsNumber: true,
  })}
/>
            </label>

            {/* description */}
            <label
              htmlFor="description"
              className="w-full flex flex-col gap-y-1"
            >
              <span className="text-sm">توضیحات*</span>
              <textarea
                name="description"
                id="description"
                rows="4"
                maxLength="500"
                required
                {...register("description", {
                  required: "توضیحات الزامی است",
                  minLength: {
                    value: 3,
                    message: "توضیحات باید حداقل ۳ کاراکتر باشد",
                  },
                })}
              />
            </label>
            {/* بخش دسته‌بندی */}
            <div className="flex flex-col gap-y-2 w-full ">
              <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
                <div className="flex flex-col flex-1">
                  <Controller
                    control={control}
                    name="category"
                    rules={{ required: "انتخاب دسته‌بندی الزامی است" }}
                    render={({ field }) => (
                      <div className="flex flex-col gap-y-2 w-full">
                        <label
                          htmlFor="category"
                          className="flex flex-col gap-y-2"
                        >
                          دسته‌بندی
                           <Dropdown
                            items={categoryOptions}
                            sendId={true}
                            className="w-full h-12"
                            handleSelect={field.onChange}
                            value={field.value}
                          /> 
                        </label>
                      </div>
                    )}
                  />
                </div>
                <div className="mt-7 flex justify-start">
                  <button
                    type="button"
                    className=" p-1 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                    onClick={openCategoryModal}
                    aria-label="افزودن دسته‌بندی جدید"
                  >
                    <Plus className="!w-10 !h-10" />
                  </button>
                </div>
              </div>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>
          <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
            ایجاد کردن
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUnit;
