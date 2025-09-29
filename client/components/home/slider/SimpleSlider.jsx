"use client"
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function SimpleSlider({ params }) {
  const slides = [
    { id: 1, title: "Slide 1", color: "#EEF2FF" },
    { id: 2, title: "Slide 2", color: "#ECFEFF" },
    { id: 3, title: "Slide 3", color: "#F0FDFA" },
    { id: 4, title: "Slide 4", color: "#F5F3FF" },
  ];

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
      aria-label="simple-slider"
      className="relative my-8"
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div className="relative" style={{ height: 300 }}>
        <div ref={sliderRef} className="keen-slider h-full">
          {slides.map((s) => (
            <div key={s.id} className="keen-slider__slide">
              <div
                className="h-full w-full rounded-xl border border-gray-200 shadow-sm flex items-center justify-center"
                style={{ background: s.color }}
              >
                <span className="text-gray-800 font-semibold">{s.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Controls (desktop only) */}
        <div className="hidden md:block">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow px-3 py-2 rounded-md hover:bg-white"
            aria-label="prev"
          >
            ‹
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 shadow px-3 py-2 rounded-md hover:bg-white"
            aria-label="next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}


