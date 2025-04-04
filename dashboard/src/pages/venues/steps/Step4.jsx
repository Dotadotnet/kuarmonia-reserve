import NavigationButton from "@/components/shared/button/NavigationButton";
import React, { useState, useEffect } from "react";
import GeoLocation from "@/components/detail/GeoLocation";

const Step4 = ({
  register,
  errors,
  prevStep,
  nextStep,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedLocation
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [mapCountry, setMapCountry] = useState("Bangladesh");

  useEffect(() => {
    fetch("/data/countries.json")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error loading countries JSON:", err));
  }, []);

  const handleCountryChange = (e) => {
    const countryId = parseInt(e.target.value);
    const country = countries.find((c) => c.id === countryId);

    setSelectedCountry(country ? country.name : ""); // ذخیره نام کشور
    setSelectedState("");
    setSelectedCity("");
    setCities([]);

    fetch("/data/states.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredStates = data.filter((s) => s.country_id === countryId);
        setStates(filteredStates);
      })
      .catch((err) => console.error("Error loading states JSON:", err));

    if (country) {
      setMapCountry(country.name); // ارسال نام کشور به نقشه
    }
  };

  const handleStateChange = (e) => {
    const stateId = parseInt(e.target.value);
    const state = states.find((s) => s.id === stateId);

    setSelectedState(state ? state.name : ""); // ذخیره نام استان
    setSelectedCity("");

    fetch("/data/cities.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredCities = data.filter((c) => c.state_id === stateId);
        setCities(filteredCities);
      })
      .catch((err) => console.error("Error loading cities JSON:", err));
  };

  const handleCityChange = (e) => {
    const cityId = parseInt(e.target.value);
    const city = cities.find((c) => c.id === cityId);

    setSelectedCity(city ? city.name : ""); // ذخیره نام شهر
  };

  return (
    <>
      <div className="flex flex-col gap-y-1">
        {/* کشور */}
        <select
          className="w-full"
          onChange={handleCountryChange}
          value={countries.find((c) => c.name === selectedCountry)?.id || ""}
        >
          <option value="">کشور را انتخاب کنید</option>
          {countries.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {states.length > 0 && (
          <select
            className="w-full"
            onChange={handleStateChange}
            value={states.find((s) => s.name === selectedState)?.id || ""}
          >
            <option value="">استان را انتخاب کنید</option>
            {states.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        )}

        {cities.length > 0 && (
          <select
            className="w-full"
            onChange={handleCityChange}
            value={cities.find((c) => c.name === selectedCity)?.id || ""}
          >
            <option value="">شهر را انتخاب کنید</option>
            {cities.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
         <label htmlFor="street" className="flex flex-col gap-y-1">
        <span className="text-sm">* خیابان </span>
        <input
          type="text"
          name="street"
          id="street"
          {...register("street", {
            required: "وارد کردن خیابان الزامی است",
            minLength: {
              value: 3,
              message: "خیابان باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "خیابان  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="خیابان"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.street && (
          <span className="text-red-500 text-sm">{errors.street.message}</span>
        )}
      </label>
      <label htmlFor="plateNumber" className="flex flex-col gap-y-1">
        <span className="text-sm">* پلاک </span>
        <input
          type="text"
          name="plateNumber"
          id="plateNumber"
          {...register("plateNumber", {
            required: "وارد کردن پلاک الزامی است",
            minLength: {
              value: 3,
              message: "پلاک باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "پلاک  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="پلاک"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.plateNumber && (
          <span className="text-red-500 text-sm">{errors.plateNumber.message}</span>
        )}
      </label>
      <label htmlFor="postalCode" className="flex flex-col gap-y-1">
        <span className="text-sm">* کد پستی </span>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          {...register("postalCode", {
            required: "وارد کردن کد پستی الزامی است",
            minLength: {
              value: 3,
              message: "کد پستی باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "کد پستی  نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="کد پستی"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.postalCode && (
          <span className="text-red-500 text-sm">{errors.postalCode.message}</span>
        )}
      </label>
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
      </div>

      <GeoLocation
        location={mapCountry}
        setSelectedLocation={setSelectedLocation}
        zoom={10}
        height="200px"
      />

      <div className="flex justify-between mt-4">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default Step4;
