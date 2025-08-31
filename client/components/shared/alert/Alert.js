// components/Alert.js
import React from "react";

const Alert = ({ type = "green", message, onClose }) => {
  // انتخاب رنگ‌ها و آیکون‌ها براساس نوع
  const alertStyles = {
    green: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-700",
      iconBg: "bg-green-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    yellow: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-700",
      iconBg: "bg-yellow-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    red: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-700",
      iconBg: "bg-red-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    blue: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-700",
      iconBg: "bg-blue-500",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
  };

  const selectedAlert = alertStyles[type] || alertStyles.green;

  return (
    <div className={`flex flex-row py-2 my-4 w-full items-center ${selectedAlert.bg} border ${selectedAlert.border} rounded-lg shadow overflow-hidden  dark:${selectedAlert.bg}`}>
      <span className={`flex-shrink-0 inline-flex mx-3 item-center justify-center leading-none ${selectedAlert.iconBg} rounded-full`}>
        {selectedAlert.icon}
      </span>
      <div className="flex-1 p-2">
        <p className={`text-sm md:text-base font-medium ${selectedAlert.text} dark:text-green-800`}>{message}</p>
      </div>
      <div className="row px-4 flex place-items-center">
        <a href="#" rel="nofollow" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${type}-500 dark:text-${type}-600`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Alert;
