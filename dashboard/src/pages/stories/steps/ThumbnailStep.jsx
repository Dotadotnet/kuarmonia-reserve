import { useState, useEffect } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";

const ThumbnailStep = ({ nextStep, errors, register, media, setThumbnail }) => {
  const [mediaPreview, setThumbnailPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null); // برای تشخیص نوع فایل

  // When media prop changes (especially when it's a URL string for existing media)
  useEffect(() => {
    if (media && typeof media === 'string' && !mediaPreview) {
      setThumbnailPreview(media);
      // Determine media type based on file extension
      if (media.match(/\.(mp4|webm|ogg|mov)$/i)) {
        setMediaType('video');
      } else {
        setMediaType('image');
      }
    }
  }, [media, mediaPreview]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
          {mediaPreview ? (
            mediaType?.startsWith("video") ? (
              <video
                src={mediaPreview}
                controls
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <img
                src={mediaPreview}
                alt="media"
                height={100}
                width={100}
                className="h-[100px] w-[100px] profile-pic rounded-full object-cover"
              />
            )
          ) : (
            <SkeletonImage />
          )}
        </div>

        <label htmlFor="media" className="flex flex-col text-center gap-y-2">
          تصویر یا ویدئو عنوان دسته بندی
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={(file) => {
              setThumbnail(file);
              if (file && file.type) {
                setMediaType(file.type);
              } else if (file && typeof file === 'string') {
                // When setting a URL string
                if (file.match(/\.(mp4|webm|ogg|mov)$/i)) {
                  setMediaType('video');
                } else {
                  setMediaType('image');
                }
              }
            }}
            title={"لطفا یک تصویر یا ویدئو انتخاب کنید"}
            maxFiles={1}
            register={register("media")}
            accept="image/*,video/*" // اجازه آپلود عکس و ویدئو
          />
        </label>

        {errors?.media && (
          <span className="text-red-500 text-sm">{errors?.media.message}</span>
        )}
      </div>

      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default ThumbnailStep;