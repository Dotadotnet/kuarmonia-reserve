import { useState, useRef, useEffect } from "react";

const MultiSelectDropdown = ({
  items = [],
  selectedItems = [],
  handleSelect,
  placeholder = "میتوانید چند مورد را انتخاب کنید",
  className,
  icon,
  returnType = "id", // تعیین نوع مقدار بازگشتی: 'id' یا 'value'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredItems = items.filter((item) =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemSelect = (item) => {
    const itemKey = returnType === "id" ? item.id : item.value;
    const isAlreadySelected = selectedItems.includes(itemKey);

    const updatedSelection = isAlreadySelected
      ? selectedItems.filter((selected) => selected !== itemKey)
      : [...selectedItems, itemKey];

    handleSelect(updatedSelection);
  };

  const handleRemoveSelectedItem = (itemKey) => {
    const updatedSelection = selectedItems.filter((selected) => selected !== itemKey);
    handleSelect(updatedSelection);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`inline-flex justify-between items-center px-2 py-2 text-center text-sm font-medium text-gray-700 bg-white dark:!bg-[#0a2d4d] border border-gray-300 dark:border-blue-500 rounded-md shadow-sm focus:outline-none ${className}`}
      >
        <div className="flex gap-1 w-full  h-8 overflow-x-auto scrollbar-hidden max-w-fit whitespace-nowrap">
          {selectedItems.length > 0 ? (
            selectedItems.map((itemKey) => {
              const item = items.find(
                (el) => el.id === itemKey || el.value === itemKey
              );
              return (
                <div
                key={`${itemKey}-${Math.random()}`}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center gap-1 "
                >
                  {icon && <span className="mr-1">{icon}</span>}
                  {item?.title}
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveSelectedItem(itemKey);
                    }}
                  >
                    &times;
                  </span>
                </div>
              );
            })
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-10 p-2">
          <input
            type="text"
            placeholder="جستجو کن"
            className="w-full px-4 py-2 border-b dark:border-gray-700 focus:outline-none dark:bg-gray-800"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-40 overflow-y-auto mt-2 flex flex-col gap-1">
            {filteredItems.map((item) => {
              const itemKey = returnType === "id" ? item.id : item.value;
              return (
                <li
                key={returnType === "id" ? item.id : item.value}
                onClick={() => handleItemSelect(item)}
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    selectedItems.includes(itemKey)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-900"
                  }`}
                >
                  {item.value}
                </li>
              );
            })}
            {filteredItems.length === 0 && (
              <li className="text-gray-500 text-center py-2">
                هیچ گزینه‌ای موجود نیست
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
