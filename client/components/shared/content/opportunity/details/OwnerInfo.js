import React from "react";
import { useLocale } from "next-intl";

const OwnerInfo = ({ opportunity }) => {
  const locale = useLocale();
  const translation = opportunity?.translations?.find(
    (t) => t.language === locale
  )?.translation;
  const { name, avatar } = opportunity?.creator || {};
  const address = {
    country: translation?.fields?.targetCountries?.join(", ") || "",
    city: translation?.fields?.targetCities?.join(", ") || "",
    state: null,
    street: null,
    plateNumber: null,
    postalCode: null,
    floor: null,
    unit: null,
  };
  const bio = "";

  return (
    <div className="p-6  rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg max-w-md mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center border-b pb-2">
        اطلاعات کارفرما
      </h3>
      <ul className="space-y-4 text-gray-700 text-right text-base">
        {name && (
          <li>
            <span className="font-semibold text-gray-900">نام شرکت:</span>{" "}
            {name}
          </li>
        )}
        {bio && (
          <li>
            <span className="font-semibold text-gray-900">درباره شرکت:</span>{" "}
            {bio}
          </li>
        )}
        {address.country && (
          <li>
            <span className="font-semibold text-gray-900">کشور:</span>{" "}
            {address.country}
          </li>
        )}
        {address.city && (
          <li>
            <span className="font-semibold text-gray-900">شهر:</span>{" "}
            {address.city}
          </li>
        )}
        {address.state && (
          <li>
            <span className="font-semibold text-gray-900">استان:</span>{" "}
            {address.state}
          </li>
        )}
        {(address.street || address.plateNumber || address.postalCode) && (
          <li>
            <span className="font-semibold text-gray-900">آدرس:</span>{" "}
            {[address.street, address.plateNumber, address.postalCode]
              .filter(Boolean)
              .join("، ")}
          </li>
        )}
        {address.floor && (
          <li>
            <span className="font-semibold text-gray-900">طبقه:</span>{" "}
            {address.floor}
          </li>
        )}
        {address.unit && (
          <li>
            <span className="font-semibold text-gray-900">واحد:</span>{" "}
            {address.unit}
          </li>
        )}
      </ul>
    </div>
  );
};

export default OwnerInfo;