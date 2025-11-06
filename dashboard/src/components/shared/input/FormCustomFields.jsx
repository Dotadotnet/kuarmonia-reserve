import React from "react";
import FormFieldGroup from "@/components/shared/input/FormFieldGroup";
import FormInput from "@/components/shared/input/FormInput";
import FormSelect from "@/components/shared/input/FormSelect";

const FormCustomFields = ({
  label = "فیلدهای سفارشی",
  items = [],
  setItems,
  errors = {},
  className = "flex flex-col gap-y-4 h-96 overflow-y-auto p-2"
}) => {
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        label: "",
        type: "text", // text, number, textarea, select
        required: false,
        options: [], // for select type
        value: ""
      }
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

  const handleOptionsChange = (index, options) => {
    const updatedItems = [...items];
    updatedItems[index].options = options.split(',').map(opt => opt.trim());
    setItems(updatedItems);
  };

  const renderCustomField = (item, index, handleChange, errors) => (
    <>
      <FormInput
        type="text"
        placeholder="برچسب فیلد"
        value={item.label}
        onChange={(e) => handleChange(index, "label", e.target.value)}
        className="p-2 rounded border"
        error={errors?.[index]?.label}
      />

      <FormSelect
        label="نوع فیلد"
        id={`type-${index}`}
        value={item.type}
        onChange={(e) => handleChange(index, "type", e.target.value)}
        options={[
          { value: "text", label: "متن" },
          { value: "number", label: "عدد" },
          { value: "textarea", label: "متن چند خطی" },
          { value: "select", label: "انتخاب" }
        ]}
        className="p-2 rounded border"
        error={errors?.[index]?.type}
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id={`required-${index}`}
          checked={item.required}
          onChange={(e) => handleChange(index, "required", e.target.checked)}
          className="ml-2"
        />
        <label htmlFor={`required-${index}`}>اجباری</label>
      </div>

      {item.type === "select" && (
        <FormInput
          type="text"
          placeholder="گزینه‌ها (با کاما جدا کنید)"
          value={item.options.join(', ')}
          onChange={(e) => handleOptionsChange(index, e.target.value)}
          className="p-2 rounded border"
          error={errors?.[index]?.options}
        />
      )}

      <FormInput
        type={item.type === "textarea" ? "textarea" : item.type === "number" ? "number" : "text"}
        placeholder={`مقدار ${item.label}`}
        value={item.value}
        onChange={(e) => handleChange(index, "value", e.target.value)}
        rows={item.type === "textarea" ? 3 : undefined}
        className="p-2 rounded border"
        error={errors?.[index]?.value}
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
        renderItem={renderCustomField}
      />
    </div>
  );
};

export default FormCustomFields;