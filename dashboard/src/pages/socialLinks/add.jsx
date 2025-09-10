// AddSocialLink.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddSocialLinkMutation } from "@/services/socialLink/socialLinkApi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";

const AddSocialLink = () => {
  
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset ,watch} = useForm();
  const [
    addSocialLink,
    { isLoading: isAdding, data: addData, error: addError }
  ] = useAddSocialLinkMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  شبکه اجتماعی...", { id: "add-SocialLink" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "add-SocialLink" });
      setIsOpen(false);
      reset();
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "add-SocialLink" });
    }
  }, [isAdding, addData, addError]);
  const onSubmit = async (data) => {
    const requestData = {
      title: data.title,
      platform: data.platform,
      description: data.description,
      icon:data.svgIcon,
      url:data.url
    };

    addSocialLink(requestData);
  };
  const svgIcon = watch("svgIcon");

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full  h-fit z-50"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4 p-1"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="عنوان شبکه اجتماعی را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="platform" className="flex flex-col gap-y-2">
                پلتفرم
                <input
                  type="text"
                  name="platform"
                  id="platform"
                  maxLength={50}
                  placeholder="پلتفرم را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("platform", { required: true })}
                />
              </label>
              <label htmlFor="url" className="flex flex-col gap-y-2">
              لینک
                <input
                  type="text"
                  name="url"
                  id="url"
                  maxLength={50}
                  placeholder="لینک را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("url", { required: true })}
                />
              </label>
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  name="description"
                  id="description"
                  maxLength={200}
                  placeholder="توضیحات شبکه  اجتماعی را تایپ کنید..."
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
                    <div dangerouslySetInnerHTML={{ __html: svgIcon }}
                    
                    />
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

export default AddSocialLink;
