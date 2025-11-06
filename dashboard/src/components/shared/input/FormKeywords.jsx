import React from "react";
import FormItemList from "@/components/shared/input/FormItemList";

const FormKeywords = ({
  items = [""],
  setItems,
  label = "کلمات کلیدی",
  placeholder = "کلمه کلیدی را یادداشت کنید",
  className = "w-full flex flex-col gap-y-4 p-4 border rounded"
}) => {
  return (
    <FormItemList
      items={items}
      setItems={setItems}
      label={label}
      placeholder={placeholder}
      className={className}
      required={true}
    />
  );
};

export default FormKeywords;
