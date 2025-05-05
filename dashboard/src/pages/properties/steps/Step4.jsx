
import React, {  useEffect, useMemo } from "react";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";
import ThumbnailUpload from "@/components/shared/gallery/ThumbnailUpload";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import { useGetTypesQuery } from "@/services/type/typeApi";
import StatusSwitch from "@/components/shared/button/StatusSwitch";

const Step4 = ({
  setGalleryPreview,
  setGallery,
  register,
  galleryPreview,
  setThumbnailPreview,
  setThumbnail,
  errors,
  useState,
  control
}) => {
  const { data: propertyTypesData, isLoading } = useGetTypesQuery({
    page: 1,
    search: "",
    limit: 10000
  });
  const propTypes = useMemo(
    () =>
      propertyTypesData?.data?.map((item) => ({
        id: item._id,
        title: item?.translations[0].translation?.fields.title,
        value: item?.translations[0].translation?.fields.title,
        amenities: item?.translations[0].translation?.fields.amenities
      })) || [],
    [propertyTypesData]
  );
  const propertyTypes = propertyTypesData?.data || [];
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [availableFeatures, setAvailableFeatures] = useState([]);

  useEffect(() => {
    if (selectedProperty) {
      const selectedType = propertyTypes.find(
        (type) => type.translations[0].translation?.fields.title === selectedProperty
      );

      setAvailableFeatures({
        amenities: selectedType?.translations[0].translation?.fields.amenities || [],
        description: selectedType?.translations[0].translation?.fields.description || ""
      });
    }
  }, [selectedProperty, propertyTypes]);
  return (
    <>
      <label htmlFor="thumbnail" className="flex flex-col text-center gap-y-2">
        تصویر عنوان وبلاگ
        <ThumbnailUpload
          setThumbnailPreview={setThumbnailPreview}
          setThumbnail={setThumbnail}
          register={register("thumbnail", {
            required: "آپلود تصویر عنوان الزامی است"
          })}
          maxFiles={1}
        />
      </label>
      {errors.gallery && (
        <span className="text-red-500 text-sm">{errors.gallery.message}</span>
      )}
      <div className="flex flex-col text-center gap-y-2">
        <GalleryUpload
          setGallery={setGallery}
          setGalleryPreview={setGalleryPreview}
          maxFiles={10}
          register={register("gallery", {
            required: "آپلود حداقل یک تصویر الزامی است"
          })}
          title="آپلود تصاویر گالری"
        />


      </div>
        {/* انتخاب نوع ملک */}
        <label htmlFor="propertyType" className="flex flex-col gap-y-2 w-full">
        نوع ملک
        <Controller
          control={control}
          name="propertyType"
          render={({ field: { onChange, value } }) => (
            <Dropdown
              items={propTypes}
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
    </>
  );
};

export default Step4;
