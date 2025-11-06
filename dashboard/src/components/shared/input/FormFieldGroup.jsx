import React from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import FormInput from "@/components/shared/input/FormInput";

const FormFieldGroup = ({
  items = [],
  setItems,
  label,
  onAdd,
  onRemove,
  onChange,
  errors = {},
  renderItem,
  showAddButton = true,
  showRemoveButton = true
}) => {
  const handleAddItem = () => {
    if (onAdd) {
      onAdd();
    } else {
      setItems(prev => [...prev, {}]);
    }
  };

  const handleRemoveItem = (index) => {
    if (onRemove) {
      onRemove(index);
    } else {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    }
  };

  const handleChange = (index, field, value) => {
    if (onChange) {
      onChange(index, field, value);
    } else {
      const updatedItems = [...items];
      updatedItems[index][field] = value;
      setItems(updatedItems);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      {items.map((item, index) => (
        <label key={index} className="flex flex-col gap-y-1">
          <span className="text-sm flex flex-row justify-between items-center">
            {label}
            <span className="flex flex-row gap-x-1">
              {showRemoveButton && index > 0 && (
                <span
                  className="cursor-pointer p-0.5 border rounded bg-red-500 w-6 h-6 text-white flex justify-center items-center"
                  onClick={() => handleRemoveItem(index)}
                >
                  <Minus />
                </span>
              )}
              {showAddButton && index === items.length - 1 && (
                <span
                  className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded bg-green-500 text-white"
                  onClick={handleAddItem}
                >
                  <Plus />
                </span>
              )}
            </span>
          </span>
          <div className="flex flex-col gap-y-2.5">
            {renderItem ? 
              renderItem(item, index, handleChange, errors) : 
              <FormInput
                type="text"
                placeholder="عنوان"
                value={item.title || ""}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="p-2 rounded border"
                error={errors?.[index]?.title}
              />
            }
          </div>
        </label>
      ))}
    </div>
  );
};

export default FormFieldGroup;