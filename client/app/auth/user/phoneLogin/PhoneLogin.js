"use client"
import { useState, useEffect } from "react";
import Phone from "./Phone";
import Verify from "./Verify";
import AddName from "./AddName";

import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSignUpPhoneMutation } from "@/services/auth/authApi";

export default function PhoneLogin() {
  const { register, handleSubmit } = useForm();
  const [signin, { data, isLoading, error }] = useSignUpPhoneMutation();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال تایید ...", { id: "signup" });
    }

    if (data?.success) {
      toast.success(data?.message, { id: "signup" });
      setPhone(data?.phone);
      setStep(2);
    }
    if (data && !data?.success) {
      toast.error(data?.message, { id: "signup" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "signup" });
    }
  }, [isLoading, data, error]);

  return (
    <div>
      {step === 1 && (
        <Phone
          register={register}
          handleSubmit={handleSubmit}
          signin={signin}
        />
      )}

      {step === 2 && (
        <Verify
          otp={otp}
          setOtp={setOtp}
          phone={phone}
          handleSubmit={handleSubmit}
          signin={signin}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <AddName
          register={register}
          phone={phone}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
