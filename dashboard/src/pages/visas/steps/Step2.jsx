import { useEffect, useMemo } from "react";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { Controller } from "react-hook-form";
import { useGetVisaTypesQuery } from "@/services/visaType/visaTypeApi";
import Plus from "@/components/icons/Plus";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import SkeletonImage from "@/components/shared/skeleton/SkeletonImage";
import toast from "react-hot-toast";
import Tag from "@/components/icons/Tag";

const Step2 = ({
  register,
  errors,
  prevStep,
  nextStep,
  setThumbnail,
  thumbnailPreview,
  setThumbnailPreview,
  control
}) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError
  } = useGetTagsQuery({
    page: 1,
    limit: 1000, // Fetch a large number of tags instead of Infinity
    status: "all",
    search: ""
  });
  const {
    isLoading: fetchingVisaTypes,
    data: fetchVisaTypesData,
    error: fetchVisaTypesError
  } = useGetVisaTypesQuery();
  const visaTypes = useMemo(
    () =>
      fetchVisaTypesData?.data?.map((visaType) => ({
        id: visaType._id,
        value: visaType?.title || "",
        label: visaType.title,
        icon: visaType.icon
      })) || [],
    [fetchVisaTypesData]
  );
  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.title,
        label: tag.title,
        about: tag.about
      })),
    [fetchTagsData]
  );
  useEffect(() => {
    if (fetchingTags) {
      toast.loading("در حال دریافت تگ ها بندی ...", { id: "fetchTags" });
    }

    if (fetchTagsData) {
      toast.success(fetchTagsData?.about, {
        id: "fetchTags"
      });
    }

    if (fetchTagsError) {
      toast.error(fetchTagsError?.data?.about, {
        id: "fetchTags"
      });
    }
    if (fetchingVisaTypes) {
      toast.loading("در حال دریافت نوع  ویزا ...", { id: "fetchVisaTypes" });
    }

    if (fetchVisaTypesData) {
      toast.success(fetchVisaTypesData?.about, {
        id: "fetchVisaTypes"
      });
    }

    if (fetchVisaTypesError) {
      toast.error(fetchVisaTypesError?.data?.about, {
        id: "fetchVisaTypes"
      });
    }
  }, [
    fetchingTags,
    fetchTagsData,
    fetchTagsError,
    fetchVisaTypesData,
    fetchVisaTypesData,
    fetchVisaTypesError
  ]);

  return (
    <div className="flex flex-col  p-2">
    <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
      <div className="flex flex-col items-center ">
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
          تصویر ویزا
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            fullName={"لطفا یک تصویر انتخاب کنید"}
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
      <div className="flex flex-col gap-y-2 w-full  ">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="tags" className="flex flex-col gap-y-2 ">
              تگ‌ها
              <Controller
                control={control}
                name="tags"
                rules={{ required: "انتخاب تگ الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    items={tags}
                    selectedItems={value || []}
                    handleSelect={onChange}
                    icon={<Tag />}
                    placeholder="چند مورد انتخاب کنید"
                    className={"w-full h-12"}
                    returnType="id"
                  />
                )}
              />
            </label>
          </div>
        </div>
        {errors.tags && (
          <span className="text-red-500 text-sm">{errors.tags.message}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-2 w-full  ">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="visaType" className="flex flex-col gap-y-2 ">
              نوع  ویزا
              <Controller
                control={control}
                name="visaType"
                rules={{ required: "انتخاب نوع  ویزا الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    items={visaTypes}
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
        </div>
        {errors.visaType && (
          <span className="text-red-500 text-sm">
            {errors.visaType.message}
          </span>
        )}
      </div>
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step2;