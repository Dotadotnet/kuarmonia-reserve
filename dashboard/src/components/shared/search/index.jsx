import React from "react";

function Index({ searchTerm, setSearchTerm, onStatusFilterChange }) {
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  return (
    <div className="m-6 md:flex md:flex-row-reverse md:items-center md:justify-between">
      <div className="inline-flex overflow-hidden bg-white border rounded-lg dark:!bg-[#0a2d4d] dark:border-blue-500 rtl:flex-row">
        <button
          className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:hover:bg-gray-700 focus:bg-gray-300 dark:focus:bg-gray-700"
          onClick={() => onStatusFilterChange("all")}
        >
          همه
        </button>
        <button
          className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
          onClick={() => onStatusFilterChange("active")}
        >
          فعال
        </button>
        <button
          className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:text-gray-300 hover:bg-gray-100 dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
          onClick={() => onStatusFilterChange("inactive")}
        >
          غیر فعال
        </button>
      </div>

      <div className="relative flex items-center mt-4 md:mt-0">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="جستجو"
          className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          value={searchTerm} // استفاده از value به جای defaultValue
          onChange={handleSearchInputChange} // فراخوانی متد تغییر جستجو
        />
      </div>
    </div>
  );
}

export default Index;
