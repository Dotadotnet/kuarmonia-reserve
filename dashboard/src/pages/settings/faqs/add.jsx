// AddFaq.jsx
import { Controller, useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddFaqMutation, useUpdateFaqMutation } from "@/services/faq/faqApi";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useSelector } from "react-redux";
import AddButton from "@/components/shared/button/AddButton";
import { FaPlus } from "react-icons/fa";
import MultiSelectDropdown from "@/components/shared/multiSelectDropdown/MultiSelectDropdown";
import { useGetCategoriesForDropDownMenuQuery } from "@/services/category/categoryApi";
import { useGetTagsForDropDownMenuQuery } from "@/services/tag/tagApi";
import { TagIcon } from "@/utils/SaveIcon";
import SearchableDropdown from "@/components/shared/dropdownmenu/SearchableDropdown";
const AddFaq = ({}) => {
  const { register, handleSubmit, reset, control,formState: { errors }  } = useForm();
  const [addFaq, { isLoading: isAdding, data: addData, error: addError }] =
    useAddFaqMutation();
  const [isOpen, setIsOpen] = useState(false);
  const { data: categoriesData, refetch: refetchCategories } =
    useGetCategoriesForDropDownMenuQuery();
  const { data: tagsData, refetch: refetchTags } =
    useGetTagsForDropDownMenuQuery();
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );
  const tags = useMemo(() => tagsData?.data || [], [tagsData]);

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

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال ارسال ...", { id: "faq-loading" });
    }

    if (addData && !isAdding) {
      toast.dismiss("faq-loading");
      reset();
      setIsOpen(false);
    }

    if (addError?.data) {
      toast.error(addError?.data?.message, { id: "faq-loading" });
    }
  }, [addData, addError, isAdding]);

  const handleAddFaq = (data) => {
    const requestData = {
      question: data.question,
      answer: data.answer,
      category: data.category,  
      tags: data.tags, 
    };
    addFaq(requestData);  
  };
  

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4"
            onSubmit={handleSubmit(handleAddFaq)}
          >
            <div className="flex gap-4 flex-col">
              <label htmlFor="question" className="flex flex-col gap-y-2">
                سوال
                <input
                  type="text"
                  name="question"
                  id="question"
                  maxLength={160}
                  placeholder=" سوال را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("question", { required: true })}
                />
              </label>
            </div>
            <div className="flex gap-4 flex-col">
              <label htmlFor="answer" className="flex flex-col gap-y-2">
                پاسخ
                <input
                  type="text"
                  name="answer"
                  id="answer"
                  maxLength={160}
                  placeholder="  پاسخ را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("answer", { required: true })}
                />
              </label>
            </div>
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
                <span className="text-red-500 text-sm">
                  {errors.tags.message}
                </span>
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
            <Button type="submit" className="py-2 mt-4">
              "ایجاد کردن
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddFaq;
