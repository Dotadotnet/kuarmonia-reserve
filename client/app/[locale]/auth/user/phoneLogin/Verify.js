"use client";
import Alert from "@/components/shared/alert/Alert";
import { useEffect, useRef, useState } from "react";
import { useVerifyMutation } from "@/services/auth/userAuthApi";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function Verify({ otp, setOtp, phone, handleSubmit, signin,setStep }) {
  const [verify, { isLoading, error, data }] = useVerifyMutation();
  const router = useRouter();

  const inputRefs = useRef([]);
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData.getData("text");
    if (/^[0-9]{4}$/.test(text)) {
      setOtp(text.split(""));
    }
  };

  const handleVerify = async (e) => {
    const code = otp.join("");

    if (code.length !== 4) {
      toast.error("لطفاً کد ۴ رقمی را وارد کنید");
      return;
    }

    verify({ phone, code });
  };
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signup" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "signup" });
      if(data.isSignUp){
        setStep(3)
      }else{
        setTimeout(() => {
          window.location.href='/' 
        }, 1500);
      }
    }

    if (data && !data?.success) {
      toast.dismiss(data?.message, { id: "signup" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "signup" });
    }
  }, [isLoading, data, error]);

  return (
    <form className="w-full  " onSubmit={handleSubmit(handleVerify)}>
      <div className="flex justify-center">
        <div className="w-full text-center ">
          <Alert
            type="green"
            message={`کد تأیید ۴ رقمی ارسال شده به شماره ${phone} را وارد کنید.`}
          />

          <div className="flex flex-row-reverse items-center justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                className="w-14 h-14 text-center text-2xl font-extrabold text-gray-700 bg-primary dark:text-gray-100 dark:bg-slate-800 border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700  dark:focus:text-gray-100 focus:bg-white focus:border-orange-600 focus:outline-none"
                maxLength="1"
                value={digit}
                autoFocus={index === 0}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
              />
            ))}
          </div>

          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full mt-3"
            >
              تأیید حساب
            </button>
          </div>

          <div className="text-sm text-slate-500 mt-4">
            کد را دریافت نکردید؟
            <button
              type="button"
              className="font-medium text-indigo-500 hover:text-indigo-600 ml-1"
              onClick={() => signin({ phone: phone })}
            >
              ارسال مجدد
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Verify;
