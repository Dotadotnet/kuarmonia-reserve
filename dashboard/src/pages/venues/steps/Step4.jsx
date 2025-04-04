import React, { useState, useEffect } from "react";

const Step4 = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetch("/data/countries.json")
      .then((res) => res.json())
      .then((data) => setCountries(data));

    fetch("/data/states.json")
      .then((res) => res.json())
      .then((data) => setStates(data));

    fetch("/data/cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);
  function handleSelectCountry(data) {
    setSelectedCountry(data);
  }
  // تبدیل داده‌های استان‌ها به فرمت موردنیاز ReactFlagsSelect
  const stateOptions = states
    .filter((s) => s.country_id === selectedCountry)
    .map((s) => ({
      code: `ST-${s.id}`, // استفاده از یک پیشوند برای جلوگیری از تداخل با کشورها
      name: s.name,
      emoji: "🏛️" // آیکون جایگزین پرچم
    }));
    const testOptions = [
      { value: "apple", label: "Apple 🍎" },
      { value: "banana", label: "Banana 🍌" },
      { value: "cherry", label: "Cherry 🍒" }
    ];
  const cityOptions = cities
    .filter((c) => c.state_id === selectedState)
    .map((c) => ({
      code: `CT-${c.id}`,
      name: c.name,
      emoji: "🏙️"
    }));
    const [selectedOption, setSelectedOption] = useState(null);
    const handleSelect = (option) => {
      setSelectedOption(option);
      console.log("Selected:", option);
    };
  return (
    <div>
      {/* انتخاب کشور */}
      <Select
        options={testOptions} // داده‌های تستی
        placeholder="یک گزینه انتخاب کنید"
        value={selectedOption} // مقدار انتخاب‌شده
        onChange={handleSelect} // رویداد تغییر مقدار
        isSearchable={true}
        isMulti={false}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      />
    </div>
  );
};

export default Step4;
