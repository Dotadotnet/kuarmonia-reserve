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
  setFaqs
}) => {
  const [addService, { isLoading, data, error }] = useAddServiceMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});

  const totalSteps = 5;

  const onSubmit = async (data) => {
    const formData = new FormData();
    const extractIds = (arr) => JSON.stringify(arr.map((item) => item.id));

    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("icon", data.icon);
    formData.append("thumbnail", thumbnail);
    formData.append("tags", extractIds(data.tags));
    formData.append("category",data.category.id);
    formData.append("content", data.content);
    formData.append("roadmap",JSON.stringify(roadmap));
    formData.append("faqs",JSON.stringify(faqs));

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
        valid = await trigger("description");
        if (!valid) {
          toast.error("لطفاً توضیحات دسته بندی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;

      case 3:
        valid = await trigger("issuingOrganization");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("country");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("year");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 4:
        valid = await trigger("issuingOrganization");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("country");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("year");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
        case 5:
          valid = await trigger("issuingOrganization");
          if (!valid) {
            toast.error("لطفاً نکات کلیدی را وارد کنید");
            setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
            return;
          }
          valid = await trigger("country");
          if (!valid) {
            toast.error("لطفاً نکات کلیدی را وارد کنید");
            setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
            return;
          }
          valid = await trigger("year");
          if (!valid) {
            toast.error("لطفاً نکات کلیدی را وارد کنید");
            setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
            return;
          }
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
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
          />
        );
      case 3:
        return (
          <Step3
            control={control}
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            editorData={editorData}
            setEditorData={setEditorData}
          />
        );
      case 4:
        return (
          <Step4
            errors={errors}
            roadmap={roadmap}
            setRoadmap={setRoadmap}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return <Step5 errors={errors} faqs={faqs} setFaqs={setFaqs} />;

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
