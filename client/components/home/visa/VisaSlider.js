"use client";

import React, { useState, useEffect, useCallback } from 'react';
import VisaCard from "@/components/shared/card/VisaCard";
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons';
import './embla.css';
import { useLocale } from "next-intl";

const VisaSlider = ({ visas }) => {
  const locale = useLocale();
  const isRTL = ["ar", "fa", "he"].includes(locale);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
    direction: isRTL ? "rtl" : "ltr",
    slidesToScroll: 1,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {visas.map((visa, index) => (
            <div 
              className="embla__slide flex-[0_0_95%] md:flex-[0_0_30%] px-2 md:px-4 min-w-0" 
              key={visa._id || index}
            >
              <VisaCard visa={visa} />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaSlider;