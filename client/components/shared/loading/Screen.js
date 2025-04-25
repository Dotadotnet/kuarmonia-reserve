import React from "react";

const Screen = () => {
  return (
    <section className="flex loader-div fixed top-0 right-0 z-[2222222222222] justify-center items-center h-screen w-screen bg-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        width={300}
        height={300}
        className="object-contain"
      >
        <source src="/loading.webm" type="video/webm" />
        مرورگر شما از این فرمت ویدیو پشتیبانی نمی‌کند.
      </video>
    </section>
  );
};

export default Screen;
