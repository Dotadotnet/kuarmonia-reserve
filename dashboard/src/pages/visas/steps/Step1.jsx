import { useEffect, useMemo } from "react";
import { useGetCountriesQuery } from "@/services/country/countryApi";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import NavigationButton from "@/components/shared/button/NavigationButton";

const Step1 = ({ nextStep, errors, register, control }) => {
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

  const countries = useMemo(
    () =>
      fetchCountriesData?.data?.map((country) => ({
        id: country._id,
        value: country.name,
        label: country.name,
      })),
    [fetchCountriesData]
  );

  return (
    <div className="flex flex-col p-2">
      <div className="flex flex-col overflow-y-auto h-96 p-2">
        {/* Title Field */}
        <label htmlFor="title" className="flex flex-col gap-y-1">
          <span className="text-sm">* عنوان ویزا</span>
          <input
            type="text"
            name="title"
            id="title"
            {...register("title", {
              required: "وارد کردن عنوان الزامی است",
              minLength: {
                value: 3,
                message: "عنوان باید حداقل ۳ حرف داشته باشد"
              },
              maxLength: {
                value: 100,
                message: "عنوان نباید بیشتر از ۱۰۰ حرف باشد"
              }
            })}
            placeholder="عنوان"
            maxLength="100"
            className="p-2 rounded border"
          />
          {errors?.title && (
            <span className="text-red-500 text-sm">{errors?.title.message}</span>
          )}
        </label>

        {/* Summary Field */}
        <label htmlFor="summary" className="flex flex-col gap-y-2 w-full mt-4">
          خلاصه
          <textarea
            name="summary"
            id="summary"
            maxLength="500"
            rows={3}
            placeholder="خلاصه ویزا را وارد کنید..."
            className="p-2 rounded border w-full form-textarea"
            {...register("summary", {
              required: "خلاصه الزامی است",
              minLength: {
                value: 10,
                message: "خلاصه باید حداقل ۱۰ کاراکتر باشد"
              },
              maxLength: {
                value: 500,
                message: "خلاصه نباید بیشتر از ۵۰۰ کاراکتر باشد"
              }
            })}
          />
          {errors?.summary && (
            <span className="text-red-500 text-sm">
              {errors?.summary.message}
            </span>
          )}
        </label>

        <div className="flex flex-col gap-y-2 w-full mt-4">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="country" className="flex flex-col gap-y-2">
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
          </div>
          {errors.country && (
            <span className="text-red-500 text-sm">
              {errors.country.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-start">
        <NavigationButton direction="next" onClick={nextStep} />
      </div>
    </div>
  );
};

export default Step1;