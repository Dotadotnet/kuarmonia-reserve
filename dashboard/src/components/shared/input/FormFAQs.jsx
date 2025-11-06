import React from "react";
import FormFieldGroup from "@/components/shared/input/FormFieldGroup";
import FormInput from "@/components/shared/input/FormInput";

const FormFAQs = ({
  label = "اطلاعات سوال را وارد کنید",
  items = [],
  setItems,
  errors = {},
  className = "flex flex-col gap-y-4 h-96 overflow-y-auto p-2"
}) => {
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const renderFaqItem = (item, index, handleChange, errors) => (
    <>
      <FormInput
        type="text"
        placeholder=" سوال"
        value={item.question}
        onChange={(e) => handleChange(index, "question", e.target.value)}
        className="p-2 rounded border"
        error={errors?.[index]?.question}
      />
      <FormInput
        type="text"
        placeholder=" پاسخ"
        value={item.answer}
        onChange={(e) => handleChange(index, "answer", e.target.value)}
        className="p-2 rounded border"
        error={errors?.[index]?.answer}
      />
    </>
  );

  return (
    <div className={className}>
      <FormFieldGroup
        items={items}
        setItems={setItems}
        label={label}
        onAdd={handleAddItem}
        onRemove={handleRemoveItem}
        onChange={handleChange}
        errors={errors || {}}
        renderItem={renderFaqItem}
      />
    </div>
  );
};

export default FormFAQs;