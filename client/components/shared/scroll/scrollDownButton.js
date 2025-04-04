import React from 'react';
import { FaArrowDown } from "react-icons/fa";

const ScrollDownButton = () => {
  const handleScrollDown = () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={handleScrollDown}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-center h-12 w-12 p-3 rounded-full bg-white border-2 border-indigo-600 text-indigo-600 shadow-lg transition transform hover:bg-indigo-600 hover:text-white"
    >
      <FaArrowDown size={24} />
    </button>
  );
};

export default ScrollDownButton;
