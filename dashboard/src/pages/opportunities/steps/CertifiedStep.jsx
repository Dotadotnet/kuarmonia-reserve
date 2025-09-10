// components/signup/steps/PasswordStep.jsx


import StatusSwitch from "@/components/shared/button/StatusSwitch";

const CertifiedStep = ({ register, errors }) => {
  return (
    <>
      <div className="flex flex-col  gap-y-4  overflow-y-auto p-2">
        <label htmlFor="issuingOrganization" className="flex flex-col gap-y-1">
          <span className="text-sm">* سازمان صادرکننده </span>
          <input
            type="text"
            name="issuingOrganization"
            id="issuingOrganization"
            {...register("issuingOrganization", {
              required: "وارد کردن سازمان صادرکننده الزامی است",
              minLength: {
                value: 3,
                message: "سازمان صادرکننده باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 100,
                message: "سازمان صادرکننده نباید بیشتر از ۱۰۰ حرف باشد"
              }
              
            })}
            placeholder="سازمان صادرکننده"
            maxLength="100"
            className="p-2 rounded border "
          />
          {errors.issuingOrganization && (
            <span className="text-red-500 text-sm">
              {errors.issuingOrganization.message}
            </span>
          )}
        </label>
        <label htmlFor="country" className="flex flex-col gap-y-1">
          <span className="text-sm">* کشور صادر کننده </span>
          <input
            type="text"
            name="country"
            id="country"
            {...register("country", {
              required: "وارد کردن کشور صادرکننده الزامی است",
              minLength: {
                value: 3,
                message: "کشور صادرکننده باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 30,
                message: "کشور صادرکننده نباید بیشتر از ۳۰ حرف باشد"
              }
            })}
            placeholder="کشور صادرکننده"
            maxLength="100"
            className="p-2 rounded border "
          />
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </label>
        <label htmlFor="year" className="flex flex-col gap-y-1">
          <span className="text-sm">* سال اخذ </span>
          <input
            type="number"
            name="year"
            id="year"
            {...register("year", {
              required: "وارد کردن سال اخذ الزامی است",
              min: {
                value: 1000,
                message: "سال اخذ باید حداقل ۴ رقمی باشد"
              },
              max: {
                value: new Date().getFullYear(),
                message: "سال اخذ نباید بیشتر از سال جاری باشد"
              }
            })}
            placeholder="سال اخذ "
            className="p-2 rounded border "
          />
          {errors.year && (
            <span className="text-red-500 text-sm">{errors.year.message}</span>
          )}
        </label>

        <StatusSwitch
          label={"آیا این استاندارد بین المللی  است؟"}
          id="isInternational"
          register={register}
          defaultChecked={false}
        />
      </div>
    </>
  );
};

export default CertifiedStep;
