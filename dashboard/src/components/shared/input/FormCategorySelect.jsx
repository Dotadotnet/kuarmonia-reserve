import React, { useEffect, useMemo } from "react";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import toast from "react-hot-toast";
import { Controller } from "react-hook-form";

const FormCategorySelect = ({
  label,
  id,
  control,
  error,
  required = false,
  placeholder = "چند مورد انتخاب کنید",
  className = "w-full h-12"
}) => {
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError
  } = useGetCategoriesQuery();

  const categories = useMemo(
    () =>
      fetchCategoriesData?.data?.map((category) => ({
        id: category._id,
        value: category?.title || "",
        label: category.title,
        icon: category.icon
      })) || [],
    [fetchCategoriesData]
  );

  useEffect(() => {
    if (fetchingCategories) {
      toast.loading("در حال دریافت دسته بندی ...", { id: "fetchCategories" });
    }

    if (fetchCategoriesData) {
      toast.success(fetchCategoriesData?.about, {
        id: "fetchCategories"
      });
    }

    if (fetchCategoriesError) {
      toast.error(fetchCategoriesError?.data?.about, {
        id: "fetchCategories"
      });
    }
  }, [fetchingCategories, fetchCategoriesData, fetchCategoriesError]);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={id} className="flex flex-col gap-y-2">
        {label}
        <Controller
          control={control}
          name={id}
          rules={{ required: required && "انتخاب دسته بندی الزامی است" }}
          render={({ field: { onChange, value } }) => (
            <Dropdown
              items={categories}
              selectedItems={value || []}
              handleSelect={onChange}
              placeholder={placeholder}
              className={className}
              returnType="id"
            />
          )}
        />
      </label>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default FormCategorySelect;