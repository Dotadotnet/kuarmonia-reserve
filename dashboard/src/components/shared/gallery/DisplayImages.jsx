import React from "react";

const DisplayImages = ({ galleryPreview, imageSize = 600 }) => {
  return (
    <div className="flex flex-row overflow-x-auto gap-x-2 mt-4">
      {galleryPreview?.length > 0 &&
        galleryPreview.map((item, index) => {
          // بررسی اینکه فایل تصویر است یا ویدیو
          const isVideo = item.type === "video" || /\.(mp4|webm|ogg)$/i.test(item.url);

          return (
            <div key={index} className="flex-shrink-0 mb-2">
              {isVideo ? (
                <video
                  controls
                  src={item.url}
                  height={imageSize}
                  width={imageSize}
                  className="rounded object-cover"
                >
                  مرورگر شما از پخش این نوع فایل پشتیبانی نمی‌کند.
                </video>
              ) : (
                <img
                  src={item.url}
                  alt="gallery"
                  height={imageSize}
                  width={imageSize}
                  className="rounded object-cover"
                />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default DisplayImages;
