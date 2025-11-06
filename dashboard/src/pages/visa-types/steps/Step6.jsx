
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
  label="مدت اعتبار ویزا و مدت اقامت"
  items={durations}
  setItems={setDurations}
  fields={["country", "validity", "duration"]}
  fieldLabels={{
    country: "کشور",
    validity: "اعتبار ویزا (مثلاً ۶ ماه)",
    duration: "مدت اقامت (مثلاً ۲–۶ هفته)"
  }}
/>


  
    </div>
  );
};

export default Step6;
