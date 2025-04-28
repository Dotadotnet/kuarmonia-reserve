import { useState } from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const Faq = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prevActiveIndex) =>
      prevActiveIndex === index ? null : index
    );
  };

  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[550px_1fr] md:gap-14 md:p-8">
      <h2 className="text-center text-4xl font-bold text-gray-600 md:text-left md:text-6xl">
        سوالات متداول{" "}
      </h2>

      <div>
        {items?.map(({ question, answer }, idx) => (
          <div
            key={idx}
            onClick={() => toggleFaq(idx)}
            className="flex cursor-pointer items-start gap-4 border-b border-gray-300 py-5 last:border-0"
          >
            <div className="mt-0.5">
              {idx === activeIndex ? (
                <Minus color="#047857" />
              ) : (
                <Plus color="#047857" />
              )}
            </div>

            <div>
              <h4 className="text-lg font-medium">{question}</h4>
              <div
                className={`${
                  idx === activeIndex
                    ? "grid grid-rows-[1fr]"
                    : "grid grid-rows-[0fr]"
                }  transition-all duration-300`}
              >
                <p className="mt-2 overflow-hidden text-left text-gray-700">
                  {answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Faq;
