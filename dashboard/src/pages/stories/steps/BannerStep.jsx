import { useGetBannersQuery } from "@/services/banner/bannerApi";
import { Controller } from "react-hook-form";
import Plus from "@/components/icons/Plus";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useMemo } from "react";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import Tag from "@/components/icons/Tag";

const bannersStep = ({
  errors,
control
}) => {

  const {
    isLoading: fetchingBanners,
    data: fetchBannersData,
    error: fetchBannersError
  } = useGetBannersQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
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
          value: tag.translations[0].translation?.fields.title,
          label: tag.title,
          about: tag.about
        })),
      [fetchTagsData]
    );
  


  const banners = useMemo(
    () =>
      fetchBannersData?.data?.map((banner) => ({
        id: banner._id,
        value: banner.translations[0].translation?.fields.title,
        label: banner.title,
        icon: banner.icon
      })) || [],
    [fetchBannersData]
  );

  return (
    <>
    <div className="flex flex-col gap-y-4 max-h-96 overflow-y-auto p-2">
 <div className="flex flex-col gap-y-2 w-full  ">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="banners" className="flex flex-col gap-y-2 ">
              دسته بندی
              <Controller
                control={control}
                name="banners"
                rules={{ required: "انتخاب دسته بندی الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    items={banners}
                    selectedItems={value || []}
                    handleSelect={onChange}
                    placeholder="یک مورد انتخاب کنید"
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
              aria-label="افزودن دسته بندی جدید"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>
        </div>
        {errors.mainCategory && (
          <span className="text-red-500 text-sm">
            {errors.mainCategory.message}
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

export default bannersStep;
