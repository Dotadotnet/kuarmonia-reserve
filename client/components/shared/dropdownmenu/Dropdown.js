import React, { useState, useRef, useEffect } from "react";
import Tooltip from "@/components/shared/tooltip/Tooltip";

const Dropdown = ({
  options = [],
  placeholder = "یک مورد انتخاب کن",
  value,
  onChange,
  className = "",
  error,
  height = "",
  prop, 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
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

  const handleOptionSelect = (option) => {
    if (onChange) {
      const selectedProp = option[prop]; 

      onChange({
        _id: option?._id,
        id: option.id,
        title: option.title,
        [prop]: selectedProp, 
      });
    }
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option._id === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`inline-flex justify-between w-full px-1 ${height} text-sm font-medium text-gray-700 bg-white border border-gray-500 rounded-lg shadow-sm dark:bg-[#0a2d4d] dark:text-gray-50 focus:outline-none focus:ring-offset-2 dark:focus:!border-blue-500 ${
          isOpen ? "dark:border-blue-500 " : ""
        }`}
        onClick={toggleDropdown}
      >
        <span className="flex items-center text-gray-500 dark:text-gray-100">
          {selectedOption ? selectedOption.title : placeholder}
          {selectedOption?.icon && (
            <span className="mr-2">{selectedOption.icon}</span>
          )}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 -mr-1"
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
        <div className="absolute right-0 mt-2 w-full bg-white dark:bg-slate-600 max-h-96 overflow-y-auto dark:text-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10 ">
          <div className="max-h-fit p-2">
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option._id}
                  onClick={() => handleOptionSelect(option)}
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-100 dark:hover:bg-slate-700 hover:bg-gray-100 cursor-pointer rounded-md"
                >
                  {option.icon && <span className="">{option.icon}</span>}
                  <Tooltip
                    text={option.description || ""}
                    placement="right"
                    txtColor={"text-white"}
                  >
                    <span>{option.title}</span>
                  </Tooltip>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-2">
                هیچ گزینه‌ای موجود نیست
              </p>
            )}
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default Dropdown;
