import NavigationButton from "@/components/shared/button/NavigationButton";
import React, { useEffect, useMemo } from "react";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { Controller } from "react-hook-form";
import Plus from "@/components/icons/Plus";
import Tag from "@/components/icons/Tag";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import toast from "react-hot-toast";
import Dropdown from "@/components/shared/dropDown/Dropdown";

const Step2 = ({
  register,
  setGalleryPreview,
  prevStep,
  nextStep,
  setGallery,
  control,
  errors
}) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError
  } = useGetTagsQuery();
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError
  } = useGetCategoriesQuery();
  const categories = useMemo(
    () =>
      fetchCategoriesData?.data?.map((category) => ({
        id: category._id,
        value: category.title,
        label: category.title,
        about: category.about
      })) || [],
    [fetchCategoriesData]
  );
  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.title,
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
    <>
      <div className="flex flex-col text-center gap-y-2">
        <GalleryUpload
          setGallery={setGallery}
          setGalleryPreview={setGalleryPreview}
          maxFiles={36}
          register={register}
          title="آپلود تصاویر گالری"
        />
      </div>
      <div className="flex flex-col gap-y-2 w-full ">
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
      <div className="flex flex-col flex-1">
        <label htmlFor="categories" className="flex flex-col gap-y-2">
          دسته بندی{" "}
          <Controller
            control={control}
            name="categories"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                value={value}
                onChange={onChange}
                items={categories}
                sendId={true}
                errors={errors.categories}
                className={"w-full h-12"}
              />
            )}
          />
        </label>
      </div>
      <label htmlFor="about" className="flex flex-col gap-y-2 w-full">
        درباره محل برگزاری مراسم
        <textarea
          name="about"
          id="about"
          maxLength={225}
          placeholder="درباره محل برگزاری مراسم پست را وارد کنید..."
          className="p-2 rounded h-[170px]
       border w-full form-textarea"
          {...register("about", {
            // اصلاح نام فیلد
            required: "درباره محل برگزاری مراسم الزامی است",
            minLength: {
              value: 30,
              message: "درباره محل برگزاری مراسم باید حداقل ۳۰ کاراکتر باشد"
            },
            maxLength: {
              value: 225,
              message: "درباره محل برگزاری مراسم نباید بیشتر از ۲۲۵ کاراکتر باشد"
            }
          })}
        />
        {errors.about && ( // اصلاح نام فیلد
          <span className="text-red-500 text-sm">
            {errors.about.message}
          </span>
        )}
      </label>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step2;
