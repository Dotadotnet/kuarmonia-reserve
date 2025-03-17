import React, { useEffect, useState } from "react";
import Button from "@/components/shared/button/Button";
import { useAddGalleryMutation } from "@/services/gallery/galleryApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useForm } from "react-hook-form";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
const AddGallery = ({ isOpen, onClose }) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState({});
  const [gallery, setGallery] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [addGallery, { isLoading: isAdding, data: addData, error: addError }] =
    useAddGalleryMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  گالری...", { id: "addGallery" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "addGallery" });
      onClose();
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "addGallery" });
    }
  }, [isAdding, addData, addError]);

  function handleAddGallery(data) {
    const formData = new FormData(); 
  
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", thumbnail); 
  
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }
  
    addGallery(formData); 
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-md overflow-y-hidden"
    >
      <form
        className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto"
        onSubmit={handleSubmit(handleAddGallery)}
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
                    message: "عنوان باید حداقل ۳ کاراکتر باشد"
                  }
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
                    message: "توضیحات باید حداقل ۳ کاراکتر باشد"
                  }
                })}
              />
            </label>
            <label
              htmlFor="gallery"
              className="flex flex-col text-center gap-y-2"
            >
              تصویر پست کارت
              <ThumbnailUpload
              setThumbnailPreview={setThumbnailPreview}
              setThumbnail={setThumbnail}
              register={register("Thumbnail", {
                required: "آپلود تصویر عنوان الزامی است"
              })}
              maxFiles={1}
            />
            {thumbnailPreview && (
              <DisplayImages
              galleryPreview={[{ url: thumbnailPreview }]}                imageSize={150}
              />
            )}

            </label>
            {errors.gallery && (
              <span className="text-red-500 text-sm">
                {errors.gallery.message}
              </span>
            )}
           <GalleryUpload
              setGallery={setGallery}
              setGalleryPreview={setGalleryPreview}
              maxFiles={100}
              register={register("gallery", {
                required: "آپلود حداقل یک تصویر الزامی است"
              })}
              title="آپلود تصاویر گالری"
            />
            <DisplayImages
              galleryPreview={galleryPreview.map((img) => img)}
              imageSize={150}
            />

          </div>
          <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
            ایجاد کردن
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddGallery;
