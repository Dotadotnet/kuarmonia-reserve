import { useUpdateUserInfoMutation } from "@/services/user/userApi";
import React, { useEffect, useState } from "react";
import Button from "@/components/shared/button/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import  CloudUpload  from '@/components/icons/CloudUpload';

const UpdateUser = ({ setIsOpen }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const user = useSelector((state) => state?.user);
  const [updateUser, { isLoading, data, error }] = useUpdateUserInfoMutation();
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال بروزرسانی اطلاعات کاربرn...", {
        id: "updateUser",
      });
    }

    if (data) {
      toast.success(data?.description, { id: "updateUser" });
      setIsOpen(false);
    }

    if (error?.data) {
      toast.error(error?.data?.description, {
        id: "updateUser",
      });
    }
  }, [data, error, isLoading, setIsOpen]);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      avatar: user?.avatar,
      address: user?.address,
      role: user?.role,
      status: user?.status,
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleUpdateUser = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("status", data.status);
    formData.append("address", data.address);

    if (avatarPreview !== null && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    updateUser({ id: user?._id, body: formData });
  };

  return (
    <form
    action=""
    className="w-full flex flex-col gap-y-4"
    onSubmit={handleSubmit(handleUpdateUser)}
  >
    <label
      htmlFor="avatar"
      className="flex flex-col gap-y-1 w-fit mx-auto items-center"
    >
      <span className="text-sm">آپلود آواتار 300x300</span>
      {(avatarPreview || user?.avatar?.url) && (
        <div className="relative h-[100px] w-[100px]">
          <img
            src={avatarPreview || `${user?.avatar?.url}`}
            alt={user?.avatar?.public_id || "avatar"}
            height={100}
            width={100}
            className="rounded h-[100px] w-[100px] object-cover"
          />
          <div className="absolute top-1 right-1 w-8 h-8 border rounded-secondary bg-primary">
            <div className="relative flex justify-center items-center w-full h-full">
              <span className="rounded-secondary text-white">
                <CloudUpload className="h-5 w-5" />
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  title="ابعاد: 300x300"
                  accept="image/jpg, image/png, image/jpeg"
                  {...register("avatar", {
                    onChange: (event) => handleAvatarChange(event),
                  })}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </label>
  
    <label htmlFor="name" className="flex flex-col gap-y-1">
      <span className="text-sm">ویرایش نام</span>
      <input
        type="text"
        name="name"
        id="name"
        {...register("name")}
        placeholder="مثلاً: مرجان قره گوزلو"
        className=""
      />
    </label>
  
    <label htmlFor="email" className="flex flex-col gap-y-1">
      <span className="text-sm">ویرایش ایمیل</span>
      <input
        type="email"
        name="email"
        id="email"
        {...register("email")}
        placeholder="مثلاً: ma@gmail.com"
        className=""
      />
    </label>
  
    <label htmlFor="role" className="flex flex-col gap-y-1">
      <span className="text-sm">ویرایش نقش</span>
      <select name="role" id="role" {...register("role")} className="">
        <option value="buyer">خریدار</option>
        <option value="admin">مدیر</option>
        <option value="operator">اپراتور</option>
        <option value="superAdmin">مدیر کل</option>
      </select>
    </label>
  
    <label htmlFor="status" className="flex flex-col gap-y-1">
      <span className="text-sm">ویرایش وضعیت</span>
      <select name="status" id="status" {...register("status")} className="">
        <option value="active">فعال</option>
        <option value="inactive">غیرفعال</option>
      </select>
    </label>
  
    <label htmlFor="phone" className="flex flex-col gap-y-1">
      <span className="text-sm">ویرایش شماره تلفن</span>
      <input
        type="tel"
        name="phone"
        id="phone"
        {...register("phone")}
        placeholder="مثلاً: +۹۸۹۱۲۳۴۵۶۷۸۹"
        className=""
      />
    </label>
  
    <label htmlFor="address" className="flex flex-col gap-y-1">
      <span className="text-sm">ویرایش آدرس*</span>
      <textarea
        name="address"
        id="address"
        rows="2"
        maxLength={500}
        placeholder="آدرس خود را اینجا وارد کنید..."
        className="rounded"
        {...register("address")}
      ></textarea>
    </label>
  
    <Button type="submit" disabled={isLoading} className="py-2">
      {isLoading ? "در حال بارگذاری..." : "بروزرسانی پروفایل"}
    </Button>
  </form>
  
  );
};

export default UpdateUser;
