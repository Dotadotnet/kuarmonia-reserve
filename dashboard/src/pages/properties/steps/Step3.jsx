import React, { useState } from "react";
import ArrayInput from "@/components/shared/tools/ArrayInput";
const Step3 = ({ register, errors }) => {
  const [activeTab, setActiveTab] = useState("unit");
  const [buildingBedrooms, setBuildingBedrooms] = useState([""]);
  const [buildingSquares, setBuildingSquares] = useState([""]);
  return (
    <div className="w-full px-4 max-h-[500px] overflow-y-auto flex flex-col gap-y-4">
      {/* Tabs */}
      <div className="flex gap-x-4 mb-4">
        <button
          type="button"
          className={`p-2 rounded ${
            activeTab === "unit"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("unit")}
        >
          واحدی{" "}
        </button>
        <button
          type="button"
          className={`p-2 rounded ${
            activeTab === "building"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("building")}
        >
          بلوکی{" "}
        </button>
      </div>

      {/* Content */}
      {activeTab === "unit" && (
        <div className="flex flex-col gap-y-4">
          {/* مساحت */}
          <label htmlFor="square" className="flex flex-col gap-y-2 w-full">
            مساحت
            <input
              type="number"
              id="square"
              className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("unit.square", {
                required: "مساحت ساخت الزامی است",
                pattern: {
                  value: /^\d{1,5}$/,
                  message: "لطفاً مساحت را درست وارد کنید"
                }
              })}
            />
            {errors.unit?.square && (
              <span className="text-red-500 text-sm">
                {errors.unit.square.message}
              </span>
            )}
          </label>

          {/* طبقه */}
          <label htmlFor="floor" className="flex flex-col gap-y-2 w-full">
            طبقه
            <input
              type="number"
              id="floor"
              className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("unit.floor", {
                pattern: {
                  value: /^\d{1,2}$/,
                  message: "عدد معتبر برای طبقه وارد کنید"
                }
              })}
            />
            {errors.unit?.floor && (
              <span className="text-red-500 text-sm">
                {errors.unit.floor.message}
              </span>
            )}
          </label>

          {/* تعداد اتاق */}
          <label htmlFor="bedrooms" className="flex flex-col gap-y-2 w-full">
            تعداد اتاق
            <input
              type="number"
              id="bedrooms"
              className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("unit.bedrooms", {
                pattern: { value: /^\d{1,2}$/, message: "عدد معتبر وارد کنید" }
              })}
            />
            {errors.unit?.bedrooms && (
              <span className="text-red-500 text-sm">
                {errors.unit.bedrooms.message}
              </span>
            )}
          </label>

          {/* تعداد حمام */}
          <label htmlFor="bathrooms" className="flex flex-col gap-y-2 w-full">
            تعداد حمام
            <input
              type="number"
              id="bathrooms"
              className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("unit.bathrooms", {
                pattern: { value: /^\d{1,2}$/, message: "عدد معتبر وارد کنید" }
              })}
            />
            {errors.unit?.bathrooms && (
              <span className="text-red-500 text-sm">
                {errors.unit.bathrooms.message}
              </span>
            )}
          </label>
        </div>
      )}

      {activeTab === "building" && (
        <div className="flex flex-col gap-y-4">
          {/* تعداد کل طبقات */}
          <label htmlFor="totalFloors" className="flex flex-col gap-y-2 w-full">
            تعداد کل طبقات
            <input
              type="number"
              id="totalFloors"
              className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("building.totalFloors", {
                pattern: { value: /^\d{1,2}$/, message: "عدد معتبر وارد کنید" }
              })}
            />
            {errors.building?.totalFloors && (
              <span className="text-red-500 text-sm">
                {errors.building.totalFloors.message}
              </span>
            )}
          </label>

          {/* تعداد کل واحدها */}
          <label htmlFor="totalUnits" className="flex flex-col gap-y-2 w-full">
            تعداد کل واحدها
            <input
              type="number"
              id="totalUnits"
              className="rounded p-2 border w-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("building.totalUnits", {
                pattern: { value: /^\d{1,4}$/, message: "عدد معتبر وارد کنید" }
              })}
            />
            {errors.building?.totalUnits && (
              <span className="text-red-500 text-sm">
                {errors.building.totalUnits.message}
              </span>
            )}
          </label>
          <ArrayInput
            title="تعداد اتاق‌ها"
            values={buildingBedrooms}
            setValues={setBuildingBedrooms}
            namePrefix="building.bedrooms"
            register={register}
            errors={errors}
          />

          <ArrayInput
            title="متراژها"
            values={buildingSquares}
            setValues={setBuildingSquares}
            namePrefix="building.square"
            register={register}
            errors={errors}
          />
        </div>
      )}
    </div>
  );
};

export default Step3;
