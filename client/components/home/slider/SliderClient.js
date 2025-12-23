"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useLocale } from "next-intl"
import Image from "next/image"

export default function SliderClient({ slides }) {
  const locale = useLocale()
  const isRTL = ["ar", "fa", "he"].includes(locale)

  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "trimSnaps",
      direction: isRTL ? "rtl" : "ltr",
    },
    [autoplay.current]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  // Get the first slide for LCP optimization
  const firstSlide = slides && slides.length > 0 ? slides[0] : null;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {slides.map((slide, index) => (
            <div
              key={slide._id}
              className="relative flex-[0_0_90%] md:flex-[0_0_100%] px-1 md:px-0 min-w-0"
            >
              <div className="relative w-full h-[170px] md:h-[300px] overflow-hidden rounded-xl md:rounded-none">
                {index === 0 ? (
                  // First image with priority for LCP optimization
                  <Image
                    src={slide.media.url}
                    alt={slide.title}
                    fill
                    priority
                    fetchPriority="high"
                    className={`object-cover transition-transform duration-300 rounded-xl md:rounded-none rtl:scale-x-[-1] `}
                  />
                ) : (
                  // Other images without priority
                  <Image
                    src={slide.media.url}
                    alt={slide.title}
                    fill
                    loading="lazy"
                    className={`object-cover transition-transform duration-300 rounded-xl md:rounded-none rtl:scale-x-[-1]
                    }`}
                  />
                )}

                {/* فقط پشت متن تار و شیشه‌ای */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 
                    rtl:right-4 rtl:text-right ltr:left-4 ltr:text-left
                  } md:right-12 text-white space-y-2`}
                >
                  <h3 className="text-2xl md:text-5xl font-bold bg-black/40 backdrop-blur-sm px-4 py-2 rounded-md w-fit">
                    {slide.title}
                  </h3>
                  <p className="text-base md:text-2xl opacity-90 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-md w-fit">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-white shadow-md"
                : "w-2 bg-white/50"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`اسلاید ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}