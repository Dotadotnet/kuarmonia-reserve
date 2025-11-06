import NavigationButton from "@/components/shared/button/NavigationButton";
import FormInput from "@/components/shared/input/FormInput";
import FormTextArea from "@/components/shared/input/FormTextArea";

const Step1 = ({ nextStep, errors, register, watch }) => {
  const icon = watch("icon");

  return (
    <div className="flex flex-col gap-y-4 overflow-y-auto  p-2">
      <div className="flex flex-col gap-y-1 max-h-96">
        <FormInput
          label="* عنوان خدمت"
          id="title"
          type="text"
          placeholder="عنوان"
          register={register}
          error={errors?.title}
          required="وارد کردن عنوان الزامی است"
          minLength={{ value: 3, message: "عنوان باید حداقل ۳ حرف داشته باشد" }}
          maxLength={{ value: 100, message: "عنوان  نباید بیشتر از ۱۰۰ حرف باشد" }}
          className="p-2 rounded border"
        />
        
        <FormInput
          label="خلاصه"
          id="summary"
          type="textarea"
          placeholder="خلاصه مجله را وارد کنید..."
          register={register}
          error={errors?.summary}
          required="خلاصه الزامی است"
          minLength={{ value: 30, message: "خلاصه باید حداقل ۳۰ کاراکتر باشد" }}
          maxLength={{ value: 225, message: "خلاصه نباید بیشتر از ۲۲۵ کاراکتر باشد" }}
          rows={2}
          className="rounded border w-full form-textarea"
        />
        
        <FormTextArea
          label="کد SVG آیکون"
          id="icon"
          placeholder="<svg>...</svg>"
          register={register}
          className="rounded h-32 font-mono text-xs"
        >
          {/* نمایش پیش‌نمایش SVG */}
          {icon && (
            <div className="border rounded p-4 mt-2 flex justify-center items-center">
              <div dangerouslySetInnerHTML={{ __html: icon }} />
            </div>
          )}
        </FormTextArea>
      </div>
      <div className="flex justify-start mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step1;