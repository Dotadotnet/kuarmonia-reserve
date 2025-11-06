import { useState } from "react";
import StepAddService from "./steps/StepAddService";
import ToggleThemeButton from "@/components/ThemeToggle";
import BackButton from "@/components/shared/button/BackButton";
import KeyServiceCard from "@/components/shared/card/KeyServiceCard";
import ServiceContent from "@/components/shared/content/service/ServiceContent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useForm } from "react-hook-form";
import Computer from "@/components/icons/Computer";
import Mobile from "@/components/icons/Mobile";

function AddService() {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [roadmap, setRoadmap] = useState([
    {
      title: "",
      description: "",
      duration: "",
      link: {
        text: "",
        url: ""
      }
    }
  ]);
  const [faqs, setFaqs] = useState([
    {
      question: "",
      answer: "",
    }
  ]);
  const [whatYouWillRead, setWhatYouWillRead] = useState([]);
  const [viewMode, setViewMode] = useState("desktop"); // 'mobile' or 'desktop'

  const methods = useForm({
    mode: "all"
  });
  const {
    watch,
    register,
    formState: { errors },
    trigger,
    handleSubmit,
    setValue,
    control
  } = methods;
  
  const service = {
    title: watch("title"),
    summary: watch("summary"),
    icon: watch("icon"),
    thumbnail: thumbnailPreview,
    category: watch("category"),
    tags: watch("tags"),
    content: editorData,
    faqs: faqs,
    roadmap: roadmap,
    whatYouWillRead: whatYouWillRead,
    visaType: watch("visaType")
};

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <section
      className={`relative bg-[#dce9f5] dark:bg-[#1a202c] h-screen w-screen overflow-hidden text-black dark:text-gray-300 min-h-screen flex justify-center items-center p-4`}
    >
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="flex flex-row items-center gap-x-2">
        <BackButton to={-1} />
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 1 }
        }}
        autoHeight={true}
        className="w-full !h-screen !mr-0 flex items-center justify-center"
      >
        <SwiperSlide className=" !mr-0 !flex !justify-center !items-center !h-screen ">
          <div className="max-w-md w-full dark:bg-gray-800 bg-white flex flex-col gap-y-4 p-5 sm:p-8 rounded-primary shadow-lg z-10">
            <StepAddService
              watch={watch}
              register={register}
              errors={errors}
              editorData={editorData}
              setEditorData={setEditorData}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              setThumbnailPreview={setThumbnailPreview}
              thumbnailPreview={thumbnailPreview}
              handleSubmit={handleSubmit}
              trigger={trigger}
              control={control}
              roadmap={roadmap}
              setRoadmap={setRoadmap}
              faqs={faqs}
              setFaqs={setFaqs}
              whatYouWillRead={whatYouWillRead}
              setWhatYouWillRead={setWhatYouWillRead}
              setValue={setValue}
            />
            <ToggleThemeButton />
          </div>
        </SwiperSlide>
        <SwiperSlide className=" !mr-0 items-center justify-start !w-full">
          {/* Preview Header with View Toggle */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-t-lg">
            <h2 className="text-xl font-bold">پیش نمایش سرویس</h2>
            <div className="flex gap-2">
              <button
                onClick={() => toggleViewMode("mobile")}
                className={`p-2 rounded-lg ${viewMode === "mobile" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                title="نمای موبایل"
              >
                <Mobile className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleViewMode("desktop")}
                className={`p-2 rounded-lg ${viewMode === "desktop" ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200" : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"}`}
                title="نمای دسکتاپ"
              >
                <Computer className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Preview Content */}
          <div className={`p-4 bg-white dark:bg-gray-800 ${viewMode === "mobile" ? "max-w-md mx-auto" : "w-full"}`}>
            <div className="">
              <ServiceContent service={service} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default AddService;