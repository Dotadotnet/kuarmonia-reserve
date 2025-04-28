import React from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const Step5 = ({  errors,  faqs, setFaqs }) => {
  const handleAddFaqs = () => {
    setFaqs((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const handleRemoveFaqs = (index) => {
    const updatedFaqs = [...faqs];
    updatedFaqs.splice(index, 1);
    setFaqs(updatedFaqs);
  };

  const handleChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  return (
    <div className="flex flex-col gap-y-4 h-96 overflow-y-auto p-2">
      {faqs.map((item, index) => (
        <label key={index} className="flex flex-col gap-y-1">
          <span className="text-sm flex flex-row justify-between items-center">
            اطلاعات سوال را وارد کنید
            <span className="flex flex-row gap-x-1">
              {index > 0 && (
                <span
                  className="cursor-pointer p-0.5 border rounded bg-red-500 w-6 h-6 text-white flex justify-center items-center"
                  onClick={() => handleRemoveFaqs(index)}
                >
                  <Minus />
                </span>
              )}
              {index === faqs.length - 1 && (
                <span
                  className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded bg-green-500 text-white"
                  onClick={handleAddFaqs}
                >
                  <Plus />
                </span>
              )}
            </span>
          </span>
          <div className="flex flex-col gap-y-2.5">
            <input
              type="text"
              placeholder=" سوال"
              value={item.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
              className="p-2 rounded border"
            />
            {errors?.faqs?.[index]?.question && (
              <span className="text-red-500 text-sm">
                {errors.faqs[index].question.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-2.5">
            <input
              type="text"
              placeholder=" پاسخ"
              value={item.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
              className="p-2 rounded border"
            />
            {errors?.faqs?.[index]?.answer && (
              <span className="text-red-500 text-sm">
                {errors.faqs[index].answer.message}
              </span>
            )}
          </div>
        </label>
      ))}
      
    </div>
  );
};

export default Step5;
