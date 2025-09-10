// components/signup/steps/NameStep.jsx


import NavigationButton from "@/components/shared/button/NavigationButton";

const TitleStep = ({ register, errors, prevStep, nextStep }) => {
  return (
    <>
      <label htmlFor="title" className="flex flex-col gap-y-1">
        <span className="text-sm">* عنوان </span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 100,
              message: "عنوان  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="عنوان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>
      <label htmlFor="description" className="w-full flex flex-col gap-y-1">
        <span className="text-sm">توضیحات*</span>
        <textarea
          name="description"
          id="description"
          rows="4"
          maxLength="500"
          {...register("description", {
            required: "وارد کردن توضیحات الزامی است",
            minLength: {
              value: 50,
              message: "توضیحات باید حداقل ۵۰ کاراکتر باشد",
            },
            maxLength: {
              value: 500,
              message: "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
            },
          })}
          required
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </label>

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default TitleStep;
