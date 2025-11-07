import React, { useEffect } from "react";
import FormItemList from "@/components/shared/input/FormItemList";
import NavigationButton from "@/components/shared/button/NavigationButton";
import SendButton from "@/components/shared/button/SendButton";

const Step3 = ({ formData, handleInputChange, addKeynotesPasteListener, prevStep, nextStep, isLoading }) => {
  useEffect(() => {
    const cleanup = addKeynotesPasteListener();
    return cleanup;
  }, [addKeynotesPasteListener]);

  return (
    <div className="flex flex-col gap-6">
     
      
      <FormItemList
        items={formData.keynotes}
        setItems={(items) => handleInputChange("keynotes", items)}
        label="کلمات کلیدی"
        placeholder="کلمه کلیدی را وارد کنید"
        className="w-full flex flex-col gap-y-4 p-4 border rounded max-h-96 overflow-y-auto"
        required={false}
      />
      
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">راهنمایی:</h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          می‌توانید چند کلمه کلیدی را با کاما از هم جدا کرده و در یک فیلد پیست کنید.
        </p>
      </div>
      
      <div className="flex justify-between mt-12">
        <SendButton isLoading={isLoading} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step3;