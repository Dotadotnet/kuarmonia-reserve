import React from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const DynamicListInput = ({ label, items, setItems, fields, fieldLabels = {} }) => {
  const handleAdd = () => {
    const newItem = {};
    fields.forEach((field) => (newItem[field] = ""));
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemove = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  return (
    <div className="flex flex-col gap-y-4 p-2">
      <h3 className="font-bold text-lg mb-2">{label}</h3>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-y-2 p-2 border rounded">
          {fields.map((field) => (
            <div key={field} className="flex flex-col gap-y-1">
              <input
                type="text"
                placeholder={fieldLabels[field] || field} // 🆕 placeholder فارسی
                value={item[field]}
                onChange={(e) => handleChange(index, field, e.target.value)}
                className="p-2 rounded border"
              />
            </div>
          ))}

          <div className="flex justify-end gap-x-2 mt-2">
            {index > 0 && (
              <span
                className="cursor-pointer p-1 border rounded bg-red-500 w-6 h-6 text-white flex justify-center items-center"
                onClick={() => handleRemove(index)}
              >
                <Minus />
              </span>
            )}
            {index === items.length - 1 && (
              <span
                className="cursor-pointer p-1 border rounded bg-green-500 w-6 h-6 text-white flex justify-center items-center"
                onClick={handleAdd}
              >
                <Plus />
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DynamicListInput;
