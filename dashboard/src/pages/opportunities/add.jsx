import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StepAddOpportunity from "./steps/StepAddOpportunity";
import OpportunityCard from "@/components/shared/card/OpportunityCard";
import CustomProgressBar from "./steps/CustomProgressBar";
import OpportunityContent from "@/components/shared/content/opportunity/OpportunityContent";
import { useForm } from "react-hook-form";

function AddOpportunity() {
  const [currentStep, setCurrentStep] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [employerLogoPreview, setEmployerLogoPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [skills, setSkills] = useState([""]);
  const [responsibilities, setResponsibilities] = useState([""]);
  const [qualifications, setQualifications] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [documents, setDocuments] = useState([""]);
  const [benefits, setBenefits] = useState([""]);
  const [countries, setCountries] = useState([""]);
  const [cities, setCities] = useState([""]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [socialLinksData, setSocialLinksData] = useState([
    { network: null, link: "" }
  ]);

  const methods = useForm({
    mode: "all"
  });
  const {
    watch,
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    setValue,
    control
  } = methods;

  const opportunity = {
    thumbnail: thumbnailPreview,
    title: watch("title"),
    summary: watch("summary"),
    description: watch("description"),
    jobType: watch("jobType"),
    employmentType: watch("employmentType"),
    opportunityTypes: watch("opportunityTypes"),
    currency: watch("currency"),
    jobTime: watch("jobTime"),
    experienceLevel: watch("experienceLevel"),
    jobMode: watch("jobMode"),
    startDate: watch("startDate"),
    endDate: watch("endDate"),
    skills: skills,
    responsibilities: responsibilities,
    qualifications: qualifications,
    languages: languages,
    benefits: benefits,
    countries: countries,
    cities: cities,
    documents: documents,
    citizenshipOutcome: watch("citizenshipOutcome"),
    minSalary: watch("minSalary"),
    maxSalary: watch("maxSalary"),
    vacancy: watch("vacancy"),
    capacity: watch("capacity"),
    gallery: galleryPreview,
    country: ` ${selectedCountry} , ${selectedCity} `,
    company: {
      name: watch("company"),
      bio: watch("bio"),
      address: {
        country: watch("country"),
        state: watch("state"),
        city: watch("city"),
        street: watch("street"),
        plateNumber: watch("plateNumber"),
        postalCode: watch("postalCode"),
        floor: watch("floor"),
        unit: watch("unit"),
        phone: watch("phone"),
        email: watch("email"),
        location: selectedLocation
      }
    },

    city: `${selectedCity}`
  };
  return (
    <section className="relative overflow-hidden bg-[#dce9f5] dark:bg-[#1a202c] w-screen h-screen  flex flex-col items-center justify-start p-4">
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="flex flex-col w-full z-50 items-center justify-start">
        <CustomProgressBar currentStep={currentStep} />

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 3 }
          }}
          autoHeight={true}
          className="w-full !h-screen !mr-0 flex items-center justify-center"
        >
          <SwiperSlide className=" !mr-0   flex items-center justify-center min-h-[400px]">
            <StepAddOpportunity
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              thumbnailPreview={thumbnailPreview}
              setThumbnailPreview={setThumbnailPreview}
              setGalleryPreview={setGalleryPreview}
              galleryPreview={galleryPreview}
              gallery={gallery}
              setGallery={setGallery}
              employerLogoPreview={employerLogoPreview}
              setEmployerLogoPreview={setEmployerLogoPreview}
              register={register}
              trigger={trigger}
              errors={errors}
              handleSubmit={handleSubmit}
              setValue={setValue}
              watch={watch}
              control={control}
              setSelectedCountry={setSelectedCountry}
              setSelectedState={setSelectedState}
              setSelectedCity={setSelectedCity}
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              selectedCity={selectedCity}
              setSelectedLocation={setSelectedLocation}
              skills={skills}
              setSkills={setSkills}
              documents={documents}
              setDocuments={setDocuments}
              selectedLocation={selectedLocation}
              socialLinksData={socialLinksData}
              setSocialLinksData={setSocialLinksData}
              responsibilities={responsibilities}
              setResponsibilities={setResponsibilities}
              qualifications={qualifications}
              setQualifications={setQualifications}
              benefits={benefits}
              setBenefits={setBenefits}
              languages={languages}
              setLanuguages={setLanguages}
              countries={countries}
              setCountries={setCountries}
              cities={cities}
              setCities={setCities}
            />
          </SwiperSlide>

          <SwiperSlide className=" flex scale-90 !mr-0 !ml-0 items-center   justify-center min-h-[400px]">
            <OpportunityCard opportunity={opportunity} />
          </SwiperSlide>

          <SwiperSlide className=" flex !mr-0 items-center justify-center ">
            <OpportunityContent opportunity={opportunity} />
          </SwiperSlide>
        </Swiper>

        {/* دکمه‌های ناوبری سفارشی‌شده */}
      </div>
    </section>
  );
}

export default AddOpportunity;
