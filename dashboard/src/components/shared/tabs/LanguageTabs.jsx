import React from "react";

const LanguageTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "fa", label: "فارسی" },
    { id: "en", label: "English" },
    { id: "tr", label: "Türkçe" }
  ];

  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === tab.id
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab && setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageTabs;