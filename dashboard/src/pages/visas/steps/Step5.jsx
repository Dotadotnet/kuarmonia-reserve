import NavigationButton from "@/components/shared/button/NavigationButton";
import ArrayInput from "@/components/shared/tools/ArrayInput";

const Step5 = ({ 
  errors, 
  advantages, setAdvantages, 
  disadvantages, setDisadvantages, 
  conditions, setConditions, 
  rejectionReasons, setRejectionReasons,
  successTips, setSuccessTips,
  prevStep, nextStep, register 
}) => {
  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col gap-y-4 h-80 overflow-y-auto p-2">
        <ArrayInput
          title="شرایط"
          values={conditions}
          setValues={setConditions}
          namePrefix="conditions"
          register={register}
          errors={errors}
        />

        {/* مزایا */}
        <ArrayInput
          title="مزایا"
          values={advantages}
          setValues={setAdvantages}
          namePrefix="advantages"
          register={register}
          errors={errors.advantages || []}
        />

        {/* معایب */}
        <ArrayInput
          title="معایب"
          values={disadvantages}
          setValues={setDisadvantages}
          namePrefix="disadvantages"
          register={register}
          errors={errors}
        />

        {/* دلایل ریجکت شدن */}
        <ArrayInput
          title="دلایل ریجکت شدن ویزا"
          values={rejectionReasons}
          setValues={setRejectionReasons}
          namePrefix="rejectionReasons"
          register={register}
          errors={errors}
        />

        {/* راه‌های افزایش شانس */}
        <ArrayInput
          title="راه‌های افزایش شانس ویزا"
          values={successTips}
          setValues={setSuccessTips}
          namePrefix="successTips"
          register={register}
          errors={errors}
        />
      </div>

      {/* دکمه‌های ناوبری */}
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step5;
