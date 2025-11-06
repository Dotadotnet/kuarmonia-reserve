import React, { useState, useEffect } from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import FormInput from "@/components/shared/input/FormInput";
import IconSelect from "@/components/shared/input/IconSelect";

const ListBlock = ({ items = { listTitle: "", items: [{ text: "", icon: null, style: "default" }] }, onChange }) => {
  const [listTitle, setListTitle] = useState(items.listTitle || "");
  const [listItems, setListItems] = useState(items.items || [{ text: "", icon: null, style: "default" }]);

  useEffect(() => {
    setListTitle(items.listTitle || "");
    setListItems(items.items || [{ text: "", icon: null, style: "default" }]);
  }, [items]);

  const handleAddItem = () => {
    const newItems = [...listItems, { text: "", icon: null, style: "default" }];
    setListItems(newItems);
    onChange({ listTitle, items: newItems });
  };

  const handleRemoveItem = (index) => {
    const newItems = [...listItems];
    newItems.splice(index, 1);
    setListItems(newItems);
    onChange({ listTitle, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...listItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setListItems(newItems);
    onChange({ listTitle, items: newItems });
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setListTitle(newTitle);
    onChange({ listTitle: newTitle, items: listItems });
  };

  const handleIconChange = (index, icon) => {
    handleItemChange(index, 'icon', icon);
  };

  const handleStyleChange = (index, style) => {
    handleItemChange(index, 'style', style);
  };

  const styleOptions = [
    { value: "default", label: "پیش‌فرض", class: "" },
    { value: "blue", label: "آبی", class: "flex items-center gap-3 p-1 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-gray-100 w-fit bg-blue-400 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-shadow" },
    { value: "red", label: "قرمز", class: "flex items-center gap-3 p-1 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-red-50 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-shadow" },
    { value: "green", label: "سبز", class: "flex items-center gap-3 p-1 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-gray-100 w-fit bg-green-50 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow" }
  ];

  return (
    <div className="list-block">
      {/* List Title */}
      <div className="mb-4">
        <FormInput
          type="text"
          value={listTitle}
          onChange={handleTitleChange}
          placeholder="عنوان لیست (اختیاری)"
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <label className="block">لیست با آیکون</label>
        <button
          type="button"
          className="p-1 bg-green-500 text-white rounded"
          onClick={handleAddItem}
          title="افزودن آیتم"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {listItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {/* Icon Selection Dropdown */}
            <IconSelect
              value={item.icon}
              onChange={(icon) => handleIconChange(index, icon)}
              placeholder="انتخاب"
              className="w-32"
            />
            
            {/* Text Input */}
            <div className="flex-1">
              <FormInput
                type="text"
                value={item.text}
                onChange={(e) => handleItemChange(index, 'text', e.target.value)}
                placeholder="متن آیتم"
              />
            </div>
            
            {/* Style Selection */}
            <select
              value={item.style || "default"}
              onChange={(e) => handleStyleChange(index, e.target.value)}
              className="w-24 p-1 text-xs border rounded appearance-none"
            >
              {styleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            {/* Remove Button */}
            {listItems.length > 1 && (
              <button
                type="button"
                className="p-1 bg-red-500 text-white rounded"
                onClick={() => handleRemoveItem(index)}
                title="حذف آیتم"
              >
                <Minus className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBlock;