// components/signup/steps/NameStep.jsx

import React, { useEffect, useMemo } from "react";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { Controller } from "react-hook-form";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Plus from "@/components/icons/Plus";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import toast from "react-hot-toast";
import Tag from "@/components/icons/Tag";

const Step2 = ({
  register,
  errors,
  prevStep,
  nextStep,
  setThumbnail,
  thumbnailPreview,
  setThumbnailPreview,
  control
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
  } = useGetCategoriesQuery();
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
  useEffect(() => {
    if (fetchingTags) {
      toast.loading("در حال دریافت تگ ها بندی ...", { id: "fetchTags" });
    }

    if (fetchTagsData) {
      toast.success(fetchTagsData?.about, {
        id: "fetchTags"
      });
    }

    if (fetchTagsError) {
      toast.error(fetchTagsError?.data?.about, {
        id: "fetchTags"
      });
    }
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
  }, [
    fetchingTags,
    fetchTagsData,
    fetchTagsError,
    fetchCategoriesData,
    fetchCategoriesData,
    fetchCategoriesError
  ]);

  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
      <div className="flex flex-col items-center ">
        <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
          {thumbnailPreview ? (
            <img
              src={thumbnailPreview}
              alt="standard"
              height={100}
              width={100}
              className="h-[100px] w-[100px] profile-pic rounded-full"
            />
          ) : (
            <SkeletonImage />
          )}
        </div>
        <label
          htmlFor="thumbnail"
          className="flex flex-col text-center gap-y-2"
        >
          تصویر عضو
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            fullName={"لطفا یک تصویر انتخاب کنید"}
            maxFiles={1}
            register={register("thumbnail")}
          />
        </label>
        {errors?.thumbnail && (
          <span className="text-red-500 text-sm">
            {errors?.thumbnail.message}
          </span>
        )}
      </div>
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
          {/* <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              aria-label="افزودن تگ جدید"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div> */}
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
          {/* <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              aria-label="افزودن دسته بندی جدید"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div> */}
        </div>
        {errors.category && (
          <span className="text-red-500 text-sm">
            {errors.category.message}
          </span>
        )}
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step2;
