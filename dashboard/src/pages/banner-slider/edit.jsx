// UpdateHeroSlider.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import {
  useUpdateHeroSliderMutation,
  useGetHeroSliderQuery
} from "@/services/heroSlider/heroSliderApi";
import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import Edit from "@/components/icons/Edit";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const UpdateHeroSlider = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading: isFetching, data, error } = useGetHeroSliderQuery(id, { skip: !isOpen });
  const heroSlider = useMemo(() => data?.data || {}, [data]);

  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [
    updateHeroSlider,
    { isLoading: isUpdating, data: updateData, error: updateError }
  ] = useUpdateHeroSliderMutation();
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (isOpen && data) {
      // Set form values when data is loaded
      setValue("title", heroSlider.title || "");
      setValue("subtitle", heroSlider.subtitle || "");
      setValue("description", heroSlider.caption || heroSlider.description || ""); // Use caption if available
      setValue("link", heroSlider.link || "");
      setValue("order", heroSlider.order || "");
      
      // Set thumbnail preview if exists
      if (heroSlider.media?.url || heroSlider.image?.url) {
        setThumbnailPreview(heroSlider.media?.url || heroSlider.image?.url);
      }
    }
  }, [isOpen, data, heroSlider, setValue]);

  useEffect(() => {
    if (isFetching) {
      toast.loading("در حال دریافت  ...", { id: "heroSlider-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "heroSlider-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "heroSlider-loading" });
    }

    if (isUpdating) {
      toast.loading("در حال پردازش...", { id: "heroSlider" });
    }
    if (updateData) {
      toast.success(updateData?.description, { id: "heroSlider" });
      reset();
      setIsOpen(false);
      setThumbnailPreview(null);
      setThumbnail(null);
    }
    if (updateError?.data) {
      toast.error(updateError?.data?.description, { id: "heroSlider" });
    }
  }, [isFetching, error, isUpdating, updateError, updateData, data]);

  const onSubmit = async (formData) => {
    const requestData = new FormData();
    
    // Add text fields
    requestData.append("title", formData.title || "");
    requestData.append("subtitle", formData.subtitle || "");
    requestData.append("caption", formData.description || ""); // Using caption instead of description
    requestData.append("link", formData.link || "");
    requestData.append("order", formData.order || "");
    
    // Add media file if provided
    if (thumbnail) {
      requestData.append("media", thumbnail);
    }

    try {
      await updateHeroSlider({ id: heroSlider._id, body: requestData }).unwrap();
      toast.success("هرو اسلایدر با موفقیت به‌روزرسانی شد");
      setIsOpen(false);
      setThumbnailPreview(null);
      setThumbnail(null);
    } catch (error) {
      toast.error(error?.data?.message || "خطا در به‌روزرسانی هرو اسلایدر");
    }
  };
  
  return (
    <>
      <span
        className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
        onClick={() => setIsOpen(true)}
      >
        <Edit className="w-4 h-4" />
      </span>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            reset();
            setThumbnailPreview(null);
            setThumbnail(null);
          }}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="profile-container  shine-effect rounded-full flex justify-center  ">
              {isFetching ? (
                <SkeletonImage />
              ) : thumbnailPreview ? (
                <img
                  src={thumbnailPreview}
                  alt="thumbnail"
                  height={100}
                  width={100}
                  className="h-[100px] w-[100px] profile-pic rounded-full object-cover"
                />
              ) : (
                <SkeletonImage />
              )}
            </div>
            <div className="flex gap-4 flex-col">
              <label
                htmlFor="gallery"
                className="flex flex-col items-center text-center gap-y-2"
              >
                تصویر هرو اسلایدر
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setThumbnail(e.target.files[0]);
                      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                  className="rounded"
                />
              </label>
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={100}
                  placeholder="عنوان هرو اسلایدر را تایپ کنید ..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="subtitle" className="flex flex-col gap-y-2">
                زیرعنوان
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  maxLength={100}
                  placeholder="زیرعنوان هرو اسلایدر را تایپ کنید ..."
                  className="rounded"
                  {...register("subtitle", { required: true })}
                />
              </label>
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  name="description"
                  id="description"
                  maxLength={500}
                  placeholder="توضیحات هرو اسلایدر را تایپ کنید ..."
                  className="rounded"
                  rows={3}
                  {...register("description", { required: true })}
                />
              </label>
              <label htmlFor="link" className="flex flex-col gap-y-2">
                لینک
                <input
                  type="text"
                  name="link"
                  id="link"
                  maxLength={50}
                  placeholder="لینک هرو اسلایدر را تایپ کنید ..."
                  className="rounded"
                  {...register("link", { required: false })}
                />
              </label>
              <label htmlFor="order" className="flex flex-col gap-y-2">
                ترتیب
                <input
                  type="number"
                  name="order"
                  id="order"
                  placeholder="ترتیب هرو اسلایدر را وارد کنید ..."
                  className="rounded"
                  {...register("order", { required: false, valueAsNumber: true })}
                />
              </label>

              <Button type="submit" className="py-2 mt-4" disabled={isFetching || isUpdating}>
                {isFetching || isUpdating ? "در حال بروزرسانی..." : "بروزرسانی"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateHeroSlider;