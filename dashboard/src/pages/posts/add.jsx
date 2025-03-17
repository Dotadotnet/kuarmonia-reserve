import React, { useState, useMemo } from "react";
import AddPost from "./steps/AddPost";
import ThemeToggle from "@/components/ThemeToggle";
import CustomProgressBar from "./steps/CustomProgressBar";
import PostCard from "@/components/shared/card/PostCard";
import PostContent from "@/components/shared/content/PostContent";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function Add() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [gallery, setGallery] = useState(null);
  const totalSteps = 5;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    control,
    getValues,
  } = useForm({
    mode: "onChange",
  });
  const user = useSelector((state) => state?.auth);

  const publishDate =
    watch("publishDate") || new Date().toISOString().split("T")[0];
  const defaultValues = useMemo(() => {
    return {
      name: user?.user.name,
      avatar: user?.user.avatar,
      id: user?.user._id,
    };
  }, [user]);

  return (
    <section className="w-screen relative  h-screen bg-slate-200 dark:bg-slate-800 overflow-hidden flex justify-center items-center p-4 ">
      <div className="wave "></div>
      <div className="wave wave2 "></div>
      <div className="wave wave3"></div>
      <div className="w-full h-full flex flex-col ">
        <CustomProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
          <div className="w-full flex justify-center bg-white h-[550px] relative justify-center dark:bg-gray-900 z-50 flex flex-col gap-y-4  p-4 rounded-primary shadow-lg">
            <AddPost
              currentStep={currentStep}
              totalSteps={totalSteps}
              publishDate={publishDate}
              setCurrentStep={setCurrentStep}
              gallery={gallery}
              setGallery={setGallery}
              galleryPreview={galleryPreview}
              setThumbnailPreview={setThumbnailPreview}
              setGalleryPreview={setGalleryPreview}
              editorData={editorData}
              setEditorData={setEditorData}
              handleSubmit={handleSubmit}
              register={register}
              errors={errors}
              trigger={trigger}
              control={control}
              getValues={getValues}
              setSelectedTags={setSelectedTags}
              selectedTags={selectedTags}
            />
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center">
              <ThemeToggle />
            </div>
          </div>
          <div className="w-full">
            <PostCard
              title={watch("title")}
              description={watch("description")}
              thumbnailPreview={thumbnailPreview}
              publishDate={publishDate}
              author={defaultValues?.name}
              avatar={defaultValues?.avatar?.url}
            />
          </div>
          <div className="w-full min-h-[300px] max-h-[550px] overflow-y-auto">
            <PostContent
              title={watch("title")}
              content={watch("content")}
              selectedTags={selectedTags}
              galleryPreview={galleryPreview}
              publishDate={publishDate}
              like={0}
              view={0}
              disLike={0}
              comment={[]}
              author={defaultValues?.name}
              avatar={defaultValues?.avatar?.url}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Add;
