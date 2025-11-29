import NavigationButton from "@/components/shared/button/NavigationButton";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Plus from "@/components/icons/Plus";
import Modal from "@/components/shared/modal/Modal";
import toast from "react-hot-toast";
import TextEditor from "@/components/shared/textEditor/TextEditor";
import ModalPortal from "@/components/shared/modal/ModalPortal";
import Apply from "@/components/icons/Apply";
import FormTagsSelect from "@/components/shared/input/FormTagsSelect";
import FormCategorySelect from "@/components/shared/input/FormCategorySelect";
import { useGetNewsTypesQuery } from "@/services/newsType/newsTypeApi";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useMemo } from "react";

const Step2 = ({
  register,
  prevStep,
  nextStep,
  setGallery,
  control,
  errors,
  editorData,
  setEditorData
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: fetchingNewsTypes,
    data: fetchNewsTypesData,
    error: fetchNewsTypesError
  } = useGetNewsTypesQuery();

  const newsTypes = useMemo(
    () =>
      fetchNewsTypesData?.data?.map((newsType) => ({
        id: newsType._id,
        value: newsType.title,
        label: newsType.title,
        icon: newsType.icon
      })) || [],
    [fetchNewsTypesData]
  );

  useEffect(() => {
    if (fetchingNewsTypes) {
      toast.loading("در حال دریافت انواع خبر ...", { id: "fetchNewsTypes" });
    }

    if (fetchNewsTypesData) {
      toast.success(fetchNewsTypesData?.about, {
        id: "fetchNewsTypes"
      });
    }

    if (fetchNewsTypesError) {
      toast.error(fetchNewsTypesError?.data?.about, {
        id: "fetchNewsTypes"
      });
    }
  }, [fetchingNewsTypes, fetchNewsTypesData, fetchNewsTypesError]);

  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <FormTagsSelect
            label="تگ‌ها"
            id="tags"
            control={control}
            error={errors?.tags}
            required={true}
          />
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
      </div>

      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="newsType" className="flex flex-col gap-y-2">
              نوع خبر
              <Controller
                control={control}
                name="newsType"
                rules={{ required: "انتخاب نوع خبر الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    items={newsTypes}
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

      <div className="flex flex-col gap-y-2 w-full">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <FormCategorySelect
            label="دسته بندی"
            id="category"
            control={control}
            error={errors?.category}
            required={true}
          />
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
      </div>

      <label
        htmlFor="content"
        className="flex flex-col gap-y-4 w-full h-[200px]"
      >
        * محتوا
        <Controller
          name="content"
          control={control}
          rules={{ required: "محتوا الزامی است" }}
          render={({ field }) => (
            <>
              <textarea
                {...field}
                value={stripHtmlTags(editorData)}
                placeholder="برای ویرایش کلیک کنید..."
                readOnly
                rows={24}
                onClick={() => setIsOpen(true)}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 text-justify dark:text-white"
              />

              {errors.content && (
                <span className="text-red-500 text-sm">
                  {errors.content.message}
                </span>
              )}
              <ModalPortal>
                <Modal
                  isOpen={isOpen}
                  onOpen={() => setIsOpen(true)}
                  onClose={() => setIsOpen(false)}
                  className=" md:!w-2/3 !w-full h-full !p-1 !mx-0 !rounded-none"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute apply-button bottom-4 right-4 z-50 md:hidden   n-600 rounded-full w-16 h-16 flex items-center justify-center"
                  >
                    <Apply className="!w-10 !h-10" />
                  </button>
                  <TextEditor
                    value={editorData}
                    onChange={(value) => {
                      setEditorData(value);
                      field.onChange(value);
                    }}
                  />
                </Modal>
              </ModalPortal>
            </>
          )}
        />
      </label>

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step2;