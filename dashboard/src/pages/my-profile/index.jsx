import Button from "@/components/shared/button/Button";
import {
  useGetAdminQuery,
  useUpdateAdminInfoMutation
} from "@/services/admin/adminApi";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import ControlPanel from "../ControlPanel";
import CloudUpload from "@/components/icons/CloudUpload";
import DashboardCard14 from "../../partials/dashboard/DashboardCard14";
const MyProfile = () => {
  const adminState = useSelector((state) => state?.auth.admin);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [updateAdmin, { isLoading, data, error }] = useUpdateAdminInfoMutation();

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetAdminQuery(adminState._id);
  const admin = useMemo(() => fetchData?.data || {}, [fetchData]);
  const defaultValues = useMemo(() => {
    return {
      name: admin?.name || admin?.translations?.[0]?.translation?.fields?.name,
      email: admin?.email,
      bio: admin?.bio || admin?.translations?.[0]?.translation?.fields?.bio,
      phone: admin?.phone,
      avatar: admin?.avatar,
      role: admin?.role,
      status: admin?.status,
      country: admin?.address?.country,
      state: admin?.address?.state,
      city: admin?.address?.city,
      street: admin?.address?.street,
      plateNumber: admin?.address?.plateNumber,
      floor: admin?.address?.floor,
      unit: admin?.address?.unit,
      postalCode: admin?.address?.postalCode
    };
  }, [admin]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues, mode: "onChange" });

  useEffect(() => {
    reset(defaultValues);

    if (isLoading) {
      toast.loading("در حال بروزرسانی اطلاعات...", { id: "updateAdmin" });
    }

    if (data) {
      toast.success(data?.description, { id: "updateAdmin" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "updateAdmin" });
    }
  }, [defaultValues, reset, data, error, isLoading]);

  const handleAvatarPreview = (e) => {
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

  const handleUpdateAdmin = (data) => {
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

    updateAdmin({ id: admin?._id, body: formData });
  };
  return (
    <>
      <ControlPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div div="cols-span-1">
            <div className=" mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
              <div className="rounded-t-lg h-32 overflow-hidden">
                <img
                  className="object-cover object-top w-full"
                  src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                  alt="Mountain"
                />
              </div>
              <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img
                  className="object-cover object-center h-32"
                  src={admin?.avatar?.url || "/placeholder.png"}
                />
              </div>
              <div className="text-center mt-2">
                <h2 className="font-semibold">{admin.name}</h2>
                <p className="text-gray-500">
                  {admin.role === "superAdmin"
                    ? "مدیر کل"
                    : admin.role === "admin"
                    ? "مدیر"
                    : "اپراتور"}
                </p>
              </div>
              <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <div>2k</div>
                </li>
                <li className="flex flex-col items-center justify-between">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                  </svg>
                  <div>10k</div>
                </li>
                <li className="flex flex-col items-center justify-around">
                  <svg
                    className="w-4 fill-current text-blue-900"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg>
                  <div>15</div>
                </li>
              </ul>
            </div>
            <DashboardCard14 />
          </div>
          <form
            action=""
            className=" col-span-1 text-sm w-full flex flex-col gap-y-4 dark:text-gray-100"
            onSubmit={handleSubmit(handleUpdateAdmin)}
          >
            <div className="flex flex-col gap-y-2 w-full justify-center items-center">
              <img
                src={
                  avatarPreview ||
                  defaultValues?.avatar?.url ||
                  "/placeholder.png"
                }
                alt={defaultValues?.avatar?.public_id || "تصویر پروفایل"}
                height={100}
                width={100}
                className="h-[100px] w-[100px] rounded object-cover"
              />
              <label htmlFor="avatar" className="relative">
                <button
                  type="button"
                  className="py-1 px-4 flex flex-row gap-x-2 bg-green-100 border border-green-900 text-green-900 rounded-secondary w-fit"
                >
                  <CloudUpload className="h-5 w-5" />
                  ویرایش تصویر پروفایل
                </button>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  accept="image/png, image/jpg, image/jpeg"
                  className="absolute top-0 left-0 h-full w-full opacity-0 cursor-pointer"
                  {...register("avatar", {
                    ...(defaultValues?.avatar?.url
                      ? {}
                      : {
                          required: "تصویر پروفایل اجباری است"
                        }),
                    validate: {
                      acceptedFormats: (files) =>
                        !files?.length ||
                        ["image/png", "image/jpg", "image/jpeg"].includes(
                          files?.[0]?.type
                        ) ||
                        "فرمت تصویر باید PNG یا JPG باشد",
                      fileSize: (files) =>
                        !files?.length ||
                        files?.[0]?.size < 2 * 1024 * 1024 ||
                        "حجم تصویر باید کمتر از ۲ مگابایت باشد"
                    },
                    onChange: (e) => handleAvatarPreview(e)
                  })}
                />

                {errors.avatar && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.avatar.message}
                  </span>
                )}
              </label>
            </div>

            <label htmlFor="name" className="flex flex-col gap-y-1">
              <span className="text-sm">نام شما</span>
              <input
                type="text"
                name="name"
                id="name"
                {...register("name", {
                  required: "نام اجباری است",
                  minLength: { value: 3, message: "نام باید حداقل ۳ حرف باشد" }
                })}
                placeholder="مثال: علی رضایی"
                className=""
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </label>

            {/* ایمیل */}
            <label htmlFor="email" className="flex flex-col gap-y-1">
              <span className="text-sm">ایمیل شما</span>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", {
                  required: "ایمیل اجباری است",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "ایمیل نامعتبر است"
                  }
                })}
                placeholder="مثال: ali.rezaei@gmail.com"
                className=""
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </label>

            {/* تلفن */}
            <label htmlFor="phone" className="flex flex-col gap-y-1">
              <span className="text-sm">شماره تلفن شما</span>
              <input
                type="tel"
                name="phone"
                id="phone"
                {...register("phone", {
                  required: "شماره تلفن اجباری است",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "شماره تلفن نامعتبر است"
                  }
                })}
                placeholder="مثال: +۹۸۹۱۲۳۴۵۶۷۸۹"
                className=""
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </label>

            <label htmlFor="bio" className="flex flex-col gap-y-2">
              بیوگرافی شما*
              <textarea
                name="bio"
                id="bio"
                rows="6"
                maxLength={500}
                placeholder="بیوگرافی خود را وارد کنید..."
                className="rounded"
                {...register("bio", {
                  required: "بیوگرافی اجباری است",
                  minLength: {
                    value: 10,
                    message: "بیوگرافی باید حداقل ۱۰ کاراکتر باشد"
                  }
                })}
              ></textarea>
              {errors.bio && (
                <span className="text-red-500 text-sm">
                  {errors.bio.message}
                </span>
              )}
            </label>

            <label htmlFor="country" className="flex flex-col gap-y-1">
              <span className="text-sm">* کشور</span>
              <input
                type="text"
                name="country"
                id="country"
                {...register("country", {
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
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
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
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
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
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </label>

            <label htmlFor="street" className="flex flex-col gap-y-1">
              <span className="text-sm">* خیابان </span>
              <input
                type="text"
                name="street"
                id="street"
                {...register("street", {
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
                <span className="text-red-500 text-sm">
                  {errors.street.message}
                </span>
              )}
            </label>
            <label htmlFor="plateNumber" className="flex flex-col gap-y-1">
              <span className="text-sm">* پلاک </span>
              <input
                type="text"
                name="plateNumber"
                id="plateNumber"
                {...register("plateNumber", {
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
                <span className="text-red-500 text-sm">
                  {errors.floor.message}
                </span>
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
                <span className="text-red-500 text-sm">
                  {errors.unit.message}
                </span>
              )}
            </label>

            <label htmlFor="postalCode" className="flex flex-col gap-y-1">
              <span className="text-sm">* کد پستی </span>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                {...register("postalCode", {
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
            <Button type="submit" className="py-2 mt-4">
              بروزرسانی اطلاعات
            </Button>
          </form>
        </div>
      </ControlPanel>
    </>
  );
};

export default MyProfile;
