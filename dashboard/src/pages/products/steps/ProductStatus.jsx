import React, { useMemo, useEffect, useCallback } from "react";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import { toast } from "react-hot-toast";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import Tag from "@/components/icons/Tag";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import Plus from "@/components/icons/Plus";

const ProductStatus = ({
  register,
  errors,
  selectedOptions,
  setSelectedOptions,
  setIsAddModalOpen, // کنترل مودال افزودن تگ
}) => {
  // دریافت لیست تگ‌ها از API
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError,
    refetch: refetchTags,
  } = useGetTagsQuery();

  // تبدیل داده‌های دریافتی به فرمت مناسب برای MultiSelect
  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.title,
        label: tag.title,
        description: tag.description,
      })) || [],
    [fetchTagsData]
  );

  // تابع برای به‌روزرسانی لیست تگ‌ها بعد از افزودن تگ جدید
  const refreshTags = useCallback(() => {
    refetchTags();
  }, [refetchTags]);

  // مدیریت تغییرات انتخابی
  const handleOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  // نمایش وضعیت دریافت تگ‌ها
  useEffect(() => {
    if (fetchingTags) {
      toast.loading("در حال دریافت تگ‌ها ...", { id: "fetchTags" });
    } else if (fetchTagsData) {
      toast.success(fetchTagsData?.description, { id: "fetchTags" });
    } else if (fetchTagsError) {
      toast.error(fetchTagsError?.data?.description, { id: "fetchTags" });
    }
  }, [fetchingTags, fetchTagsData, fetchTagsError]);

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="flex items-center justify-center gap-x-2 p-4 border rounded">
        <label htmlFor="tag" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">برچسب*</span>
          <MultiSelect
            items={tags}
            selectedItems={selectedOptions}
            handleSelect={handleOptionsChange}
            className="w-full"
            name="tags"
            icon={<Tag size={24} />}
          />
        </label>
        <div className="mt-7 flex justify-start">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
            aria-label="افزودن تگ جدید"
          >
            <Plus />
          </button>
        </div>
      </div>
      <StatusSwitch label="آیا این محصول ویژه است" id="isFeatured" register={register} />
    </div>
  );
};

export default ProductStatus;
