import React from "react";
import CloudUpload from "@/components/icons/CloudUpload";

const ThumbnailUpload = ({
  setThumbnail,
  setThumbnailPreview,
  register,
  isTitle = true,
  iconSize = 5,
  border = true,
  title="انتخاب یک فایل (عکس یا ویدئو)",
  name="thumbnail"
}) => {
  const handleThumbnailPreview = (e) => {
    setThumbnail(e.target.files[0]);

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor="thumbnail" className="relative">
        <button
          type="button"
          className={`py-1 px-4 flex flex-row gap-x-2 bg-green-100 dark:bg-blue-100 
            ${border ? "border border-green-900 cursor-pointer rounded-secondary" : "rounded-md"} dark:border-blue-900 text-green-900 dark:text-blue-900 w-fit`}
        >
          <CloudUpload className={`h-${iconSize} w-${iconSize}`} />
          {isTitle && title}
        </button>
        <input
          type="file"
          name={name}
          id={name}
          accept="image/*"
          className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
          {...register}
          multiple={false}
          onChange={(event) => {
            register.onChange(event); 
            handleThumbnailPreview(event); 
          }}
        />
        
      </label>
    </div>
  );
};

export default ThumbnailUpload;
