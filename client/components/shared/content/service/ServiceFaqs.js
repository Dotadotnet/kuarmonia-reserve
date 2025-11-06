"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

// Simple SVG components for chevron icons
const ChevronUp = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Faq = ({ items }) => {
  const [expandedFaq, setExpandedFaq] = useState([]);
  const t = useTranslations("Service");

  const toggleFaq = (index) => {
    if (expandedFaq.includes(index)) {
      setExpandedFaq(expandedFaq.filter((item) => item !== index));
    } else {
      setExpandedFaq([...expandedFaq, index]);
    }
  };

  return (
    <div className="space-y-3">
      {items?.map(({ question, answer }, index) => (
        <div
          key={index}
          className="dark:bg-gray-800 bg-white rounded-xl overflow-hidden dark:border-gray-700 border-gray-100 border dark:shadow-gray-300 hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => { toggleFaq(index) }}
            className="w-full text-right p-4 md:p-5 dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
          >
            <span className=" text-gray-900 dark:text-white text-base md:text-lg">
              {question}
            </span>
            {expandedFaq.includes(index) ? (
              <ChevronUp className="w-5 h-5 dark:text-gray-300 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 dark:text-gray-300 text-gray-600" />
            )}
          </button>
          {expandedFaq.includes(index) && (
            <div className="p-4 md:p-5 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border-t">
              <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-sm md:text-base">
                {answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Faq;