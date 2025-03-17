import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddProductMutation } from "@/services/product/productApi";
import ThumbnailStep from "./Thumbnail";
import StepIndicator from "./StepIndicator";
import Title from "./Title";
import Gallery from "./Gallery";
import Features from "./Features";
import Campaign from "./Campaign";
import ProductStatus from "./ProductStatus";
import AddTag from "../../tags/add";

const StepAddProduct = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [addProduct, { isLoading, data, error }] = useAddProductMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [features, setFeatures] = useState([{ title: "", content: [""] }]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);
  const {
    register,
    setValue,
    reset,
    control,
    formState: { errors },
    trigger,
    handleSubmit,
    watch
  } = useForm({
    mode: "onChange"
  });
  const totalSteps = 6;

  const onSubmit = async (data) => {
    const selectedTags2 = selectedTags.map((tag) => tag.id);

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("features", JSON.stringify(features));
    formData.append("discountAmount", data.discountAmount);
    formData.append("isFeatured", data.isFeatured);
    formData.append(
      "campaign",
      JSON.stringify({
        title: data.campaignTitle,
        state: data.campaignState
      })
    );
    formData.append("tags", JSON.stringify(selectedTags2));

    formData.append(
      "variations",
      JSON.stringify(
        data.variations.map((variation) => ({
          unit: variation.unit,
          price: variation.price,
          lowStockThreshold: variation.lowStockThreshold,
          stock: variation.stock
        }))
      )
    );

    addProduct(formData);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن محصول...", { id: "addProduct" });
    }

    if (data) {
      toast.success(data?.description, { id: "addProduct" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addProduct" });
    }
  }, [isLoading, data, error]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("thumbnail");
        if (!valid) {
          toast.error("لطفاً تصویر بند انگشتی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("gallery");
        if (!valid) {
          toast.error("لطفاً گالری محصول  را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 3:
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً عنوان محصول را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("summary");
        if (!valid) {
          toast.error("لطفاً خلاصه ای کوتاه از محصول را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("description");
        if (!valid) {
          toast.error("لطفاً توضیحات محصول را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("category");
        if (!valid) {
          toast.error("لطفاً دسته بندی محصول را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;

      case 4:
        valid = await trigger("features");
        if (!valid) {
          toast.error("لطفاً ویژگی های محصول را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        break;
      case 5:
        valid = await trigger("campaignTitle");
        if (!valid) {
          toast.error("لطفاً عنوان کمپین فروش را تعیین کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("campaignState");
        if (!valid) {
          toast.error("لطفاً نوع کمپین فروش را تعیین کنید");
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
          <Gallery
            setGallery={setGallery}
            nextStep={nextStep}
            prevStep={prevStep}
            register={register}
            errors={errors.gallery}
          />
        );
      case 3:
        return (
          <Title
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );

      case 4:
        return (
          <Features
            features={features}
            setFeatures={setFeatures}
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 5:
        return (
          <Campaign
            register={register}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            watch={watch}
            control={control}
          />
        );
      case 6:
        return (
          <ProductStatus
          register={register}
          errors={errors}
          setSelectedOptions={setSelectedTags}
          selectedOptions={selectedTags}
          setIsAddModalOpen={setIsAddModalOpen}
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
    <>
      <form
        action=""
        className="w-full max-w-xl  flex flex-col p-2 gap-y-4  "
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
      {isAddModalOpen && <AddTag isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />}

    </>
  );
};

export default StepAddProduct;
