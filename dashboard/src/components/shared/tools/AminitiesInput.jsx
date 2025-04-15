import React from 'react';
import { useForm } from 'react-hook-form';
import Minus from '@/components/icons/Minus';
import Plus from '@/components/icons/Plus';
const AminitiesInput = ({ title, aminities, setAminities }) => {
    const { register, formState: { errors } } = useForm();

  const handleAddFeature = () => {
    setAminities([...aminities, ""]);
  };

  const handleRemoveFeature = (index) => {
    const updatedAminities = [...aminities];
    updatedAminities.splice(index, 1);
    setAminities(updatedAminities);
  };

  const handleFeatureChange = (index, value) => {
    const updatedAminities = [...aminities];
    updatedAminities[index] = value;
    setAminities(updatedAminities);
  };

  return (
    <>
      <label className="flex flex-col gap-y-2">
        {title}
        {aminities.map((feature, index) => (
          <div key={index} className="flex flex-row items-center gap-x-2">
            <input
              type="text"
              name={`aminities[${index}]`}
              placeholder="امکانات را وارد کنید"
              maxLength="100"
              defaultValue={feature}
              {...register(`aminities[${index}]`, {
                required: "امکانات الزامی است",
                minLength: { value: 2, message: "امکانات باید حداقل ۲ کاراکتر باشد" },
                maxLength: { value: 100, message: "امکانات نباید بیشتر از ۱۰۰ کاراکتر باشد" },
              })}
              className="flex-1 p-2 rounded border"
              onChange={(e) => handleFeatureChange(index, e.target.value)}
            />
            {errors.aminities?.[index] && (
              <span className="text-red-500">{errors.aminities[index]?.message}</span>
            )}
            {index > 0 && (
              <span
                className="cursor-pointer p-1 border dark:border-gray-900 rounded-full bg-red-500 text-white"
                onClick={() => handleRemoveFeature(index)}
              >
                <Minus />
              </span>
            )}
            {index === aminities.length - 1 && (
              <span
                className="cursor-pointer p-1 border rounded-full bg-green-500 dark:border-gray-900 text-white"
                onClick={handleAddFeature}
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

export default AminitiesInput;
