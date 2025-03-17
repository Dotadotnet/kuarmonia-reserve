import React, { useEffect, useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import Modal from "@/components/shared/modal/Modal";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import AddCategory from "../categories/add";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAddGalleryMutation, useUpdateGalleryMutation } from "@/services/gallery/galleryApi";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";

const AddGallery = ({ isOpen, onClose, onSuccess, GalleryToEdit = null }) => {
  const { register, handleSubmit, reset, setValue, control, formState: { errors } } = useForm();
  const [addGallery, { isLoading: isAdding, data: addData, error: addError }] = useAddGalleryMutation();
  const [updateGallery, { isLoading: isUpdating, data: updateData, error: updateError }] = useUpdateGalleryMutation();
  const { data: categoriesData, refetch: refetchCategories } = useGetCategoriesForDropDownMenuQuery();
  const categories = Array.isArray(categoriesData?.data) ? categoriesData.data : [];
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (GalleryToEdit) {
      setValue("title", GalleryToEdit.title);
      setValue("description", GalleryToEdit.description);
      setValue("category", GalleryToEdit.category._id);
      setThumbnailPreview(GalleryToEdit.featuredImage);
      setGalleryPreview(GalleryToEdit.gallery);
    } else {
      reset();
    }
  }, [GalleryToEdit, setValue, reset]);

  const categoryOptions = categories?.map(category => ({
    id: category._id,
    value: category.title,
  }));

  const closeCategoryModal = useCallback(() => setIsCategoryModalOpen(false), []);
  const handleCategoryAdded = useCallback(() => refetchCategories(), [refetchCategories]);
  const openCategoryModal = useCallback(() => setIsCategoryModalOpen(true), []);

  const handleAddOrUpdateGallery = async (data) => {
    const formData = new FormData();
    formData.append("featuredImage", thumbnail);
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    formData.append("category", data.category);
    formData.append("description", data.description);

    try {
      if (GalleryToEdit) {
        await updateGallery({ id: GalleryToEdit._id, ...formData }).unwrap();
      } else {
        await addGallery(formData).unwrap();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const isLoading = isAdding || isUpdating;
    const data = addData || updateData;
    const error = addError || updateError;
    if (isLoading) {
      toast.loading("در حال پردازش...", { id: "gallery" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "gallery" });
      reset();
      onSuccess(); 
      onClose();
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "gallery" });
    }
  }, [addData, updateData, addError, updateError, isAdding, isUpdating, reset, onSuccess]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="lg:w-1/3 md:w-1/3 w-full z-50">
        <form className="text-sm flex flex-col gap-y-4" onSubmit={handleSubmit(handleAddOrUpdateGallery)}>
          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-2 w-full">
              <Controller
                control={control}
                name="category"
                rules={{ required: "انتخاب دسته‌بندی الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <SearchableDropdown
                    items={categoryOptions}
                    handleSelect={onChange}
                    value={value}
                    sendId
                    errors={errors.category}
                    className="w-full h-12 "
                  />
                )}
              />
              <button
                type="button"
                className="p-4 bg-green-400 text-white rounded hover:bg-green-600 transition"
                onClick={openCategoryModal}
                aria-label="افزودن دسته‌بندی جدید"
              >
                <FaPlus />
              </button>
            </div>
            {errors.category && <span className="text-red-500">{errors.category.message}</span>}

            <label htmlFor="description">توضیحات
  <textarea
    id="description"
    {...register("description", { 
      required: "توضیحات الزامی است", 
      minLength: {
        value: 10,
        message: "توضیحات باید حداقل 10 کاراکتر باشد"
      },
      maxLength: {
        value: 400,
        message: "توضیحات نباید بیشتر از 400 کاراکتر باشد"
      }
    })}
    className="rounded h-32 w-full"
    placeholder="توضیحات دسته‌بندی را تایپ کنید..."
  />
  {errors.description && <span className="text-red-500">{errors.description.message}</span>}
</label>


            <ThumbnailUpload
              setThumbnailPreview={setThumbnailPreview}
              setThumbnail={setThumbnail}
              register={register('Thumbnail', { required: 'آپلود تصویر عنوان الزامی است' })}
              maxFiles={1}
            />
            {thumbnailPreview && <DisplayImages galleryPreview={[thumbnailPreview]} imageSize={150} />}

            <GalleryUpload
              setGallery={setGallery}
              setGalleryPreview={setGalleryPreview}
              maxFiles={100}
              register={register("gallery", { required: "آپلود حداقل یک تصویر الزامی است" })}
              title="آپلود تصاویر گالری"
            />
            <DisplayImages galleryPreview={galleryPreview.map(img => img)} imageSize={150} />

            <Button type="submit" className="py-2 mt-4" isLoading={isAdding || isUpdating}>
              {GalleryToEdit ? "ویرایش کردن" : "ایجاد کردن"}
            </Button>
          </div>
        </form>
      </Modal>
      <AddCategory
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
        onSuccess={handleCategoryAdded}
      />
    </>
  );
};

export default AddGallery;
