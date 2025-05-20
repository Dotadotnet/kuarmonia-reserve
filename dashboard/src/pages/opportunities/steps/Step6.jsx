import NavigationButton from "@/components/shared/button/NavigationButton";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";

const Step6 = ({
  register,
  prevStep,
  nextStep,
  control,
  setValue,
  errors,
  employerLogoPreview,
  setEmployerLogoPreview,
  employerImage,
  setEmployerImage
}) => {
  return (
    <div className="flex flex-col gap-y-2 max-h-96 overflow-y-auto">
      <div className="flex flex-col items-center">
        <label
          htmlFor="employerImage"
          className="flex flex-col text-center gap-y-2"
        >
          تصویر یا لوگو شرکت یا کارفرما
          <ThumbnailUpload
            setThumbnailPreview={setEmployerLogoPreview}
            setThumbnail={setEmployerImage}
            title={"لطفا یک تصویر انتخاب کنید"}
            maxFiles={1}
            register={register("employerImage")}
          />
        </label>
        {errors?.employerImage && (
          <span className="text-red-500 text-sm">
            {errors?.employerImage.message}
          </span>
        )}
      </div>
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
      <label htmlFor="bio" className="flex flex-col gap-y-1">
        <span className="text-sm">درباره کارفرما خود را وارد کنید</span>
        <textarea
          name="bio"
          id="bio"
          rows="6"
          {...register("bio", {
            required: "وارد کردن درباره کارفرما الزامی است",
            minLength: {
              value: 3,
              message: "درباره کارفرما باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 900,
              message: "درباره کارفرما نباید بیشتر از 900 حرف باشد"
            }
          })}
          placeholder="درباره کارفرما"
          maxLength="900"
          className="p-2 rounded border "
        />
        {errors.bio && (
          <span className="text-red-500 text-sm">{errors.bio.message}</span>
        )}
      </label>
      <div className="mt-2">
        <StatusSwitch
          label={"نمایش اطلاعات کارفرما"}
          id={"employerInformationDisplay"}
          checked={false}
          register={register}
          defaultChecked={false}
        />
      </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step6;
