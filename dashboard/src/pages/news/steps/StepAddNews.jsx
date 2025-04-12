import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import SendButton from "@/components/shared/button/SendButton";
import { useAddNewsMutation } from "@/services/news/newsApi";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useNavigate } from "react-router-dom";
import ToggleThemeButton from "@/components/ThemeToggle";

const StepAddNews = ({
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
  publishDate,
  socialLinksData,
  setSocialLinksData,
  editorData,
  setEditorData
}) => {
  const [addNews, { isLoading, data, error }] = useAddNewsMutation();
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [thumbnail, setThumbnail] = useState(null);

  const totalSteps = 3;

  const onSubmit = async (data) => {
    const formData = new FormData();
    const extractIds = (arr) => JSON.stringify(arr.map((item) => item.id));

    formData.append("title", data.title);
    formData.append("summary", data.title);
    formData.append("thumbnail", thumbnail);
    formData.append("tags", extractIds(data.tags));
    formData.append("category",extractIds(data.category));
    formData.append("content", data.content);
    formData.append("publishDate", publishDate);
    formData.append("socialLinks",JSON.stringify(socialLinksData));
    formData.append("visibility", data.visibility);
    formData.append("readTime", data.readTime.value);
    const sourceObject = {
      name: data.name,
      link: data.link
    };
    formData.append("source", JSON.stringify(sourceObject));

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
     await addNews(formData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن ...", { id: "addNews" });
    }

    if (data?.acknowledgement) {
      toast.success(data?.description, { id: "addNews" });
      navigate("/dashboard/news", { replace: true });
      setCompletedSteps({});
      
    }
    if (data?.acknowledgement) {
      toast.error(data?.description, { id: "addNews" });
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "addNews" });
    }
  }, [isLoading, data, error]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("thumbnail");
        if (!valid) {
          toast.error("لطفاً تصویر اخبار را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً عنوان اخبار را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("summary");
        if (!valid) {
          toast.error("لطفاً خلاصه اخبار را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }        
       
        break;
      case 2:
        valid = await trigger("tags");
        if (!valid) {
          toast.error("لطفاً تگهای اخبار را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("category");
        if (!valid) {
          toast.error("لطفاً دسته بندی اخبار را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }  

        valid = await trigger("content");
        if (!valid) {
          toast.error("لطفاً  محتوای اخبار را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }  
        valid = true;

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
            publishDate={publishDate}
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
            control={control}
            editorData={editorData}
            setEditorData={setEditorData}
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
        className="w-full max-w-xl min-h-[500px]  flex flex-col gap-y-4"
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

export default StepAddNews;
