import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddVenueVendorMutation } from "@/services/venueVendor/venueVendorApi";
import ThumbnailStep from "./ThumbnailStep";
import StepIndicator from "./StepIndicator";
import TitleStep from "./TitleStep";
import InformationStep from "./InformationStep";
import { useNavigate } from "react-router-dom";

const StepAddVendor = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [addVendor, { isLoading, data, error }] = useAddVenueVendorMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [keynotes, setKeynotes] = useState([""]);
    const [socialLinksData, setSocialLinksData] = useState([
      { network: null, link: "" },
    ]);
    
  const {
    register,

    formState: { errors },
    trigger,
    handleSubmit,
    watch,
    control 
  } = useForm({
    mode: "onChange",
  });
  const totalSteps = 3;

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    formData.append("thumbnail", thumbnail);
    formData.append("title", data.title);
    formData.append("category", data.category.id);
    formData.append("description", data.description);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("socialLinks",JSON.stringify(socialLinksData));

    addVendor(formData);
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن ...", { id: "add-Vendor" });
    }

    if (data) {
      toast.success(data?.description, { id: "add-Vendor" });
      navigate("/venue-vendors");   
    }
 
    if (error?.data) {
      toast.error(error?.data?.error, { id: "add-Vendor" });
    }
  }, [isLoading, data, error]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("thumbnail");
        if (!valid) {
          toast.error("لطفاً تصویر جایزه را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً عنوان جایزه را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("description");
        if (!valid) {
          toast.error("لطفاً توضیحات جایزه را وارد کنید");
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
            control ={control }
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
          <InformationStep
            keynotes={keynotes}
            setKeynotes={setKeynotes}
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            socialLinksData={socialLinksData}
            setSocialLinksData={setSocialLinksData}
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

export default StepAddVendor;
