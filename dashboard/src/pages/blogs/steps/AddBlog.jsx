import React, { useState,useEffect  } from "react";

import NavigationButton from "@/components/shared/button/NavigationButton";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import SendButton from "@/components/shared/button/SendButton";
import { toast } from "react-hot-toast";
import { useAddBlogMutation } from "@/services/blog/blogApi";
const AddBlog = ({
  totalSteps,
  currentStep,
  publishDate,
  setCurrentStep,
  setThumbnailPreview,
  editorData,
  errors,
  handleSubmit,
  register,
  trigger,
  setEditorData,
  setSelectedTags,
  selectedTags,
  control,
  getValues,
  gallery,
}) => {
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [thumbnail, setThumbnail] = useState({});
  const [addBlog, { isLoading, data, error }] = useAddBlogMutation();

  const onSubmit = async (data) => {
    const selectedTags2 = selectedTags.map((tag) => tag.id);

    const formData = new FormData();
    console.log(data)
    formData.append("thumbnail", thumbnail);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("publishDate", data.publishDate);
    formData.append("category", data.category);
    formData.append("isFeatured", data.isFeatured);
    formData.append("visibility", data.visibility);
    formData.append("readTime", data.readTime);
    formData.append(
      "socialLinks",
      JSON.stringify(
        data.socialLinks.map((socialLink) => ({
          name: socialLink.name, 
          url: socialLink.url,
        }))
      )
    );
     formData.append("tags", JSON.stringify(selectedTags2));
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    addBlog(formData);
  };

   useEffect(() => {
      if (isLoading) {
        toast.loading("در حال افزودن پست...", { id: "addBlog" });
      }
  
      if (data) {
        toast.success(data?.description, { id: "addBlog" });
      }
  
      if (error?.data) {
        toast.error(error?.data?.description, { id: "addBlog" });
      }
    }, [isLoading, data, error]);
  const renderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Step1
            publishDate={publishDate}
            register={register}
            errors={errors}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Step2
            editorData={editorData}
            setEditorData={setEditorData}
            register={register}
            control={control}
            errors={errors}
            useState={useState}
            nextStep={nextStep}
            prevStep={prevStep}
            setThumbnailPreview={setThumbnailPreview}
            setThumbnail={setThumbnail}
          />
        );
   
      case 3:
        return (
          <Step3
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
            register={register}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
            control={control}
          />
        );
      case 4:
        return (
          <Step4
            register={register}
            errors={errors}
            control={control}
            getValues={getValues}
          />
        );

      default:
        return null;
    }
  };


  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً تصویر بند انگشتی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("summary");
        if (!valid) {
          toast.error("لطفاً خلاصه ای کوتاه از محصول را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;

        break;
      case 2:
        valid = await trigger("thumbnail");
        if (!valid) {
          toast.error("لطفاً گالری محصول  را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
    
        case 3:
          valid = await trigger("thumbnail");
          if (!valid) {
            toast.error("لطفاً گالری محصول  را وارد کنید");
            setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
            return;
          }
          valid = true;
          break;
      case 4:
        valid = await trigger("features");
        if (!valid) {
          toast.error("لطفاً ویژگی های محصول را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
     
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

  return (
    <form
      className="w-full max-w-xl col-span-1  flex flex-col p-2 gap-y-4  "
      onSubmit={handleSubmit(onSubmit)}
    >
      {renderStepContent(currentStep)}

      {currentStep === totalSteps && (
        <div className="flex justify-between mt-12 right-0 absolute bottom-2 w-full px-8">
          <SendButton />
          <NavigationButton direction="prev" onClick={prevStep} />
        </div>
      )}
    </form>
  );
};

export default AddBlog;
