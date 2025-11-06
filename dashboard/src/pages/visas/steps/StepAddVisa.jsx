import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useForm } from "react-hook-form";
import SendButton from "@/components/shared/button/SendButton";
import { useAddVisaMutation } from "@/services/visa/visaApi";
import Step1 from "./Step1";
import StepIndicator from "./StepIndicator";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { useNavigate } from "react-router-dom";

const StepAddVisa = ({
  watch,
  editorData,
  setEditorData,
  thumbnail,
  setThumbnail,
  thumbnailPreview,
  setThumbnailPreview,
  register,
  errors,
  handleSubmit,
  trigger,
  control,
  roadmap,
  setRoadmap,
  faqs,
  setFaqs
}) => {
  const [addVisa, { isLoading, data, error }] = useAddVisaMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [invalidSteps, setInvalidSteps] = useState({});
  const [conditions, setConditions] = useState([""]);
  const [advantages, setAdvantages] = useState([""]);
  const [disadvantages, setDisadvantages] = useState([""]);
  const [rejectionReasons, setRejectionReasons] = useState([""]);
  const [successTips, setSuccessTips] = useState([""]);
  const [costs, setCosts] = useState([{ title: "", fee: "" }]);
  const [documents, setDocuments] = useState([{ title: "", description: "", type: "" }]);

  const totalSteps = 6;
  const onSubmit = async (data) => {
    const formData = new FormData();
    const extractIds = (arr) => JSON.stringify(arr.map((item) => item.id));

    // Main fields
    formData.append("title", data.title || "");
    formData.append("summary", data.summary || "");
    formData.append("content", editorData || "");
    formData.append("processingTime", data.processingTime || "");
    formData.append("validity", data.validity || "");
    formData.append("difficultyLevel", data.difficultyLevel || "");

    formData.append("thumbnail", thumbnail);
    formData.append("tags", extractIds(data.tags));
    formData.append("type", data.visaType.id);
    formData.append("country", data.country.id);

    // Roadmap
    formData.append("roadmap", JSON.stringify(roadmap));

    // Step5
    formData.append("conditions", JSON.stringify(conditions));
    formData.append("advantages", JSON.stringify(advantages));
    formData.append("disadvantages", JSON.stringify(disadvantages));
    formData.append("rejectionReasons", JSON.stringify(rejectionReasons));
    formData.append("successTips", JSON.stringify(successTips));

    // Step6
    formData.append("faqs", JSON.stringify(faqs));
    formData.append("costs", JSON.stringify(costs));
    formData.append("documents", JSON.stringify(documents));

    // Debug
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Submit
    addVisa(formData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال افزودن  ویزا...", { id: "add-visa" });
    }

    if (data) {
      toast.success(data?.description, { id: "add-visa" });
      navigate(-1);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "add-visa" });
    }
  }, [isLoading, data, error]);

  const nextStep = async () => {
    let valid = false;
    switch (currentStep) {
      case 1:
        valid = await trigger("title");
        if (!valid) {
          toast.error("لطفاً عنوان را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("summary");
        if (!valid) {
          toast.error("لطفاً خلاصه را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("country");
        if (!valid) {
          toast.error("لطفاً کشور را انتخاب کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 2:
        valid = await trigger("thumbnail");
        if (!valid) {
          toast.error("لطفاً تصویر بند انگشتی را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("tags");
        if (!valid) {
          toast.error("لطفاً تگ‌ها را انتخاب کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("visaType");
        if (!valid) {
          toast.error("لطفاً نوع ویزا را انتخاب کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 3:
        // Validation for content step
        valid = true;
        break;
      case 4:
        valid = await trigger("processingTime");
        if (!valid) {
          toast.error("لطفاً زمان پردازش را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("validity");
        if (!valid) {
          toast.error("لطفاً اعتبار را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = await trigger("difficultyLevel");
        if (!valid) {
          toast.error("لطفاً سطح دشواری را وارد کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 5:
        // Validation for conditions step
        const isConditionsValid = conditions.every(item => item);
        if (!isConditionsValid) {
          toast.error("لطفاً تمام فیلدهای شرایط را پر کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
        break;
      case 6:
        // Validation for roadmap step
        const isRoadmapValid = roadmap.every(item => 
          item.title && item.description && item.duration
        );
        if (!isRoadmapValid) {
          toast.error("لطفاً تمام فیلدهای نقشه راه را پر کنید");
          setInvalidSteps((prev) => ({ ...prev, [currentStep]: true }));
          return;
        }
        valid = true;
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
            nextStep={nextStep}
            register={register}
            errors={errors}
            control={control}
          />
        );
      case 2:
        return (
          <Step2
            register={register}
            errors={errors}
            setThumbnail={setThumbnail}
            setThumbnailPreview={setThumbnailPreview}
            thumbnailPreview={thumbnailPreview}
            prevStep={prevStep}
            nextStep={nextStep}
            control={control}
          />
        );
      case 3:
        return (
          <Step3
            control={control}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
            editorData={editorData}
            setEditorData={setEditorData}
          />
        );
      case 4:
        return (
          <Step4
            prevStep={prevStep}
            nextStep={nextStep}
            register={register}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step5
            conditions={conditions}
            setConditions={setConditions}
            advantages={advantages}
            setAdvantages={setAdvantages}
            disadvantages={disadvantages}
            setDisadvantages={setDisadvantages}
            rejectionReasons={rejectionReasons}
            setRejectionReasons={setRejectionReasons}
            successTips={successTips}
            setSuccessTips={setSuccessTips}
            prevStep={prevStep}
            nextStep={nextStep}
            errors={errors}
            register={register}
          />
        );
      case 6:
        return (
          <Step6
            errors={errors}
            faqs={faqs}
            setFaqs={setFaqs}
            costs={costs}
            setCosts={setCosts}
            setDocuments={setDocuments}
            documents={documents}
            roadmap={roadmap}
            setRoadmap={setRoadmap}
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
    <form
      action=""
      className="w-full max-w-xl  flex flex-col gap-y-4"
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
  );
};

export default StepAddVisa;