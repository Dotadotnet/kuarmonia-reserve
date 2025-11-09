import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAddTagMutation } from "@/services/tag/tagApi";
import { useNavigate } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import StepIndicator from "./StepIndicator";

const StepAddTag = () => {
  const navigate = useNavigate();
  const [addTag, { isLoading, data, error }] = useAddTagMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keynotes: [""],
    thumbnail: null,
    thumbnailPreview: null
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن تگ...", { id: "add-tag" });
    }

    if (data && data?.acknowledgement) {
      toast.success(data?.description, { id: "add-tag" });
      navigate("/tags");
    }

    if (data && !data?.acknowledgement) {
      toast.error(data?.description, { id: "add-tag" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "add-tag" });
    }
  }, [isLoading, data, error, navigate]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        // Validation for step 1 (thumbnail) - optional step, always valid
        valid = true;
        break;
      case 2:
        // Validation for step 2 (title and description)
        if (!formData.title || formData.title.length < 3) {
          toast.error("لطفاً عنوان تگ را وارد کنید (حداقل ۳ حرف)");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        if (!formData.description || formData.description.length < 10) {
          toast.error("لطفاً توضیحات تگ را وارد کنید (حداقل ۱۰ حرف)");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 3:
        // Validation for step 3 (keynotes) - optional step, always valid
        valid = true;
        break;
      default:
        break;
    }

    if (valid) {
      setCompletedSteps((prev) => ({ ...prev, [currentStep]: true }));
      setInvalidSteps((prev) => ({ ...prev, [currentStep]: false }));
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  
  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  
  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleInputChange={handleInputChange}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleInputChange={handleInputChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleInputChange={handleInputChange}
            prevStep={prevStep}
            nextStep={handleSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };
  
  const handleStepClick = async (step) => {
    if (step < currentStep) {
      setCurrentStep(step);
    } else if (step > currentStep) {
      let canProceed = true;
      for (let i = 1; i < step; i++) {
        if (!completedSteps[i]) {
          canProceed = false;
          toast.error(`لطفاً ابتدا مرحله ${i} را تکمیل کنید.`);
          setCurrentStep(i);
          break;
        }
      }
      if (canProceed) {
        setCurrentStep(step);
      }
    }
  };

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
    
    // Only append thumbnail if a new one is selected
    if (formData.thumbnail && formData.thumbnail.name) {
      data.append("thumbnail", formData.thumbnail);
    }

    await addTag(data);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (currentStep === 3) {
          handleSubmit();
        }
      }}
      className="w-full max-w-xl flex flex-col gap-y-4"
    >
      <StepIndicator
        currentStep={currentStep}
        totalSteps={3}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
        invalidSteps={invalidSteps}
      />

      {renderStepContent(currentStep)}
    </form>
  );
};

export default StepAddTag;