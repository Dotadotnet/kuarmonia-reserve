import { useState, useEffect } from "react";
import FormInput from "@/components/shared/input/FormInput";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import NavigationButton from "@/components/shared/button/NavigationButton";

const DesktopMediaStep = ({ desktopMedia, setDesktopMedia, setValue, register, errors, nextStep }) => {
  const [desktopMediaPreview, setDesktopMediaPreview] = useState(null);

  // وقتی desktopMedia تغییر کرد، پیش‌نمایش نمایش داده شود
  useEffect(() => {
    if (desktopMedia && typeof desktopMedia === "string" && !desktopMediaPreview) {
      setDesktopMediaPreview(desktopMedia);
    }
  }, [desktopMedia, desktopMediaPreview]);

  return (
    <div className="space-y-4 flex flex-col items-center w-full">
      {/* پیش‌نمایش تصویر دسکتاپ */}
      <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
        {desktopMediaPreview ? (
          <img
            src={desktopMediaPreview}
            alt="desktop-media"
            height={100}
            width={100}
            className="h-[100px] w-[100px] profile-pic rounded-full object-cover"
          />
        ) : (
          <SkeletonImage />
        )}
      </div>
      
      {/* آپلود تصویر دسکتاپ */}
      <label htmlFor="desktopMedia" className="flex flex-col text-center gap-y-2">
        تصویر دسکتاپ اسلایدر
        <ThumbnailUpload
          setThumbnailPreview={setDesktopMediaPreview}
          setThumbnail={setDesktopMedia}
          title="لطفاً یک تصویر دسکتاپ انتخاب کنید"
          maxFiles={1}
          register={register("desktopMedia")}
          accept="image/*"
        />
      </label>
      
      {errors?.desktopMedia && (
        <span className="text-red-500 text-sm">{errors?.desktopMedia.message}</span>
      )}
      <FormInput
        label="عنوان"
        id="title"
        placeholder="عنوان هرو اسلایدر را وارد کنید"
        register={register}
        error={errors.title}
        required="عنوان الزامی است"
      />
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default DesktopMediaStep;