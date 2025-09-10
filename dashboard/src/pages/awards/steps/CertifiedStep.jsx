// components/signup/steps/PasswordStep.jsx


import StatusSwitch from "@/components/shared/button/StatusSwitch";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";

const CertifiedStep = ({ register, errors, control }) => {

const awardType = [
  { id: 1, value: "building", title: "ساختمان" },
  { id: 2, value: "hotel", title: "هتل" },
  { id: 3, value: "university", title: "دانشگاه" },
  { id: 4, value: "venue", title: "محل مراسم" },
  { id: 5, value: "other", title: "سایر" }
];

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
        <label htmlFor="newsType" className="flex flex-col gap-y-2 ">
          نوع جایزه
          <Controller
            control={control}
            name="type"
            rules={{ required: "انتخاب نوع جایزه الزامی است" }}
            render={({ field: { onChange } }) => (
              <Dropdown
                items={awardType}
                handleSelect={onChange}
                placeholder="یک مورد انتخاب کنید"
                className={"w-full h-12"}
                returnType="id"
              />
            )}
          />
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
