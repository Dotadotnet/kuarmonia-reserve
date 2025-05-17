import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import SendButton from "@/components/shared/button/SendButton";
import { useAddOpportunityMutation } from "@/services/opportunity/opportunityApi";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import Step9 from "./Step9";
import { useNavigate } from "react-router-dom";
import ToggleThemeButton from "@/components/ThemeToggle";

const StepAddOpportunity = ({
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
  employerLogoPreview,
  setEmployerLogoPreview,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedLocation,
  selectedLocation,
  skills,
  setSkills,
  gallery,
  socialLinksData,
  setSocialLinksData,
  documents,
  setDocuments,
  responsibilities,
  setResponsibilities,
  qualifications,
  setQualifications,
  benefits,
  setBenefits,
  languages,
  setLanuguages,
  countries,
  setCountries,
  cities,
  setCities
}) => {
  const [addOpportunity, { isLoading, data, error }] =
    useAddOpportunityMutation();
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [thumbnail, setThumbnail] = useState(null);
  const [employerImage, setEmployerImage] = useState(null);

  const totalSteps = 9;

  const onSubmit = async (data) => {
    const formData = new FormData();
    const extractIds = (arr) => JSON.stringify(arr.map((item) => item.id));

    formData.append("name", data.title);
    formData.append("summary", data.summary);
    formData.append("description", data.description);
    formData.append("thumbnail", thumbnail);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("citizenshipOutcome", data.citizenshipOutcome.id);
    for (let i = 0; i < gallery?.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    formData.append("currency", data.currency.id);
    console.log(data.tags)
    formData.append(
      "salary",
      JSON.stringify({
        min: data.minSalary,
        max: data.maxSalary
      })
    );

    formData.append("jobTime", data.jobTime.id);
    formData.append("experienceLevel", extractIds(data.experienceLevel));
    formData.append("jobMode", data.jobMode.id);
    formData.append("jobType", data.jobType.id);
    formData.append("employmentType", data.employmentType.id);
    formData.append("skills", JSON.stringify(skills));
    formData.append("documents", JSON.stringify(documents));
    formData.append("responsibilities", JSON.stringify(responsibilities));
    formData.append("qualifications", JSON.stringify(qualifications));
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("languages", JSON.stringify(languages));
    formData.append("countries", JSON.stringify(countries));
    formData.append("cities", JSON.stringify(cities));

    formData.append(
      "company",
      JSON.stringify({
        name: data.company,
        bio: data.bio,
        employerInformationDisplay: data.employerInformationDisplay,
        address: {
          country: data.country,
          state: data.state,
          city: data.city,
          street: data.street,
          plateNumber: data.plateNumber,
          postalCode: data.postalCode,
          phone: data.phone,
          email: data.email,
          location: {
            lat: selectedLocation?.lat,
            lng: selectedLocation?.lng
          }
        }
      })
    );
    formData.append("category", data.category.id);
    formData.append("tags", extractIds(data.tags));
    formData.append("capacity", data.capacity);
    formData.append("vacancy", data.vacancy);
    formData.append("socialLinks",JSON.stringify(socialLinksData));

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    // addOpportunity(formData)
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن ...", { id: "addOpportunity" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "addOpportunity" });
      navigate("./");
    }
    if (data && !data?.success) {
      toast.error(data?.message, { id: "addOpportunity" });
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "addOpportunity" });
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
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
            skills={skills}
            setSkills={setSkills}
          />
        );
      case 4:
        return (
          <Step4
            register={register}
            errors={errors}
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
            selectedLocation={selectedLocation}
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
          />
        );
      case 6:
        return (
          <Step6
            employerImage={employerImage}
            setEmployerImage={setEmployerImage}
            employerLogoPreview={employerLogoPreview}
            setEmployerLogoPreview={setEmployerLogoPreview}
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
            qualifications={qualifications}
            setQualifications={setQualifications}
            languages={languages}
            setLanuguages={setLanuguages}
            benefits={benefits}
            setBenefits={setBenefits}
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
            responsibilities={responsibilities}
            setResponsibilities={setResponsibilities}
            countries={countries}
            setCountries={setCountries}
            setCities={setCities}
            cities={cities}
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
            documents={documents}
            setDocuments={setDocuments}
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
        onSubmit={handleSubmit((data) => onSubmit(data))}
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

export default StepAddOpportunity;
