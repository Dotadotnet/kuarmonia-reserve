import NavigationButton from "@/components/shared/button/NavigationButton";

import StatusSwitch from "@/components/shared/button/StatusSwitch";

const Step5 = ({ register, errors, prevStep, nextStep }) => {
  return (
    <>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="street" className="flex flex-col gap-y-1">
          <span className="text-sm">* خیابان </span>
          <input
            type="text"
            name="street"
            id="street"
            {...register("street", {
              required: "وارد کردن خیابان الزامی است",
              minLength: {
                value: 3,
                message: "خیابان باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 100,
                message: "خیابان  نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="خیابان"
            maxLength="100"
            className="p-2 rounded border "
          />
          {errors?.street && (
            <span className="text-red-500 text-sm">
              {errors.street.message}
            </span>
          )}
        </label>
        <label htmlFor="plateNumber" className="flex flex-col gap-y-1">
          <span className="text-sm">* پلاک </span>
          <input
            type="text"
            name="plateNumber"
            id="plateNumber"
            {...register("plateNumber", {
              required: "وارد کردن پلاک الزامی است",
              minLength: {
                value: 1,
                message: "پلاک باید حداقل ۱ حرف داشته باشد"
              },
              maxLength: {
                value: 100,
                message: "پلاک  نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="پلاک"
            maxLength="100"
            className="p-2 rounded border "
          />
          {errors?.plateNumber && (
            <span className="text-red-500 text-sm">
              {errors.plateNumber.message}
            </span>
          )}
        </label>

        <label htmlFor="postalCode" className="flex flex-col gap-y-1">
          <span className="text-sm">* کد پستی </span>
          <input
            type="text"
            name="postalCode"
            id="postalCode"
            {...register("postalCode", {
              required: "وارد کردن کد پستی الزامی است",
              minLength: {
                value: 3,
                message: "کد پستی باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 100,
                message: "کد پستی  نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="کد پستی"
            maxLength="100"
            className="p-2 rounded border "
          />
          {errors?.postalCode && (
            <span className="text-red-500 text-sm">
              {errors.postalCode.message}
            </span>
          )}
        </label>
        <label htmlFor="floor" className="flex flex-col gap-y-1">
          <span className="text-sm">طبقه</span>
          <input
            type="text"
            name="floor"
            id="floor"
            {...register("floor", {
              minLength: {
                value: 1,
                message: "طبقه باید حداقل ۱ حرف داشته باشد"
              },
              maxLength: {
                value: 10,
                message: "طبقه نباید بیشتر از ۱۰ حرف باشد"
              }
            })}
            placeholder="طبقه"
            maxLength="10"
            className="p-2 rounded border"
          />
          {errors?.floor && (
            <span className="text-red-500 text-sm">{errors.floor.message}</span>
          )}
        </label>

        {/* واحد */}
        <label htmlFor="unit" className="flex flex-col gap-y-1">
          <span className="text-sm">واحد</span>
          <input
            type="text"
            name="unit"
            id="unit"
            {...register("unit", {
              minLength: {
                value: 1,
                message: "واحد باید حداقل ۱ حرف داشته باشد"
              },
              maxLength: {
                value: 10,
                message: "واحد نباید بیشتر از ۱۰ حرف باشد"
              }
            })}
            placeholder="واحد"
            maxLength="10"
            className="p-2 rounded border"
          />
          {errors?.unit && (
            <span className="text-red-500 text-sm">{errors.unit.message}</span>
          )}
        </label>
       
      </div>

      <div className="flex justify-between mt-4">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step5;
