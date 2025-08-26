import React from 'react';
import Next from "@/components/icons/Next";
import Prev from "@/components/icons/Prev";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  totalPages = totalPages && totalPages > 0 ? totalPages : 1;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPages = () => {
    const delta = 2; // تعداد صفحات قبل و بعد از صفحه فعلی
    const range = [];

    // اضافه کردن صفحه اول
    range.push(1);

    // اضافه کردن نقاط اگر فاصله بین صفحه اول و صفحه فعلی بیشتر از delta + 1 باشد
    if (currentPage - delta > 2) {
      range.push('...');
    }

    // اضافه کردن صفحات نزدیک به صفحه فعلی
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // اضافه کردن نقاط اگر فاصله بین صفحه فعلی و صفحه آخر بیشتر از delta + 1 باشد
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    // اضافه کردن صفحه آخر
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  return (
    <div className="flex justify-center mt-4 gap-x-2">
      <button
        className="custom-button"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <Prev className="h-6 w-6" />
      </button>

      {getPages().map((page, index) => (
        <button
          key={index}
          className={`custom-button w-11 h-11 flex items-center justify-center text-lg ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        className="custom-button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <Next className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Pagination;