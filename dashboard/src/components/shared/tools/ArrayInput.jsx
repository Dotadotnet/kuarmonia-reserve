import React from 'react';
import Minus from '@/components/icons/Minus';
import Plus from '@/components/icons/Plus';

const ArrayInput = ({ title, values, setValues, namePrefix, register, errors }) => {

  const handleAddItem = () => {
    setValues([...values, ""]);
  };

  const handleRemoveItem = (index) => {
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
  };

  const handleItemChange = (index, value) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setValues(updatedValues);
  };

  return (
    <>
      <label className="flex flex-col gap-y-2">
        {title}
        {values.map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-x-2">
            <input
              type="text"
              name={`${namePrefix}[${index}]`}
              placeholder="مقدار را وارد کنید"
              maxLength="100"
              defaultValue={item}
              {...register(`${namePrefix}[${index}]`, {
                required: "این فیلد الزامی است",
                minLength: { value: 1, message: "حداقل باید ۱ کاراکتر باشد" },
                maxLength: { value: 100, message: "نباید بیشتر از ۱۰۰ کاراکتر باشد" },
              })}
              className="flex-1 p-2 rounded border"
              onChange={(e) => handleItemChange(index, e.target.value)}
            />
            {errors[namePrefix]?.[index] && (
              <span className="text-red-500">{errors[namePrefix][index]?.message}</span>
            )}
            {index > 0 && (
              <span
                className="cursor-pointer p-1 border rounded-full bg-red-500 text-white dark:border-gray-900"
                onClick={() => handleRemoveItem(index)}
              >
                <Minus />
              </span>
            )}
            {index === values.length - 1 && (
              <span
                className="cursor-pointer p-1 border rounded-full bg-green-500 text-white dark:border-gray-900"
                onClick={handleAddItem}
              >
                <Plus />
              </span>
            )}
          </div>
        ))}
      </label>
    </>
  );
};

export default ArrayInput;
