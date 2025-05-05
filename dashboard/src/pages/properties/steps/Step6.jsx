// Step4.js
import React from "react";
import {  Controller } from "react-hook-form";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import Plus from "@/components/icons/Plus";
import Tag from "@/components/icons/Tag";

const Step6 = ({ register, errors, control ,setCitizenshipStatus}) => {
  const { data: categoriesData} =
  useGetCategoriesQuery();
  const { data: tagsData, refetch: refetchTags } =
  useGetTagsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const categories = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : [];
  const tags = Array.isArray(tagsData?.data) ? tagsData.data : [];

  const categoryOptions = categories?.map((category) => ({
    id: category._id,
    value: category.translations[0].translation?.fields.title,
    description: category.translations[0].translation?.fields.description
  }));
  const tagsOptions = tags?.map((tag) => ({
    id: tag._id,
    value: tag.translations[0].translation?.fields.title,
    description: tag.translations[0].translation?.fields.description
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
                    <MultiSelect
                      items={tagsOptions}
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
                className="p-4 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن تگ جدید"
              >
                <Plus />
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
                    <Dropdown
                      items={categoryOptions}
                      handleSelect={onChange}
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
                <Plus />
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
