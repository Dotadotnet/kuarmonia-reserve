import React, { useEffect, useMemo, useState } from "react";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import toast from "react-hot-toast";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";

const ThumbnailStep = ({
  nextStep,
  errors,
  register,
  thumbnail,
  setThumbnail,
  control
}) => {
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError
  } = useGetCategoriesQuery();
  const categories = useMemo(
    () =>
      fetchCategoriesData?.data?.map((category) => ({
        id: category._id,
        value: category.title,
        label: category.title,
        about: category.about
      })) || [],
    [fetchCategoriesData]
  );
  useEffect(() => {
    if (fetchingCategories) {
      toast.loading("در حال دریافت دسته بندی ...", { id: "fetchCategories" });
    }

    if (fetchCategoriesData) {
      toast.success(fetchCategoriesData?.about, {
        id: "fetchCategories"
      });
    }

    if (fetchCategoriesError) {
      toast.error(fetchCategoriesError?.data?.about, {
        id: "fetchCategories"
      });
    }
  }, [fetchCategoriesData, fetchCategoriesData, fetchCategoriesError]);
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
          تصویر همکار
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
      <div className="flex flex-col flex-1">
        <label htmlFor="category" className="flex flex-col gap-y-2">
          دسته بندی{" "}
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                value={value}
                onChange={onChange}
                items={categories}
                sendId={true}
                errors={errors?.category}
                className={"w-full h-12"}
              />
            )}
          />
        </label>
      </div>
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </>
  );
};

export default ThumbnailStep;
