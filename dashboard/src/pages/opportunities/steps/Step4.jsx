import NavigationButton from "@/components/shared/button/NavigationButton";
import { useEffect, useState } from "react";
import GeoLocation from "@/components/detail/GeoLocation";

const Step4 = ({
  register,
  errors,
  prevStep,
  nextStep,
  watch,
  control,
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
  const [selectedCityLatLng, setSelectedCityLatLng] = useState(null);

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
      <label htmlFor="company" className="flex flex-col gap-y-1">
        <span className="text-sm"> نام شرکت </span>
        <input
          type="text"
          name="company"
          id="company"
          {...register("company", {
            minLength: {
              value: 3,
              message: "عنوان شرکت باید حداقل ۳ حرف داشته باشد"
            },
            maxLength: {
              value: 100,
              message: "عنوان شرکت نباید بیشتر از ۱۰۰ حرف باشد"
            }
          })}
          placeholder="عنوان شرکت"
          maxLength="100"
          className="p-2 rounded border "
        />
        {errors?.company && (
          <span className="text-red-500 text-sm">{errors.company.message}</span>
        )}
      </label>
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

export default Step4;
