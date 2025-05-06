import React, { useState } from "react";
import ModalPortal from "@/components/shared/modal/ModalPortal";
import Modal from "@/components/shared/modal/Modal";
import { Controller } from "react-hook-form";
import TextEditor from "@/components/shared/textEditor/TextEditor";

const Step2 = ({ setEditorData, register, errors ,control,editorData  }) => {
    const [isOpen, setIsOpen] = useState(false);
  
  const stripHtmlTags = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  };

  return (
    <div className="w-full max-h-128 flex flex-col gap-y-2">
      <label htmlFor="title" className="flex flex-col  gap-y-1 w-full">
        <span className="text-sm">عنوان ملک را وارد کنید</span>
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
              value: 45,
              message: "عنوان نباید بیشتر از ۴۵ حرف باشد"
            }
          })}
          placeholder="عنوان ملک"
          maxLength="50"
          className="p-2 rounded border w-full"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>

      <label htmlFor="summary" className="flex flex-col gap-y-1 w-full">
        <span className="text-sm">خلاصه ای از ملک را وارد کنید</span>
        <input
          type="text"
          name="summary"
          id="summary"
          {...register("summary", {
            required: "وارد کردن خلاصه الزامی است",
            minLength: {
              value: 3,
              message: "خلاصه باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 150,
              message: "خلاصه نباید بیشتر از ۱۵۰ حرف باشد"
            }
          })}
          placeholder="خلاصه ملک"
          maxLength="150"
          className="p-2 rounded border w-full"
        />
        {errors.summary && (
          <span className="text-red-500 text-sm">{errors.summary.message}</span>
        )}
      </label>
      <label
        htmlFor="content"
        className="flex flex-col gap-y-4 w-full h-[150px]"
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
                rows={8}
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
                  className=" md:!w-2/3 !w-full h-full !p-1 overflow-y-auto !mx-0 !rounded-none"
                >
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
      <label htmlFor="createDate" className="flex flex-col gap-y-2 w-full">
       عمر ساختمان
        <input
          type="number"
          name="createDate"
          id="createDate"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("createDate", {
            required: "عمر ساخت الزامی است",
            pattern: {
              value: /^\d{1,2}$/, // فقط سال 4 رقمی را قبول می‌کند
              message: "لطفاً سال را به درستی وارد کنید"
            }
          })}
        />
        {errors.createDate && (
          <span className="text-red-500 text-sm">
            {errors.createDate.message}
          </span>
        )}
      </label>
     
    </div>
  );
};

export default Step2;
