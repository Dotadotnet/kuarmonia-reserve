import StatusSwitch from "@/components/shared/button/StatusSwitch";
import React, { useState, useEffect } from "react";
import { useGetTypesQuery } from "@/services/type/typeApi";
import { Controller } from "react-hook-form";
import Dropdown from "@/components/shared/dropdownmenu/Dropdown";

const Step3 = ({ register, errors, control }) => {
  const { data: propertyTypesData, isLoading } = useGetTypesQuery({
    page: 1,
    search: "",
    limit: 10000
  });
  const propertyTypes = propertyTypesData?.data || [];
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [availableFeatures, setAvailableFeatures] = useState([]);

  // وقتی که نوع ملک تغییر می‌کند، ویژگی‌های آن را تنظیم می‌کنیم
  useEffect(() => {
    if (selectedProperty) {
      const selectedType = propertyTypes.find(
        (type) => type.title === selectedProperty
      );

      setAvailableFeatures({
        amenities: selectedType?.amenities || [],
        description: selectedType?.description || ""
      });
    }
  }, [selectedProperty, propertyTypes]);

  return (
    <div className="w-full max-h-128 flex flex-col gap-y-2">
      <label htmlFor="bedrooms" className="flex flex-col gap-y-2 w-full">
        تعداد اتاق
        <input
          type="text"
          id="bedrooms"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("bedrooms", {
            pattern: { value: /^\d{1,2}$/, message: "عدد معتبر وارد کنید" }
          })}
        />
        {errors.bedrooms && (
          <span className="text-red-500 text-sm">
            {errors.bedrooms.message}
          </span>
        )}
      </label>

      {/* تعداد حمام */}
      <label htmlFor="bathrooms" className="flex flex-col gap-y-2 w-full">
        تعداد حمام
        <input
          type="text"
          id="bathrooms"
          className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          {...register("bathrooms", {
            pattern: { value: /^\d{1}$/, message: "عدد معتبر وارد کنید" }
          })}
        />
        {errors.bathrooms && (
          <span className="text-red-500 text-sm">
            {errors.bathrooms.message}
          </span>
        )}
      </label>

      {/* انتخاب نوع ملک */}
      <label htmlFor="propertyType" className="flex flex-col gap-y-2 w-full">
        نوع ملک
        <Controller
          control={control}
          name="propertyType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              options={propertyTypes}
              placeholder="نوع ملک"
              value={value?._id}
              onChange={(selectedOption) => {
                onChange(selectedOption);
                setSelectedProperty(selectedOption?.title);
              }}
              className="w-full"
              height="py-3"
              error={errors.propertyType}
            />
          )}
        />
        {errors.propertyType && (
          <span className="text-red-500 text-sm">
            {errors.propertyType.message}
          </span>
        )}
      </label>

      {/* امکانات ملک */}
      {availableFeatures?.amenities?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg">امکانات</h3>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {availableFeatures.amenities.map((feature, index) => (
              <Controller
                key={index}
                control={control}
                name={`amenities[${index}]`}
                render={({ field: { onChange, value } }) => (
                  <StatusSwitch
                    label={feature}
                    id={feature}
                    register={register}
                    description={availableFeatures.description} 
                    defaultChecked={value?.hasAmenity || false}
                    onChange={(e) => {
                      onChange({
                        title: feature,
                        hasAmenity: e.target.checked
                      });
                    }}
                  />
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3;
