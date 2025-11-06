import FormInput from "@/components/shared/input/FormInput";

const TitleStep = ({ register, errors }) => {
  return (
    <div className="space-y-4">
      
      <FormInput
        label="زیرعنوان"
        id="subtitle"
        placeholder="زیرعنوان هرو اسلایدر را وارد کنید"
        register={register}
        error={errors.subtitle}
        required="زیرعنوان الزامی است"
      />
      
      <FormInput
        label="توضیحات"
        id="caption"
        type="textarea"
        placeholder="توضیحات هرو اسلایدر را وارد کنید"
        register={register}
        error={errors.caption}
        required="توضیحات الزامی است"
        rows={4}
      />
      
      <FormInput
        label="لینک"
        id="link"
        placeholder="لینک هرو اسلایدر را وارد کنید"
        register={register}
        error={errors.link}
      />

 
    </div>
  );
};

export default TitleStep;