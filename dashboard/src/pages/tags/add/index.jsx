import { useState, useEffect } from "react";
import { useAddTagMutation } from "@/services/tag/tagApi";
import { toast } from "react-hot-toast";
import BackButton from "@/components/shared/button/BackButton";
import SendButton from "@/components/button/SendButton";
import ToggleThemeButton from "@/components/ThemeToggle";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

const AddTag = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keynotes: [""],
    thumbnail: null,
    thumbnailPreview: null
  });

  const [addTag, { isLoading, data, error }] = useAddTagMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن تگ...", { id: "add-tag" });
    }

    if (data) {
      toast.success(data?.description, { id: "add-tag" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "add-tag" });
    }
  }, [isLoading, data, error]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("keynotes", JSON.stringify(formData.keynotes));
    
    if (formData.thumbnail) {
      data.append("thumbnail", formData.thumbnail);
    }

    await addTag(data);
  };

  return (
    <section className="relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center items-center p-4">
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="flex flex-row items-center gap-x-2">
        <BackButton to={-1} />
      </div>
      
      <div className="max-w-2xl w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-5 sm:p-8 rounded-primary shadow-lg z-10">
        <div className="w-full">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">افزودن تگ جدید</h2>
            <div className="flex gap-2">
              <ToggleThemeButton />
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 dark:bg-gray-700">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>مرحله {step} از 3</span>
              <span>
                {step === 1 && "تصویر تگ"}
                {step === 2 && "عنوان و توضیحات"}
                {step === 3 && "کلمات کلیدی"}
              </span>
            </div>
          </div>
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 3) {
                handleSubmit();
              } else {
                nextStep();
              }
            }}
            className="w-full"
            encType="multipart/form-data"
          >
            {step === 1 && (
              <Step1 
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            
            {step === 2 && (
              <Step2 
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            
            {step === 3 && (
              <Step3 
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                >
                  قبلی
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  بعدی
                </button>
              ) : (
                <SendButton isLoading={isLoading} />
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddTag;