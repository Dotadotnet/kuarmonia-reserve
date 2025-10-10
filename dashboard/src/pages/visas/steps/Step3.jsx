import NavigationButton from "@/components/shared/button/NavigationButton";
import {
  useGetCountriesQuery} from "@/services/country/countryApi";
  import Dropdown from "@/components/shared/dropDown/Dropdown";
  import { Controller } from "react-hook-form";
import { useMemo } from "react";

const Step3 = ({
  prevStep,
  nextStep,
  errors,
  register,
  control

}) => {

  const {
    isLoading: fetchingCountries,
    data: fetchCountriesData,
    error: fetchCountriesError
  } = useGetCountriesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
console.log(fetchCountriesData)
  const countries = useMemo(
    () =>
      fetchCountriesData?.data?.map((country) => ({
        id: country._id,
        value: country.translations[0].translation?.fields.slug,
        label: country.slug,
        about: country.about
      })),
    [fetchCountriesData]
  );
  return (
    <>
      <div className="flex flex-col p-2">
        <div className="flex flex-col gap-y-4 overflow-y-auto p-2">

          {/* زمان پردازش */}
          <label htmlFor="processingTime" className="flex flex-col gap-y-1">
            <span className="text-sm">* زمان پردازش </span>
            <input
              type="text"
              id="processingTime"
              {...register("processingTime", {
                required: "وارد کردن زمان پردازش الزامی است",
                minLength: { value: 3, message: "زمان پردازش باید حداقل ۳ حرف داشته باشد" },
                maxLength: { value: 100, message: "زمان پردازش نباید بیشتر از ۱۰۰ حرف باشد" }
              })}
              placeholder="زمان پردازش"
              maxLength="100"
              className="p-2 rounded border"
            />
            {errors?.processingTime && (
              <span className="text-red-500 text-sm">{errors?.processingTime.message}</span>
            )}
          </label>

          {/* مدت اعتبار */}
          <label htmlFor="validity" className="flex flex-col gap-y-1">
            <span className="text-sm">* مدت اعتبار </span>
            <input
              type="text"
              id="validity"
              {...register("validity", {
                required: "وارد کردن مدت اعتبار الزامی است",
                minLength: { value: 3, message: "مدت اعتبار باید حداقل ۳ حرف داشته باشد" },
                maxLength: { value: 100, message: "مدت اعتبار نباید بیشتر از ۱۰۰ حرف باشد" }
              })}
              placeholder="مدت اعتبار"
              maxLength="100"
              className="p-2 rounded border"
            />
            {errors?.validity && (
              <span className="text-red-500 text-sm">{errors?.validity.message}</span>
            )}
          </label>

          {/* سطح دشواری (select) */}
      <label htmlFor="difficultyLevel" className="flex flex-col gap-y-1 relative">
  <span className="text-sm">* سطح دشواری </span>
  <select
    id="difficultyLevel"
    {...register("difficultyLevel", {
      required: "انتخاب سطح دشواری الزامی است"
    })}
    className="p-2 pr-8 rounded border appearance-none bg-white"
  >
    <option value="">انتخاب سطح دشواری</option>
    <option value="آسان">آسان</option>
    <option value="متوسط">متوسط</option>
    <option value="سخت">سخت</option>
  </select>

  {errors?.difficultyLevel && (
    <span className="text-red-500 text-sm">{errors?.difficultyLevel.message}</span>
  )}
</label>

<div className="flex flex-col gap-y-2 w-full  ">
        <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="country" className="flex flex-col gap-y-2 ">
         کشور
              <Controller
                control={control}
                name="country"
                rules={{ required: "انتخاب کشور الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    items={countries}
                    selectedItems={value || []}
                    handleSelect={onChange}
                    placeholder="چند مورد انتخاب کنید"
                    className={"w-full h-12"}
                    returnType="id"
                  />
                )}
              />
            </label>
          </div>
          {/* <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              aria-label="افزودن نوع  ویزا جدید"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div> */}
        </div>
        {errors.country && (
          <span className="text-red-500 text-sm">
            {errors.country.message}
          </span>
        )}
      </div>
        </div>

        <div className="flex justify-between mt-12">
          <NavigationButton direction="next" onClick={nextStep} />
          <NavigationButton direction="prev" onClick={prevStep} />
        </div>
      </div>
    </>
  );
};

export default Step3;
