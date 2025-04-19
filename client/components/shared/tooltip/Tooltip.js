"use client"
import { useState } from "react";

const Tooltip = ({ text, children, bgColor = "bg-primary dark:bg-blue-600" ,txtColor="text-black" ,position="top" }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      // اضافه کردن z-index به صورت داخلی

    >
      {children}
      {showTooltip && (
        <span
          className={`absolute ${position}-full  mt-1 right-1  z-50 p-2 rounded text-xs ${txtColor} ${bgColor}`}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
