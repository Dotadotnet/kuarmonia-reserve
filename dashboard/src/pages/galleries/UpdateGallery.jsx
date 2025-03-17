import Button from "@/components/shared/button/Button";
import {
  useGetGalleryQuery,
  useUpdateGalleryMutation
} from "@/services/gallery/galleryApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import React, { useEffect, useState } from "react";
import Edit from "@/components/icons/Edit";
import { useDispatch } from "react-redux";
import { setGallery } from "@/features/gallery/gallerySlice";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import { useForm } from "react-hook-form";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
const UpdateGallery = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [thumbnail, setThumbnail] = useState({});
  // const [gallery, setGallery] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetGalleryQuery(id);

  const [
    updateGallery,
    { isLoading: isUpdateing, data: updateData, error: updateError }
  ] = useUpdateGalleryMutation();

  useEffect(() => {
    if (isUpdateing) {
      toast.loading("در حال به‌روزرسانی ...", {
        id: "fetchGallery"
      });
    }
    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchGallery" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchGallery" });
    }

    if (updateData) {
      toast.success(updateData?.message, { id: "updateGallery" });
      setIsOpen(false);
    }

    if (updateError?.data) {
      toast.error(updateError?.data?.message, { id: "updateGallery" });
    }
  }, [fetching, fetchData, fetchError, isUpdateing, updateData, updateError]);

  useEffect(() => {
    if (fetchData) {
      dispatch(setGallery(fetchData?.data));
    }
  }, [fetchData, dispatch]);

  const handleUpdateGallery = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    const status = data.status ? "active" : "inactive";
    formData.append("status", status);
    formData.append("thumbnail", thumbnail);

    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }

    updateGallery({ id, body: formData });
  };

  return (
    <>
      <span
        type="button"
        disabled={fetching ? true : undefined}
        className="edit-button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Edit className="w-5 h-5" />
      </span>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          action=""
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-md overflow-y-hidden"
        >
          <form
            action=""
            className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto text-right"
            onSubmit={handleSubmit(handleUpdateGallery)}
          >
            <div className="flex gap-4 flex-col">
              <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
                {/* title */}
                <label htmlFor="title" className="w-full flex flex-col gap-y-1">
                  <span className="text-sm">عنوان*</span>
                  <input
                    type="text"
                    id="title"
                    maxLength="100"
                    defaultValue={fetchData?.data?.title}
                    {...register("title", {
                      required: "عنوان الزامی است!",
                      minLength: {
                        value: 3,
                        message: "عنوان باید حداقل ۳ کاراکتر باشد!"
                      },
                      maxLength: {
                        value: 100,
                        message: "عنوان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد!"
                      },
                      pattern: {
                        value: /^[آ-یA-Za-z0-9\s]+$/,
                        message:
                          "عنوان فقط باید شامل حروف فارسی، انگلیسی و عدد باشد!"
                      }
                    })}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-xs">
                      {errors.title.message}
                    </span>
                  )}
                </label>

                {/* description */}
                <label
                  htmlFor="description"
                  className="w-full flex flex-col gap-y-1"
                >
                  <span className="text-sm">توضیحات*</span>
                  <textarea
                    id="description"
                    rows="4"
                    maxLength="500"
                    defaultValue={fetchData?.data?.description}
                    {...register("description", {
                      required: "توضیحات الزامی است!",
                      minLength: {
                        value: 10,
                        message: "توضیحات باید حداقل ۱۰ کاراکتر باشد!"
                      },
                      maxLength: {
                        value: 500,
                        message: "توضیحات نمی‌تواند بیش از ۵۰۰ کاراکتر باشد!"
                      }
                    })}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-xs">
                      {errors.description.message}
                    </span>
                  )}
                </label>
              </div>
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
                    galleryPreview={[{ url: thumbnailPreview }]}
                    imageSize={150}
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

              <div className="flex flex-col gap-y-2 w-full ">
                <StatusSwitch
                  label="وضعیت"
                  id="status"
                  register={register}
                  defaultChecked={
                    fetchData?.data?.status === "active" ? true : false
                  }
                />
              </div>
              <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
                ویرایش کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateGallery;
