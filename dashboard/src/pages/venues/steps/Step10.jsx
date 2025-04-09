import NavigationButton from "@/components/shared/button/NavigationButton";
import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { useGetVenueVendorsQuery } from "@/services/venueVendor/venueVendorApi";

const Step10 = ({ prevStep, nextStep, control }) => {
  const { data: fetchVenueVendorsData } = useGetVenueVendorsQuery();

  // گروه‌بندی Vendorها براساس category
  const groupedVendors = useMemo(() => {
    const vendors = fetchVenueVendorsData?.data || [];

    const groups = vendors.reduce((acc, vendor) => {
      const categoryId = vendor.category._id;
      const categoryTitle = vendor.category.title;

      if (!acc[categoryId]) {
        acc[categoryId] = {
          _id: categoryId,
          title: categoryTitle,
          vendors: [],
        };
      }

      acc[categoryId].vendors.push({
        id: vendor._id,
        title: vendor.title,
        thumbnail: vendor.thumbnail,
      });

      return acc;
    }, {});

    return Object.values(groups);
  }, [fetchVenueVendorsData]);

  const SelectableList = ({ name, title, items, control }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <div>
          <div className="grid grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-3 border rounded-lg cursor-pointer ${
                  field.value.some((s) => s.id === item.id)
                    ? "bg-green-100 dark:bg-black"
                    : ""
                }`}
                onClick={() => {
                  const alreadySelected = field.value.some(
                    (s) => s.id === item.id
                  );
                  field.onChange(
                    alreadySelected
                      ? field.value.filter((s) => s.id !== item.id)
                      : [...field.value, item]
                  );
                }}
              >
                <img
                  src={item.thumbnail?.url}
                  alt={item.title}
                  className="w-full h-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );

  return (
    <div className="flex flex-col gap-y-6">
      {groupedVendors.map((category) => (
        <div key={category._id}>
          <h3 className="text-lg  mb-2">{category.title}</h3>
          <SelectableList
            name={`selectedVendors_${category._id}`}
            items={category.vendors}
            control={control}
          />
        </div>
      ))}

      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </div>
  );
};

export default Step10;
