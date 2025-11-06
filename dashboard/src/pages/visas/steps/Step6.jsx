import DynamicListInput from "@/components/shared/tools/DynamicListInput";
import FormRoadmap from "@/components/shared/input/FormRoadmap";

const Step6 = ({ 
  errors, 
  faqs, 
  setFaqs, 
  costs, 
  setCosts, 
  durations, 
  setDurations, 
  documents, 
  setDocuments,
  roadmap,
  setRoadmap
}) => {
  return (
    <div className="flex flex-col gap-y-4 h-96 overflow-y-auto p-2">
      <FormRoadmap 
        items={roadmap} 
        setItems={setRoadmap} 
      />

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
        fields={["title", "fee"]}
        fieldLabels={{ title: "عنوان", fee: "هزینه" }}
      />

   <DynamicListInput
  label="مدارک موردنیاز"
  items={documents}
  setItems={setDocuments}
  fields={["title", "description", "type"]}
  fieldLabels={{ title: "عنوان", description: "توضیحات", type: "نوع" }}
  typeOptions={["mandatory", "optional"]} // 🆕 مقادیر از بیرون
/>

    </div>
  );
};

export default Step6;