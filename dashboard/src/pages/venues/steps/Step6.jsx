import NavigationButton from "@/components/shared/button/NavigationButton";
import React, { useMemo } from "react";
import { Controller } from "react-hook-form";
import { useGetVenueAwardsQuery } from "@/services/venueAward/venueAwardApi";
import { useGetVenueStandardsQuery } from "@/services/venueStandard/venueStandardApi";

const Step6 = ({ prevStep, nextStep, control }) => {
  const { data: fetchVenueAwardsData } = useGetVenueAwardsQuery();
  const { data: fetchVenueStandardsData } = useGetVenueStandardsQuery();

  const venueAwards = useMemo(
    () =>
      fetchVenueAwardsData?.data?.map((venueAward) => ({
        id: venueAward._id,
        title: venueAward.title,
        description: venueAward.description,
        thumbnail: venueAward.thumbnail
      })) || [],
    [fetchVenueAwardsData]
  );

  const venueStandards = useMemo(
    () =>
      fetchVenueStandardsData?.data?.map((venueStandard) => ({
        id: venueStandard._id,
        title: venueStandard.title,
        description: venueStandard.description,
        thumbnail: venueStandard.thumbnail
      })) || [],
    [fetchVenueStandardsData]
  );

  const SelectableList = ({ name, title, items, control }) => (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <div>
          <label className=" mb-2">
            {title}

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
                    src={item.thumbnail.url}
                    alt={item.title}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <p className="text-sm mt-2">{item.title}</p>
                </div>
              ))}
            </div>
          </label>
         
        </div>
      )}
    />
  );

  return (
    <div className="flex flex-col gap-y-4">
      <SelectableList
        name="selectedAwards"
        title="انتخاب جوایز"
        items={venueAwards}
        control={control}
      />
      <SelectableList
        name="selectedStandards"
        title="انتخاب استانداردها"
        items={venueStandards}
        control={control}
      />
       <div className="flex justify-between mt-12">
            <NavigationButton direction="next" onClick={nextStep} />

            <NavigationButton direction="prev" onClick={prevStep} />
          </div>
    </div>
  );
};

export default Step6;
