// components/signup/steps/PasswordStep.jsx
"use client";
import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";

const PasswordStep = ({ register, errors, prevStep, nextStep }) => {
  return (
    <>
      <label htmlFor="password" className="flex flex-col gap-y-1">
        <span className="text-sm">رمز عبور خود را وارد کنید</span>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", {
            required: "وارد کردن رمز عبور الزامی است",
            minLength: {
              value: 4,
              message: "رمز عبور باید حداقل 4 کاراکتر باشد",
            },
            maxLength: {
              value: 30,
              message: "رمز عبور نباید بیشتر از ۳۰ کاراکتر باشد",
            },
          })}
          placeholder="رمز عبور"
          className="p-2 rounded border bg-white dark-text-black"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
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

export default PasswordStep;
