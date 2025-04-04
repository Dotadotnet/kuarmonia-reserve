import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import SendButton from "@/components/shared/button/SendButton";
import { useAddVenueMutation } from "@/services/venue/venueApi";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import { useNavigate } from "react-router-dom";
import ToggleThemeButton from "@/components/ThemeToggle";
const StepAddVenue = ({
  currentStep,
  setCurrentStep,
  thumbnailPreview,
  setThumbnailPreview,
  register,
  errors,
  trigger,
  handleSubmit,
  setValue,
  watch,
  control,
  setGalleryPreview,
  galleryPreview,
  setGallery,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedLocation,
  selectedLocation,
  ourEventSpaces,
  setOurEventSpaces
}) => {
  const [addVenue, { isLoading, data, error }] = useAddVenueMutation();
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [thumbnail, setThumbnail] = useState(null);

  const totalSteps = 8;

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.title);
    formData.append("summary", data.title);
    formData.append("rating", data.rating);
    formData.append("thumbnail", thumbnail);
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    formData.append("tags", data.tags);
    formData.append("category", data.category);
    formData.append("about", data.about);
    formData.append("basePrice", data.basePrice);
    formData.append("isReception", data.isReception);
    formData.append("currency", data.currency);
    formData.append(
      "campaign",
      JSON.stringify({
        title: data.campaignTitle,
        state: data.campaignState
      })
    );
    formData.append(
      "capeacity",
      JSON.stringify({
        minCapacity: data.minCapacity,
        maxCapacity: data.maxCapacity
      })
    );
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("plateNumber", data.plateNumber);
    formData.append("phone", data.phone);
    formData.append("street", data.street);
    formData.append("postalCode", data.postalCode);
    formData.append("location", selectedLocation);
    formData.append("amenities", data.amenities);
    formData.append("services", data.services);
    formData.append("settings", data.settings);
    formData.append("ceremonyTypes", data.CeremonyTypes);
    formData.append("awards", data.selectedAwards);
    formData.append("standards", data.selectedStandards);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن ...", { id: "addVenue" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "addVenue" });
      navigate("./");
    }
    if (data && !data?.success) {
      toast.error(data?.message, { id: "addVenue" });
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "addVenue" });
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

        break;
      case 5:
        valid = await trigger("issuingOrganization");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
        case 6:
          valid = await trigger("issuingOrganization");
          if (!valid) {
            toast.error("لطفاً نکات کلیدی را وارد کنید");
            setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
            return;
          }
          break;
          case 7:
            valid = await trigger("issuingOrganization");
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
            setThumbnail={setThumbnail}
            setThumbnailPreview={setThumbnailPreview}
            thumbnailPreview={thumbnailPreview}
            nextStep={nextStep}
            register={register}
            errors={errors.thumbnail}
            setValue={setValue}
            control={control}
          />
        );
      case 2:
        return (
          <Step2
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            setGalleryPreview={setGalleryPreview}
            galleryPreview={galleryPreview}
            setGallery={setGallery}
            control={control}
          />
        );
      case 3:
        return (
          <Step3
            register={register}
            errors={errors}
            watch={watch}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
          />
        );
      case 4:
        return (
          <Step4
            register={register}
            errors={errors}
            watch={watch}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
            setSelectedCountry={setSelectedCountry}
            setSelectedState={setSelectedState}
            setSelectedCity={setSelectedCity}
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            selectedCity={selectedCity}
            setSelectedLocation={setSelectedLocation}
          />
        );
      case 5:
        return (
          <Step5
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
            setValue={setValue}
          />
        );
      case 6:
        return (
          <Step6
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
          />
        );
      case 7:
        return (
          <Step7
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
            ourEventSpaces={ourEventSpaces}
            setOurEventSpaces={setOurEventSpaces}

          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white  dark:bg-gray-800 rounded-lg  p-4 w-full ">
      <form
        action=""
        className="w-full max-w-xl  flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderStepContent(currentStep)}

        {currentStep === totalSteps && (
          <div className="flex justify-between mt-12">
            <SendButton />
            <NavigationButton direction="prev" onClick={prevStep} />
          </div>
        )}
      </form>
      <ToggleThemeButton />
    </div>
  );
};

export default StepAddVenue;
