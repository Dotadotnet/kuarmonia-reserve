import React, { useState } from "react";
import { Controller } from "react-hook-form";
import Modal from "@/components/shared/modal/Modal";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import NavigationButton from "@/components/shared/button/NavigationButton";
import TextEditor from "@/components/shared/textEditor/TextEditor";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import Apply from "@/components/icons/Apply";
import ModalPortal from "@/components/shared/modal/ModalPortal";

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
  const [isOpen, setIsOpen] = useState(false);

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
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 text-justify dark:text-white "
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
    

      {/* دکمه‌های ناوبری */}
      <div className="flex justify-between mt-12 right-0 absolute bottom-2 w-full px-8">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step2;
