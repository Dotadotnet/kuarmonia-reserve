import { useEffect, useState } from "react";

export default function useGetCities(country, state) {
  const [cities, setCities] = useState([]);
console.log(country)
  useEffect(() => {
    if (!country || !state) return;

    const getCities = async () => {
      const request = await fetch(
        `https://countriesnow.space/api/v0.1/countries/state/cities`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country, state }),
        }
      );
      const response = await request.json();
      setCities(response.data || []);
    };

    getCities();
  }, [country, state]);

  return cities;
}
