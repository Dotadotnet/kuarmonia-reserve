"use client";
import Button from "@/components/shared/button/Button";
import Logo from "@/components/shared/logo/Logo";
import ToggleThemeButton from "@/components/shared/theme/ToggleThemeButton";
import { useSigninMutation } from "@/services/auth/adminAuthApi";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Signinadmin = () => {
  const { register, handleSubmit, reset } = useForm();
  const [signin, { isLoading, data, error }] = useSigninMutation();
  useEffect(() => {
    if (data) {
      if(data.success){
        toast.success(data?.message, { id: "signin" });
      }else{
        toast.error(data?.message, { id: "signin" });
      }
      if (data?.accessToken) {
        window.open("/dashboard", "_self");
      }
      reset();
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "signin" });
    }
    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signin" });
    }
  }, [data, error, isLoading, reset]);

  const handleSignin = (data) => {
    signin(data);
  };

  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 flex justify-center items-center p-4`}
    >
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="max-w-md w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-8 rounded-primary shadow-lg z-10">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Logo />
          <hr className="w-full" />
        </div>

        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleSignin)}
        >
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm">ایمیل خود را وارد کنید</span>
            <input
              type="email"
              name="email"
              id="email"
              {...register("email", { required: true })}
              placeholder="example@gmail.com"
              className="input rounded"
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm">رمز عبور خود را وارد کنید</span>
            <input
              type="password"
              name="password"
              id="password"
              {...register("password", { required: true })}
              placeholder="********"
              className="input rounded"
            />
          </label>
          <Button type="submit" disabled={isLoading} className="py-2">
            ورود
          </Button>
        </form>

        <div className="text-xs flex flex-row justify-center items-center gap-x-2">
          <Link href="/auth/signup-admin">ثبت‌نام</Link>
          <div className="h-4 border-l"></div>
          <Link href="/auth/forgot-password">فراموشی رمز عبور</Link>
        </div>

        <div className="flex justify-center">
          <ToggleThemeButton />
        </div>
      </div>
    </section>
  );
};

export default Signinadmin;
