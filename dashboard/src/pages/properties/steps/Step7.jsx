
import Plus from "@/components/icons/Plus";
import Minus from "@/components/icons/Minus";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";

const Step7 = ({
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
        squareFootage: "",
        spacesGallery: [],
     
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
  const handleSetGallery = (index, files) => {
    const updatedEventSpaces = [...ourEventSpaces];
    updatedEventSpaces[index].spacesGallery = files;
    setOurEventSpaces(updatedEventSpaces);
  };
  
  const handleSetGalleryPreview = (index, previews) => {
    const updatedEventSpaces = [...ourEventSpaces];
    updatedEventSpaces[index].galleryPreview = previews;
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

                <GalleryUpload
                  setGallery={(files) => handleSetGallery(index, files)}
                  setGalleryPreview={(previews) => handleSetGalleryPreview(index, previews)}
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
    </>
  );
};

export default Step7;
