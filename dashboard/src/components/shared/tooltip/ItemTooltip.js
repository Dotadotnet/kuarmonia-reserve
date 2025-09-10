import { useState } from "react";

const ItemTooltip = ({ children, tooltipText, portal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* محتوای اصلی */}
      {children}

      {/* Tooltip */}
      {isHovered && (
        <div
          className={`absolute  top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 dark:bg-gray-100 dark:text-gray-800 rounded-sm shadow-lg`}
        >
          {/* مثلث جهت بالا */}
          
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ItemTooltip;
