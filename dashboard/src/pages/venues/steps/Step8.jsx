
import NavigationButton from "@/components/shared/button/NavigationButton";
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import { Controller } from "react-hook-form";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";

const Step8 = ({
  nextStep,
  prevStep,
  errors,
  register,
  ourEventSpaces,
  setOurEventSpaces,
  control
}) => {
  function handleAddEventSpace() {
    setOurEventSpaces([
      ...ourEventSpaces,
      {
        name: "",
        intro: "",
        description: "",
        seatedCapacity: "",
        standingCapacity: "",
        squareFootage: "",
        roomCost: "",
        spaces: [],
        previewSpaces: [],
        isPriceIncluded: true
      }
    ]);
  }

  const handleRemoveEventSpace = (index) => {
    const updatedEventSpaces = [...ourEventSpaces];
    updatedEventSpaces.splice(index, 1);
    setOurEventSpaces(updatedEventSpaces);
  };

  const handleChange = (index, field, value) => {
    const updatedEventSpaces = [...ourEventSpaces];
    updatedEventSpaces[index][field] = value;
    setOurEventSpaces(updatedEventSpaces);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-y-4 p-2 border rounded ">
        <div className="overflow-y-auto max-h-96 p-2">
          {ourEventSpaces.map((eventSpace, index) => (
            <label key={index} className="flex flex-col gap-y-1">
              <span className="text-sm flex flex-row justify-between items-center">
                اطلاعات فضای رویداد را وارد کنید
                <span className="flex flex-row gap-x-1">
                  {index > 0 && (
                    <span
                      className="cursor-pointer p-0.5 border rounded bg-red-500 w-6 h-6 text-white flex justify-center items-center"
                      onClick={() => handleRemoveEventSpace(index)}
                    >
                      <Minus />
                    </span>
                  )}
                  {index === ourEventSpaces.length - 1 && (
                    <span
                      className="cursor-pointer w-6 h-6 flex justify-center items-center p-0.5 border rounded bg-green-500 text-white"
                      onClick={handleAddEventSpace}
                    >
                      <Plus />
                    </span>
                  )}
                </span>
              </span>
              <div className="flex flex-col gap-y-2.5">
                <input
                  type="text"
                  placeholder="نام فضا"
                  value={eventSpace.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="p-2 rounded border"
                />
                {errors?.ourEventSpaces?.[index]?.name && (
                  <span className="text-red-500 text-sm">
                    {errors.ourEventSpaces[index].name.message}
                  </span>
                )}
                <input
                  type="text"
                  placeholder="معرفی فضا"
                  value={eventSpace.intro}
                  onChange={(e) => handleChange(index, "intro", e.target.value)}
                  className="p-2 rounded border"
                />
                {errors?.ourEventSpaces?.[index]?.intro && (
                  <span className="text-red-500 text-sm">
                    {errors.ourEventSpaces[index].intro.message}
                  </span>
                )}
                <textarea
                  placeholder="توضیحات"
                  value={eventSpace.description}
                  rows={5}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="p-2 rounded border"
                />
                {errors?.ourEventSpaces?.[index]?.description && (
                  <span className="text-red-500 text-sm">
                    {errors.ourEventSpaces[index].description.message}
                  </span>
                )}
                <input
                  type="number"
                  placeholder="ظرفیت مهمان نشسته"
                  value={eventSpace.seatedCapacity}
                  onChange={(e) =>
                    handleChange(index, "seatedCapacity", e.target.value)
                  }
                  className="p-2 rounded border"
                />
                {errors?.ourEventSpaces?.[index]?.seatedCapacity && (
                  <span className="text-red-500 text-sm">
                    {errors.ourEventSpaces[index].seatedCapacity.message}
                  </span>
                )}
                <input
                  type="number"
                  placeholder="ظرفیت مهمان ایستاده"
                  value={eventSpace.standingCapacity}
                  onChange={(e) =>
                    handleChange(index, "standingCapacity", e.target.value)
                  }
                  className="p-2 rounded border"
                />
                {errors?.ourEventSpaces?.[index]?.standingCapacity && (
                  <span className="text-red-500 text-sm">
                    {errors.ourEventSpaces[index].standingCapacity.message}
                  </span>
                )}
                <input
                  type="number"
                  placeholder="متراژ (فوت مربع)"
                  value={eventSpace.squareFootage}
                  onChange={(e) =>
                    handleChange(index, "squareFootage", e.target.value)
                  }
                  className="p-2 rounded border"
                />
                {errors?.ourEventSpaces?.[index]?.squareFootage && (
                  <span className="text-red-500 text-sm">
                    {errors.ourEventSpaces[index].squareFootage.message}
                  </span>
                )}
                <Controller
                  control={control}
                  name={`ourEventSpaces[${index}].isPriceIncluded`}
                  defaultValue={eventSpace.isPriceIncluded}
                  render={({ field: { onChange, value } }) => (
                    <div className="flex items-center gap-x-2">
                      <label
                        htmlFor={`isPriceIncluded-${index}`}
                        className="text-xs"
                      >
                        هزینه این فضا در قیمت کلی مکان برگزاری لحاظ شده است؟
                      </label>
                      <input
                        type="checkbox"
                        id={`isPriceIncluded-${index}`}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          onChange(checked);
                          handleChange(index, "isPriceIncluded", checked);
                        }}
                        checked={value}
                      />
                    </div>
                  )}
                />
                {!eventSpace.isPriceIncluded && (
                  <input
                    type="number"
                    placeholder="قیمت"
                    value={eventSpace.roomCost}
                    onChange={(e) =>
                      handleChange(index, "roomCost", e.target.value)
                    }
                    className="p-2 rounded border"
                  />
                )}
                <GalleryUpload
                  setGalleryPreview={(files) =>
                    handleChange(index, "previewSpaces", files)
                  }
                  setGallery={(files) => handleChange(index, "spaces", files)}
                  maxFiles={5}
                  register={register}
                  title="آپلود تصاویر فضای رویداد"
                  iconSize={6}
                />
              </div>
            </label>
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

export default Step8;
