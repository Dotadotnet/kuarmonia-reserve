import NavigationButton from "@/components/shared/button/NavigationButton";
import React, { useState, useEffect, useMemo } from "react";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { useGetJobModesQuery } from "@/services/jobMode/jobModeApi";
import { Controller } from "react-hook-form";
import ArrayInput from "@/components/shared/tools/ArrayInput";
import { useGetJobTypesQuery } from "@/services/jobType/jobTypeApi";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { useGetEmploymentTypesQuery } from "@/services/employmentType/employmentTypeApi";

const Step3 = ({
  register,
  errors,
  prevStep,
  nextStep,
  control,
  skills,
  setSkills
}) => {
  const {
    isLoading: fetchingJobModes,
    data: fetchJobModesData,
    error: fetchJobModesError
  } = useGetJobModesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const jobModes = useMemo(
    () =>
      fetchJobModesData?.data?.map((job) => ({
        id: job._id,
        value: job.translations[0].translation?.fields.title,
        description: job.translations[0].translation?.fields.description
      })),
    [fetchJobModesData]
  );
  const {
    isLoading: fetchingEmploymentTypes,
    data: fetchEmploymentTypesData,
    error: fetchEmploymentTypesError
  } = useGetEmploymentTypesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const {
    isLoading: fetchingjobTypes,
    data: fetchjobTypesData,
    error: fetchjobTypesError
  } = useGetJobTypesQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const jobTypes = useMemo(
    () =>
      fetchjobTypesData?.data?.map((job) => ({
        id: job._id,
        value: job.translations[0].translation?.fields.title,
        icon: job.icon,
        label: job.translations[0].translation?.fields.title,
        description: job.translations[0].translation?.fields.description
      })),
    [fetchjobTypesData]
  );
  const employmentType = useMemo(
    () =>
      fetchEmploymentTypesData?.data?.map((type) => ({
        id: type._id,
        value: type.translations[0].translation?.fields.title,
        icon: type.icon,
        label: type.translations[0].translation?.fields.title,
        description: type.translations[0].translation?.fields.description
      })),
    [fetchEmploymentTypesData]
  );
  return (
    <>
<div className="flex flex-col flex-1 gap-y-1  p-2">
        <label htmlFor="jobMode" className="flex flex-col gap-y-2 w-full">
          نوع فعالیت
          <Controller
            control={control}
            name="jobMode"
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={jobModes}
                placeholder="انتخاب نوع فعالیت"
                value={value?.value}
                onChange={onChange}
                className="w-full mt-2"
                height="py-3"
                error={errors.jobMode}
              />
            )}
          />
          {errors.jobMode && (
            <span className="text-red-500 text-sm">
              {errors.jobMode.message}
            </span>
          )}
        </label>
        <label htmlFor="jobType" className="flex flex-col gap-y-2">
          نوع شغل
          <Controller
            control={control}
            name="jobType"
            render={({ field: { onChange } }) => (
              <Dropdown
                onChange={onChange}
                items={jobTypes}
                sendId={true}
                errors={errors?.jobType}
                className={"w-full h-12"}
              />
            )}
          />
        </label>
        <label htmlFor="employmentType" className="flex flex-col gap-y-2">
          نوع استخدام
          <Controller
            control={control}
            name="employmentType"
            render={({ field: { onChange } }) => (
              <Dropdown
                onChange={onChange}
                items={employmentType}
                sendId={true}
                errors={errors?.employmentType}
                className={"w-full h-12"}
              />
            )}
          />
        </label>
        <ArrayInput
          title="مهارت ها"
          values={skills}
          setValues={setSkills}
          namePrefix="skills"
          register={register}
          errors={errors}
        />
      </div>

      <div className="flex justify-between mt-4">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step3;
