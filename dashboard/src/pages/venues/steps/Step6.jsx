import NavigationButton from "@/components/shared/button/NavigationButton";
import { useEffect, useMemo } from "react";
import { useGetVenueAmenitiesQuery } from "@/services/venueAmenity/venueAmenityApi";
import { Controller } from "react-hook-form";
import { useGetVenueServicesQuery } from "@/services/venueService/venueServiceApi";
import { useGetVenueSettingsQuery } from "@/services/venueSetting/venueSettingApi";
import toast from "react-hot-toast";
import StatusSwitch from "@/components/shared/button/StatusSwitch";

const Step6 = ({
  register,
  prevStep,
  nextStep,
  control,
  setValue
}) => {
  const {
    isLoading: fetchingVenueAmenities,
    data: fetchVenueAmenitiesData,
    error: fetchVenueAmenitiesError
  } = useGetVenueAmenitiesQuery();

  const {
    isLoading: fetchingVenueServices,
    data: fetchVenueServicesData,
    error: fetchVenueServicesError
  } = useGetVenueServicesQuery();
  const {
    isLoading: fetchingVenueSettings,
    data: fetchVenueSettingsData,
    error: fetchVenueSettingsError
  } = useGetVenueSettingsQuery();
  const venueServices = useMemo(
    () =>
      fetchVenueServicesData?.data?.map((venueService) => ({
        id: venueService._id,
        value: venueService.title,
        label: venueService.title,
        description: venueService.description
      })) || [],
    [fetchVenueServicesData]
  );
  const venueAmenities = useMemo(
    () =>
      fetchVenueAmenitiesData?.data?.map((venueAmenitie) => ({
        id: venueAmenitie._id,
        value: venueAmenitie.title,
        label: venueAmenitie.title,
        description: venueAmenitie.description
      })),
    [fetchVenueAmenitiesData]
  );

  const venueSettings = useMemo(
    () =>
      fetchVenueSettingsData?.data?.map((venueSetting) => ({
        id: venueSetting._id,
        value: venueSetting.title,
        label: venueSetting.title,
        description: venueSetting.description
      })),
    [fetchVenueSettingsData]
  );

  useEffect(() => {
    if (fetchingVenueAmenities) {
      toast.loading("در حال دریافت تگ ها بندی ...", {
        id: "fetchVenueAmenities"
      });
    }

    if (fetchVenueAmenitiesData) {
      toast.success(fetchVenueAmenitiesData?.description, {
        id: "fetchVenueAmenities"
      });
    }

    if (fetchVenueAmenitiesError) {
      toast.error(fetchVenueAmenitiesError?.data?.description, {
        id: "fetchVenueAmenities"
      });
    }
    if (fetchingVenueServices) {
      toast.loading("در حال دریافت دسته بندی ...", {
        id: "fetchVenueServices"
      });
    }

    if (fetchVenueServicesData) {
      toast.success(fetchVenueServicesData?.description, {
        id: "fetchVenueServices"
      });
    }

    if (fetchVenueServicesError) {
      toast.error(fetchVenueServicesError?.data?.description, {
        id: "fetchVenueServices"
      });
    }
  }, [
    fetchingVenueAmenities,
    fetchVenueAmenitiesData,
    fetchVenueAmenitiesError,
    fetchVenueServicesData,
    fetchVenueServicesData,
    fetchVenueServicesError
  ]);
  useEffect(() => {
    if (venueAmenities?.length) {
      venueAmenities.forEach((amenity, index) => {
        setValue(`amenities.[${index}]`, {
          id: amenity.id,
          label: amenity.label,
          value: false
        }, { shouldValidate: false, shouldDirty: false });
      });
    }
  
    if (venueServices?.length) {
      venueServices.forEach((service, index) => {
        setValue(`services.[${index}]`, {
          id: service.id,
          label: service.label,
          value: false
        }, { shouldValidate: false, shouldDirty: false });
      });
    }
  
    if (venueSettings?.length) {
      venueSettings.forEach((setting, index) => {
        setValue(`settings.[${index}]`, {
          id: setting.id,
          label: setting.label,
          value: false
        }, { shouldValidate: false, shouldDirty: false });
      });
    }
  }, [venueAmenities, venueServices, venueSettings, setValue]);
  
  return (
    <div className="flex flex-col gap-y-2">
      {venueAmenities?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg">امکانات</h3>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {venueAmenities.map((amenity, index) => (
             <Controller
             key={amenity.id}
             control={control}
             name={`amenities.[${index}]`}
             render={({ field: { onChange, value } }) => (
               <StatusSwitch
                 label={amenity.label}
                 id={amenity.id}
                 checked={value?.value ?? false}
                 register={register}
                 defaultChecked={value?.value ?? false}
                 onChange={(checked) => {
                   const newValue = {
                     id: amenity.id,
                     label: amenity.label,
                     value: checked
                   };
                   onChange(newValue);
                   setValue(`amenities.[${index}]`, newValue, { shouldValidate: true, shouldDirty: true });
                 }}
               />
             )}
           />
           
            ))}
          </div>
        </div>
      )}

      {venueServices?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg">خدمات</h3>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {venueServices.map((service, index) => (
             <Controller
             key={service.id}
             control={control}
             name={`services.[${index}]`}
             render={({ field: { onChange, value } }) => (
               <StatusSwitch
                 label={service.label}
                 id={service.id}
                 checked={value?.value ?? false}
                 register={register}
                 defaultChecked={value?.value ?? false}
                 description={service.description}
                 onChange={(checked) => {
                   const newValue = {
                     id: service.id,
                     label: service.label,
                     value: checked
                   };
                   onChange(newValue);
                   setValue(`services.[${index}]`, newValue, { shouldValidate: true, shouldDirty: true });
                 }}
               />
             )}
           />
            ))}
          </div>
        </div>
      )}
      {venueSettings?.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg">تنظیمات</h3>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {venueSettings.map((setting, index) => (
              <Controller
              key={setting.id}
              control={control}
              name={`settings.[${index}]`}
              render={({ field: { onChange, value } }) => {
                const fieldValue = value ?? { id: setting.id, label: setting.label, value: false };
            
                return (
                  <StatusSwitch
                    label={setting.label}
                    id={setting.id}
                    checked={fieldValue.value}
                    register={register}
                    defaultChecked={fieldValue.value}
                    onChange={(checked) => {
                      const newValue = { id: setting.id, label: setting.label, value: checked };
                      onChange(newValue);
                      setValue(`settings.[${index}]`, newValue, { shouldValidate: true, shouldDirty: true });
                    }}
                  />
                );
              }}
            />
            
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step6;
