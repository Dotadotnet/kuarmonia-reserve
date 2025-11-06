import React from "react";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";

const FormThumbnailUpload = ({
  label,
  id,
  register,
  error,
  setThumbnail,
  thumbnailPreview,
  setThumbnailPreview,
  fullName,
  maxFiles = 1,
  className = ""
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
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
      <label htmlFor={id} className="flex flex-col text-center gap-y-2">
        {label}
        <ThumbnailUpload
          setThumbnailPreview={setThumbnailPreview}
          setThumbnail={setThumbnail}
          fullName={fullName}
          maxFiles={maxFiles}
          register={register ? register(id) : {}}
        />
      </label>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default FormThumbnailUpload;