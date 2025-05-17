import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddInstitutionMutation } from "@/services/institution/institutionApi";
import ThumbnailStep from "./BasicStep";
import StepIndicator from "./StepIndicator";
import AddressStep from "./AddressStep";
import AdditionalInfoStep from "./AdditionalInfoStep";
import CertifiedStep from "./CertifiedStep";
import LocationStep from "./LocationStep";
import { useNavigate } from "react-router-dom";

const StepAddInstitution = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [addInstitution, { isLoading, data, error }] =
    useAddInstitutionMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [faculties, setFaculties] = useState([""]);
  const [languagesOffered, setLanguagesOffered] = useState([""]);
  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    control
  } = useForm({
    mode: "onChange"
  });
  const totalSteps = 5;

  const onSubmit = async (data) => {

    const extractIds = (items) => {
      if (!Array.isArray(items)) return [];
      return items.filter((item) => item && item.id).map((item) => item.id);
    };

    const formData = new FormData();

    formData.append("thumbnail", thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("establishedYear", data.establishedYear);
    formData.append("isInternational", data.isInternational);
    formData.append("type", data.type.id);
    formData.append("faculty", JSON.stringify(faculties));
    formData.append("languagesOffered", JSON.stringify(languagesOffered));
    formData.append("awards", extractIds(data.selectedAwards));
    formData.append("standards", extractIds(data.selectedStandards));
    formData.append("location", JSON.stringify(selectedLocation));

    formData.append(
      "address",
      JSON.stringify({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        street: data.street,
        floor: data.floor,
        unit: data.unit,
        plateNumber: data.plateNumber,
        postalCode: data.postalCode,
        phone: data.phone,
        email: data.email,
        website: data.website,
      })
    );
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    addInstitution(formData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن ...", { id: "add-institution" });
    }

    if (data) {
      toast.success(data?.description, { id: "add-institution" });
      navigate(-1);
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "add-institution" });
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
          <LocationStep
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            setSelectedCity={setSelectedCity}
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedCity={selectedCity}
            setSelectedLocation={setSelectedLocation}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 3:
        return (
          <AddressStep
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 4:
        return (
          <AdditionalInfoStep
            faculties={faculties}
            setFaculties={setFaculties}
            languagesOffered={languagesOffered}
            setLanguagesOffered={setLanguagesOffered}
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
          />
        );
      case 5:
        return <CertifiedStep control={control} />;
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

export default StepAddInstitution;
