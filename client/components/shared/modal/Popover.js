import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Popover = ({
  isOpen,
  onClose,
  content,
  position = { top: null, left: null },
  bgColor = "bg-white",
  txtColor = "text-black",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // 300 میلی‌ثانیه 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const { top, left } = position;

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-25 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`absolute p-4 rounded shadow-lg transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        } ${bgColor} ${txtColor}`}
        style={{ top, left }}
        onClick={(e) => e.stopPropagation()}
      >
        {content}
      </div>
    </div>,
    document.body
  );
};

export default Popover;
