
import { useState } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";

const ThumbnailStep = ({
  nextStep,
  errors,
  register,
  thumbnail,
  setThumbnail
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="profile-container shine-effect rounded-full flex justify-center mb-4">
          {thumbnailPreview ? (
            <img
              src={thumbnailPreview}
              alt="standard"
              height={100}
              width={100}
              className="h-[100px] w-[100px] profile-pic rounded-full"
            />
          ) : (
            <SkeletonImage />
          )}
        </div>
        <label
          htmlFor="thumbnail"
          className="flex flex-col text-center gap-y-2"
        >
          تصویر استاندارد
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            title={"لطفا یک تصویر انتخاب کنید"}
            maxFiles={1}
            register={register("thumbnail")}
          />
        </label>
        {errors?.thumbnail && (
          <span className="text-red-500 text-sm">
            {errors?.thumbnail.message}
          </span>
        )}
      </div>
      <label htmlFor="referenceUrl" className="flex flex-col gap-y-1">
          <span className="text-sm"> لینک مطالعه بیشتر</span>
          <input
            type="text"
            name="referenceUrl"
            id="referenceUrl"
            {...register("referenceUrl", {
              minLength: {
                value: 3,
                message: " لینک مطالعه بیشتر باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 30,
                message: " لینک مطالعه بیشتر نباید بیشتر از ۳۰ حرف باشد"
              }
            })}
            placeholder="الزامی نیست"
            maxLength="100"
            className="p-2 rounded border "
          />
          {errors?.referenceUrl && (
            <span className="text-red-500 text-sm">
              {errors.referenceUrl.message}
            </span>
          )}
        </label>
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default ThumbnailStep;
