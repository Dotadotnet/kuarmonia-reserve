import React, { useState } from "react";
import FormWhatYouWillRead from "@/components/shared/input/FormWhatYouWillRead";
import NavigationButton from "@/components/shared/button/NavigationButton";
import SendButton from "@/components/shared/button/SendButton";

const FormWhatYouWillReadSection = ({
  onSubmit,
  isLoading,
  data,
  error,
  whatYouWillRead,
  setWhatYouWillRead
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(whatYouWillRead);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
        <FormWhatYouWillRead
          items={whatYouWillRead}
          setItems={setWhatYouWillRead}
          label="آنچه خواهید خواند"
          placeholder="مورد را وارد کنید"
        />
      </div>
      
      <div className="flex justify-between mt-12">
        {currentStep === totalSteps ? (
          <SendButton />
        ) : (
          <NavigationButton direction="next" onClick={nextStep} />
        )}
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </form>
  );
};

export default FormWhatYouWillReadSection;