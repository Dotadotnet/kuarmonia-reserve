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
              value: 30,
              message: "عنوان نباید بیشتر از ۳۰ حرف باشد",
            },
          })}
          placeholder="عنوان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>
      <label htmlFor="caption" className="w-full flex flex-col gap-y-1">
        <span className="text-sm">کپشن*</span>
        <textarea
          name="caption"
          id="caption"
          rows="4"
          maxLength="500"
          {...register("caption", {
            minLength: {
              value: 50,
              message: "کپشن باید حداقل ۵۰ کاراکتر باشد",
            },
            maxLength: {
              value: 800,
              message: "کپشن نباید بیشتر از 800 کاراکتر باشد",
            },
          })}
          required
        />
        {errors.caption && (
          <span className="text-red-500 text-sm">
            {errors.caption.message}
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
