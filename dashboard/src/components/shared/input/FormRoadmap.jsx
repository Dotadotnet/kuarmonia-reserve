import React from "react";
import FormFieldGroup from "@/components/shared/input/FormFieldGroup";
import FormInput from "@/components/shared/input/FormInput";

const FormRoadmap = ({
  label = "اطلاعات نقشه راه را وارد کنید",
  items = [],
  setItems,
  errors = {},
  className = "flex flex-col gap-y-4  p-2"
}) => {
  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        duration: "",
        link: {
          text: "",
          url: ""
        }
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

  const handleLinkChange = (index, key, value) => {
    const updatedItems = [...items];
    updatedItems[index].link[key] = value;
    setItems(updatedItems);
  };

  const renderItem = (item, index, handleChange, errors) => (
    <>
      <FormInput
        type="text"
        placeholder="عنوان"
        value={item.title}
        onChange={(e) => handleChange(index, "title", e.target.value)}
        className="p-2 rounded border"
        error={errors?.[index]?.title}
      />

      <FormInput
        type="textarea"
        placeholder="توضیحات"
        value={item.description}
        rows={5}
        onChange={(e) => handleChange(index, "description", e.target.value)}
        className="p-2 rounded border"
        error={errors?.[index]?.description}
      />

      <FormInput
        type="text"
        placeholder="مدت‌زمان یا بازه"
        value={item.duration}
        onChange={(e) => handleChange(index, "duration", e.target.value)}
        className="p-2 rounded border"
        error={errors?.[index]?.duration}
      />

      <div className="flex flex-col gap-y-1">
        <FormInput
          type="text"
          placeholder="متن لینک"
          value={item.link?.text || ""}
          onChange={(e) => handleLinkChange(index, "text", e.target.value)}
          className="p-2 rounded border"
          error={errors?.[index]?.link?.text}
        />

        <FormInput
          type="url"
          placeholder="آدرس لینک"
          value={item.link?.url || ""}
          onChange={(e) => handleLinkChange(index, "url", e.target.value)}
          className="p-2 rounded border"
          error={errors?.[index]?.link?.url}
        />
      </div>
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
        renderItem={renderItem}
      />
    </div>
  );
};

export default FormRoadmap;