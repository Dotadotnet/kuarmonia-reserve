import { useEffect, useState } from "react";

const IconOnlyDropdown = ({ options = [], value, onChange, exclude = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  // حذف آیتم‌هایی که در exclude هستن
  const filteredOptions = options.filter((opt) => !exclude.includes(opt._id));
  const selectedOption = options.find((opt) => opt._id === value);

  // وقتی مقدار انتخاب‌شده نداری، خودش مقدار اول رو ست کنه
  useEffect(() => {
    if (!value && filteredOptions.length > 0) {
      onChange(filteredOptions[0]._id);
    }
  }, [value, filteredOptions, onChange]);

  return (
    <div className="relative w-12">
      <div
        className="border rounded dark:!bg-[#0a2d4d] dark:border-blue-500 p-2 cursor-pointer justify-center flex items-center gap-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption && (
          <span
            dangerouslySetInnerHTML={{ __html: selectedOption.icon }}
            className="w-6 h-6"
          />
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-50 w-12 mt-1 dark:bg-black bg-white border dark:border-gray-800 rounded shadow max-h-60 overflow-y-auto">
          {filteredOptions.map((item) => (
            <li
              key={item._id}
              onClick={() => {
                onChange(item._id);
                setIsOpen(false);
              }}
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 px-3 py-2 flex items-center gap-2"
            >
              <span
                dangerouslySetInnerHTML={{ __html: item.icon }}
                className="w-6 h-6"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IconOnlyDropdown;
