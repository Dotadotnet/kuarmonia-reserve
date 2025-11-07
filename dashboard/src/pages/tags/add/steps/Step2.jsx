import React from "react";
import FormInput from "@/components/shared/input/FormInput";
import { useForm } from "react-hook-form";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step2 = ({ formData, handleInputChange, prevStep, nextStep }) => {
  const { register, formState: { errors } } = useForm();

  return (
    <div className="flex flex-col gap-6">
     
      
      <div className="w-full flex flex-col gap-y-4">
        <FormInput
          label="* عنوان"
          id="title"
          type="text"
          placeholder="عنوان تگ"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          error={errors?.title}
          required="وارد کردن عنوان الزامی است"
          minLength={{ value: 3, message: "عنوان باید حداقل ۳ حرف داشته باشد" }}
          maxLength={{ value: 100, message: "عنوان نباید بیشتر از ۱۰۰ حرف باشد" }}
        />

        <FormInput
          label="* توضیحات"
          id="description"
          type="textarea"
          placeholder="توضیحات تگ"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          error={errors?.description}
          required="وارد کردن توضیحات الزامی است"
          minLength={{ value: 10, message: "توضیحات باید حداقل ۱۰ حرف داشته باشد" }}
          maxLength={{ value: 1000, message: "توضیحات نباید بیشتر از ۱۰۰۰ حرف باشد" }}
          rows={4}
        />
      </div>
      
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step2;