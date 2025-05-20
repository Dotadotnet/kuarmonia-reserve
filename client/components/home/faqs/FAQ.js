"use client";
import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const FAQ = ({ faqs }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      {faqs.map((faq, index) => (
        <Card
          faq={faq}
          key={index}
          index={index}
          isExpanded={expandedIndex === index}
          onToggleCollapse={() => handleToggleCollapse(index)}
        />
      ))}
    </>
  );
};

function Card({ index, faq, isExpanded, onToggleCollapse }) {
  return (
    <article
      className="group flex flex-col gap-y-1.5 relative border border-secondary rounded p-4 dark:bg-gray-900 dark:text-white hover:border-primary dark:hover:border-blue-500 transition-colors"
      onClick={onToggleCollapse}
    >
      <h2 className="text-5xl text-secondary dark:text-gray-500 font-bold">
        {index + 1}
      </h2>
      <h2
        className={
          "text-lg flex flex-row justify-between items-start cursor-pointer relative w-full" +
          " " +
          (isExpanded
            ? "rounded-r rounded-t !line-clamp-1"
            : "rounded !line-clamp-1")
        }
      >
        {faq.question}
      </h2>
      <span className="p-0.5 border border-gray-100 dark:border-gray-600 rounded-primary absolute top-1.5 right-1.5 bg-white dark:bg-gray-800 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        {isExpanded ? (
          <BiChevronUp className="h-5 w-5" />
        ) : (
          <BiChevronDown className="h-5 w-5" />
        )}
      </span>
      {isExpanded && (
        <div className="absolute top-8 left-0 w-full z-50   p-4 rounded bg-white dark:bg-black mt-2  ">
          <h3 className="mb-2 text-base">{faq.question}</h3>
          <p className="text-sm">{faq.answer}</p>
          <span className="triangle absolute -top-3 right-2 " />
          <style js>
            {`
              .triangle {
                  width: 0px;
                  height: 0px;
                  border-style: solid;
                  border-width: 0 10px 10px 10px;
                  border-color: transparent transparent #000 transparent;
                  transform: rotate(0deg);
              }
            `}
          </style>
        </div>
      )}
    </article>
  );
}

export default FAQ;
