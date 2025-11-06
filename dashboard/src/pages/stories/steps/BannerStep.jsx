import { useGetAllStoriesQuery } from "@/services/story/storyApi";
import { Controller } from "react-hook-form";
import Plus from "@/components/icons/Plus";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useMemo } from "react";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import Tag from "@/components/icons/Tag";

const BannerStep = ({
  errors,
  control
}) => {

  // Fetch all stories (both parent and child)
  const {
    isLoading: fetchingAllStories,
    data: fetchAllStoriesData,
    error: fetchAllStoriesError
  } = useGetAllStoriesQuery();

  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError
  } = useGetTagsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });

  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.title?.fa,
        label: tag.title?.fa,
        about: tag.about
      })),
    [fetchTagsData]
  );

  // Map all stories for the dropdown
  const allStories = useMemo(
    () =>
      fetchAllStoriesData?.data?.map((story) => ({
        id: story._id,
        value: story.title,
        label: story.title
      })) || [],
    [fetchAllStoriesData]
  );

  return (
    <>
      <div className="flex flex-col gap-y-4 max-h-96 overflow-y-auto p-2">
        <div className="flex flex-col gap-y-2 w-full  ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="parent" className="flex flex-col gap-y-2 ">
                داستان والد
                <Controller
                  control={control}
                  name="parent"
                  render={({ field: { onChange, value } }) => (
                    <Dropdown
                      items={allStories}
                      placeholder="انتخاب داستان والد"
                      value={value}
                      handleSelect={(item) => onChange(item.id)} // ✅ فقط id رو بفرست
                      className="w-full mt-2"
                      height="py-3"
                      error={errors.parent}
                    />
                  )}


                />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن داستان جدید"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          </div>
          {errors.parent && (
            <span className="text-red-500 text-sm">
              {errors.parent.message}
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
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن تگ جدید"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>

      </div>

    </>
  );
};

export default BannerStep;