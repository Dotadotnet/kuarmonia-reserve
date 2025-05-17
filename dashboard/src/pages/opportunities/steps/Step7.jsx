import NavigationButton from "@/components/shared/button/NavigationButton";
import ArrayInput from "@/components/shared/tools/ArrayInput";

const Step7 = ({
  prevStep,
  nextStep,
  control,
  register,
  qualifications,
  setQualifications,
  benefits,
  setBenefits,
  languages,
  setLanuguages,
  errors
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <ArrayInput
        title="َشرایط"
        values={qualifications}
        setValues={setQualifications}
        namePrefix="qualifications"
        register={register}
        errors={errors}
      />
         <ArrayInput
        title="مزایا"
        values={benefits}
        setValues={setBenefits}
        namePrefix="benefits"
        register={register}
        errors={errors}
      />
        <ArrayInput
        title="زبان ها"
        values={languages}
        setValues={setLanuguages}
        namePrefix="languages"
        register={register}
        errors={errors}
      />
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step7;
