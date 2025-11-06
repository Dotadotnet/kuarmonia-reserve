// AddHeroSlider.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddHeroSliderMutation } from "@/services/heroSlider/heroSliderApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const AddHeroSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm();
  const [addHeroSlider, { isLoading: isAdding, data: addData, error: addError }] =
    useAddHeroSliderMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState({});
  
  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن هرو اسلایدر...", { id: "add-HeroSlider" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "add-HeroSlider" });
      setIsOpen(false);
      reset();
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "add-HeroSlider" });
    }
  }, [isAdding, addData, addError, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Add text fields
    formData.append("title", data.title || "");
    formData.append("subtitle", data.subtitle || "");
    formData.append("caption", data.description || ""); // Using caption instead of description
    formData.append("link", data.link || "");
    
    // Add media file
    if (thumbnail) {
      formData.append("media", thumbnail);
    }

    try {
      await addHeroSlider(formData).unwrap();
      toast.success("هرو اسلایدر با موفقیت اضافه شد");
      setIsOpen(false);
      reset();
      setThumbnailPreview(null);
      setThumbnail({});
    } catch (error) {
      toast.error(error?.data?.message || "خطا در اضافه کردن هرو اسلایدر");
    }
  };
  
  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            reset();
            setThumbnailPreview(null);
            setThumbnail({});
          }}
          className="lg:w-1/3 md:w-1/2 w-full z-50 h-fit"
        >
          <form
            className="text-sm w-full h-full  flex flex-col items-center gap-y-4 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="profile-container  shine-effect rounded-full flex justify-center  ">
              {thumbnailPreview ? (
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
            <div className="flex gap-4 flex-col w-full">
              <label
                htmlFor="gallery"
                className="flex flex-col items-center text-center gap-y-2"
              >
                تصویر هرو اسلایدر
                <ThumbnailUpload
                  setThumbnailPreview={setThumbnailPreview}
                  setThumbnail={setThumbnail}
                  maxFiles={1}
                  register={register("Thumbnail")}
                />
              </label>
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان:
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={100}
                  placeholder="عنوان هرو اسلایدر را تایپ کنید ..."
                  className="rounded"
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="subtitle" className="flex flex-col gap-y-2">
                زیرعنوان:
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
                توضیحات:
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
                لینک:
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
              <Button type="submit" className="py-2 mt-4" disabled={isAdding}>
                {isAdding ? "در حال ایجاد..." : "ایجاد کردن"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddHeroSlider;