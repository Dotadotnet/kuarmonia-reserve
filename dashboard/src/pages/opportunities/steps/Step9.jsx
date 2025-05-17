import React, { useMemo, useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import Tag from "@/components/icons/Tag";
import ArrayInput from "@/components/shared/tools/ArrayInput";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";

const Step9 = ({
  nextStep,
  prevStep,
  control,
  errors,
  register,
  socialLinksData,
  setSocialLinksData,
  documents,
  setDocuments
}) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError
  } = useGetTagsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError
  } = useGetCategoriesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const categories = useMemo(
    () =>
      fetchCategoriesData?.data?.map((category) => ({
        id: category._id,
        value: category.translations[0].translation?.fields.title,
        label: category.title,
        icon: category.icon
      })) || [],
    [fetchCategoriesData]
  );
  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.translations[0].translation?.fields.title,
        label: tag.title,
        about: tag.about
      })),
    [fetchTagsData]
  );

  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-2  rounded">
        <div className="flex flex-col gap-y-2 w-full  ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 ">
                تگ‌ها
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: "انتخاب تگ الزامی است" }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      items={tags}
                      selectedItems={value || []}
                      handleSelect={onChange}
                      icon={<Tag />}
                      placeholder="چند مورد انتخاب کنید"
                      className={"w-full h-12"}
                      returnType="id"
                    />
                  )}
                />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن تگ جدید"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-y-2 w-full  ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="category" className="flex flex-col gap-y-2 ">
                دسته بندی
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: "انتخاب دسته بندی الزامی است" }}
                  render={({ field: { onChange, value } }) => (
                    <Dropdown
                      items={categories}
                      selectedItems={value || []}
                      handleSelect={onChange}
                      placeholder="چند مورد انتخاب کنید"
                      className={"w-full h-12"}
                      returnType="id"
                    />
                  )}
                />
              </label>
            </div>
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>
        <div className="flex gap-x-2">
          <label htmlFor="capacity" className="flex flex-col w-32">
            ظرفیت{" "}
            <input
              type="number"
              id="capacity"
              className="rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("capacity", {})}
            />
            {errors?.capacity && (
              <span className="text-red-500 text-xs mt-1">
                {errors.capacity.message}
              </span>
            )}
          </label>
          <label htmlFor="vacancy" className="flex flex-col w-32">
            آستانه پذیرش{" "}
            <input
              type="number"
              id="vacancy"
              className="rounded p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("vacancy", {})}
            />
            {errors?.vacancy && (
              <span className="text-red-500 text-xs mt-1">
                {errors.vacancy.message}
              </span>
            )}
          </label>
         
        </div>
         <ArrayInput
            title="مدارک"
            values={documents}
            setValues={setDocuments}
            namePrefix="documents"
            register={register}
            errors={errors}
          />
          <SocialLinksInput
            socialLinksData={socialLinksData}
            setSocialLinksData={setSocialLinksData}
          />
      </div>

   
    </>
  );
};

export default Step9;
