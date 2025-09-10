import { useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import Modal from "@/components/shared/modal/Modal";
import Apply from "@/components/icons/Apply";
import TextEditor from "@/components/shared/textEditor/TextEditor";
import { Controller } from "react-hook-form";
import ModalPortal from "@/components/shared/modal/ModalPortal";
const Step1 = ({ nextStep, errors, register ,  control,
  editorData,
  setEditorData }) => {
    const [isOpen, setIsOpen] = useState(false);
  
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };
  return (

    <div className="flex flex-col   p-2">
    <div className="flex flex-col overflow-y-auto h-96 p-2">
      <label htmlFor="title" className="flex flex-col gap-y-1">
        <span className="text-sm">* عنوان  ویزا</span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "عنوان  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="عنوان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.title && (
          <span className="text-red-500 text-sm">{errors?.title.message}</span>
        )}
      </label>
      <label htmlFor="summary" className="flex flex-col gap-y-2 w-full">
        خلاصه
        <textarea
          name="summary"
          id="summary"
          maxLength={160}
          rows={2}
          placeholder="خلاصه مجله را وارد کنید..."
          className="p-2 rounded 
       border w-full form-textarea"
          {...register("summary", {
            // اصلاح نام فیلد
            required: "خلاصه الزامی است",
            minLength: {
              value: 30,
              message: "خلاصه باید حداقل ۳۰ کاراکتر باشد"
            },
            maxLength: {
              value: 225,
              message: "خلاصه نباید بیشتر از ۲۲۵ کاراکتر باشد"
            }
          })}
        />
        {errors?.summary && (
          <span className="text-red-500 text-sm">
            {errors?.summary.message}
          </span>
        )}
      </label>
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
      <div className="flex justify-start ">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step1;
