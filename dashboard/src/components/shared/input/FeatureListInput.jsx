
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
const FeatureListInput = ({ features, setFeatures, register, errors }) => {
  const handleAddFeature = () => {
    setFeatures([...features, { title: "", content: [""] }]);
  };

  const handleRemoveFeature = (index) => {
    const updated = [...features];
    updated.splice(index,  1);
    setFeatures(updated);
  };

  const handleTitleChange = (index, value) => {
    const updated = [...features];
    updated[index].title = value;
    setFeatures(updated);
  };

  const handleAddContent = (featureIndex) => {
    const updated = [...features];
    updated[featureIndex].content.push("");
    setFeatures(updated);
  };

  const handleRemoveContent = (featureIndex, contentIndex) => {
    const updated = [...features];
    updated[featureIndex].content.splice(contentIndex, 1);
    setFeatures(updated);
  };

  const handleContentChange = (featureIndex, contentIndex, value) => {
    const updated = [...features];
    updated[featureIndex].content[contentIndex] = value;
    setFeatures(updated);
  };

  return (
    <div className="w-full flex flex-col gap-y-4 p-4 border rounded overflow-y-auto max-h-96">
      {features.map((feature, index) => (
        <label key={index} className="flex flex-col gap-y-1">
          <span className="text-sm flex flex-row justify-between items-center">
            ویژگی‌های ملک را وارد کنید*
            <span className="flex flex-row gap-x-1">
              {index > 0 && (
                <span
                  className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 w-6 h-6 text-white flex justify-center items-center dark:border-gray-700"
                  onClick={() => handleRemoveFeature(index)}
                >
                  <Minus />
                </span>
              )}
              {index === features.length - 1 && (
                <span
                  className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded-secondary bg-green-500 text-white dark:border-gray-700"
                  onClick={handleAddFeature}
                >
                  <Plus />
                </span>
              )}
            </span>
          </span>

          {/* عنوان ویژگی */}
          <input
            type="text"
            name={`features[${index}].title`}
            placeholder="عنوان ویژگی را وارد کنید"
            maxLength="100"
            defaultValue={feature.title}
            {...register(`features[${index}].title`, {
              required: "عنوان ویژگی الزامی است",
              minLength: { value: 3, message: "حداقل ۳ کاراکتر" },
              maxLength: { value: 100, message: "حداکثر ۱۰۰ کاراکتر" },
            })}
            className="p-2 rounded border"
            onChange={(e) => handleTitleChange(index, e.target.value)}
          />
          {errors?.features?.[index]?.title && (
            <span className="text-red-500 text-sm">
              {errors.features[index].title.message}
            </span>
          )}

          {/* محتوای ویژگی */}
          {feature.content.map((content, contentIndex) => (
            <div key={contentIndex} className="flex flex-row gap-x-2 items-center">
              <input
                type="text"
                name={`features[${index}].content[${contentIndex}]`}
                placeholder="محتوای ویژگی را وارد کنید"
                maxLength="200"
                defaultValue={content}
                {...register(`features[${index}].content[${contentIndex}]`, {
                  required: "محتوای ویژگی الزامی است",
                  minLength: { value: 3, message: "حداقل ۳ کاراکتر" },
                  maxLength: { value: 200, message: "حداکثر ۲۰۰ کاراکتر" },
                })}
                className="flex-1 p-2 rounded border"
                onChange={(e) =>
                  handleContentChange(index, contentIndex, e.target.value)
                }
              />
              {contentIndex > 0 && (
                <span
                  className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 w-6 h-6 text-white flex justify-center items-center dark:border-gray-700"
                  onClick={() => handleRemoveContent(index, contentIndex)}
                >
                  <Minus />
                </span>
              )}
              <span
                className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded-secondary bg-green-500 text-white dark:border-gray-700"
                onClick={() => handleAddContent(index)}
              >
                <Plus />
              </span>
            </div>
          ))}
        </label>
      ))}
    </div>
  );
};

export default FeatureListInput;
