import React from "react";
import CloudUpload from "@/components/icons/CloudUpload";
import { toast } from "react-hot-toast";

const GalleryUpload = ({
  setGalleryPreview,
  setGallery,
  maxFiles = 5,
  register,
  istitle = true,
  iconSize = 5,
  border = true,
  title = ""
}) => {
  const handleGalleryPreview = (event) => {
    const files = event.target.files;
    const previewItems = [];

    if (files.length > maxFiles) {
      toast.success(`شما می‌توانید حداکثر ${maxFiles} فایل آپلود کنید.`);

      return;
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        setGallery(files);
      }
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        const isVideo = file.type.startsWith("video/");
        previewItems.push({
          type: isVideo ? "video" : "image",
          url: e.target.result
        });

        if (previewItems.length === files.length) {
          setGalleryPreview(previewItems);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor="featuredMedia" className="relative">
        <button
          type="button"
          className={`py-1 px-4 text-xs flex flex-row gap-x-2 bg-green-100 dark:bg-blue-100 
            ${
              border
                ? "border border-green-900 cursor-pointer rounded-secondary"
                : "rounded-md"
            } dark:border-blue-900 text-green-900 dark:text-blue-900 w-fit`}
        >
          <CloudUpload className={`h-${iconSize} w-${iconSize}`} />
          {istitle &&
            `مجاز به انتخاب ${maxFiles} فایل (عکس یا ویدئو) می‌باشید.`}
        </button>
        <input
          type="file"
          name="gallery"
          id="gallery"
          accept="image/*, video/*"
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          multiple
          {...register}
          onChange={(event) => {
            register.onChange(event); // ارسال تغییرات به react-hook-form
            handleGalleryPreview(event);
          }}
        />
      </label>
    </div>
  );
};

export default GalleryUpload;
