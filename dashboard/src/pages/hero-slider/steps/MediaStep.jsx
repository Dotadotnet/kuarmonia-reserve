import { useState, useEffect } from "react";
import FormInput from "@/components/shared/input/FormInput";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import NavigationButton from "@/components/shared/button/NavigationButton";

const MediaStep = ({ media, setMedia, setValue, register, errors, nextStep }) => {
  const [mediaPreview, setMediaPreview] = useState(null);

  // وقتی media تغییر کرد، پیش‌نمایش نمایش داده شود
  useEffect(() => {
    if (media && typeof media === "string" && !mediaPreview) {
      setMediaPreview(media);
    }
  }, [media, mediaPreview]);

  return (
    <div className="space-y-4 flex flex-col items-center w-full">
      {/* پیش‌نمایش تصویر */}
      <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
        {mediaPreview ? (
          <img
            src={mediaPreview}
            alt="media"
            height={100}
            width={100}
            className="h-[100px] w-[100px] profile-pic rounded-full object-cover"
          />
        ) : (
          <SkeletonImage />
        )}
      </div>

      {/* آپلود تصویر */}
      <label htmlFor="media" className="flex flex-col text-center gap-y-2">
        تصویر عنوان دسته‌بندی
        <ThumbnailUpload
          setThumbnailPreview={setMediaPreview}
          setThumbnail={setMedia}
          title="لطفاً یک تصویر انتخاب کنید"
          maxFiles={1}
          register={register("media")}
          accept="image/*"
        />
      </label>

      {errors?.media && (
        <span className="text-red-500 text-sm">{errors?.media.message}</span>
      )}

      <FormInput
        label="عنوان"
        id="title"
        placeholder="عنوان اسلایدر را وارد کنید"
        register={register}
        error={errors.title}
        required="زیرعنوان الزامی است"
      />

      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default MediaStep;