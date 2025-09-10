"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import Button from "@/components/shared/button/Button";

export default function SubscribeForm() {
  const t = useTranslations("News");
  const { register, handleSubmit, formState: { errors } } = useForm();

  // const onSubmit = (data) => {
  //   console.log("Email submitted:", data.email);
  // };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="newsletter-form flex flex-col space-y-4"
    >
      <input
        type="email"
        className="border p-2"
        placeholder={t("emailPlaceholder")}
        {...register("email", { 
          required: t("emailRequired"),
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            message: t("emailValid")
          }
        })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <Button type="submit" className="px-4 py-3 text-md text-center rounded-md">
        {t("subscribeButton")}
      </Button>
      <p>{t("subscribeNote")}</p>
    </form>
  );
}
