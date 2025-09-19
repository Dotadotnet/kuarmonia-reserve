'use client'
import { useEffect, useMemo, useState } from "react";

const Banner = () => {
  const images = useMemo(
    () => ["/assets/slide/1.jpg", "/assets/slide/2.jpg", "/assets/slide/3.jpg"],
    []
  );
  const [bg, setBg] = useState(images[Math.floor(Math.random() * images.length)]);

  useEffect(() => {
    const id = setInterval(() => {
      setBg(images[Math.floor(Math.random() * images.length)]);
    }, 5000);
    return () => clearInterval(id);
  }, [images]);

  return (
    <section
      className="bg-no-repeat bg-auto bg-bottom relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black/60 before:top-0 before:left-0 before:-z-10 z-20 flex flex-col gap-y-8 h-[50vh] justify-center px-4"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <article className="flex flex-col items-center gap-y-4">
        <h1 className="text-white text-center lg:text-6xl md:text-4xl text-2xl">انواع ویزا</h1>
        <p className="lg:w-1/2 md:w-3/4 w-full text-white text-center text-sm">
          بر اساس نوع و کشور مقصد، ویزای مناسب خود را پیدا کنید.
        </p>
      </article>
    </section>
  );
};

export default Banner;

