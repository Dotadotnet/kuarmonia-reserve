"use client";
import Alert from "@/components/shared/alert/Alert";
import { useEffect } from "react";
import { useAddNameMutation } from "@/services/auth/userAuthApi";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

function AddName({ phone, register, handleSubmit }) {
  const [addName, { isLoading, error, data }] = useAddNameMutation();
  const router = useRouter();
   const t = useTranslations("Auth");
  useEffect(() => {
    if (isLoading) {
      toast.loading(t("5"), { id: "signup" });
    } else {
      toast.dismiss("signup");
    }

    if (data?.success) {
      toast.success(data?.message, { id: "signup" });
      setTimeout(() => {
        window.location.href='/' 
      }, 1500); 
    } else if (data && !data?.success) {
      toast.error(data?.message, { id: "signup" });
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "signup" });
    }
  }, [isLoading, data, error]);

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => {
        addName({ phone, name: data.name });
      })}
    >
      <div className="flex justify-center">
        <div className="w-full text-center">
          <Alert type="green" message={t("6")} />
          <input
            type="text"
            placeholder={t("9")}
            id="name"
            className="border p-2 rounded w-full"
            {...register("name", { required: t("7") })}
          />
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out w-full mt-3"
            >
              {t("8")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddName;
