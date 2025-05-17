// components/signup/steps/NameStep.jsx

import React, { useState, useEffect } from "react";
import GeoLocation from "@/components/detail/GeoLocation";
import NavigationButton from "@/components/shared/button/NavigationButton";

const AddressStep = ({
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedLocation,
  nextStep,
  prevStep
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [mapCountry, setMapCountry] = useState("Bangladesh");
  const [selectedCityLatLng, setSelectedCityLatLng] = useState(null);
console.log("selectedCountry",selectedCountry)
  useEffect(() => {
    fetch("/data/countries.json")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error loading countries JSON:", err));
  }, []);
  const handleCountryChange = (e) => {
    const countryId = parseInt(e.target.value);
    const country = countries.find((c) => c.id === countryId);

    setSelectedCountry(country ? country.name : ""); 
    setSelectedState("");
    setSelectedCity("");
    setCities([]);
    console.log(country.name);
    fetch("/data/states.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredStates = data.filter((s) => s.country_id === countryId);
        setStates(filteredStates);
      })
      .catch((err) => console.error("Error loading states JSON:", err));

    if (country) {
      setMapCountry(country.name); 
    }
  };

  const handleStateChange = (e) => {
    const stateId = parseInt(e.target.value);
    const state = states.find((s) => s.id === stateId);

    setSelectedState(state ? state.name : ""); 
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

    setSelectedCity(city ? city.name : "");

    if (city && city.latitude && city.longitude) {
      setSelectedCityLatLng({
        lat: parseFloat(city.latitude),
        lng: parseFloat(city.longitude)
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-1 w-full">
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
          zoom={10}
          height="200px"
          setSelectedLocation={setSelectedLocation}
          cityLatLng={selectedCityLatLng}
        />
  

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default AddressStep;
