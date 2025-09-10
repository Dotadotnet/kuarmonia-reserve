import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddStoryMutation } from "@/services/story/storyApi";
import ThumbnailStep from "./ThumbnailStep";
import StepIndicator from "./StepIndicator";
import TitleStep from "./TitleStep";
import KeynotesStep from "./BannerStep";
import { useNavigate } from "react-router-dom";

const StepAddStory = () => {
  const [media, setThumbnail] = useState(null);
  const [addStory, { isLoading, data, error }] = useAddStoryMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [tags, setTags] = useState([""]);

  const {
    register,
    setValue,
    reset,
    formState: { errors },
    trigger,
    handleSubmit,
    watch,
    control
  } = useForm({
    mode: "onChange",
  });
  const totalSteps = 3;

  const watchedFields = watch();

  const onSubmit = async (data) => {
      
    const extractIds = (arr) => JSON.stringify(arr.map((item) => item.id));

    const formData = new FormData();
console.log("Form Data:", data.banners);
    formData.append("media", media);
    formData.append("promoBanner",data.banners.id);
    formData.append("tags", extractIds(data.tags));
    formData.append("title", data.title);
    formData.append("caption", data.caption);

    addStory(formData);
  };
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن دسته بندی...", { id: "addStory" });
    }

    if (data && data?.acknowledgement) {
      toast.success(data?.description, { id: "addStory" });
      navigate("/stories");   
    }
    if (data && !data?.acknowledgement) {
      toast.error(data?.description, { id: "addStory" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "addStory" });
    }
  }, [isLoading, data, error]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("media");
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
      
        break;

      case 3:
        valid = await trigger("keynotes");
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
          <ThumbnailStep
            media={media}
            setThumbnail={setThumbnail}
            nextStep={nextStep}
            register={register}
            errors={errors.media}
          />
        );
      case 2:
        return (
          <TitleStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <KeynotesStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
          />
        );
      case 4:
        return (
          <TagsStep
            tags={tags}
            setTags={setTags}
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
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

  useEffect(() => {
    const fieldToStep = {
      avatar: 1,
      name: 2,
      email: 3,
      password: 4,
      phone: 5,
    };

    setInvalidSteps((prevInvalidSteps) => {
      const newInvalidSteps = { ...prevInvalidSteps };
      Object.keys(errors).forEach((field) => {
        const step = fieldToStep[field];
        if (step) {
          newInvalidSteps[step] = true;
        }
      });
      return JSON.stringify(prevInvalidSteps) !==
        JSON.stringify(newInvalidSteps)
        ? newInvalidSteps
        : prevInvalidSteps;
    });

    setCompletedSteps((prevCompletedSteps) => {
      const newCompletedSteps = { ...prevCompletedSteps };
      Object.entries(watchedFields).forEach(([field, value]) => {
        if (field === "avatar") {
          newCompletedSteps[fieldToStep[field]] = !!value;
        } else {
          newCompletedSteps[fieldToStep[field]] = value && value.length > 0;
        }
      });
      return JSON.stringify(prevCompletedSteps) !==
        JSON.stringify(newCompletedSteps)
        ? newCompletedSteps
        : prevCompletedSteps;
    });
  }, [errors, watchedFields]);

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

export default StepAddStory;
