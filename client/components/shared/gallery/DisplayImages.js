import React from "react";
import Image from "next/image";

const DisplayImages = ({ galleryPreview, imageSize = 600 }) => {
  return (
    <div className="flex flex-row overflow-x-auto gap-x-2 mt-4">
      {galleryPreview?.length > 0 &&
        galleryPreview.map((item, index) => (
          <div key={index} className="flex-shrink-0">
             {item.type === "video" ? (
              <video
                controls
                src={item.url} // درست‌کردن نام ویژگی src
                height={imageSize}
                width={imageSize}
                className="rounded object-cover"
              >
                مرورگر شما از پخش این نوع فایل پشتیبانی نمی‌کند.
              </video>
            ) : (
              <Image
                src={item.url} // آدرس تصویر
                alt="gallery"
                height={imageSize}
                width={imageSize}
                className="rounded object-cover"
              />
            )}

          </div>
        ))}
    </div>
  );
};

export default DisplayImages;
