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
              <div className="relative w-full h-[150px] md:h-[300px] overflow-hidden rounded-xl md:rounded-none">
                {index === 0 ? (
                  // First image with priority for LCP optimization
                  <>
                    {/* Desktop image */}
                    <Image
                      src={slide.desktopMedia?.url }
                      alt={slide.title}
                      fill
                      priority
                      fetchPriority="high"
                      className={`object-cover hidden md:block transition-transform duration-300 rounded-xl md:rounded-none  desktop-image`}
                    />
                    {/* Mobile image */}
                    <Image
                      src={slide.mobileMedia?.url }
                      alt={slide.title}
                      fill
                      priority
                      fetchPriority="high"
                      className={`object-cover block md:hidden transition-transform duration-300 rounded-xl md:rounded-none  mobile-image`}
                    />
                  </>
                ) : (
                  // Other images without priority
                  <>
                    {/* Desktop image */}
                    <Image
                      src={slide.desktopMedia?.url }
                      alt={slide.title}
                      fill
                      loading="lazy"
                      className={`object-cover  hidden md:block  transition-transform duration-300 rounded-xl md:rounded-none  desktop-image`}
                    />
                    {/* Mobile image */}
                    <Image
                      src={slide.mobileMedia?.url }
                      alt={slide.title}
                      fill
                      loading="lazy"
                      className={`object-cover block md:hidden transition-transform duration-300 rounded-xl md:rounded-none  mobile-image`}
                    />
                  </>
                )}
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