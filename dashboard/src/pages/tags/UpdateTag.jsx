import { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useUpdateTagMutation, useGetTagQuery } from "@/services/tag/tagApi";
import BackButton from "@/components/shared/button/BackButton";
import SendButton from "@/components/shared/button/SendButton";
import ToggleThemeButton from "@/components/ThemeToggle";
import FormInput from "@/components/shared/input/FormInput";
import FormKeywords from "@/components/shared/input/FormKeywords";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const UpdateTag = ({ id }) => {
  const { data: tagData, isLoading: isFetching, error: fetchError } = useGetTagQuery(id);
  const [updateTag, { isLoading, data, error }] = useUpdateTagMutation();
  const [keynotes, setKeynotes] = useState([""]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState({});
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Set initial form values when tag data is fetched
  useEffect(() => {
    if (tagData?.data) {
      const tag = tagData.data;
      reset({
        title: tag.title,
        description: tag.description
      });
      
      // Set keynotes
      if (tag.keynotes && Array.isArray(tag.keynotes)) {
        setKeynotes(tag.keynotes.length > 0 ? tag.keynotes : [""]);
      } else {
        setKeynotes([""]);
      }
      
      // Set thumbnail preview if exists
      if (tag.thumbnail?.url) {
        setThumbnailPreview(tag.thumbnail.url);
      }
    }
  }, [tagData, reset]);

  const onSubmit = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("keynotes", JSON.stringify(keynotes));
    
    // Only append thumbnail if a new one is selected
    if (thumbnail && thumbnail.name) {
      data.append("thumbnail", thumbnail);
    }

    await updateTag({ id, body: data });
  };

  // Function to handle pasting comma-separated values into keynotes
  const handleKeynotesPaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (paste.includes(',')) {
      e.preventDefault();
      const newKeynotes = paste.split(',').map(item => item.trim()).filter(item => item.length > 0);
      
      // Update keynotes state with new values
      const updatedKeynotes = [...keynotes];
      let currentIndex = updatedKeynotes.findIndex(item => item === "");
      
      // If no empty field found, add new fields
      if (currentIndex === -1) {
        setKeynotes([...updatedKeynotes, ...newKeynotes]);
      } else {
        // Replace empty fields with pasted values
        newKeynotes.forEach((value, index) => {
          if (currentIndex + index < updatedKeynotes.length) {
            updatedKeynotes[currentIndex + index] = value;
          } else {
            updatedKeynotes.push(value);
          }
        });
        setKeynotes(updatedKeynotes);
      }
    }
  };

  useEffect(() => {
    // Add paste event listener to keynotes inputs
    const keynotesInputs = document.querySelectorAll('input[placeholder*="کلمه کلیدی"]');
    keynotesInputs.forEach(input => {
      input.addEventListener('paste', handleKeynotesPaste);
    });

    return () => {
      // Clean up event listeners
      keynotesInputs.forEach(input => {
        input.removeEventListener('paste', handleKeynotesPaste);
      });
    };
  }, [keynotes]);

  useEffect(() => {
    if (isFetching) {
      toast.loading("در حال دریافت اطلاعات تگ...", { id: "fetch-tag" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.description, { id: "fetch-tag" });
    }
  }, [isFetching, fetchError]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال بروزرسانی تگ...", { id: "update-tag" });
    }

    if (data) {
      toast.success(data?.description, { id: "update-tag" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "update-tag" });
    }
  }, [isLoading, data, error]);

  if (isFetching) {
    return (
      <section className="relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center items-center p-4">
        <div className="wave"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="flex flex-row items-center gap-x-2">
          <BackButton to={-1} />
        </div>
        <div className="max-w-md w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-5 sm:p-8 rounded-primary shadow-lg z-10">
          <p className="text-center">در حال بارگذاری...</p>
        </div>
      </section>
    );
  }

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
        encType="multipart/form-data"
      >
        <div className="profile-container shine-effect rounded-full flex justify-center">
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
            htmlFor="thumbnail"
            className="flex flex-col items-center text-center gap-y-2"
          >
            تصویر تگ
            <ThumbnailUpload
              setThumbnailPreview={setThumbnailPreview}
              setThumbnail={setThumbnail}
              maxFiles={1}
              register={register("thumbnail")}
            />
          </label>
          
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
            maxLength={{ value: 1000, message: "توضیحات نباید بیشتر از ۱۰۰۰ حرف باشد" }}
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
};

export default UpdateTag;