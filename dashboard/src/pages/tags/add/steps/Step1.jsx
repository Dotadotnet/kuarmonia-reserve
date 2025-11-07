import React from "react";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step1 = ({ formData, handleInputChange, nextStep }) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="profile-container shine-effect rounded-full flex justify-center">
        {formData.thumbnailPreview ? (
          <img
            src={formData.thumbnailPreview}
            alt="thumbnail"
            height={150}
            width={150}
            className="h-[150px] w-[150px] profile-pic rounded-full object-cover"
          />
        ) : (
          <SkeletonImage width={150} height={150} />
        )}
      </div>
      
      <div className="w-full">
        <label
          htmlFor="thumbnail"
          className="flex flex-col items-center text-center gap-y-2"
        >
          <span className="text-lg font-medium">تصویر تگ (اختیاری)</span>
          <ThumbnailUpload
            setThumbnailPreview={(preview) => handleInputChange("thumbnailPreview", preview)}
            setThumbnail={(file) => handleInputChange("thumbnail", file)}
            maxFiles={1}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">
            تصویر برای نمایش بهتر تگ (اختیاری)
          </p>
        </label>
      </div>
      
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step1;