import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StepAddNews from "./steps/StepAddNews";
import NewsCard from "@/components/shared/card/NewsCard";
import CustomProgressBar from "./steps/CustomProgressBar";
import NewsContent from "@/components/shared/content/NewsContent";
import { useForm } from "react-hook-form";

function AddNews() {
  const [currentStep, setCurrentStep] = useState(1);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [socialLinksData, setSocialLinksData] = useState([
    { network: null, link: "" }
  ]);
  const [editorData, setEditorData] = useState("");

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

  const publishDate =
    watch("publishDate") || new Date().toISOString().split("T")[0];
  const news = {
    thumbnail: thumbnailPreview,
    title: watch("title"),
    category: watch("category"),
    summary: watch("summary"),
    tags: watch("tags"),
    content: watch("content"),
    publishDate: publishDate,
    socialLinks: watch("socialLinks"),
  };
  return (
    <section className="relative overflow-hidden bg-[#dce9f5] dark:bg-[#1a202c] w-screen h-screen  flex flex-col items-center justify-start p-4">
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="flex flex-col w-full z-50 items-center justify-start">
        <CustomProgressBar currentStep={currentStep} />

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 3 }
          }}
          autoHeight={true}
          className="w-full !h-screen !mr-0 flex items-center justify-center"
        >
          <SwiperSlide className=" !mr-0  flex items-center justify-center min-h-[600px]">
            <StepAddNews
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              thumbnailPreview={thumbnailPreview}
              setThumbnailPreview={setThumbnailPreview}
              register={register}
              trigger={trigger}
              errors={errors}
              handleSubmit={handleSubmit}
              setValue={setValue}
              watch={watch}
              control={control}
              socialLinksData={socialLinksData}
              setSocialLinksData={setSocialLinksData}
              publishDate={publishDate}
              editorData={editorData}
              setEditorData={setEditorData}
            />
          </SwiperSlide>

          <SwiperSlide className=" flex scale-90 !mr-0 items-center justify-center min-h-[400px]">
            <NewsCard news={news} />
          </SwiperSlide>

          <SwiperSlide className=" flex !mr-0 items-center justify-center ">
            <NewsContent news={news} />
          </SwiperSlide>
        </Swiper>

        {/* دکمه‌های ناوبری سفارشی‌شده */}
      </div>
    </section>
  );
}

export default AddNews;
