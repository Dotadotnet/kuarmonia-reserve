import FormFAQs from "@/components/shared/input/FormFAQs";

const Step6 = ({ errors, faqs, setFaqs }) => {
  return (
    <div className="flex flex-col gap-y-4 h-96 overflow-y-auto p-2">
      <FormFAQs
        items={faqs}
        setItems={setFaqs}
        errors={errors?.faqs || {}}
      />
    </div>
  );
};

export default Step6;