import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import CustomProgressBar from "./steps/CustomProgressBar";
import NavigationButton from "@/components/shared/button/NavigationButton";
import PropertyCard from "@/components/shared/card/PropCard";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import Step7 from "./steps/Step7";
import Step8 from "./steps/Step8";
import Step9 from "./steps/Step9";
import Step10 from "./steps/Step10";

import SendButton from "@/components/shared/button/SendButton";
import { useAddPropertyMutation } from "@/services/property/propertyApi";
import { toast } from "react-hot-toast";
import ToggleThemeButton from "@/components/ThemeToggle";
import PropertyDetail from "@/components/shared/content/property/PropertyContent";
import Prev from "@/components/icons/Prev";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const methods = useForm({
    mode: "all",
    defaultValues: {
      title: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      description: "",
      tags: [],
      category: "",
      gallery: "",
      readTime: "",
      visibility: "public",
      isFeatured: false,
      socialLinks: []
    }
  });
  const admin = useSelector((state) => state?.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [editorData, setEditorData] = useState("");

  const [galleryPreview, setGalleryPreview] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedTradeType, setSelectedTradeType] = useState(null);
  const [features, setFeatures] = useState([{ title: "", content: [""] }]);
  const [citizenshipStatus, setCitizenshipStatus] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [socialLinksData, setSocialLinksData] = useState([
    { network: null, link: "" }
  ]);
  const [ourEventSpaces, setOurEventSpaces] = useState([
    {
      name: "",
      intro: "",
      description: "",
      squareFootage: "",
      spacesGallery: []
    }
  ]);
  const totalSteps = 10;
  const {
    watch,
    trigger,
    formState: { errors },
    register,
    control,
    clearErrors,
    setValue,
    getValues,
    reset,
    onSuccess,
    handleSubmit
  } = methods;
  const navigate = useNavigate();
  const [addProperty, { isLoading: isAdding, data: addData, error: addError }] =
    useAddPropertyMutation();
  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن...", { id: "add-property" });
    }
    console.log("addData", addData);
    if (addData?.acknowledgement) {
      toast.success(addData?.description, { id: "add-property" });
      reset();
      navigate("/properties");
    }
    if (addData && !addData?.acknowledgement) {
      toast.error(addData?.description, { id: "add-property" });
    }

    if (addError?.data) {

      toast.error(addError?.data.error, { id: "add-property" });
    }
  }, [isAdding, addData, addError]);

  const defaultValues = useMemo(() => {
    return {
      name: admin?.name,
      avatar: admin?.avatar,
      id: admin?._id
    };
  }, [admin]);
  const onSubmit = async (data) => {
    const extractIds = (arr) => JSON.stringify(arr.map((item) => item.id));

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("description", editorData);
    formData.append("createDate", data.createDate);
    formData.append("unit", JSON.stringify(data.unit));
    formData.append("building", JSON.stringify(data.building));
    formData.append("category", data.category.id);
    formData.append("currency", data.currency.id);
    formData.append("tradeType", data.tradeType?.id);
    formData.append("propertyType", data.propertyType?.id);
    formData.append("saleType", data.saleType._id);
    formData.append("isFeatured", data.isFeatured);
    formData.append("citizenshipStatus", citizenshipStatus);
    formData.append("socialLinks", JSON.stringify(socialLinksData));
    formData.append("features", JSON.stringify(features));
    formData.append("location", JSON.stringify(selectedLocation));
    formData.append(
      "address",
      JSON.stringify({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity,
        street: data.street,
        plateNumber: data.plateNumber,
        postalCode: data.postalCode,
        phone: data.phone,
        email: data.email
      })
    );
    const variants = [
      {
        type: "deposit",
        value: data.deposit
      },
      {
        type: "monthlyRent",
        value: data.monthlyRent
      },
      {
        type: "totalPrice",
        value: data.totalPrice
      },
      {
        type: "propertyValue",
        value: data.propertyValue
      },
      {
        type: "installmentAmount",
        value: data.installmentAmount
      }
    ];
    formData.append("amenities", JSON.stringify(data.amenities));

    const filteredVariants = variants.filter((variant) => variant.value);
    formData.append("variants", JSON.stringify(filteredVariants));
    formData.append("tags", extractIds(data.tags));

    formData.append("thumbnail", thumbnail);
    console.log(ourEventSpaces);
    ourEventSpaces.forEach((space, index) => {
      formData.append(`ourEventSpaces[${index}][name]`, space.name);
      formData.append(`ourEventSpaces[${index}][intro]`, space.intro);
      formData.append(
        `ourEventSpaces[${index}][description]`,
        space.description
      );
      formData.append(
        `ourEventSpaces[${index}][squareFootage]`,
        space.squareFootage
      );

      Object.keys(space.spacesGallery).forEach((key) => {
        const file = space.spacesGallery[key];
        formData.append(
          `ourEventSpaces[${index}][spacesGallery][${key}]`,
          file
        );
      });
    });
    for (let i = 0; i < gallery?.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

     addProperty(formData);
  };

  const handleNext = async () => {
    let stepValid = false;
    switch (currentStep) {
      case 1:
        stepValid = await trigger(["title", "description"]);
        break;
      case 2:
        stepValid = await trigger(["Thumbnail", "content"]);
        break;
      case 3:
        stepValid = await trigger([]);
        break;
      case 4:
        stepValid = await trigger(["tags", "category"]);
        break;
      case 5:
        stepValid = await trigger(["metaTitle", "metaDescription"]);
        break;
      case 6:
        stepValid = await trigger([]);
        break;
      case 7:
        stepValid = await trigger([]);
        break;
      case 8:
        stepValid = await trigger([]);
        break;
      case 9:
        stepValid = await trigger([]);
        break;
      case 10:
        stepValid = await trigger([]);
        break;
      default:
        stepValid = false;
    }

    if (!stepValid) {
      toast.dismiss();
      toast("لطفا ابتدا مرحله مورد نظر را تکمیل کنید.!", {
        icon: "⚠️"
      });
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };
  const htmlToText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || doc.body.innerText || "";
  };
  console.log(selectedLocation);
  const property = {
    title: watch("title"),
    tradeType: watch("tradeType"),
    saleType: watch("saleType"),
    type: watch("propertyType"),
    summary: watch("summary"),
    thumbnail: thumbnailPreview,
    square: watch("square"),
    bathrooms: watch("bathrooms"),
    bedrooms: watch("bedrooms"),
    currency: watch("currency")?.title,
    createDate: watch("createDate"),
    isLoading: isAdding,
    author: defaultValues?.name,
    avatar: defaultValues?.avatar?.url,
    gallery: galleryPreview,
    description: htmlToText(editorData),
    amenities: watch("amenities"),
    features: watch("features"),
    location: selectedLocation,
    citizenshipStatus: citizenshipStatus,
    variants: [
      {
        type: "deposit",
        value: watch("deposit")
      },
      {
        type: "monthlyRent",
        value: watch("monthlyRent")
      },
      {
        type: "totalPrice",
        value: watch("totalPrice")
      },
      {
        type: "installmentAmount",
        value: watch("installmentAmount")
      }
    ]
  };
  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-x-hidden lg:overflow-hidden text-black dark:text-gray-300 py-4`}
    >
      <a
        className="fixed bottom-4 right-4 group items-center reject-button rounded-full  !bg-red-800/20 shadow-lg !p-4 text-slate-300 transition-all hover:text-slate-100 z-50"
        title="بازگشت"
        onClick={() => navigate(-1)}
      >
        <Prev className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:translate-x-1" />
      </a>
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="flex  items-center">
        <CustomProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className="  gap-x-1 gap-y-8 px-2 w-full">
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
          {" "}
          <SwiperSlide className="!mr-0 !ml-0">
            <div className=" flex justify-center w-screen md:w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden text-black dark:text-gray-300 flex flex-col p-2 py-4 gap-y-4 shadow-lg relative h-[600px] mb-12 items-center"
              >
                {currentStep === 1 && (
                  <Step1
                    control={control}
                    register={register}
                    errors={errors}
                    setSelectedTradeType={setSelectedTradeType}
                  />
                )}
                {currentStep === 2 && (
                  <Step2
                    editorData={editorData}
                    setEditorData={setEditorData}
                    control={control}
                    register={register}
                    errors={errors}
                  />
                )}
                {currentStep === 3 && (
                  <Step3
                    control={control}
                    register={register}
                    errors={errors}
                  />
                )}

                {currentStep === 4 && (
                  <Step4
                    setGallery={setGallery}
                    galleryPreview={galleryPreview}
                    setGalleryPreview={setGalleryPreview}
                    register={register}
                    useState={useState}
                    control={control}
                    setThumbnail={setThumbnail}
                    setThumbnailPreview={setThumbnailPreview}
                    errors={errors}
                  />
                )}
                {currentStep === 5 && (
                  <Step5
                    setFeatures={setFeatures}
                    features={features}
                    register={register}
                    errors={errors}
                    clearErrors={clearErrors}
                    control={control}
                    setValue={setValue}
                  />
                )}
                {currentStep === 6 && (
                  <Step6
                    register={register}
                    errors={errors}
                    control={control}
                    setCitizenshipStatus={setCitizenshipStatus}
                  />
                )}
                {currentStep === 7 && (
                  <Step7
                    register={register}
                    errors={errors}
                    control={control}
                    ourEventSpaces={ourEventSpaces}
                    setOurEventSpaces={setOurEventSpaces}
                  />
                )}
                {currentStep === 8 && (
                  <Step8
       
                    setSelectedCountry={setSelectedCountry}
                    setSelectedState={setSelectedState}
                    setSelectedCity={setSelectedCity}
                    selectedCountry={selectedCountry}
                    selectedState={selectedState}
                    selectedCity={selectedCity}
                    setSelectedLocation={setSelectedLocation}
                  />
                )}
                {currentStep === 9 && (
                  <Step9
                    register={register}
                    errors={errors}
                    watch={watch}
                    control={control}
                  />
                )}
                {currentStep === 10 && (
                  <Step10
                    register={register}
                    errors={errors}
                    control={control}
                    getValues={getValues}
                    socialLinksData={socialLinksData}
                    setSocialLinksData={setSocialLinksData}
                  />
                )}

                <div className="flex p-6 justify-between mt-4 w-full absolute bottom-0 md:order-2">
                  {currentStep < totalSteps && (
                    <NavigationButton direction="next" onClick={handleNext} />
                  )}
                  {currentStep === totalSteps && <SendButton />}
                  <div className="flex-1 flex justify-end">
                    {currentStep > 1 && (
                      <NavigationButton direction="prev" onClick={handleBack} />
                    )}
                  </div>
                </div>
                <div className="absolute bottom-5">
                  <ToggleThemeButton />
                </div>
              </form>
            </div>
          </SwiperSlide>
          <SwiperSlide className="!mr-0">
            <div className=" flex justify-center w-screen md:w-full">
              <PropertyCard property={property} />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!mr-0">
            <div className="col-span-1 relative">
              <div className=" col-span-1 w-full">
                <PropertyDetail isMobile={true} property={property} />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Add;
