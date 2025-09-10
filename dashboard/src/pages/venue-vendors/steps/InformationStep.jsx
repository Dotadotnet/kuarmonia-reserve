
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";

const InformationStep = ({
  register,
  errors,
  setSocialLinksData,
  socialLinksData
}) => {
  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto p-2">
      {/* Country */}
      <label htmlFor="country" className="flex flex-col gap-y-1">
        <span className="text-sm">* کشور</span>
        <input
          type="text"
          id="country"
          {...register("country", {
            required: "وارد کردن کشور الزامی است",
            minLength: {
              value: 3,
              message: "کشور باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: { value: 30, message: "کشور نباید بیشتر از ۳۰ حرف باشد" }
          })}
          placeholder="کشور"
          maxLength="100"
          className="p-2 rounded border"
        />
        {errors.country && (
          <span className="text-red-500 text-sm">{errors.country.message}</span>
        )}
      </label>

      {/* City */}
      <label htmlFor="city" className="flex flex-col gap-y-1">
        <span className="text-sm">* شهر</span>
        <input
          type="text"
          id="city"
          {...register("city", {
            required: "وارد کردن شهر الزامی است",
            minLength: { value: 3, message: "شهر باید حداقل ۳ حرف داشته باشد" },
            maxLength: {
              value: 100,
              message: "شهر نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="شهر"
          maxLength="100"
          className="p-2 rounded border"
        />
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </label>

      {/* Mobile */}
      <label htmlFor="phone" className="flex flex-col gap-y-1">
        <span className="text-sm">* موبایل</span>
        <input
          type="tel"
          id="phone"
          {...register("phone", {
            required: "شماره موبایل الزامی است",
            pattern: {
              value:
                /^(?:\+?\d{1,4}[\s-]?)?(\(?\d{1,4}\)?[\s-]?)?[\d\s-]{7,15}$/,
              message: "شماره موبایل معتبر وارد کنید"
            }
          })}
          placeholder="مثلاً 09123456789"
          className="p-2 rounded border"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </label>

      {/* Email */}
      <label htmlFor="email" className="flex flex-col gap-y-1">
        <span className="text-sm">* ایمیل</span>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "ایمیل الزامی است",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "ایمیل معتبر وارد کنید"
            }
          })}
          placeholder="ایمیل"
          className="p-2 rounded border"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>
      <SocialLinksInput
        socialLinksData={socialLinksData}
        setSocialLinksData={setSocialLinksData}
      />
    </div>
  );
};

export default InformationStep;
