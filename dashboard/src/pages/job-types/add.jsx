// AddJobType.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddJobTypeMutation } from "@/services/jobType/jobTypeApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const AddJobType = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm();
  const [addJobType, { isLoading: isAdding, data: addData, error: addError }] =
    useAddJobTypeMutation();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState({});
  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  نوع شغل...", { id: "add-JobType" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "add-JobType" });
      setIsOpen(false);
      reset();
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "add-JobType" });
    }
  }, [isAdding, addData, addError]);

  const svgIcon = watch("svgIcon");
  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("icon", data.svgIcon);

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    addJobType(formData);
  };
  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full  z-50 h-fit"
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
                تصویر دسته بندی
                <ThumbnailUpload
                  setThumbnailPreview={setThumbnailPreview}
                  setThumbnail={setThumbnail}
                  maxFiles={1}
                  register={register("Thumbnail")}
                />
              </label>
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="عنوان زمان بندی را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  name="description"
                  id="description"
                  maxLength={200}
                  placeholder="توضیحات زمان بندی را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>
              {/* فیلد کد SVG */}
              <label htmlFor="svgIcon" className="flex flex-col gap-y-2">
                کد SVG آیکون
                <textarea
                  id="svgIcon"
                  placeholder="<svg>...</svg>"
                  className="rounded h-32 font-mono text-xs"
                  {...register("svgIcon")}
                />
              </label>
              <div className="w-full flex justify-center">
                {svgIcon && (
                  <div className="border rounded p-4 mt-2 flex justify-center items-center w-20 h-20">
                    <div dangerouslySetInnerHTML={{ __html: svgIcon }} />
                  </div>
                )}
              </div>
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

export default AddJobType;
