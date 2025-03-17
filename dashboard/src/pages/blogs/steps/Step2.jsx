import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Modal from "@/components/shared/modal/Modal";
import RTEditor from "@/components/shared/editor/RTEditor";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step2 = ({
  setThumbnailPreview,
  setThumbnail,
  register,
  errors,
  nextStep,
  prevStep,
  control
}) => {
  const [editorData, setEditorData] = useState(``);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col text-center gap-y-2">
        <label htmlFor="gallery" className="flex flex-col text-right gap-y-2">
          تصویر پست کارت
          <ThumbnailUpload
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
            title="مجاز به انتخاب یک تصویر هستین"
            register={register("Thumbnail", {
              required: "آپلود تصویر عنوان الزامی است"
            })}
            maxFiles={1}
          />
        </label>
        {errors.gallery && (
          <span className="text-red-500 text-sm">{errors.gallery.message}</span>
        )}
      </div>

      <label
        htmlFor="content"
        className="flex flex-col gap-y-4 w-full h-[300px]"
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
                onClick={openModal}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 text-justify dark:text-white min-h-[280px]"
              />

              {errors.content && (
                <span className="text-red-500 text-sm">
                  {errors.content.message}
                </span>
              )}

              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                className="h-[90vh] !rounded-md !w-full !m-0"
              >
                <RTEditor
                  value={editorData}
                  onChange={(value) => {
                    setEditorData(value);
                    field.onChange(value);
                  }}
                />
                <div className="text-right mt-4">
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={closeModal}
                  >
                    ذخیره و بستن
                  </button>
                </div>
              </Modal>
            </>
          )}
        />
      </label>

      {/* دکمه‌های ناوبری */}
      <div className="flex justify-between mt-12 right-0 absolute bottom-2 w-full px-8">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step2;
