import React, { useEffect, useMemo } from "react";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import Tag from "@/components/icons/Tag";
import toast from "react-hot-toast";
import { Controller } from "react-hook-form";

const FormTagsSelect = ({
  label,
  id,
  control,
  error,
  required = false,
  placeholder = "چند مورد انتخاب کنید",
  className = "w-full h-12"
}) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError
  } = useGetTagsQuery({
    page: 1,
    limit: 1000,
    status: "all",
    search: ""
  });

  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.title || "",
        label: tag.title,
        about: tag.about
      })) || [],
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
  }, [fetchingTags, fetchTagsData, fetchTagsError]);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <label htmlFor={id} className="flex flex-col gap-y-2">
        {label}
        <Controller
          control={control}
          name={id}
          rules={{ required: required && "انتخاب تگ الزامی است" }}
          render={({ field: { onChange, value } }) => (
            <MultiSelect
              items={tags}
              selectedItems={value || []}
              handleSelect={onChange}
              icon={<Tag />}
              placeholder={placeholder}
              className={className}
              returnType="id"
            />
          )}
        />
      </label>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
};

export default FormTagsSelect;