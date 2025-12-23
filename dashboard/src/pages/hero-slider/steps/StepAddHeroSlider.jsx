import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import { useAddHeroSliderMutation } from "@/services/heroSlider/heroSliderApi";
import DesktopMediaStep from "./DesktopMediaStep";
import MobileMediaStep from "./MobileMediaStep";
import StepIndicator from "./StepIndicator";
import TitleStep from "./CompleteStep";
import { useNavigate } from "react-router-dom";
import SendButton from "@/components/shared/button/SendButton";

const StepAddHeroSlider = () => {
  const [media, setMedia] = useState(null);
  const [desktopMedia, setDesktopMedia] = useState(null);
  const [mobileMedia, setMobileMedia] = useState(null);
  const [addHeroSlider, { isLoading, data, error }] = useAddHeroSliderMutation();
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

  const onSubmit = async (data) => {
    const formData = new FormData();

    if (media) {
      formData.append("media", media);
    }
    
    if (desktopMedia) {
      formData.append("desktopMedia", desktopMedia);
    }
    
    if (mobileMedia) {
      formData.append("mobileMedia", mobileMedia);
    }

    formData.append("title", data.title);
    formData.append("subtitle", data.subtitle);
    formData.append("caption", data.caption);
    formData.append("link", data.link || "");
    formData.append("order", data.order || "");

    addHeroSlider(formData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن هرو اسلایدر...", { id: "addHeroSlider" });
    }

    if (data && data?.acknowledgement) {
      toast.success(data?.description, { id: "addHeroSlider" });
      navigate("/hero-Slider");
    }

    if (data && !data?.acknowledgement) {
      toast.error(data?.description, { id: "addHeroSlider" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addHeroSlider" });
    }
  }, [isLoading, data, error, navigate]);

  // Added nextStep function for better navigation
  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("desktopMedia");
        if (!valid) {
          toast.error("لطفاً تصویر دسکتاپ را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("mobileMedia");
        if (!valid) {
          toast.error("لطفاً تصویر موبایل را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 3:
        valid = await trigger(["title", "subtitle", "caption"]);
        if (!valid) {
          toast.error("لطفاً فیلدهای الزامی را تکمیل کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
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
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleMediaChange = (file) => {
    setMedia(file);
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
      desktopMedia: 1,
      mobileMedia: 2,
      title: 3,
      subtitle: 3,
      caption: 3,
      link: 3,
      order: 3
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
        if (field === "desktopMedia" || field === "mobileMedia") {
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
    <div className="col-span-full xl:col-span-8 w-full">
      <div className="px-5 py-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            onStepClick={handleStepClick}
            completedSteps={completedSteps}
            invalidSteps={invalidSteps}
          />
          
          {currentStep === 1 && (
            <DesktopMediaStep
              desktopMedia={desktopMedia}
              setDesktopMedia={setDesktopMedia}
              setValue={setValue}
              register={register}
              errors={errors}
              nextStep={nextStep}
            />
          )}
          {currentStep === 2 && (
            <MobileMediaStep
              mobileMedia={mobileMedia}
              setMobileMedia={setMobileMedia}
              setValue={setValue}
              register={register}
              errors={errors}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {currentStep === 3 && (
            <TitleStep
              register={register}
              errors={errors}
              watchedFields={watchedFields}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}
          
          {currentStep === totalSteps && (
            <div className="flex justify-between mt-12">
              <SendButton />
              <NavigationButton direction="prev" onClick={prevStep} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StepAddHeroSlider;