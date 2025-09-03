import React from "react";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step4 = ({ errors, roadmap, setRoadmap, prevStep, nextStep }) => {
  const handleAddRoadmap = () => {
    setRoadmap((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        duration: "",
        link: {
          text: "",
          url: ""
        }
      }
    ]);
  };

  const handleRemoveRoadmap = (index) => {
    const updatedRoadmap = [...roadmap];
    updatedRoadmap.splice(index, 1);
    setRoadmap(updatedRoadmap);
  };

  const handleChange = (index, field, value) => {
    const updatedRoadmap = [...roadmap];
    updatedRoadmap[index][field] = value;
    setRoadmap(updatedRoadmap);
  };

  const handleLinkChange = (index, key, value) => {
    const updatedRoadmap = [...roadmap];
    updatedRoadmap[index].link[key] = value;
    setRoadmap(updatedRoadmap);
  };

  return (
      <div className="flex flex-col   p-2">
      <div className="flex flex-col max-h-96 gap-y-4  overflow-y-auto p-2">      {roadmap.map((item, index) => (
        <label key={index} className="flex flex-col gap-y-1">
          <span className="text-sm flex flex-row justify-between items-center">
            اطلاعات نقشه راه را وارد کنید
            <span className="flex flex-row gap-x-1">
              {index > 0 && (
                <span
                  className="cursor-pointer p-0.5 border rounded bg-red-500 w-6 h-6 text-white flex justify-center items-center"
                  onClick={() => handleRemoveRoadmap(index)}
                >
                  <Minus />
                </span>
              )}
              {index === roadmap.length - 1 && (
                <span
                  className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded bg-green-500 text-white"
                  onClick={handleAddRoadmap}
                >
                  <Plus />
                </span>
              )}
            </span>
          </span>
          <div className="flex flex-col gap-y-2.5">
            <input
              type="text"
              placeholder="عنوان"
              value={item.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="p-2 rounded border"
            />
            {errors?.roadmap?.[index]?.title && (
              <span className="text-red-500 text-sm">
                {errors.roadmap[index].title.message}
              </span>
            )}

            <textarea
              placeholder="توضیحات"
              value={item.description}
              rows={5}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="p-2 rounded border"
            />
            {errors?.roadmap?.[index]?.description && (
              <span className="text-red-500 text-sm">
                {errors.roadmap[index].description.message}
              </span>
            )}

            <input
              type="text"
              placeholder="مدت‌زمان یا بازه"
              value={item.duration}
              onChange={(e) => handleChange(index, "duration", e.target.value)}
              className="p-2 rounded border"
            />
            {errors?.roadmap?.[index]?.duration && (
              <span className="text-red-500 text-sm">
                {errors.roadmap[index].duration.message}
              </span>
            )}

         
          </div>
        </label>
      ))}
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step4;
