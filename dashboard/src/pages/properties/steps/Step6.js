// Step4.js
import React from "react";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
import { useFieldArray, Controller } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import { TagIcon } from "@/utils/SaveIcon";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
const Step6 = ({ register, errors, control ,setCitizenshipStatus}) => {
  const { data: categoriesData, refetch: refetchCategories } =
    useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData, refetch: refetchTags } =
    useGetTagsForDropDownMenuQuery();
  const categories = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];

  const categoryOptions = categories?.map((category) => ({
    id: category._id,
    value: category.title,
    description: category.description
  }));
  const tagsOptions = tags?.map((tag) => ({
    id: tag._id,
    value: tag.title,
    description: tag.description
  }));

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-2 gap-y-4 w-full">
        {/* بخش تگ‌ها */}
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 ">
                تگ‌ها
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: "انتخاب تگ الزامی است" }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelectDropdown
                      items={tagsOptions}
                      selectedItems={value || []}
                      handleSelect={onChange}
                      icon={<TagIcon />}
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
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن تگ جدید"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>

        {/* بخش دسته‌بندی */}
        <div className="flex flex-col gap-y-2 w-full ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="category" className="flex flex-col gap-y-2">
                دسته‌بندی
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: "انتخاب دسته‌بندی الزامی است" }}
                  render={({ field: { onChange, value } }) => (
                    <SearchableDropdown
                      items={categoryOptions}
                      handleSelect={onChange}
                      value={value}
                      sendId={true}
                      errors={errors.category}
                      className={"w-full h-12"}
                    />
                  )}
                />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن دسته‌بندی جدید"
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start gap-y-2 w-full ">

   
        <StatusSwitch
          label={"آیا این ملک ویژه است؟"}
          id="isFeatured"
          register={register}
          defaultChecked={false}
        />
        <StatusSwitch
          label={"آیا خذ شهروندی دارد؟"}
          description={
            " تمام حقوق و مسئولیت‌های یک شهروند را به فرد می‌دهد و به فرد حق انتخاب شدن و انتخاب کردن در انتخابات را می‌دهد."
          }
          id="citizenship"
          register={register}
          onChange={()=>setCitizenshipStatus("citizenship")}
          defaultChecked={false}
        />
        <StatusSwitch
          label={"آیا ملک اخذ اقامت دارد؟"}
          description={
            "به فرد اجازه می‌دهد در کشور میزبان زندگی کند و معمولاً حق کار و تحصیل را نیز به او می‌دهد."
          }
          id="residency"
          onChange={()=>setCitizenshipStatus("residency")}

          register={register}
          defaultChecked={false}
        />
        <StatusSwitch
          label={"آیا ملک اخذ ویزای طلایی دارد؟"}
          description={
            "این ویزا به فرد اجازه اقامت موقت یا دائم در کشور میزبان را می‌دهد و معمولاً به ازای سرمایه‌گذاری در کشور است."
          }
          id="goldenVisa"
          register={register}
          onChange={()=>setCitizenshipStatus("goldenVisa")}
          defaultChecked={false}
        />
      </div>
      </div>
    </>
  );
};

export default Step6;
