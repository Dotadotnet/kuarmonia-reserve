"use client"
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
export default function SimpleSlider({ slides }) {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    rtl: true,
    slides: { perView: 1.1, spacing: 12 },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 1, spacing: 0 },
      },
    },
  });

  return (
    <section
      aria- label="simple-slider"
      className="relative my-8"
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div className="relative" style={{ height: 300 }}>
        <div ref={sliderRef} className="keen-slider h-full">
          {

            slides.map((s) => (
              <div key={s._id} className="keen-slider__slide">
                <a
                  href={s.link}
                  rel={s.link.includes(process.env.NEXT_PUBLIC_BASE_URL) ? "" : "nofollow" }
                  className="h-full w-full rounded-xl border border-gray-200 shadow-sm flex items-center justify-center"
                >
                  <img src={s.image.url} className="size-full object-cover" />
                </a>
              </div>
            ))



          }

        </div>

        {/* Controls (desktop only) */}
        <div className="hidden md:block">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute text-black font-bold cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow px-3 py-2 rounded-md hover:bg-white"
            aria-label="prev"
          >
            ‹
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute text-black font-bold cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow px-3 py-2 rounded-md hover:bg-white"
            aria-label="next"
          >
            ›
          </button>
        </div>
      </div>
    </section >
  );
}


