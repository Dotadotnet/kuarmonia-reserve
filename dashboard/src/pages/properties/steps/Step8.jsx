import React, { useState, useEffect } from "react";
import GeoLocation from "@/components/detail/GeoLocation";

const Step8 = ({
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
 
      </div>


      <GeoLocation
        location={mapCountry}
        setSelectedLocation={setSelectedLocation}
        zoom={10}
        height="200px"
      />

      
    </>
  );
};

export default Step8;
