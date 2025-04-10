import React, { useMemo, useState } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import ReactStars from "react-rating-stars-component";
import { useGetVenueTypesQuery } from "@/services/venueType/venueTypeApi";
import {
  useGetCeremonyTypesQuery,
} from "@/services/ceremonyType/ceremonyTypeApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { Controller } from "react-hook-form";

const Step1 = ({
  nextStep,
  errors,
  register,
  setThumbnail,
  setThumbnailPreview,
  setValue,
  control
}) => {
  const {
    isLoading: fetchingVenueTypes,
    data: fetchVenueTypesData,
    error: fetchVenueTypesError
  } = useGetVenueTypesQuery();
  const {
    isLoading: fetchingCeremonyTypes,
    data: fetchCeremonyTypesData,
    error: fetchCeremonyTypesError
  } = useGetCeremonyTypesQuery();
  const venueTypes = useMemo(
    () =>
      fetchVenueTypesData?.data?.map((venueType) => ({
        id: venueType._id,
        value: venueType.title,
        label: venueType.title,
        description: venueType.description,
        icon: venueType.icon,
      })),
    [fetchVenueTypesData]
  );
  const ceremonyTypes = useMemo(
    () =>
      fetchCeremonyTypesData?.data?.map((ceremonyType) => ({
        id: ceremonyType._id,
        value: ceremonyType.title,
        label: ceremonyType.title,
        description: ceremonyType.description,
        icon: ceremonyType.icon,
      })),
    [fetchCeremonyTypesData]
  );
  const [star, setstar] = useState(0);
  const handlestarChange = (rate) => {
    setstar(rate);
    setValue && setValue("star", rate);
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <label
          htmlFor="thumbnail"
          className="flex flex-col text-center gap-y-2"
        >
          تصویر کارت
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
      <label htmlFor="title" className="flex flex-col gap-y-1">
        <span className="text-sm">* عنوان </span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "عنوان  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="عنوان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>
      <label htmlFor="summary" className="w-full flex flex-col gap-y-1">
        <span className="text-sm">خلاصه*</span>
        <input
          type="text"
          name="summary"
          id="summary"
          maxLength="500"
          {...register("summary", {
            required: "وارد کردن خلاصه الزامی است",
            minLength: {
              value: 50,
              message: "خلاصه باید حداقل ۵۰ کاراکتر باشد"
            },
            maxLength: {
              value: 500,
              message: "خلاصه نباید بیشتر از ۵۰۰ کاراکتر باشد"
            }
          })}
          required
        />
        {errors?.summary && (
          <span className="text-red-500 text-sm">{errors.summary.message}</span>
        )}
      </label>
      <div className="flex flex-col flex-1">
        <label htmlFor="venueTypes" className="flex flex-col gap-y-2 ">
          نوع محل مراسم
          <Controller
            control={control}
            name="venueTypes"
            rules={{ required: "انتخاب نوع محل مراسم الزامی است" }}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                items={venueTypes}
                selectedItems={value || []}
                handleSelect={onChange}
                placeholder="چند مورد انتخاب کنید"
                className={"w-full h-12"}
                returnType="id"
              />
            )}
          />
        </label>
      </div>
      <div className="flex flex-col flex-1">
        <label htmlFor="ceremonyTypes" className="flex flex-col gap-y-2 ">
          نوع  مراسم
          <Controller
            control={control}
            name="ceremonyTypes"
            rules={{ required: "انتخاب نوع  مراسم الزامی است" }}
            render={({ field: { onChange, value } }) => (
              <MultiSelect
                items={ceremonyTypes}
                selectedItems={value || []}
                handleSelect={onChange}
                placeholder="چند مورد انتخاب کنید"
                className={"w-full h-12"}
                returnType="id"
              />
            )}
          />
        </label>
      </div>
      <div className="flex flex-col gap-y-2">
        <span className="text-sm">چند ستاره است ؟ (۱ تا ۵ ستاره) *</span>
        <ReactStars
          count={5}
          value={star}
          onChange={handlestarChange}
          size={24}
          activeColor="gold"
        />
      </div>
      <div className="flex justify-start 2">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default Step1;
