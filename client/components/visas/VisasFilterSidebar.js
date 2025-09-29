'use client'
import { useEffect, useMemo, useState } from "react";
import useGetCountries from "@/hooks/useGetCountries";

const VisasFilterSidebar = () => {
  const countries = useGetCountries();
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    async function loadTypes() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/visaType/get-visaTypes`, { cache: 'no-store' });
        const json = await res.json();
        setTypes(json.data || []);
      } catch {}
    }
    loadTypes();
  }, []);

  // emit custom event for filter changes
  useEffect(() => {
    const detail = { types: selectedTypes, countries: selectedCountries };
    window.dispatchEvent(new CustomEvent('visas:filter', { detail }));
  }, [selectedTypes, selectedCountries]);

  return (
    <aside className="lg:col-span-3 md:col-span-4 col-span-12">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        <div className="flex flex-col gap-y-3 border border-gray-100 py-2 px-4 rounded">
          <h2 className="text-lg">نوع ویزا</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {types.map((t) => {
              const title = t?.translations?.[0]?.translation?.fields?.title || t.title;
              return (
                <label key={t._id} className="text-sm flex flex-row items-center gap-x-1.5">
                  <input
                    type="checkbox"
                    className="!rounded-secondary checked:bg-primary checked:text-primary"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setSelectedTypes((prev) => isChecked ? [...prev, t._id] : prev.filter(id => id !== t._id));
                    }}
                  />
                  <span className="truncate">{title}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-y-3 border border-gray-200  py-2 px-4 rounded">
          <h2 className="text-lg">کشور</h2>
          <div className="flex flex-col gap-y-2.5 h-40 overflow-y-auto">
            {countries?.map((country, idx) => (
              <label key={idx} className="text-sm flex flex-row items-center gap-x-1.5">
                <input
                  type="checkbox"
                  className="!rounded-secondary checked:bg-primary checked:text-primary"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setSelectedCountries((prev) => isChecked ? [...prev, country.name] : prev.filter(c => c !== country.name));
                  }}
                />
                <span className="truncate">{country.name}</span>
              </label>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default VisasFilterSidebar;

