
import { useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import FormPageBuilder from "@/components/shared/input/FormPageBuilder";
import TextEditor from "@/components/shared/textEditor/TextEditor";
import Modal from "@/components/shared/modal/Modal";
import Apply from "@/components/icons/Apply";
import ModalPortal from "@/components/shared/modal/ModalPortal";

const Step3 = ({
  prevStep,
  nextStep,
  errors,
  control,
  editorData,
  setEditorData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleContentChange = (content) => {
    setEditorData(content);
  };

  return (
    <>
      <div className="flex flex-col p-2">
        <div className="flex flex-col max-h-96 gap-y-4 overflow-y-auto p-2">
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
      
      <ModalPortal>
        <Modal
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          className="md:!w-2/3 !w-full h-full !p-1 !mx-0 !rounded-none"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute apply-button bottom-4 right-4 z-50 md:hidden n-600 rounded-full w-16 h-16 flex items-center justify-center"
          >
            <Apply className="!w-10 !h-10" />
          </button>
          <TextEditor
            value={editorData || ""}
            onChange={handleContentChange}
          />
        </Modal>
      </ModalPortal>
    </>
  );
};

export default Step3;
