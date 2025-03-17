import React, { useState } from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import GalleryUpload from "@/components/shared/gallery/GalleryUpload";
import DisplayImages from "@/components/shared/gallery/DisplayImages";

const GalleryStep = ({ nextStep,prevStep, setGallery, register }) => {
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  return (
    <>
      <div className="flex flex-col text-center gap-y-2">
        <GalleryUpload
          setGallery={setGallery}
          setGalleryPreview={setGalleryPreviews}
          maxFiles={10}
          register={register("gallery", {
            required: "آپلود حداقل یک تصویر الزامی است",
          })}
          title="آپلود تصاویر گالری"
        />

     
        <DisplayImages
          galleryPreview={galleryPreviews.map((item) => item)}
          imageSize={150}
        />
      </div>

      <div className=" flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />
                <NavigationButton direction="prev" onClick={prevStep} />
        
      </div>
    </>
  );
};

export default GalleryStep;
