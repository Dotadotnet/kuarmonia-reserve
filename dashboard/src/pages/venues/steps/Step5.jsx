import NavigationButton from "@/components/shared/button/NavigationButton";


const Step5 = ({
  register,
  errors,
  prevStep,
  nextStep,
}) => {


  return (
    <>
      <div className="flex flex-col gap-y-1">
  
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
              required: "وارد کردن پلاک الزامی است",
              minLength: {
                value: 3,
                message: "پلاک باید حداقل ۳ حرف داشته باشد"
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
        <label htmlFor="phone" className="flex flex-col gap-y-1">
          <span className="text-sm">* شماره تماس </span>
          <input
            type="text"
            name="phone"
            id="phone"
            {...register("phone", {
              required: "وارد کردن شماره تماس الزامی است",
              minLength: {
                value: 3,
                message: "شماره تماس باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 100,
                message: "شماره تماس  نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="شماره تماس"
            maxLength="100"
            className="p-2 rounded border "
          />
          {errors?.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </label>
      </div>
      <label htmlFor="email" className="flex flex-col gap-y-1">
        <span className="text-sm">* ایمیل </span>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: "وارد کردن ایمیل الزامی است",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "فرمت ایمیل معتبر نیست"
            }
          })}
          placeholder="ایمیل"
          className="p-2 rounded border"
        />
        {errors?.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </label>

      <div className="flex justify-between mt-4">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step5;
