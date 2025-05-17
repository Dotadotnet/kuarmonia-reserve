import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  items = [],
  value,
  handleSelect,
  onChange,
  className = "h-12 w-full",
  isReadOnly = false,
  iconOnly = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = items.filter(
    (item) => typeof item?.value === "string" && item.value.includes(searchTerm)
  );

  const handleItemSelect = (item) => {
    if (!isReadOnly) {
      setSelectedItem(item);
      if (handleSelect) {
        handleSelect(item);
      } else if (onChange) {
        onChange(item);
      }
      setIsOpen(false);
      setTooltipContent("");
    }
  };

  useEffect(() => {
    if (value) {
      const selected = items.find((item) => item.value === value);
      setSelectedItem(selected || null);
    } else {
      setSelectedItem(null);
    }
  }, [value, items]);

  const handleMouseEnter = (e, description) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipContent(description);
    setTooltipPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 10
    });
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };
  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !isReadOnly && setIsOpen((prev) => !prev)}
        className={`inline-flex justify-between items-center px-4 py-2 text-center text-sm font-medium text-gray-700 bg-white dark:!bg-[#0a2d4d] border border-gray-300 dark:border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 ${className} ${
          isReadOnly ? " opacity-50" : ""
        }`}
        disabled={isReadOnly}
      >
        <span className="ml-2 dark:text-gray-100 flex justify-center text-center">
          {iconOnly && selectedItem?.icon ? (
            <div dangerouslySetInnerHTML={{ __html: selectedItem.icon }} />
          ) : (
            <div className="flex items-center gap-2 ">
              <span
                className="w-5 h-5"
                dangerouslySetInnerHTML={{ __html: selectedItem?.icon }}
              />
              <span>{selectedItem?.title || selectedItem?.value}</span>
            </div>
          )}
        </span>
        {!isReadOnly && !iconOnly && (
          <span className="dark:text-gray-100">
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
          </span>
        )}
      </button>
      {isOpen && (
         <ul className="absolute mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 !z-50 dark:border-gray-700 rounded-md shadow-lg  p-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemSelect(item)}
              onMouseEnter={(e) => handleMouseEnter(e, item.description)}
              onMouseLeave={handleMouseLeave}
              className={`marker:relative mt-1 bg-gray-100 hover:bg-blue-100 ${
                iconOnly ? "flex justify-center" : "px-2 py-2"
              } dark:bg-gray-700 dark:hover:bg-gray-900 rounded-md cursor-pointer group`}
            >
              {iconOnly ? (
                item.icon
              ) : (
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  <span>{item.title || item.value}</span>
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
      {tooltipContent && (
        <div
          className="absolute bg-red-600/70 text-white text-xs  py-1 px-2 rounded-md shadow-lg backdrop-blur-md text-justify transition-opacity duration-200"
          style={{
            left: "30%",
            transform: "translateX(-50%)",
            marginTop: "4px",
            whiteSpace: "wrap",
            pointerEvents: "none",
            zIndex: 50,
            opacity: tooltipContent ? 1 : 0
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
