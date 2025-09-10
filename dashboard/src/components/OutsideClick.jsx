import { useState } from "react";
import OutsideClick from "@/components/shared/outsideClick/OutsideClick"; // Make sure to provide the correct import path here

const IconOnlyDropdown = ({ options = [], value, onChange, theme = "light" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt._id === value);

  const isDark = theme === "dark";

  return (
    <div className="relative w-full">
      <div
        className={`border rounded p-2 cursor-pointer flex items-center gap-2 ${
          isDark ? "bg-gray-800 text-white border-gray-600" : "bg-white text-black"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption ? (
          <span
            dangerouslySetInnerHTML={{ __html: selectedOption.icon }}
            className="w-6 h-6"
          />
        ) : (
          <span className="text-sm text-gray-500">انتخاب کنید</span>
        )}
      </div>

      {isOpen && (
        <OutsideClick onOutsideClick={() => setIsOpen(false)} className="absolute w-full z-50">
          <ul
            className={`mt-1 rounded border shadow max-h-60 overflow-y-auto ${
              isDark
                ? "bg-gray-900 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            {options.map((item) => (
              <li
                key={item._id}
                onClick={() => {
                  onChange(item._id);
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 flex items-center gap-2"
              >
                <span
                  dangerouslySetInnerHTML={{ __html: item.icon }}
                  className="w-6 h-6"
                />
              </li>
            ))}
          </ul>
        </OutsideClick>
      )}
    </div>
  );
};

export default IconOnlyDropdown;
