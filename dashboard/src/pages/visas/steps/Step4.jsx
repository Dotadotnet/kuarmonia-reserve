import NavigationButton from "@/components/shared/button/NavigationButton";

const Step4 = ({
  prevStep,
  nextStep,
  errors,
  register
}) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col overflow-y-auto h-96 p-2">
        {/* Processing Time */}
        <label htmlFor="processingTime" className="flex flex-col gap-y-1">
          <span className="text-sm">* زمان پردازش </span>
          <input
            type="text"
            id="processingTime"
            {...register("processingTime", {
              required: "وارد کردن زمان پردازش الزامی است",
              minLength: { value: 3, message: "زمان پردازش باید حداقل ۳ حرف داشته باشد" },
              maxLength: { value: 100, message: "زمان پردازش نباید بیشتر از ۱۰۰ حرف باشد" }
            })}
            placeholder="زمان پردازش"
            maxLength="100"
            className="p-2 rounded border"
          />
          {errors?.processingTime && (
            <span className="text-red-500 text-sm">{errors?.processingTime.message}</span>
          )}
        </label>

        {/* Validity */}
        <label htmlFor="validity" className="flex flex-col gap-y-1 mt-4">
          <span className="text-sm">* مدت اعتبار </span>
          <input
            type="text"
            id="validity"
            {...register("validity", {
              required: "وارد کردن مدت اعتبار الزامی است",
              minLength: { value: 3, message: "مدت اعتبار باید حداقل ۳ حرف داشته باشد" },
              maxLength: { value: 100, message: "مدت اعتبار نباید بیشتر از ۱۰۰ حرف باشد" }
            })}
            placeholder="مدت اعتبار"
            maxLength="100"
            className="p-2 rounded border"
          />
          {errors?.validity && (
            <span className="text-red-500 text-sm">{errors?.validity.message}</span>
          )}
        </label>

        {/* Difficulty Level */}
        <label htmlFor="difficultyLevel" className="flex flex-col gap-y-1 mt-4 relative">
          <span className="text-sm">* سطح دشواری </span>
          <select
            id="difficultyLevel"
            {...register("difficultyLevel", {
              required: "انتخاب سطح دشواری الزامی است"
            })}
            className="p-2 pr-8 rounded border appearance-none bg-white"
          >
            <option value="">انتخاب سطح دشواری</option>
            <option value="آسان">آسان</option>
            <option value="متوسط">متوسط</option>
            <option value="سخت">سخت</option>
          </select>

          {errors?.difficultyLevel && (
            <span className="text-red-500 text-sm">{errors?.difficultyLevel.message}</span>
          )}
        </label>
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step4;