import React from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const FormItemList = ({
  items = [""],
  setItems,
  label = "آیتم‌ها",
  placeholder = "آیتم را وارد کنید",
  className = "w-full flex flex-col gap-y-4 p-4 border rounded",
  required = false
}) => {
  const handleAddItem = () => {
    setItems([...items, ""]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  return (
    <div className={className} >
      <label className="w-full flex flex-col gap-y-4">
        <p className="text-sm flex flex-row justify-between items-center">
          {label}{required && "*"}
          <button
            type="button"
            className="p-0.5 border rounded-secondary bg-green-500 text-white"
            onClick={handleAddItem}
          >
            <Plus />
          </button>
        </p>

        {items.map((item, index) => (
          <p
            key={index}
            className="flex flex-row gap-x-2 items-center"
          >
            <input
              type="text"
              placeholder={placeholder}
              className="flex-1"
              value={item}
              onChange={(event) =>
                handleChange(index, event.target.value)
              }
              required={required}
            />
            {index !== 0 && (
              <button
                type="button"
                className="p-0.5 border rounded-secondary bg-red-500 text-white"
                onClick={() => handleRemoveItem(index)}
              >
                <Minus />
              </button>
            )}
          </p>
        ))}
      </label>
    </div>
  );
};

export default FormItemList;