import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useGetStoryQuery, useUpdateStoryMutation } from "@/services/story/storyApi";
import ThumbnailStep from "./ThumbnailStep";
import StepIndicator from "./StepIndicator";
import TitleStep from "./TitleStep";
import KeynotesStep from "./BannerStep";
import { useNavigate, useParams } from "react-router-dom";

const StepUpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setThumbnail] = useState(null);
  const { data: storyData, isLoading: isFetching } = useGetStoryQuery(id);
  const [updateStory, { isLoading, data, error }] = useUpdateStoryMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});

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

  useEffect(() => {
    if (storyData?.data) {
      const story = storyData.data;
      setValue("title", story.title);
      setValue("caption", story.caption);
      setValue("parent", story.parent?._id || "");
      setValue("order", story.order || "");

      if (story.media?.url) {
        setThumbnail(story.media.url);
      }
    }
  }, [storyData, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Only append media if a new file is selected
    if (media && typeof media !== 'string') {
      formData.append("media", media);
    }

    formData.append("parent", data.parent || "");
    formData.append("title", data.title);
    formData.append("caption", data.caption);
    formData.append("order", data.order);

    updateStory({ id, body: formData });
  };

  useEffect(() => {
    if (isFetching) {
      toast.loading("در حال دریافت اطلاعات استوری...", { id: "fetchStory" });
    }

    if (storyData && storyData?.acknowledgement) {
      toast.success(storyData?.caption, { id: "fetchStory" });
    }

    if (storyData && !storyData?.acknowledgement) {
      toast.error(storyData?.caption, { id: "fetchStory" });
    }
    
    if (isLoading) {
      toast.loading("در حال به‌روزرسانی استوری...", { id: "updateStory" });
    }

    if (data && data?.acknowledgement) {
      toast.success(data?.caption, { id: "updateStory" });
      navigate("/stories");
    }

    if (data && !data?.acknowledgement) {
      toast.error(data?.caption, { id: "updateStory" });
    }

    if (error?.data) {
      toast.error(error?.data?.caption, { id: "updateStory" });
    }
  }, [isFetching, storyData, isLoading, data, error, navigate]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً عنوان استوری را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger(["caption", "order"]);
        if (!valid) {
          toast.error("لطفاً توضیحات و ترتیب استوری را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;

      case 3:
        valid = true; // No specific validation needed for this step
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
      media: 1,
      title: 2,
      caption: 3,
      order: 2
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
        if (field === "media") {
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

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen w-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

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

export default StepUpdateStory;