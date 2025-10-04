"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";

const KeenSlider = ({ 
  children, 
  className = "",
  options = {},
  autoPlay = true,
  autoPlayDelay = 4000,
  breakpoints = {
    "(max-width: 768px)": {
      slides: { perView: 1.2, spacing: 15 }
    },
    "(min-width: 768px)": {
      slides: { perView: 2, spacing: 20 }
    },
    "(min-width: 1024px)": {
      slides: { perView: 3, spacing: 25 }
    }
  }
}) => {
  const defaultOptions = {
    loop: true,
    initial: 0,
    breakpoints,
    ...options
  };

  const [sliderRef, instanceRef] = useKeenSlider(defaultOptions);

  // Auto play functionality
  useEffect(() => {
    if (!autoPlay || !instanceRef.current) return;

    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayDelay, instanceRef]);

  return (
    <div ref={sliderRef} className={`keen-slider ${className}`}>
      {children}
    </div>
  );
};

export default KeenSlider;










