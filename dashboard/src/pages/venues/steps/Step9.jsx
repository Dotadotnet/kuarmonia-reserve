import React, { useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";

const Step9 = ({
  nextStep,
  prevStep,
  venuePackages,
  setVenuePackages,
}) => {
  function handleAddPackage() {
    setVenuePackages([
      ...venuePackages,
      {
        type: "rental",
        guest: { min: "", max: "" },
        pricing: {
          peak: "",
          offPeak: "",
        },
        description: "",
        whatsIncluded: [],
      },
    ]);
  }

  function handleRemovePackage(index) {
    const updated = [...venuePackages];
    updated.splice(index, 1);
    setVenuePackages(updated);
  }

  function handleChange(index, field, value) {
    const updated = [...venuePackages];
    updated[index][field] = value;
    setVenuePackages(updated);
  }

  function handleGuestChange(index, key, value) {
    const updated = [...venuePackages];
    updated[index].guest[key] = value;
    setVenuePackages(updated);
  }

  function handlePricingChange(index, key, value) {
    const updated = [...venuePackages];
    updated[index].pricing[key] = value;
    setVenuePackages(updated);
  }

  function handleAddItem(index) {
    const updated = [...venuePackages];
    updated[index].whatsIncluded.push("");
    setVenuePackages(updated);
  }

  function handleRemoveItem(index, itemIndex) {
    const updated = [...venuePackages];
    updated[index].whatsIncluded.splice(itemIndex, 1);
    setVenuePackages(updated);
  }

  function handleItemChange(index, itemIndex, value) {
    const updated = [...venuePackages];
    updated[index].whatsIncluded[itemIndex] = value;
    setVenuePackages(updated);
  }

  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-2 border rounded">
        <div className="overflow-y-auto max-h-96 p-2">
          {venuePackages.map((pack, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-2 mb-4 border-b pb-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  اطلاعات پکیج {index + 1}
                </span>
                <div className="flex gap-x-1">
                  {index > 0 && (
                    <span
                      className="cursor-pointer p-0.5 border rounded bg-red-500 w-6 h-6 text-white flex justify-center items-center"
                      onClick={() => handleRemovePackage(index)}
                    >
                      <Minus />
                    </span>
                  )}
                  {index === venuePackages.length - 1 && (
                    <span
                      className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded bg-green-500 text-white"
                      onClick={handleAddPackage}
                    >
                      <Plus />
                    </span>
                  )}
                </div>
              </div>

              <select
                value={pack.type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
                className="p-2 pr-8 rounded border"
              >
                <option value="rental">اجاره</option>
                <option value="beverage">نوشیدنی</option>
                <option value="catering">پذیرایی</option>
                <option value="vendor">تأمین‌کننده خدمات جانبی</option>
              </select>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="حداقل مهمان"
                  value={pack.guest.min}
                  onChange={(e) => handleGuestChange(index, "min", e.target.value)}
                  className="p-2 rounded border w-full"
                />
                <input
                  type="text"
                  placeholder="حداکثر مهمان"
                  value={pack.guest.max}
                  onChange={(e) => handleGuestChange(index, "max", e.target.value)}
                  className="p-2 rounded border w-full"
                />
              </div>

              <input
                type="text"
                placeholder="قیمت در زمان اوج (مثلاً: 500-4000)"
                value={pack.pricing.peak}
                onChange={(e) => handlePricingChange(index, "peak", e.target.value)}
                className="p-2 rounded border"
              />

              <input
                type="text"
                placeholder="قیمت در زمان غیراوج"
                value={pack.pricing.offPeak}
                onChange={(e) => handlePricingChange(index, "offPeak", e.target.value)}
                className="p-2 rounded border"
              />

              <textarea
                placeholder="توضیحات"
                rows={3}
                value={pack.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className="p-2 rounded border"
              />

              <div>
                <span className="block mb-2">چه چیزهایی شامل می‌شود؟</span>
                {pack.whatsIncluded.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-x-2 mb-2"
                  >
                    <input
                      type="text"
                      placeholder="آیتم"
                      value={item}
                      onChange={(e) =>
                        handleItemChange(index, itemIndex, e.target.value)
                      }
                      className="p-2 rounded border w-full"
                    />
                    <span
                      className="cursor-pointer p-0.5 border rounded bg-red-500 w-6 h-6 text-white flex justify-center items-center"
                      onClick={() => handleRemoveItem(index, itemIndex)}
                    >
                      <Minus />
                    </span>
                  </div>
                ))}
                <button
                type="button"
                  onClick={() => handleAddItem(index)}
                  className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded bg-green-500 text-white"
                >
                  <Plus />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    <div className="flex justify-between">
            <NavigationButton direction="next" onClick={nextStep} />
            <NavigationButton direction="prev" onClick={prevStep} />
          </div>
    </>
  );
};

export default Step9;
