// components/signup/steps/AddressStep.jsx
import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";

const AddressStep = ({ register, errors, prevStep, nextStep }) => {
  return (
    <div className="flex flex-col gap-y-4 w-full ">
      <div className="flex flex-col gap-y-1 w-full h-96 px-2 overflow-y-auto max-h-3/4">
        <label htmlFor="country" className="flex flex-col gap-y-1">
          <span className="text-sm">* کشور</span>
          <input
            type="text"
            name="country"
            id="country"
            {...register("country", {
              required: "وارد کردن کشور الزامی است",
              minLength: {
                value: 2,
                message: "نام کشور باید حداقل ۲ حرف باشد"
              },
              maxLength: {
                value: 100,
                message: "نام کشور نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="کشور"
            className="p-2 rounded border"
          />
          {errors?.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </label>

        {/* استان */}
        <label htmlFor="state" className="flex flex-col gap-y-1">
          <span className="text-sm">* استان</span>
          <input
            type="text"
            name="state"
            id="state"
            {...register("state", {
              required: "وارد کردن استان الزامی است",
              minLength: {
                value: 2,
                message: "استان باید حداقل ۲ حرف باشد"
              },
              maxLength: {
                value: 100,
                message: "استان نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="استان"
            className="p-2 rounded border"
          />
          {errors?.state && (
            <span className="text-red-500 text-sm">
              {errors.state.message}
            </span>
          )}
        </label>

        {/* شهر */}
        <label htmlFor="city" className="flex flex-col gap-y-1">
          <span className="text-sm">* شهر</span>
          <input
            type="text"
            name="city"
            id="city"
            {...register("city", {
              required: "وارد کردن شهر الزامی است",
              minLength: {
                value: 2,
                message: "شهر باید حداقل ۲ حرف باشد"
              },
              maxLength: {
                value: 100,
                message: "شهر نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="شهر"
            className="p-2 rounded border"
          />
          {errors?.city && (
            <span className="text-red-500 text-sm">{errors.city.message}</span>
          )}
        </label>

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
                message: "پلاک باید حداقل 1 حرف داشته باشد"
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
        {/* طبقه */}
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
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default AddressStep;
