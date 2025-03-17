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

import SendButton from "@/components/shared/button/SendButton";
import { useAddPropertyMutation } from "@/services/property/propertyApi";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { PrevIcon } from "@/utils/SaveIcon";
import ThemeToggle from "@/components/shared/navbar/ThemeToggle/ThemeToggle";
import { RxExitFullScreen } from "react-icons/rx";
import { BiFullscreen } from "react-icons/bi";
import Modal from "@/components/shared/modal/Modal";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick";
import PropertyDetail from "@/components/shared/content/PropertyContent";
import Step8 from "./steps/Step8";

const Add = () => {
  const router = useRouter();
  const closeModal = () => {
    setIsFullscreen(false); // Close the modal
  };
  const handleBackList = () => {
    router.push("/dashboard/properties");
  };
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
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedTradeType, setSelectedTradeType] = useState(null);
  const [features, setFeatures] = useState([{ title: "", content: [""] }]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [citizenshipStatus, setCitizenshipStatus] = useState(null);
  const [country, setCountry] = useState();
  const [currentState, setCurrentState] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);

  const totalSteps = 8;
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

  const [addProperty, { isLoading: isAdding, data: addData, error: addError }] =
    useAddPropertyMutation();
  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن...", { id: "add-property" });
    }
    if (addData?.success) {
      toast.success(addData?.message, { id: "add-property" });
    }
    if (addData && !addData?.success) {
      toast.error(addData?.message, { id: "add-property" });
    }

    if (addError?.data) {
      toast.error(addError?.data?.message, { id: "add-property" });
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
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("description", data.description);
    formData.append("createDate", data.createDate);
    formData.append("square", data.square);
    formData.append("bathrooms", data.bathrooms);
    formData.append("bedrooms", data.bedrooms);
    formData.append("category", data.category);
    formData.append("currency", data.currency?.title);
    formData.append("tradeType", data.tradeType?._id);
    formData.append("type", data.propertyType?._id);
    formData.append("saleType", data.saleType?._id);
    formData.append("isFeatured", data.isFeatured);
    formData.append("country", country?.name);
    formData.append("state", currentState?.name);
    formData.append("city", currentCity?.name);
    formData.append("citizenshipStatus", citizenshipStatus);
    formData.append("creator", admin?._id);
    formData.append("features", JSON.stringify(features));
    formData.append("selectedLocation", JSON.stringify(selectedLocation));

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
        type: "installmentAmount",
        value: data.installmentAmount
      }
    ];
    formData.append("amenities", JSON.stringify(data.amenities));

    const filteredVariants = variants.filter((variant) => variant.value);
    formData.append("variants", JSON.stringify(filteredVariants));
    formData.append("tags[]", JSON.stringify(data.tags));

    formData.append("thumbnail", thumbnail);
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    formData.forEach((value, key) => {
      console.log(key, value);
    });
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
    description: watch("description"),
    amenities: watch("amenities"),
    features: watch("features"),
    location: selectedLocation,
    citizenshipStatus:citizenshipStatus,
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
        onClick={handleBackList}
        className="fixed bottom-4 right-4 group items-center reject-button rounded-full  !bg-red-800/20 shadow-lg !p-4 text-slate-300 transition-all hover:text-slate-100 z-50"
        title="بازگشت"
      >
        <PrevIcon className="h-6 w-6 transition-transform duration-300 transform group-hover:-translate-x-1 group-focus:translate-x-1" />
      </a>
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="flex  items-center">
        <CustomProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      <div className=" grid md:grid-cols-3 grid-col-1 gap-x-1 gap-y-8 px-2 w-full">
        <div className=" flex justify-center w-screen md:w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden text-black dark:text-gray-300 flex flex-col p-8 gap-y-4 shadow-lg relative h-[600px] mb-12 items-center"
          >
            {currentStep === 1 && (
              <Step1
                control={control}
                register={register}
                errors={errors}
                setSelectedTradeType={setSelectedTradeType}
              />
            )}
            {currentStep === 2 && <Step2 register={register} errors={errors} />}
            {currentStep === 3 && (
              <Step3 control={control} register={register} errors={errors} />
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
              <Step6 register={register} errors={errors} control={control} setCitizenshipStatus={setCitizenshipStatus} />
            )}
            {currentStep === 7 && (
              <Step7
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                country={country}
                setCountry={setCountry}
                currentState={currentState}
                setCurrentState={setCurrentState}
                currentCity={currentCity}
                setCurrentCity={setCurrentCity}
              />
            )}
            {currentStep === 8 && (
              <Step8
                register={register}
                errors={errors}
                control={control}
                getValues={getValues}
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
              <ThemeToggle />
            </div>
          </form>
        </div>
        <div className=" flex justify-center w-screen md:w-full">
          <PropertyCard property={property} />
        </div>
        <div className="col-span-1 relative">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-3 rounded-full  shadow-lg cursor-pointer bg-white absolute top-4 left-1/2 transform -translate-x-1/2 z-20`}
          >
            {isFullscreen ? <RxExitFullScreen /> : <BiFullscreen />}
          </button>
          {isFullscreen ? (
            <Modal
              isOpen={isFullscreen}
              onClose={closeModal}
              className="!w-full h-full z-50"
            >
              <OutsideClick onOutsideClick={closeModal}>
                <PropertyDetail isMobile={false} property={property} />
              </OutsideClick>
            </Modal>
          ) : (
            <div className=" col-span-1 w-full">
              <PropertyDetail isMobile={true} property={property} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Add;
