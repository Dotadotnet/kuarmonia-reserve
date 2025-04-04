import React from "react";

const Deep = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // اگر مدال باز نیست، چیزی نمایش نده

  return (
    <div 
      className="fixed inset-0 flex justify-center items-center z-50 bg-secondary/10 backdrop-blur-sm backdrop-filter bg-opacity-100" 
      onClick={onClose} // کلیک بر روی ناحیه بیرونی
    >
      <div 
        className="relative w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-lg" 
        onClick={(e) => e.stopPropagation()} // جلوگیری از بستن مدال هنگام کلیک بر روی محتوای آن
      >
        {children}
      </div>
    </div>
  );
};

export default Deep;
