// AddBanner.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddBannerSliderMutation } from "@/services/banner/bannerApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const AddBannerSlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm();
  const [addBanner, { isLoading: isAdding, data: addData, error: addError }] =
    useAddBannerSliderMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState({});
  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  بنر...", { id: "add-Banner" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "add-Banner" });
      setIsOpen(false);
      reset();
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "add-Banner" });
    }
  }, [isAdding, addData, addError]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("link", data.link);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    addBanner(formData);
  };
  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
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
                  className="h-[100px] w-[100px] profile-pic rounded-full"
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
                تصویر بنر
                <ThumbnailUpload
                  setThumbnailPreview={setThumbnailPreview}
                  setThumbnail={setThumbnail}
                  maxFiles={1}
                  register={register("Thumbnail")}
                />
              </label>
              <label htmlFor="link" className="flex flex-col gap-y-2">
                لینک :
                <input
                  type="text"
                  name="link"
                  id="link"
                  maxLength={50}
                  placeholder="لینک بنر را تایپ کنید ..."
                  className="rounded"
                  autoFocus
                  {...register("link", { required: false })}
                />
              </label>
              <Button type="submit" className="py-2 mt-4">
                ایجاد کردن{" "}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddBannerSlider;
