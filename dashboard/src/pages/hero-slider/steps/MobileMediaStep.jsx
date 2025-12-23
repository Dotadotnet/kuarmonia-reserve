import { useState, useEffect } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import NavigationButton from "@/components/shared/button/NavigationButton";

const MobileMediaStep = ({ mobileMedia, setMobileMedia, setValue, register, errors, nextStep, prevStep }) => {
  const [mobileMediaPreview, setMobileMediaPreview] = useState(null);

  // وقتی mobileMedia تغییر کرد، پیش‌نمایش نمایش داده شود
  useEffect(() => {
    if (mobileMedia && typeof mobileMedia === "string" && !mobileMediaPreview) {
      setMobileMediaPreview(mobileMedia);
    }
  }, [mobileMedia, mobileMediaPreview]);

  return (
    <div className="space-y-4 flex flex-col items-center w-full">
      {/* پیش‌نمایش تصویر موبایل */}
      <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
        {mobileMediaPreview ? (
          <img
            src={mobileMediaPreview}
            alt="mobile-media"
            height={100}
            width={100}
            className="h-[100px] w-[100px] profile-pic rounded-full object-cover"
          />
        ) : (
          <SkeletonImage />
        )}
      </div>
      
      {/* آپلود تصویر موبایل */}
      <label htmlFor="mobileMedia" className="flex flex-col text-center gap-y-2">
        تصویر موبایل اسلایدر
        <ThumbnailUpload
          setThumbnailPreview={setMobileMediaPreview}
          setThumbnail={setMobileMedia}
          title="لطفاً یک تصویر موبایل انتخاب کنید"
          maxFiles={1}
          register={register("mobileMedia")}
          accept="image/*"
        />
      </label>
      
      {errors?.mobileMedia && (
        <span className="text-red-500 text-sm">{errors?.mobileMedia.message}</span>
      )}

      <div className="flex justify-between mt-12 w-full">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default MobileMediaStep;