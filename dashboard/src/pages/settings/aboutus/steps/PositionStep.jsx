// components/signup/steps/NameStep.jsx


import NavigationButton from "@/components/shared/button/NavigationButton";

const PositionStep = ({ register, errors, prevStep, nextStep }) => {
  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto h-96 p-2">
    
     <label htmlFor="position" className="flex flex-col gap-y-1">
        <span className="text-sm">* سمت </span>
        <input
          type="text"
          name="position"
          id="position"
          {...register("position", {
            required: "وارد کردن سمت الزامی است",
            minLength: {
              value: 3,
              message: "سمت باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 100,
              message: "سمت  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="سمت"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.position && (
          <span className="text-red-500 text-sm">{errors?.position.message}</span>
        )}
      </label>
   
      <label htmlFor="department" className="flex flex-col gap-y-1">
        <span className="text-sm">* دپارتمان </span>
        <input
          type="text"
          name="department"
          id="department"
          {...register("department", {
            required: "وارد کردن دپارتمان الزامی است",
            minLength: {
              value: 3,
              message: "دپارتمان باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 100,
              message: "دپارتمان  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="دپارتمان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.department && (
          <span className="text-red-500 text-sm">{errors?.department.message}</span>
        )}
      </label>
      <label htmlFor="activeCountry" className="flex flex-col gap-y-1">
        <span className="text-sm">* کشوری که فرد در آن فعالیت می‌کند </span>
        <input
          type="text"
          name="activeCountry"
          id="activeCountry"
          {...register("activeCountry", {
            required: "وارد کردن کشور محل فعالیت الزامی است",
            minLength: {
              value: 3,
              message: "کشور محل فعالیت باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 100,
              message: "کشور محل فعالیت  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="کشور محل فعالیت"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.activeCountry && (
          <span className="text-red-500 text-sm">{errors?.activeCountry.message}</span>
        )}
      </label>
      <label htmlFor="hireDate" className="flex flex-col gap-y-2 w-full">
        تاریخ آغاز فعالیت در شرکت
        <input
          type="date"
          name="hireDate"
          id="hireDate"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("hireDate", { required: "تاریخ آغاز فعالیت در شرکت الزامی است" })}
        />
        {errors?.hireDate && (
          <span className="text-red-500 text-sm">
            {errors?.hireDate.message}
          </span>
        )}
      </label>
      <label htmlFor="nationality" className="flex flex-col gap-y-1">
        <span className="text-sm">* ملیت</span>
        <input
          type="text"
          name="nationality"
          id="nationality"
          {...register("nationality", {
            required: "وارد کردن ملیت الزامی است",
            minLength: {
              value: 3,
              message: "ملیت باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 100,
              message: "ملیت  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="ملیت"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.nationalCode && (
          <span className="text-red-500 text-sm">{errors?.nationalCode.message}</span>
        )}
      </label>
     
      <label htmlFor="birthday" className="flex flex-col gap-y-2 w-full">
       تاریخ تولد
        <input
          type="date"
          name="birthday"
          id="birthday"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("birthday", { required: "تاریخ تولد الزامی است" })}
        />
        {errors?.birthday && (
          <span className="text-red-500 text-sm">
            {errors?.birthday.message}
          </span>
        )}
      </label>
      <label htmlFor="nationalCode" className="flex flex-col gap-y-1">
        <span className="text-sm">* کد ملی یا شناسه ملی </span>
        <input
          type="number"
          name="nationalCode"
          id="nationalCode"
          {...register("nationalCode", {
            required: "وارد کردن کد ملی الزامی است",
            minLength: {
              value: 3,
              message: "کد ملی باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 100,
              message: "کد ملی  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="کد ملی"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.nationalCode && (
          <span className="text-red-500 text-sm">{errors?.nationalCode.message}</span>
        )}
      </label>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default PositionStep;