import { useState } from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import Calendar from "@/components/icons/Calendar";
import Clock from "@/components/icons/Clock";

const ServiceFaqs = ({ items }) => {
  const [expandedFaq, setExpandedFaq] = useState([]);

  const toggleFaq = (index) => {
    setExpandedFaq(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-12">
      <section id="faqs" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          سوالات متداول
        </h2>
        <div className="space-y-4">
          {items?.map((faq, index) => (
            <div
              key={index}
              className="dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white shadow-gray-400 border rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-right p-6 dark:hover:bg-gray-700 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-lg">
                  {faq.question}
                </span>
                {expandedFaq.includes(index) ? (
                  <ChevronUp className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 dark:text-gray-300 text-gray-600" />
                )}
              </button>
              {expandedFaq.includes(index) && (
                <div className="p-6 dark:bg-gray-800 dark:border-gray-700 border-gray-100 bg-white border-t">
                  <p className="text-gray-700 dark:text-gray-100 leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServiceFaqs;