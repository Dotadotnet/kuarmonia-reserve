import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StepAddVenue from "./steps/StepAddVenue";
import ProductCard from "@/components/shared/card/ProductCard";
import CustomProgressBar from "./steps/CustomProgressBar";
import VenueContent from "@/components/shared/content/venue/VenueContent";
import { useForm } from "react-hook-form";

function AddVenue() {
  const [currentStep, setCurrentStep] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [ourEventSpaces, setOurEventSpaces] = useState([{
      name: "", description: "", seatedCapacity: "", standingCapacity: "", squareFootage: "", roomCost: "", images: [], isPriceIncluded: true 
}]);
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
  const venue = {
    thumbnail: thumbnailPreview,
    title: watch("title"),
    summary: watch("summary"),
    rating: watch("rating"),
    venueTypes: watch("venueTypes"),
    currency: watch("currency"),
    basePrice: watch("basePrice"),
    campaignState: watch("campaignState"),
    discountAmount: watch("discountAmount"),
    campaignTitle: watch("campaignTitle"),
    minCapacity: watch("minCapacity"),
    maxCapacity: watch("maxCapacity"),
    tags: watch("tags"),
    about: watch("about"),
    isReception: watch("isReception", false),
    gallery: galleryPreview,
    address: `${selectedCountry} , ${selectedState} , ${selectedCity} `,
    location: selectedLocation,
    amenities: watch("amenities"),
    services: watch("services"),
    settings: watch("settings"),
    awards: watch("selectedAwards", []),
    standards: watch("selectedStandards", [])
  };
  console.log(ourEventSpaces)
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
          className="w-full !h-screen  flex items-center justify-center"
        >
          <SwiperSlide className=" !ml-0 !mr-0  flex items-center justify-center min-h-[400px]">
            <StepAddVenue
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              thumbnailPreview={thumbnailPreview}
              setThumbnailPreview={setThumbnailPreview}
              setGalleryPreview={setGalleryPreview}
              galleryPreview={galleryPreview}
              setGallery={setGallery}
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
              selectedLocation={selectedLocation}
              ourEventSpaces={ourEventSpaces}
              setOurEventSpaces={setOurEventSpaces}
            />
          </SwiperSlide>

          <SwiperSlide className=" flex items-center justify-center min-h-[400px]">
            <ProductCard venue={venue} />
          </SwiperSlide>

          <SwiperSlide className="!ml-0 !mr-0 flex items-center justify-center ">
            <VenueContent venue={venue} />
          </SwiperSlide>
        </Swiper>

        {/* دکمه‌های ناوبری سفارشی‌شده */}
      </div>
    </section>
  );
}

export default AddVenue;
