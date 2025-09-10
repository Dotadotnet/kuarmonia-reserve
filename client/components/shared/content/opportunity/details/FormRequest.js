"use client";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";

export default function FormRequest() {
  const {
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    setValue,
    control,
    reset
  } = useForm({
    mode: "all"
  });

  const [galleryPreview, setGalleryPreview] = useState(null);
  const [gallery, setGallery] = useState(null);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      gallery
    };
    // ارسال به سرور (مثلاً با fetch یا RTK Query)
    reset();
    setGallery(null);
    setGalleryPreview(null);
  };

  return (
    <section className="flex flex-col p-4">
      <h4 className="text-xl mb-4 font-semibold">درخواست پذیرش</h4>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* نام و نام خانوادگی */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullname"
            className="text-sm font-medium text-gray-700"
          >
            نام و نام خانوادگی
          </label>
          <input
            id="fullname"
            type="text"
            placeholder="نام و نام خانوادگی"
            {...register("fullname", { required: "وارد کردن نام الزامی است" })}
            className="border border-gray-300 p-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.fullname && (
            <span className="text-red-500 text-xs">
              {errors.fullname.message}
            </span>
          )}
        </div>

        {/* ایمیل */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            {...register("email", {
              required: "وارد کردن ایمیل الزامی است",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "ایمیل معتبر نیست"
              }
            })}
            className="border border-gray-300 p-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        {/* شماره تلفن */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700">
            شماره تلفن
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="0912xxxxxxx"
            {...register("phone", {
              required: "شماره تلفن الزامی است",
              pattern: {
                value: /^09\d{9}$/,
                message: "شماره تلفن معتبر نیست"
              }
            })}
            className="border border-gray-300 p-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-end">
          <GalleryUpload
            setGallery={setGallery}
            setGalleryPreview={setGalleryPreview}
            maxFiles={36}
            register={register}
            title="آپلود  مدارک"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label
            htmlFor="coverletter"
            className="text-sm font-medium text-gray-700"
          >
            توضیحات اضافه
          </label>
          <textarea
            id="coverletter"
            placeholder="متن توضیحی..."
            {...register("coverletter")}
            className="border border-gray-300 p-2 rounded h-28 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <Button
          type="submit"
          className="px-4 py-3 text-md w-full text-center rounded-md"
        >
          درخواست{" "}
        </Button>
      </form>
    </section>
  );
}
