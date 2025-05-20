import React from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import ArrayInput from "@/components/shared/tools/ArrayInput";

const Step8 = ({
  nextStep,
  prevStep,
  errors,
  register,
  control,
  responsibilities,
  setResponsibilities,
  countries,
  setCountries,
  cities,
  setCities
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-2   max-h-[500px]  overflow-y-auto ">
        <ArrayInput
          title="مسئولیت ها"
          values={responsibilities}
          setValues={setResponsibilities}
          namePrefix="responsibilities"
          register={register}
          errors={errors}
        />
         <ArrayInput
          title="کشورهای هدف"
          values={countries}
          setValues={setCountries}
          namePrefix="countries"
          register={register}
          errors={errors}
        />
         <ArrayInput
          title="شهرهای هدف"
          values={cities}
          setValues={setCities}
          namePrefix="cities"
          register={register}
          errors={errors}
        />
      </div>
      <div className="flex justify-between">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step8;
