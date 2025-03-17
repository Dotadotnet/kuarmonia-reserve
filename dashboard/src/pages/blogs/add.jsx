import React, { useState, useMemo, useRef } from "react";
import AddBlog from "./steps/AddBlog";
import ThemeToggle from "@/components/ThemeToggle";
import CustomProgressBar from "./steps/CustomProgressBar";
import BlogCard from "@/components/shared/card/BlogCard";
import BlogContent from "@/components/shared/content/BlogContent";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FullScreen, ExitFullScreen } from "@/components/icons/Screen";
import { NavLink } from "react-router-dom";
import ChevronRight from "@/components/icons/ChevronRight";

function Add() {
  const [currentStep, setCurrentStep] = useState(1);

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [editorData, setEditorData] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const previewRef = useRef(null);

  const totalSteps = 4;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    trigger,
    control,
    getValues
  } = useForm({
    mode: "onChange"
  });
  const user = useSelector((state) => state?.auth);

  const publishDate =
    watch("publishDate") || new Date().toISOString().split("T")[0];
  const defaultValues = useMemo(() => {
    return {
      name: user?.user.name,
      avatar: user?.user.avatar,
      id: user?.user._id
    };
  }, [user]);

  const handleToggleFullscreen = () => {
    if (document.fullscreenElement === previewRef.current) {
      // خروج از fullscreen
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting fullscreen: ", err);
      });
    } else {
      // ورود به fullscreen
      if (previewRef.current.requestFullscreen) {
        previewRef.current.requestFullscreen().catch((err) => {
          console.error("Error entering fullscreen: ", err);
        });
      }
    }
  };
  return (
    <section className="w-screen relative  md:h-screen bg-slate-200 dark:bg-slate-800 overflow-hidden flex justify-center items-center p-4 ">
      <div className="wave "></div>
      <div className="wave wave2 "></div>
      <div className="wave wave3"></div>
      <NavLink
        to={"/blogs"}
        className={
          "fixed bottom-4 right-4 group items-center reject-button rounded-full  !bg-red-800/20 shadow-lg !p-4 text-slate-300 transition-all hover:text-slate-100 z-50"
        }
      >
        <ChevronRight />
      </NavLink>

      <div className="w-full h-full flex flex-col ">
        <CustomProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
          <div className="w-full flex justify-center bg-white h-[550px] relative r dark:bg-gray-900 z-50  flex-col gap-y-4  p-2 rounded-primary shadow-lg">
            <AddBlog
              currentStep={currentStep}
              totalSteps={totalSteps}
              publishDate={publishDate}
              setCurrentStep={setCurrentStep}
              setThumbnailPreview={setThumbnailPreview}
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
          <div className="w-full flex justify-center">
            <BlogCard
              title={watch("title")}
              description={watch("description")}
              thumbnailPreview={thumbnailPreview}
              publishDate={publishDate}
              author={defaultValues?.name}
              avatar={defaultValues?.avatar?.url}
            />
          </div>
          <div className=" py-6 px-2 relative bg-white rounded-primary z-40 w-full min-h-[300px] overflow-y-auto ">
            <button
              className={`p-3   ${
                isFullscreen ? "hidden" : ""
              } rounded-full shadow-lg cursor-pointer bg-white dark:bg-gray-800 z-20 absolute left-1/2 top-4 transform -translate-x-1/2 dark:text-gray-100`}
              onClick={handleToggleFullscreen}
            >
              {isFullscreen ? <ExitFullScreen /> : <FullScreen />}
            </button>
            <div
              className="overflow-y-auto relative mt-8 max-h-[470px] "
              ref={previewRef}
            >
              <BlogContent
                title={watch("title")}
                content={watch("content")}
                selectedTags={selectedTags}
                thumbnailPreview={thumbnailPreview}
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
      </div>
    </section>
  );
}

export default Add;
