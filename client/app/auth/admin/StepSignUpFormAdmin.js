// components/signup/StepSignUpForm.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "@/services/auth/adminAuthApi";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import AvatarStep from "../user/steps/AvatarStep";
import NameStep from "../user/steps/NameStep";
import EmailStep from "../user/steps/EmailStep";
import PasswordStep from "../user/steps/PasswordStep";
import PhoneStepAdmin from "../user/steps/PhoneStepAdmin";
import StepIndicator from "../user/steps/StepIndicator";
import NavigationButton from "@/components/shared/button/NavigationButton";
import SendButton from "@/components/shared/button/SendButton"
const StepSignUpForm = () => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { register, setValue, reset, formState: { errors }, trigger, handleSubmit, watch } = useForm({
    mode: "onChange",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const router = useRouter();
  console.log(data)

  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});

  const watchedFields = watch();

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message, { id: "signup" });
      setAvatarPreview(null);
      window.open("/auth/signin-admin", "_self");
      reset();
    }
    if (!data?.success && data?.message) {
      toast.error(data?.message, { id: "signup" });
    }
    
    if (isLoading) {
      toast.loading("در حال ثبت‌نام...", { id: "signup" });
    }
  }, [data, error, isLoading, reset, router]);

  const handleImageSelect = (imageOrUrl) => {
    const imageUrl = typeof imageOrUrl === "string" ? imageOrUrl : URL.createObjectURL(imageOrUrl);
    setAvatarPreview(imageUrl);
    setValue("avatar", imageOrUrl, { shouldValidate: true });
  };
  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        if (!avatarPreview) {
          toast.error("لطفاً عکس پروفایل خود را انتخاب کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("name");
        if (!valid) {
          toast.error("لطفاً نام خود را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 3:
        valid = await trigger("email");
        if (!valid) {
          toast.error("لطفاً ایمیل خود را به شکل صحیح وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 4:
        valid = await trigger("password");
        if (!valid) {
          toast.error("لطفاً رمز عبور خود را به طور صحیح وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 5:
        valid = await trigger("phone");
        if (!valid) {
          toast.error("لطفاً شماره تلفن خود را به شکل صحیح وارد کنید");
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

  const handleSignup = (formData) => {
    signup(formData);
  };

  const onSubmit = async (data) => {
    if (Object.keys(data).length == 5) {
      const formData = new FormData();
      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar); // آپلود فایل
      } else {
        formData.append("avatarUrl", data.avatar); // استفاده از URL
      }
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      handleSignup(formData);
    }
  };


  const getStepFromField = (field) => {
    const fieldToStep = {
      avatar: 1,
      name: 2,
      email: 3,
      password: 4,
      phone: 5,
    };
    return fieldToStep[field];
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <AvatarStep
            avatarPreview={avatarPreview}
            handleImageSelect={handleImageSelect}
            nextStep={nextStep}
            register={register}
            errors={errors.avatar}
          />
        );
      case 2:
        return (
          <NameStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <EmailStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <PasswordStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <PhoneStepAdmin
            register={register}
            errors={errors}
            prevStep={prevStep}
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
      return JSON.stringify(prevInvalidSteps) !== JSON.stringify(newInvalidSteps) ? newInvalidSteps : prevInvalidSteps;
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
      return JSON.stringify(prevCompletedSteps) !== JSON.stringify(newCompletedSteps) ? newCompletedSteps : prevCompletedSteps;
    });
  }, [errors, watchedFields]);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

export default StepSignUpForm;
