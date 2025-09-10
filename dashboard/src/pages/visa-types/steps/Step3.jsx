// components/signup/steps/PasswordStep.jsx

import { useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import Apply from "@/components/icons/Apply";
import TextEditor from "@/components/shared/textEditor/TextEditor";
import { Controller } from "react-hook-form";
import ModalPortal from "@/components/shared/modal/ModalPortal";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step3 = ({
  prevStep,
  nextStep,
  errors,
  control,
  editorData,
  setEditorData
}) => {
    const [isOpen, setIsOpen] = useState(false);
  
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };
  return (
    <>
      <div className="flex flex-col   p-2">
      <div className="flex flex-col  gap-y-4  overflow-y-auto p-2">
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
      </div>
      <div className="flex justify-between mt-12">
              <NavigationButton direction="next" onClick={nextStep} />
      
              <NavigationButton direction="prev" onClick={prevStep} />
            </div>
      </div>
    </>
  );
};

export default Step3;
