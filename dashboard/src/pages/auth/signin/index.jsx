import React, { useEffect } from "react";
import Spinner from "@/components/shared/Spinner";
import { NavLink } from "react-router-dom";
import { useSignInMutation } from "@/services/auth/authApi";
import { toast } from "react-hot-toast";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "/logo.png";
const Signin = () => {
  const [signin, { isLoading, data, error }] = useSignInMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال ورود...", { id: "signin" });
    }

    if (data) {
      toast.success(data?.description, { id: "signin" });
      localStorage.setItem("accessToken", data?.accessToken);

      // open new tab
      setTimeout(() => {
        window.open("/", "_self");
      }, 1000);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "signin" });
    }
  }, [isLoading, data, error]);

  const handleSignin = async (e) => {
    e.preventDefault();

    signin({ email: e.target.email.value, password: e.target.password.value });
    e.target.reset();
  };

  return (
    <section className="w-screen relative h-screen overflow-hidden flex justify-center items-center p-4 ">
      <div className="wave "></div>
      <div className="wave wave2 "></div>
      <div className="wave wave3"></div>
      <div className="max-w-md w-full bg-white dark:bg-gray-900 z-50 flex flex-col gap-y-4  p-8 rounded-primary shadow-lg">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full   dark:border-gray-600" />{" "}
          <img
            src={logo}
            alt="logo"
            width={141}
            height={40}
            className="max-w-full cursor-pointer"
          />
          <hr className="w-full   dark:border-gray-600" />
        </div>
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSignin}
        >
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm">ایمیل خود را وارد کنید</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="مانند example@gmail.com"
              className=""
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm">رمز عبور خود را وارد کنید</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="مانند Admin@123"
              className=""
              required
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 dark:bg-white text-white dark:text-black transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm"
          >
            {isLoading ? <Spinner /> : "ورود"}
          </button>
        </form>
        <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
          <NavLink to="/signup" className="">
            ثبت نام
          </NavLink>
          <span className="h-4 border-l" />
          <NavLink to="/forgot-password" className="">
            فراموشی رمز عبور
          </NavLink>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
          <ThemeToggle />
        </div>
      </div>
    </section>
  );
};

export default Signin;
