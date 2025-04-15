// components/signup/steps/PasswordStep.jsx

import React from "react";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";

const CertifiedStep = ({
  register,
  errors,
  setSocialLinksData,
  socialLinksData
}) => {
  return (
    <>
      <div className="flex flex-col  gap-y-4  overflow-y-auto p-2">
        <label htmlFor="email" className="flex flex-col gap-y-1">
          <span className="text-sm">ایمیل عضو را وارد کنید</span>
          <input
            type="email"
            name="email"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "فرمت ایمیل صحیح نیست"
              },
              minLength: {
                value: 6,
                message: "ایمیل باید حداقل 6 کاراکتر باشد"
              },
              maxLength: {
                value: 50,
                message: "ایمیل  نباید بیشتر از 50 کاراکتر باشد"
              }
            })}
            placeholder="john@example.com"
            className="p-2 rounded   "
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </label>
        <label htmlFor="phone" className="flex flex-col gap-y-1">
          <span className="text-sm">شماره تلفن عضو را وارد کنید</span>
          <input
            type="tel"
            name="phone"
            id="phone"
            {...register("phone", {
              required: "وارد کردن شماره تلفن الزامی است",
              pattern: {
                value: /^\+?[0-9]{10,15}$/,
                message: "شماره تلفن صحیح نیست"
              }
            })}
            placeholder="شماره تلفن"
            className="p-2 rounded border "
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </label>
        <SocialLinksInput
          socialLinksData={socialLinksData}
          setSocialLinksData={setSocialLinksData}
        />
        <StatusSwitch
          label={"آیا  عضو هیات مدیره یا سهام دار می باشد؟"}
          id="isBoardMemberOrShareholder"
          register={register}
          defaultChecked={false}
        />
        <StatusSwitch
          label={"آیا  استخدام رسمی  می باشد؟"}
          id="isOfficiallyEmployed"
          register={register}
          defaultChecked={false}
        />
      </div>
    </>
  );
};

export default CertifiedStep;
