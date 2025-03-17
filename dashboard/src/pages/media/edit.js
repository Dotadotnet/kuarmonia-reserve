import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import Modal from "@/components/shared/modal/Modal";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import { toast } from "react-hot-toast";
import {
  useUpdateMediaMutation,
  useGetMediaQuery
} from "@/services/media/mediaApi";
import { Controller } from "react-hook-form";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import { TagIcon } from "@/utils/SaveIcon";
import { FaPlus } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
const UpdateMedia = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const [thumbnail, setThumbnail] = useState(null);
  const [media, setMedia] = useState(null);

  const {
    register,
    handleSubmit,
    reset,

    control,
    formState: { errors }
  } = useForm();
  const { isLoading, data, error } = useGetMediaQuery(id, { skip: !isOpen });
  const med = useMemo(() => data?.data || {}, [data]);

  const [
    updateMedia,
    { isLoading: isUpdating, data: updateData, error: updateError }
  ] = useUpdateMediaMutation();
  const { data: categoriesData, refetch: refetchCategories } =
    useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData, refetch: refetchTags } =
    useGetTagsForDropDownMenuQuery();
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );
  const tags = useMemo(() => tagsData?.data || [], [tagsData]);

  const categoryOptions = categories?.map((category) => ({
    id: category._id,
    value: category.title,
    description: category.description
  }));
  const tagsOptions = tags?.map((tag) => ({
    id: tag._id,
    value: tag.title,
    description: tag.description
  }));
  useEffect(() => {
    if (med) {
      reset({
        id: med?.id,
        title: med.title || "",
        description: med.description || "",
        category: med.category?._id || "",
        tags: med.tags?.map((tag) => tag._id) || [],
        isFeatured: med.isFeatured || false,
        visibility: med.visibility || false
      });

      setMedia(med.media);
      setThumbnail(med.thumbnail);
      setMediaPreview(med.media);
      setThumbnailPreview(med.thumbnail);
      if (isUpdating) {
        toast.loading("در حال پردازش...", { id: "media" });
      }
      if (updateData?.success) {
        toast.success(updateData?.message, { id: "media" });
        reset();
        setIsOpen(false);
      }
      if (updateData && !updateData?.success) {
        toast.error(updateData?.message, { id: "media" });
      }

      if (updateError?.data) {
        toast.error(updateError?.data?.message, { id: "media" });
      }
    }
  }, [med, reset, updateData, , updateError, , isUpdating]);
  const handleUpdateMedia = async (data) => {
    const formData = new FormData();

    // افزودن داده‌های متنی
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("visibility", data.visibility);
    formData.append("tags[]", JSON.stringify(data.tags)); // برای ارسال آرایه از "[]"

    // افزودن فایل‌ها (اگر وجود داشته باشند)
    if (thumbnail && thumbnail instanceof File) {
      formData.append("thumbnail", thumbnail);
    }
    
    if (media && media instanceof File) {
      formData.append("media", media);
    }
    
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    // ارسال درخواست به `updateMedia`
    updateMedia({ id: data.id, data: formData });
  };

  return (
    <>
      <span
        className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
        onClick={() => setIsOpen(true)}
      >
        <FiEdit3 className="w-5 h-5" />
      </span>{" "}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/3 w-full z-50"
        >
          <form
            className="text-sm flex flex-col gap-y-4  text-right"
            onSubmit={handleSubmit(handleUpdateMedia)}
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
                  placeholder="عنوان رسانه"
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
                  placeholder="توضیحات رسانه را تایپ کنید..."
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </label>
              <div className="flex flex-col gap-y-2 w-full ">
                <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
                  <div className="flex flex-col flex-1">
                    <label
                      htmlFor="tags"
                      className="flex flex-col gap-y-2 w-full"
                    >
                      تگ‌ها
                      <Controller
                        control={control}
                        name="tags"
                        rules={{ required: "انتخاب تگ الزامی است" }}
                        render={({ field: { onChange, value } }) => (
                          <MultiSelectDropdown
                            items={tagsOptions}
                            selectedItems={value}
                            handleSelect={onChange}
                            icon={<TagIcon />}
                            placeholder="چند مورد انتخاب کنید"
                            className={"w-full h-12"}
                          />
                        )}
                      />
                    </label>
                  </div>
                  <div className="mt-7 flex justify-start">
                    <button
                      type="button"
                      className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                      aria-label="افزودن تگ جدید"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                {errors.tags && (
                  <span className="text-red-500 text-sm">
                    {errors.tags.message}
                  </span>
                )}
              </div>

              {/* بخش دسته‌بندی */}
              <div className="flex flex-col gap-y-2 w-full ">
                <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="category" className="flex flex-col gap-y-2">
                      دسته‌بندی
                      <Controller
                        control={control}
                        name="category"
                        rules={{ required: "انتخاب دسته‌بندی الزامی است" }}
                        render={({ field: { onChange, value } }) => (
                          <SearchableDropdown
                            items={categoryOptions}
                            handleSelect={onChange}
                            value={med?.category?._id || value}
                            sendId={true}
                            errors={errors.category}
                            className={"w-full h-12"}
                          />
                        )}
                      />
                    </label>
                  </div>
                  <div className="mt-7 flex justify-start">
                    <button
                      type="button"
                      className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                      aria-label="افزودن دسته‌بندی جدید"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* آپلود تصویر */}
              <ThumbnailUpload
                setThumbnailPreview={setMediaPreview}
                setThumbnail={setMedia}
                name="media"
                title="یک رسانه پویا انتخاب کنید"
                register={register("media")}
                maxFiles={1}
              />
              {errors.media && (
                <span className="text-red-500">{errors.media.message}</span>
              )}
              {mediaPreview && (
                <DisplayImages
                  galleryPreview={[mediaPreview || med?.media]}
                  imageSize={150}
                />
              )}

              {/* آپلود تصویر */}
              <ThumbnailUpload
                setThumbnailPreview={setThumbnailPreview}
                setThumbnail={setThumbnail}
                name="Thumbnail"
                register={register("media")}
                title="یک تصویر بند انگشتی انتخاب کنید"
                maxFiles={1}
              />
              {errors.Thumbnail && (
                <span className="text-red-500">{errors.Thumbnail.message}</span>
              )}
              {thumbnailPreview && (
                <DisplayImages
                  galleryPreview={[thumbnailPreview || med?.thumbnail]}
                  imageSize={150}
                />
              )}

              <div className="flex flex-row justify-between">
                <StatusSwitch
                  label={"رسانه ویژه "}
                  id="isFeatured"
                  register={register}
                  defaultChecked={med?.isFeatured}
                />{" "}
                <StatusSwitch
                  label={"محتوای خصوصی"}
                  id="visibility"
                  register={register}
                  defaultChecked={med?.visibility}
                />
              </div>

              {/* دکمه ارسال */}
              <Button
                type="submit"
                className="py-2 mt-4"
                isLoading={isUpdating}
              >
                ویرایش کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateMedia;
