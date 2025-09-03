import React from "react";
import DynamicListInput from "@/components/shared/tools/DynamicListInput";

const Step6 = ({ errors, faqs, setFaqs, costs, setCosts, durations, setDurations, documents, setDocuments }) => {
  return (
    <div className="flex flex-col gap-y-4 h-96 overflow-y-auto p-2">
      <DynamicListInput
        label="سوالات متداول"
        items={faqs}
        setItems={setFaqs}
        fields={["question", "answer"]}
        fieldLabels={{ question: "سوال", answer: "پاسخ" }}
      />

      <DynamicListInput
        label="هزینه‌ها"
        items={costs}
        setItems={setCosts}
        fields={["country", "fee"]}
        fieldLabels={{ country: "کشور", fee: "هزینه" }}
      />

      <DynamicListInput
        label="مدت اعتبار ویزا"
        items={durations}
        setItems={setDurations}
        fields={["country", "duration"]}
        fieldLabels={{ country: "کشور", duration: "زمان اعتبار" }}
      />

  
    </div>
  );
};

export default Step6;
