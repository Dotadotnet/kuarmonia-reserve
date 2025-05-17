import NavigationButton from "@/components/shared/button/NavigationButton";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import { useGetCurrenciesQuery } from "@/services/currency/currencyApi";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import Plus from "@/components/icons/Plus";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { useGetJobTimesQuery } from "@/services/jobTime/jobTimeApi";
import { useGetExperienceLevelsQuery } from "@/services/experienceLevel/experienceLevelApi";

const Step2 = ({
  register,
  setGalleryPreview,
  prevStep,
  nextStep,
  setGallery,
  control,
  errors
}) => {
 
  const {
    isLoading: fetchingCurrencies,
    data: fetchCurrenciesData,
    error: fetchCurrenciesError
  } = useGetCurrenciesQuery();
  const currencies = useMemo(
    () =>
      fetchCurrenciesData?.data?.map((currency) => ({
        id: currency._id,
        value: currency.title,
        icon: currency.symbol,
        description: currency.description
      })),
    [fetchCurrenciesData]
  );
  const {
    isLoading: fetchingjobTimes,
    data: fetchjobTimesData,
    error: fetchjobTimesError
  } = useGetJobTimesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const jobTimes = useMemo(
    () =>
      fetchjobTimesData?.data?.map((job) => ({
        id: job._id,
        value: job.translations[0].translation?.fields.title,
        description: job.translations[0].translation?.fields.description
      })),
    [fetchjobTimesData]
  );

  const {
    isLoading: fetchingExperienceLevels,
    data: fetchExperienceLevelsData,
    error: fetchExperienceLevelsError
  } = useGetExperienceLevelsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const experienceLevels = useMemo(
    () =>
      fetchExperienceLevelsData?.data?.map((experienceLevel) => ({
        id: experienceLevel._id,
        value: experienceLevel.translations[0].translation?.fields.title,
        description:
          experienceLevel.translations[0].translation?.fields.description
      })),
    [fetchExperienceLevelsData]
  );
  return (
    <>
      <div className="flex flex-col text-right gap-y-2 ">
        <GalleryUpload
          setGallery={setGallery}
          setGalleryPreview={setGalleryPreview}
          maxFiles={36}
          register={register}
          title="آپلود تصاویر گالری"
        />
      
        <label htmlFor="saleType" className="flex flex-col gap-y-1 w-full">
          نوع ارز
          <Controller
            control={control}
            name="currency"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={currencies}
                placeholder="انتخاب ارز"
                value={value?.value}
                onChange={onChange}
                className="w-full mt-2"
                height="py-3"
                error={errors.currency}
              />
            )}
          />
          {errors.currency && (
            <span className="text-red-500 text-sm">
              {errors.currency.message}
            </span>
          )}
        </label>
        <div className="flex gap-x-2 w-full ">
          <div className="w-1/2">
            <label>
              * حداقل حقوق
              <Controller
                name="minSalary"
                control={control}
                rules={{
                  required: "حداقل حقوق الزامی است",
                  valueAsNumber: true
                }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="number"
                      placeholder="حداقل حقوق"
                      className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 text-justify dark:text-white"
                    />
                    {errors.minSalary && (
                      <span className="text-red-500 text-sm">
                        {errors.minSalary.message}
                      </span>
                    )}
                  </>
                )}
              />
            </label>
          </div>

          <div className="w-1/2">
            <label>
              * حداکثر حقوق
              <Controller
                name="maxSalary"
                control={control}
                rules={{
                  required: "حداکثر حقوق الزامی است",
                  valueAsNumber: true,
                  validate: (value) =>
                    value >= (control.getValues("minSalary") || 0) ||
                    "حداکثر حقوق نباید کمتر از حداقل حقوق باشد"
                }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="number"
                      placeholder="حداکثر حقوق"
                      className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 text-justify dark:text-white"
                    />
                    {errors.maxSalary && (
                      <span className="text-red-500 text-sm">
                        {errors.maxSalary.message}
                      </span>
                    )}
                  </>
                )}
              />
            </label>
          </div>
        </div>
        <label htmlFor="jobTime" className="flex flex-col gap-y-1 w-full">
          میزان فعالیت
          <Controller
            control={control}
            name="jobTime"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={jobTimes}
                placeholder="انتخاب میزان فعالیت"
                value={value?.value}
                onChange={onChange}
                className="w-full mt-2"
                height="py-3"
                error={errors.jobTime}
              />
            )}
          />
          {errors.jobTime && (
            <span className="text-red-500 text-sm">
              {errors.jobTime.message}
            </span>
          )}
        </label>

        <div className="flex-1 flex items-center justify-between gap-2 gap-y-1 w-full">
          <div className="flex flex-col flex-1">
            <label htmlFor="experienceLevel" className="flex flex-col gap-y-1 ">
              سطح تجربه کاری{" "}
              <Controller
                control={control}
                name="experienceLevel"
                rules={{ required: "انتخاب سطح تجربه کاری الزامی است" }}
                render={({ field: { onChange, value } }) => (
                  <MultiSelect
                    items={experienceLevels}
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
          <div className="mt-7 flex justify-start">
            <button
              type="button"
              className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
              aria-label="افزودن دسته بندی جدید"
            >
              <Plus className="w-8 h-8" />
            </button>
          </div>
        </div>
        {errors.category && (
          <span className="text-red-500 text-sm">
            {errors.category.message}
          </span>
        )}
      </div>

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step2;
