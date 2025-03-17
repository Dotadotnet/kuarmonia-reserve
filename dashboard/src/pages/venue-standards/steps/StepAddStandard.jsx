import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddVenueStandardMutation } from "@/services/venueStandard/venueStandardApi";
import ThumbnailStep from "./ThumbnailStep";
import StepIndicator from "./StepIndicator";
import TitleStep from "./TitleStep";
import CertifiedStep from "./CertifiedStep";
import { useRouter } from "next/router";

const StepAddStandard = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [addStandard, { isLoading, data, error }] =
    useAddVenueStandardMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [keynotes, setKeynotes] = useState([""]);
  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    watch
  } = useForm({
    mode: "onChange"
  });
  const totalSteps = 3;

  const watchedFields = watch();
  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("thumbnail", thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("referenceUrl", data.referenceUrl);
    formData.append("issuingOrganization", data.issuingOrganization);
    formData.append("country", data.country);
    formData.append("year", data.year);
    formData.append("isInternational", data.isInternational);

    // تبدیل FormData به شیء برای بررسی
    const entries = {};
    formData.forEach((value, key) => {
      entries[key] = value;
    });

    console.log("FormData entries:", entries);

    // ارسال داده‌ها
    addStandard(formData);
  };

  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن دسته بندی...", { id: "addStandard" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "addStandard" });
      router.push("./");
    }
    if (data && !data?.success) {
      toast.error(data?.message, { id: "addStandard" });
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "addStandard" });
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
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            nextStep={nextStep}
            register={register}
            errors={errors.thumbnail}
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
          <CertifiedStep
            keynotes={keynotes}
            setKeynotes={setKeynotes}
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

export default StepAddStandard;
