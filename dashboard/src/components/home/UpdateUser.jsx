import { useUpdateUserInfoMutation } from "@/services/user/userApi";
import { useUpdateAdminMutation } from "@/services/admin/adminApi";
import { useEffect, useMemo, useState } from "react";
import Button from "@/components/shared/button/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import CloudUpload from "@/components/icons/CloudUpload";
import { useGetUserQuery } from "@/services/user/userApi";
import { useGetAdminQuery } from "@/services/admin/adminApi";
const UpdateUser = ({ setIsOpen }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const userState = useSelector((state) => state?.user);

  const { data: userData } = useGetUserQuery(userState?._id, {
    skip: !userState?.userId
  });
  const { data: adminData } = useGetAdminQuery(userState?._id, {
    skip: !userState?.adminId
  });

  const user = useMemo(() => {
    if (userData?.acknowledgement !== undefined) return userData?.data;
    if (adminData?.acknowledgement !== undefined) return adminData?.data;
    return null;
  }, [userData, adminData]);

  const [
    updateUser,
    { isLoading: isUserLoading, data: userDataRes, error: userError }
  ] = useUpdateUserInfoMutation();
  const [
    updateAdmin,
    { isLoading: isAdminLoading, data: adminDataRes, error: adminError }
  ] = useUpdateAdminMutation();
  const loading = isUserLoading || isAdminLoading;
  const successData = userDataRes || adminDataRes;
  const failError = userError || adminError;
  useEffect(() => {
    if (loading) {
      toast.loading("در حال بروزرسانی اطلاعات...", { id: "updateUser" });
    }

    if (successData) {
      toast.success(successData?.description, { id: "updateUser" });
      setIsOpen(false);
    }

    if (failError?.data) {
      toast.error(failError?.data?.description, { id: "updateUser" });
    }
  }, [
    isUserLoading,
    isAdminLoading,
    userDataRes,
    adminDataRes,
    userError,
    adminError,
    setIsOpen
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ mode: "onChange" });
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
  useEffect(() => {
    if (user) {
      reset({
        name:
          user?.name ||
          user?.translations?.[0]?.translation?.fields?.name ||
          "",
        email: user?.email || "",
        bio:
          user?.bio || user?.translations?.[0]?.translation?.fields?.bio || "",
        phone: user?.phone || "",
        avatar: user?.avatar || null,
        role: user?.role || "user",
        status: user?.status || "active",
        country: user?.address?.country || "",
        state: user?.address?.state || "",
        city: user?.address?.city || "",
        street: user?.address?.street || "",
        plateNumber: user?.address?.plateNumber || "",
        floor: user?.address?.floor || "",
        unit: user?.address?.unit || "",
        postalCode: user?.address?.postalCode || ""
      });
    }
  }, [user, reset]);
  const handleUpdateUser = (data) => {
    const formData = new FormData();
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("street", data.street);
    formData.append("plateNumber", data.plateNumber);
    formData.append("floor", data.floor);
    formData.append("unit", data.unit);
    formData.append("postalCode", data.postalCode);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("bio", data.bio);
    formData.append("role", data.role);
    formData.append("status", data.status);
    if (avatarPreview !== null && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    if (user?.userId) {
      updateUser({ id: user._id, body: formData });
    } else if (user?.adminId) {
      updateAdmin({ id: user._id, body: formData });
    }
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
        <div className="relative h-[100px] w-[100px]">
          <img
            src={avatarPreview || user?.avatar?.url || "/placeholder.png"}
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
                    onChange: (event) => handleAvatarChange(event)
                  })}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </span>
            </div>
          </div>
        </div>
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
          <option value="user">کاربر</option>
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
      <label htmlFor="bio" className="flex flex-col gap-y-1">
        <span className="text-sm">ویرایش بیوگرافی*</span>
        <textarea
          name="bio"
          id="bio"
          rows="2"
          maxLength={500}
          placeholder="بیوگرافی خود را اینجا وارد کنید..."
          className="rounded"
          {...register("bio")}
        ></textarea>
      </label>

      <label htmlFor="country" className="flex flex-col gap-y-1">
        <span className="text-sm">* کشور</span>
        <input
          type="text"
          name="country"
          id="country"
          {...register("country", {
            required: "وارد کردن کشور الزامی است",
            minLength: {
              value: 2,
              message: "نام کشور باید حداقل ۲ حرف باشد"
            },
            maxLength: {
              value: 100,
              message: "نام کشور نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="کشور"
          className="p-2 rounded border"
        />
        {errors?.country && (
          <span className="text-red-500 text-sm">{errors.country.message}</span>
        )}
      </label>

      {/* استان */}
      <label htmlFor="state" className="flex flex-col gap-y-1">
        <span className="text-sm">* استان</span>
        <input
          type="text"
          name="state"
          id="state"
          {...register("state", {
            required: "وارد کردن استان الزامی است",
            minLength: {
              value: 2,
              message: "استان باید حداقل ۲ حرف باشد"
            },
            maxLength: {
              value: 100,
              message: "استان نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="استان"
          className="p-2 rounded border"
        />
        {errors?.state && (
          <span className="text-red-500 text-sm">{errors.state.message}</span>
        )}
      </label>

      {/* شهر */}
      <label htmlFor="city" className="flex flex-col gap-y-1">
        <span className="text-sm">* شهر</span>
        <input
          type="text"
          name="city"
          id="city"
          {...register("city", {
            required: "وارد کردن شهر الزامی است",
            minLength: {
              value: 2,
              message: "شهر باید حداقل ۲ حرف باشد"
            },
            maxLength: {
              value: 100,
              message: "شهر نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="شهر"
          className="p-2 rounded border"
        />
        {errors?.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </label>

      <label htmlFor="street" className="flex flex-col gap-y-1">
        <span className="text-sm">* خیابان </span>
        <input
          type="text"
          name="street"
          id="street"
          {...register("street", {
            required: "وارد کردن خیابان الزامی است",
            minLength: {
              value: 3,
              message: "خیابان باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "خیابان  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="خیابان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.street && (
          <span className="text-red-500 text-sm">{errors.street.message}</span>
        )}
      </label>
      <label htmlFor="plateNumber" className="flex flex-col gap-y-1">
        <span className="text-sm">* پلاک </span>
        <input
          type="text"
          name="plateNumber"
          id="plateNumber"
          {...register("plateNumber", {
            required: "وارد کردن پلاک الزامی است",
            minLength: {
              value: 1,
              message: "پلاک باید حداقل 1 حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "پلاک  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="پلاک"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.plateNumber && (
          <span className="text-red-500 text-sm">
            {errors.plateNumber.message}
          </span>
        )}
      </label>
      {/* طبقه */}
      <label htmlFor="floor" className="flex flex-col gap-y-1">
        <span className="text-sm">طبقه</span>
        <input
          type="text"
          name="floor"
          id="floor"
          {...register("floor", {
            minLength: {
              value: 1,
              message: "طبقه باید حداقل ۱ حرف داشته باشد"
            },
            maxLength: {
              value: 10,
              message: "طبقه نباید بیشتر از ۱۰ حرف باشد"
            }
          })}
          placeholder="طبقه"
          maxLength="10"
          className="p-2 rounded border"
        />
        {errors?.floor && (
          <span className="text-red-500 text-sm">{errors.floor.message}</span>
        )}
      </label>

      {/* واحد */}
      <label htmlFor="unit" className="flex flex-col gap-y-1">
        <span className="text-sm">واحد</span>
        <input
          type="text"
          name="unit"
          id="unit"
          {...register("unit", {
            minLength: {
              value: 1,
              message: "واحد باید حداقل ۱ حرف داشته باشد"
            },
            maxLength: {
              value: 10,
              message: "واحد نباید بیشتر از ۱۰ حرف باشد"
            }
          })}
          placeholder="واحد"
          maxLength="10"
          className="p-2 rounded border"
        />
        {errors?.unit && (
          <span className="text-red-500 text-sm">{errors.unit.message}</span>
        )}
      </label>

      <label htmlFor="postalCode" className="flex flex-col gap-y-1">
        <span className="text-sm">* کد پستی </span>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          {...register("postalCode", {
            required: "وارد کردن کد پستی الزامی است",
            minLength: {
              value: 3,
              message: "کد پستی باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "کد پستی  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="کد پستی"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.postalCode && (
          <span className="text-red-500 text-sm">
            {errors.postalCode.message}
          </span>
        )}
      </label>

      <Button type="submit" disabled={loading} className="py-2">
        {loading ? "در حال بارگذاری..." : "بروزرسانی پروفایل"}
      </Button>
    </form>
  );
};

export default UpdateUser;
