import React from 'react';
import Content from '@/components/icons/Content';
import Gallery from '@/components/icons/Gallery';
import Branch from '@/components/icons/Branch';
import Rank from '@/components/icons/Rank';
const steps = [
  {
    number: 1,
    label:'مشخصات کارت',
    required: true,
    icon: (
<></>
    ),
  },
  {
    number: 2,
    label: 'تصویر و محتوا',
    required: true,
    icon: (
      <Content />

    ),
  },
  {
    number: 3,
    label: 'گالری',
    required: false,
    icon: (
      <Gallery />

    ),
  },
  {
    number: 4,
    label: 'شاخه بندی',
    required: true,
    icon: (
      <Branch />

    ),
  },
  {
    number: 5,
    label: 'تنظیمات انتشار',
    required: true,
    icon: (
<span className="si--settings-duotone "></span>
    ),
  },
 
];

const CustomProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full lg:py-6 py-1 ">
      <div className="flex flex-row justify-between items-start">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="w-1/4 relative flex flex-col justify-center items-center">
              {/* خط اتصال */}
              {index !== steps.length - 1 && (
                <div className="absolute top-5 right-full translate-x-1/2 w-full flex justify-center">
                  <div className="w-full bg-gray-500  rounded-full h-1">
                    <div
                      className="bg-green-500 dark:bg-blue-500 h-1 rounded-full"
                      style={{
                        width: isCompleted ? '100%' : '0%',
                        transition: 'width 0.3s ease-in-out',
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* دکمه مرحله */}
              <div
                className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500 dark:bg-blue-500 dark:border-blue-500 '
                    : isActive
                    ? 'bg-green-500 border-green-500 dark:border-blue-500 dark:bg-blue-500'
                    : 'bg-gray-400 border-gray-400'
                }`}
              >
                <span className={`text-lg text-white font-medium flex justify-center items-center `}>
                  {step.icon}
                </span>
              </div>

              {/* برچسب مرحله */}
              <div className="mt-2 text-center text-xs md:text-base">
                {step.label} {step.required && <span className="text-red-500">*</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomProgressBar;
