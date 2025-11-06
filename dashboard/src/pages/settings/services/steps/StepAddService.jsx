import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddServiceMutation } from "@/services/service/serviceApi";
import Step1 from "./Step1";
import StepIndicator from "./StepIndicator";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { useNavigate } from "react-router-dom";

const StepAddService = ({
  watch,
  editorData,
  setEditorData,
  thumbnail,
  setThumbnail,
  thumbnailPreview,
  setThumbnailPreview,
  register,
  errors,
  handleSubmit,
  trigger,
  control,
  roadmap,
  setRoadmap,
  faqs,
  setFaqs,
  whatYouWillRead,
  setWhatYouWillRead
}) => {
  const [addService, { isLoading, data, error }] = useAddServiceMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});

  const totalSteps = 6;

  const onSubmit = async (data) => {
    const formData = new FormData();
    const extractIds = (arr) => JSON.stringify(arr.map((item) => item.id));

    // Send only Farsi content - backend handles translation
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("icon", data.icon);
    formData.append("thumbnail", thumbnail);
    formData.append("tags", extractIds(data.tags));
    formData.append("category", data.category.id);
    formData.append("content", editorData);
    formData.append("roadmap", JSON.stringify(roadmap));
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("whatYouWillRead", JSON.stringify(whatYouWillRead));

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    addService(formData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن  خدمت...", { id: "add-service" });
    }

    if (data) {
      toast.success(data?.description, { id: "add-service" });
      navigate(-1);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "add-service" });
    }
  }, [isLoading, data, error]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("thumbnail");
        if (!valid) {
          toast.error("لطفاً تصویر بند انگشتی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً عنوان دسته بندی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("summary");
        if (!valid) {
          toast.error("لطفاً خلاصه دسته بندی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;

      case 3: // What You'll Read step (moved to position 3)
        valid = true;
        break;
      case 4: // Content editing step (moved from position 3)
        valid = await trigger("content");
        if (!valid) {
          toast.error("لطفاً محتوا را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 5: // Roadmap step (moved from position 4)
        valid = true;
        break;
      case 6: // FAQ step (moved from position 5)
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
            nextStep={nextStep}
            register={register}
            watch={watch}
            errors={errors.thumbnail}
          />
        );
      case 2:
        return (
          <Step2
            register={register}
            errors={errors}
            setThumbnail={setThumbnail}
            setThumbnailPreview={setThumbnailPreview}
            thumbnailPreview={thumbnailPreview}
            control={control}
          />
        );
      case 3: // What You'll Read step (moved to position 3)
        return (
          <Step3
            whatYouWillRead={whatYouWillRead}
            setWhatYouWillRead={setWhatYouWillRead}
          />
        );
      case 4: // Content editing step (moved from position 3)
        return (
          <Step4
            control={control}
            register={register}
            errors={errors}
            editorData={editorData}
            setEditorData={setEditorData}
          />
        );
      case 5: // Roadmap step (moved from position 4)
        return (
          <Step5
            errors={errors}
            roadmap={roadmap}
            setRoadmap={setRoadmap}
          />
        );
      case 6: // FAQ step (moved from position 5)
        return (
          <Step6 
            errors={errors} 
            faqs={faqs} 
            setFaqs={setFaqs} 
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

  return (
    <form
      action=""
      className="w-full max-w-xl  flex flex-col gap-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
        invalidSteps={invalidSteps}
      />

      {renderStepContent(currentStep)}

      {currentStep > 1 && currentStep < totalSteps && (
        <div className="flex justify-between mt-12">
          <NavigationButton direction="next" onClick={nextStep} />
          <NavigationButton direction="prev" onClick={prevStep} />
        </div>
      )}
      
      {currentStep === totalSteps && (
        <div className="flex justify-between mt-12">
          <SendButton />
          <NavigationButton direction="prev" onClick={prevStep} />
        </div>
      )}
    </form>
  );
};

export default StepAddService;