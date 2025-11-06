import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useAddTagMutation } from "@/services/tag/tagApi";
import BackButton from "@/components/shared/button/BackButton";
import SendButton from "@/components/shared/button/SendButton";
import ToggleThemeButton from "@/components/ThemeToggle";
import FormInput from "@/components/shared/input/FormInput";
import FormKeywords from "@/components/shared/input/FormKeywords";

function AddTag() {
  const [addTag, { isLoading, data, error }] = useAddTagMutation();
  const [keynotes, setKeynotes] = useState([""]);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    const data = {
      title: formData.title,
      description: formData.description,
      keynotes: JSON.stringify(keynotes)
    };
    await addTag(data);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن تگ...", { id: "add-tag" });
    }

    if (data) {
      toast.success(data?.description, { id: "add-tag" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "add-tag" });
    }
  }, [isLoading, data, error]);

  return (
    <section className="relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center items-center p-4">
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="flex flex-row items-center gap-x-2">
        <BackButton to={-1} />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-5 sm:p-8 rounded-primary shadow-lg z-10"
        action=""
      >
        <div className="w-full flex flex-col gap-y-4">
          <FormInput
            label="* عنوان"
            id="title"
            type="text"
            placeholder="عنوان تگ"
            register={register}
            error={errors?.title}
            required="وارد کردن عنوان الزامی است"
            minLength={{ value: 3, message: "عنوان باید حداقل ۳ حرف داشته باشد" }}
            maxLength={{ value: 100, message: "عنوان نباید بیشتر از ۱۰۰ حرف باشد" }}
          />

          <FormInput
            label="* توضیحات"
            id="description"
            type="textarea"
            placeholder="توضیحات تگ"
            register={register}
            error={errors?.description}
            required="وارد کردن توضیحات الزامی است"
            minLength={{ value: 10, message: "توضیحات باید حداقل ۱۰ حرف داشته باشد" }}
            maxLength={{ value: 500, message: "توضیحات نباید بیشتر از ۵۰۰ حرف باشد" }}
            rows={4}
          />

          <FormKeywords
            items={keynotes}
            setItems={setKeynotes}
          />
        </div>
        <SendButton />
        <ToggleThemeButton />
      </form>
    </section>
  );
}

export default AddTag;