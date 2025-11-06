// components/signup/steps/PasswordStep.jsx

import { useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import FormPageBuilder from "@/components/shared/input/FormPageBuilder";

const Step3 = ({
  prevStep,
  nextStep,
  errors,
  control,
  editorData,
  setEditorData
}) => {
  const handleContentChange = (content) => {
    setEditorData(content);
  };

  return (
    <>
      <div className="flex flex-col   p-2">
      <div className="flex flex-col max-h-96  gap-y-4  overflow-y-auto p-2">
         <FormPageBuilder
           id="content"
           value={editorData}
           onChange={handleContentChange}
           error={errors?.content}
           required={true}
           className="flex-1"
         />
      </div>
      <div className="flex justify-between mt-12">
              <NavigationButton direction="next" onClick={nextStep} />
      
              <NavigationButton direction="prev" onClick={prevStep} />
            </div>
      </div>
    </>
  );
};

export default Step3;