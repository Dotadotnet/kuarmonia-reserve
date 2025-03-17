import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, FreeMode } from "swiper/modules";
import SkeletonImage from "@/components/shared/skeletonLoading/SkeletonImage";
import LoadImage from "@/components/shared/LoadImage";

const PostMedia = ({ isLoading, galleryPreview }) => {
  const [mainMedia, setMainMedia] = useState(null);
  const [mainType, setMainType] = useState("image");

  // تشخیص نوع فایل از URL
  const getFileType = (url) => {
    const fileExt = url.split(".").pop().toLowerCase();
    return ["mp4", "mov", "avi", "mkv"].includes(fileExt) ? "video" : "image";
  };

  useEffect(() => {
    if (galleryPreview?.length > 0) {
      const firstMedia = galleryPreview[0];
      setMainMedia(firstMedia?.url);
      setMainType(getFileType(firstMedia?.url));
    }

    // بررسی کلی نوع گالری
    const hasVideo = galleryPreview?.some(media => getFileType(media.url) === "video");
    console.log("Gallery Type:", hasVideo ? "Video" : "Image");
  }, [galleryPreview]);

  return (
    <div className="w-full h-96 relative">
      {/* نمایش بارگذاری یا گالری خالی */}
      {isLoading || galleryPreview?.length === 0 ? (
        <SkeletonImage showSize={false} />
      ) : (
        <Swiper
          slidesPerView={1.2} // نمایش اولین اسلاید کامل و ۲۰٪ از اسلاید بعدی
          spaceBetween={10} // فاصله بین هر اسلاید
          freeMode={true} // حرکت آزادانه بین اسلایدها
          modules={[Pagination, FreeMode]} // افزودن ماژول‌ها
          className="w-full h-96 z-5" // تنظیم اندازه Swiper
        >
          {galleryPreview.map((media, index) => {
            const fileType = getFileType(media.url);
            return (
              <SwiperSlide key={index} className="w-full h-full">
                {fileType === "video" ? (
                  <video
                    controls
                    controlsList="nodownload"
                    src={media.url}
                    className="rounded w-full h-full object-cover"
                  >
                    مرورگر شما از پخش این ویدیو پشتیبانی نمی‌کند.
                  </video>
                ) : (
                  <LoadImage
                    src={media.url}
                    width={600}
                    height={600}
                    alt="Thumbnail"
                    className="rounded w-full h-full object-cover"
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};

export default PostMedia;
