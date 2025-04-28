"use client";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

function Phone({handleSubmit,signin,register}) {
const t = useTranslations("Auth")

  return (

    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit((data) => signin({ phone: data.phone }))}>
      <input
        type="tel"
        placeholder={t("4")}
        id="phone"
        name="phone"
        className="border p-2 rounded"
        {...register("phone", { required: true })}
      />
      <button
        type="submit"
        className="bg-blue-500 text-center text-white px-4 py-2 rounded"
      >
       {t("3")}
      </button>
    </form>
  );
}

export default Phone;
