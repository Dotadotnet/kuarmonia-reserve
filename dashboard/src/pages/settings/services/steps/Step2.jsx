// components/signup/steps/NameStep.jsx

import { useEffect } from "react";
import FormThumbnailUpload from "@/components/shared/input/FormThumbnailUpload";
import FormTagsSelect from "@/components/shared/input/FormTagsSelect";
import FormCategorySelect from "@/components/shared/input/FormCategorySelect";

const Step2 = ({
  register,
  errors,
  setThumbnail,
  thumbnailPreview,
  setThumbnailPreview,
  control
}) => {
  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
      <FormThumbnailUpload
        label="تصویر عضو"
        id="thumbnail"
        register={register}
        error={errors?.thumbnail}
        setThumbnail={setThumbnail}
        thumbnailPreview={thumbnailPreview}
        setThumbnailPreview={setThumbnailPreview}
        fullName={"لطفا یک تصویر انتخاب کنید"}
        maxFiles={1}
      />
      
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <FormTagsSelect
            label="تگ‌ها"
            id="tags"
            control={control}
            error={errors?.tags}
            required={true}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <FormCategorySelect
            label="دسته بندی"
            id="category"
            control={control}
            error={errors?.category}
            required={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;