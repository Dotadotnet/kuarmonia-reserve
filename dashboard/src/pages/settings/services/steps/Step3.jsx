// components/signup/steps/PasswordStep.jsx

import { useState } from "react";
import Modal from "@/components/shared/modal/Modal";
import Apply from "@/components/icons/Apply";
import TextEditor from "@/components/shared/textEditor/TextEditor";
import { Controller } from "react-hook-form";
import ModalPortal from "@/components/shared/modal/ModalPortal";
import FormWhatYouWillRead from "@/components/shared/input/FormWhatYouWillRead";

const Step3 = ({ whatYouWillRead, setWhatYouWillRead }) => {
  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
      <div className="flex flex-col">
        <FormWhatYouWillRead
          items={whatYouWillRead}
          setItems={setWhatYouWillRead}
          label="آنچه خواهید خواند"
          placeholder="مورد را وارد کنید"
        />
      </div>
    </div>
  );
};

export default Step3;