import { useEffect, useState } from "react";

export default function useGetCountries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const countries = data.map((country) => {
          const countryNameEn = country.name.common;
          return {
            name: countryNameEn, // ترجمه یا نام اصلی
            flag: country.flags.svg, // لینک پرچم
            latlng: country.latlng, // مختصات جغرافیایی
          };
        });

        const sortedCountries = countries.sort((a, b) =>
          a.name.localeCompare(b.name, "fa")
        );

        setCountries(sortedCountries);
      })
      .catch((error) => console.error("خطا در دریافت کشورها:", error));
  }, []);

  return countries;
}
