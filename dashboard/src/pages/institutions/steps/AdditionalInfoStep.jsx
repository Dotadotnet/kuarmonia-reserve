// components/signup/steps/PasswordStep.jsx

import { useMemo } from "react";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import { useGetInstitutionTypesQuery } from "@/services/institutionType/institutionTypeApi";
import ArrayInput from "@/components/shared/tools/ArrayInput";
import NavigationButton from "@/components/shared/button/NavigationButton";
import StatusSwitch from "@/components/shared/button/StatusSwitch";

const AdditionalInfoStep = ({
  register,
  errors,
  control,
  faculties,
  setFaculties,
  languagesOffered,
  setLanguagesOffered,
  prevStep,
  nextStep
}) => {
  const { data, isLoading, error, refetch } = useGetInstitutionTypesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });

  const types = useMemo(
    () =>
      data?.data?.map((type) => ({
        id: type._id,
        value: type.translations[0].translation?.fields.title,
        label: type.title,
        icon: type.icon
      })) || [],
    [data]
  );

  return (
    <>
      <div className="flex flex-col  gap-y-4 h-3/4 max-h-3/4  overflow-y-auto p-2">
        <label htmlFor="newsType" className="flex flex-col gap-y-2 ">
          نوع مرکز علمی
          <Controller
            control={control}
            name="type"
            rules={{ required: "انتخاب نوع مرکز علمی الزامی است" }}
            render={({ field: { onChange } }) => (
              <Dropdown
                items={types}
                handleSelect={onChange}
                placeholder="یک مورد انتخاب کنید"
                className={"w-full h-12"}
                returnType="id"
              />
            )}
          />
        </label>
        <label htmlFor="establishedYear" className="flex flex-col gap-y-1">
          <span className="text-sm">* سال تاسیس </span>
          <input
            type="number"
            name="establishedYear"
            id="establishedYear"
            {...register("establishedYear", {
              required: "وارد کردن سال تاسیس الزامی است",
              min: {
                value: 1000,
                message: "سال تاسیس باید حداقل ۴ رقمی باشد"
              },
              max: {
                value: new Date().getFullYear(),
                message: "سال تاسیس نباید بیشتر از سال جاری باشد"
              }
            })}
            placeholder="سال تاسیس "
            className="p-2 rounded border "
          />
          {errors.establishedYear && (
            <span className="text-red-500 text-sm">{errors.establishedYear.message}</span>
          )}
        </label>
        <ArrayInput
          title="دانشکده ها"
          values={faculties}
          setValues={setFaculties}
          namePrefix="faculty"
          register={register}
          errors={errors}
        />
        <ArrayInput
          title="زبان ها"
          values={languagesOffered}
          setValues={setLanguagesOffered}
          namePrefix="languagesOffered"
          register={register}
          errors={errors}
        />
      </div>
      <StatusSwitch
        label={"آیا این مرکز آموزشی  بین المللی  است؟"}
        id="isInternational"
        register={register}
        defaultChecked={false}
      />
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default AdditionalInfoStep;
