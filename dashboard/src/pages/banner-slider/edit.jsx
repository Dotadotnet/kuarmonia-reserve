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

const UpdateHeroSlider = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data, error } = useGetHeroSliderQuery(id, { skip: !isOpen });
  const heroSlider = useMemo(() => data?.data || {}, [data]);

  const { register, handleSubmit, reset, setValue } = useForm();
  const [
    updateHeroSlider,
    { isLoading: isUpdateing, data: updateData, error: updateError }
  ] = useUpdateHeroSliderMutation();

  useEffect(() => {
    if (isOpen && data) {
      // Set form values when data is loaded
      setValue("title", heroSlider.title || "");
      setValue("subtitle", heroSlider.subtitle || "");
      setValue("description", heroSlider.description || "");
      setValue("link", heroSlider.link || "");
    }
  }, [isOpen, data, heroSlider, setValue]);
console.log(heroSlider);
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت  ...", { id: "heroSlider-loading" });
    }
    if (data) {
      toast.success(data?.description, { id: "heroSlider-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "heroSlider-loading" });
    }

    if (isUpdateing) {
      toast.loading("در حال پردازش...", { id: "heroSlider" });
    }
    if (updateData) {
      toast.success(updateData?.description, { id: "heroSlider" });
      reset();
      setIsOpen(false);
    }
    if (updateError?.data) {
      toast.error(updateError?.data?.description, { id: "heroSlider" });
    }
  }, [isLoading, error, isUpdateing, updateError, updateData, data]);

  const onSubmit = async (data) => {
    const requestData = {
      id: heroSlider._id,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      link: data.link
    };
    console.log(requestData);
    updateHeroSlider({ id: heroSlider._id, body: requestData });
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
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-4 flex-col">
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
                  {...register("title", { required: false })}
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
                  {...register("subtitle", { required: false })}
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
                  {...register("description", { required: false })}
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

              <Button type="submit" className="py-2 mt-4">
                بروزرسانی
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateHeroSlider;