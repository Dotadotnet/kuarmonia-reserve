import React from 'react';
import Price from "@/components/icons/Price";
import Hero from "@/components/icons/Hero";
import Location from "@/components/icons/Location";
import Address from "@/components/icons/Address";
import Option from "@/components/icons/Option";
import Gallery from "@/components/icons/Gallery";
import Feature from "@/components/icons/Feature";
import Space from "@/components/icons/Space";

const steps = [
  {
    number: 1,
    label:' نوع معامله و قیمت',
    required: true,
    icon: (
  <Price size={25} />

     ),
  },
  {
    number: 2,
    label: 'مشخصات',
    required: true,
       icon: <Hero  className="!h-12 w-24" />
   
  },
  {
    number: 3,
    label: 'امکانات',
    required: false,
    icon: (
      <Option />

    ),
  },
  {
    number: 4,
    label: 'گالری',
    required: true,
    icon: (
      <Gallery />

    ),
  },
  {
    number: 5,
    label: ' ویژگی ها',
    required: true,
    icon: (
<Feature />
    ),
  },
  {
    number: 6,
    label: 'دسته بندی',
    required: false,
    icon: (
      <Space />
    ),
  },
  
  {
    number: 7,
    label: 'فضاها',
    required: false,
    icon: (
      <Space />
    ),
  },
  {
    number: 8,
    label: 'آدرس',
    required: false,
    icon: (
      <Location />
    ),
  },
  {
    number: 9,
    label: 'آدرس',
    required: false,
    icon: (
      <Location />
    ),
  },
  {
    number: 10,
    label: 'انتشار',
    required: false,
    // icon: (
    //   <RankIcon />
    // ),
  },
];

const CustomProgressBar = ({ currentStep }) => {
  return (
    <div className="w-full lg:py-6 py-1 ">
    <div className="flex flex-row justify-center w-full items-start overflow-x-auto scrollbar-hide">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <div
            key={step.number}
            className="flex-shrink-0 md:w-[10%] w-1/4 relative flex flex-col justify-center items-center"
          >
            {/* خط اتصال */}
            {index !== steps.length - 1 && (
              <div className="absolute top-5 right-full translate-x-1/2 w-full flex justify-center">
                <div className="w-full bg-gray-500 rounded-full h-1">
                  <div
                    className="bg-green-500 dark:bg-blue-500 h-1 rounded-full"
                    style={{
                      width: isCompleted ? "100%" : "0%",
                      transition: "width 0.3s ease-in-out"
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* دکمه مرحله */}
            <div
              className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                isCompleted
                  ? "bg-green-500 border-green-500 dark:bg-blue-500 dark:border-blue-500 "
                  : isActive
                  ? "bg-green-500 border-green-500 dark:border-blue-500 dark:bg-blue-500"
                  : "bg-gray-400 border-gray-400"
              }`}
            >
              <span
                className={`text-lg text-white font-medium flex justify-center items-center `}
              >
                {step.icon}
              </span>
            </div>

            {/* برچسب مرحله */}
            <div className="mt-2 text-center text-xs md:text-base">
              {step.label}{" "}
              {step.required && <span className="text-red-500">*</span>}
            </div>
          </div>
        );
      })}
    </div>
  </div>
  );
};

export default CustomProgressBar;
