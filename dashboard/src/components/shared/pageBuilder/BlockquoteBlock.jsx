import React from "react";

const BlockquoteBlock = ({ content, onChange }) => {
  // Define color options to match the exact examples
  const colorOptions = [
    { value: "indigo", label: "نیلی", classes: "from-indigo-50 to-purple-50 border-indigo-500 text-indigo-800" },
    { value: "green", label: "سبز", classes: "from-green-50 to-teal-50 border-green-500 text-green-800" },
    { value: "blue", label: "آبی", classes: "from-blue-50 to-cyan-50 border-blue-500 text-blue-800" },
    { value: "purple", label: "بنفش", classes: "from-purple-50 to-pink-50 border-purple-500 text-purple-800" }
  ];

  // Get the current color classes or default to indigo
  const currentColor = content.color || "indigo";
  const colorClasses = colorOptions.find(option => option.value === currentColor)?.classes || colorOptions[0].classes;

  return (
    <div className="blockquote-block">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          متن نقل قول
        </label>
        <textarea
          value={content.text || ""}
          onChange={(e) => onChange({ ...content, text: e.target.value })}
          className="w-full p-2 border rounded"
          rows="4"
          placeholder="متن نقل قول را وارد کنید"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          عنوان (اختیاری)
        </label>
        <input
          type="text"
          value={content.title || ""}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="عنوان نقل قول"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          نویسنده (اختیاری)
        </label>
        <input
          type="text"
          value={content.author || ""}
          onChange={(e) => onChange({ ...content, author: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="نویسنده نقل قول"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          رنگ نقل قول
        </label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`px-3 py-2 rounded text-sm ${
                currentColor === option.value
                  ? "ring-2 ring-offset-2 " + (option.value === "indigo" ? "bg-indigo-100" : 
                                              option.value === "green" ? "bg-green-100" : 
                                              option.value === "blue" ? "bg-blue-100" : 
                                              "bg-purple-100")
                  : "bg-gray-100"
              }`}
              onClick={() => onChange({ ...content, color: option.value })}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockquoteBlock;