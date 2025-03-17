import dynamic from "next/dynamic";
import React, { useState, useEffect, useMemo } from "react";
import { CountrySelect, StateSelect, CitySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const Step7 = ({ register, setValue, selectedLocation, setSelectedLocation ,country,currentState,setCountry,setCurrentState,setCurrentCity ,currentCity}) => {


  useEffect(() => {
    if (selectedLocation) {
      setValue("latitude", selectedLocation.lat);
      setValue("longitude", selectedLocation.lng);
    }
  }, [selectedLocation, setValue]);

  const GeoLocation = useMemo(
    () =>
      dynamic(() => import("@/components/detail/GeoLocation"), {
        loading: () => <p className="font-sans">نقشه در حال آماده سازی...</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="flex flex-col gap-y-4 w-full">
      {/* انتخاب کشور */}
      <label htmlFor="country" className="flex flex-col gap-y-2">
        کشور مورد نظر*
        <CountrySelect
          containerClassName="form-group"
          inputClassName="rounded"
          onChange={(selectedCountry) => {
            setCountry(selectedCountry);
            setCurrentState(null); // Reset state and city when country changes
            setCurrentCity(null);
          }}
          placeHolder="کشور را انتخاب کنید"
        />
      </label>

      {/* انتخاب استان */}
      {country && (
        <label htmlFor="state" className="flex flex-col gap-y-2 w-full">
          استان مورد نظر*
          <StateSelect
            countryid={country?.id}
            containerClassName="form-group"
            inputClassName="rounded"
            onChange={(selectedState) => {
              setCurrentState(selectedState);
              setCurrentCity(null); // Reset city when state changes
            }}
            placeHolder="استان را انتخاب کنید"
          />
        </label>
      )}

      {/* انتخاب شهر */}
      {currentState && (
        <label htmlFor="city" className="flex flex-col gap-y-2 w-full">
          شهر مورد نظر*
          <CitySelect
            countryid={country?.id}
            stateid={currentState?.id}
            containerClassName="form-group"
            inputClassName="rounded"
            onChange={(selectedCity) => setCurrentCity(selectedCity)}
            placeHolder="شهر را انتخاب کنید"
          />
        </label>
      )}

      {/* نقشه */}
      <GeoLocation
        location={ country?.name}
        zoom={10}
        height="200px"
        setSelectedLocation={setSelectedLocation}
      />

      {/* مختصات مخفی */}
      <input type="hidden" {...register("latitude")} />
      <input type="hidden" {...register("longitude")} />
    </div>
  );
};

export default Step7;
