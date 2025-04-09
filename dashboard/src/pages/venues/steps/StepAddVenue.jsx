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
import Step8 from "./Step8";
import Step9 from "./Step9";
import Step10 from "./Step10";
import Step11 from "./Step11";
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
  setOurEventSpaces,
  venuePackages,
  setVenuePackages,
  features,
  setFeatures,
  socialLinksData, 
  setSocialLinksData,
  gallery
}) => {
  const [addVenue, { isLoading, data, error }] = useAddVenueMutation();
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [thumbnail, setThumbnail] = useState(null);

  const totalSteps = 11;

  const onSubmit = async (data) => {
    alert()
    const formData = new FormData();

    formData.append("name", data.title);
    formData.append("summary", data.title);
    formData.append("star", data.star);
    formData.append("thumbnail", thumbnail);
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    formData.append("tags",JSON.stringify( data.tags));
    formData.append("category", data.category);
    formData.append("about", data.about);
    formData.append("basePrice", data.basePrice);
    formData.append("isReception", data.isReception);
    formData.append("currency",JSON.stringify( data.currency));
    formData.append(
      "campaign",
      JSON.stringify({
        title: data.campaignTitle,
        state: data.campaignState
      })
    );
    formData.append(
      "capacity",
      JSON.stringify({
        minCapacity: data.minCapacity,
        maxCapacity: data.maxCapacity
      })
    );
    formData.append("amenities", JSON.stringify(data.amenities));
    formData.append("services", JSON.stringify(data.services));
    formData.append("settings", JSON.stringify(data.settings));
    formData.append("ceremonyTypes", JSON.stringify(data.CeremonyTypes));
    formData.append("awards", JSON.stringify(data.selectedAwards));
    formData.append("standards", JSON.stringify(data.selectedStandards));    
    formData.append("ourEventSpaces",JSON.stringify( ourEventSpaces));
    formData.append("venuePackages",JSON.stringify( venuePackages));
    formData.append("features",JSON.stringify( features));
    formData.append(
      "address",
      JSON.stringify({
        country: data.country,
        state: data.state,
        city: data.city,
        street: data.street,
        plateNumber: data.plateNumber,
        postalCode: data.postalCode,
        phone: data.phone,
        email: data.email
      })
    );

    formData.append(
      "location",
      JSON.stringify({
        lat: selectedLocation?.lat,
        lng: selectedLocation?.lng
      })
    );
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    
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
      case 8:
        valid = await trigger("issuingOrganization");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 9:
        valid = await trigger("issuingOrganization");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 10:
        valid = await trigger("issuingOrganization");
        if (!valid) {
          toast.error("لطفاً نکات کلیدی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
        case 11:
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
            watch={watch}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
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
            setValue={setValue}
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
          />
        );
      case 8:
        return (
          <Step8
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
            ourEventSpaces={ourEventSpaces}
            setOurEventSpaces={setOurEventSpaces}
          />
        );
      case 9:
        return (
          <Step9
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
            venuePackages={venuePackages}
            setVenuePackages={setVenuePackages}
          />
        );
      case 10:
        return (
          <Step10
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
            features={features}
            setFeatures={setFeatures}
          />
        );
        case 11:
          return (
            <Step11
              register={register}
              errors={errors}
              prevStep={prevStep}
              nextStep={nextStep}
              control={control}
              features={features}
              setFeatures={setFeatures}
              socialLinksData={socialLinksData}
              setSocialLinksData={setSocialLinksData}
            />
          );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white  dark:bg-gray-800 rounded-lg  p-4 w-full ">
      <form
        className="w-full max-w-xl  flex flex-col gap-y-4"
       onSubmit={handleSubmit((data) => onSubmit(data))}>
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
