// StepIndicator.js
import React from 'react';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'عنوان', required: true },
    { number: 2, label: 'توضیحات و تگ‌ها', required: true },
    { number: 3, label: 'محتوا و رسانه‌ها', required: true },
    { number: 4, label: 'تنظیمات انتشار', required: true },
  ];

  return (
    <div className="mb-4">
      <ul className="flex justify-between">
        {steps.map(step => (
          <li key={step.number} className="flex-1 text-center">
            <div className={`mx-auto flex items-center justify-center rounded-full h-10 w-10 ${currentStep >= step.number ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
              {step.number}
            </div>
            <p className="mt-2 text-sm font-medium">
              {step.label} {step.required && <span className="text-red-500">*</span>}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepIndicator;
