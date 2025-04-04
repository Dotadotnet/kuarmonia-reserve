import { useEffect, useState } from "react";

const useGetStates = (country) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (!country) return;

    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?country=${country}&admin_level=4&format=json`
        );
        const data = await response.json();

        if (data.length > 0) {
          const statesList = data.map((state) => ({
            name: state.address.state || state.display_name.split(",")[0], // نام استان
            lat: parseFloat(state.lat),
            lng: parseFloat(state.lon),
          }));

          setStates(statesList);
        }
      } catch (error) {
        console.error("خطا در دریافت استان‌ها:", error);
      }
    };

    fetchStates();
  }, [country]);

  return states;
};

export default useGetStates;
