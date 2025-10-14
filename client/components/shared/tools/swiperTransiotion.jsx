"use client"
import { useEffect } from "react";

function SwiperTransiotion() {
  useEffect(() => {
    setInterval(() => {
      document.querySelectorAll("div.swiper-wrapper").forEach((div) => {
        div.style.transition = "all 1s !important";
        div.style.transitionDuration = "1s !important"
        div.style.transitionBehavior = "normal !important";
        div.style.cursor = "garbing !important"
        let insertClasses = " transition : all 1s !important ; "
        let style = div.getAttribute("style");
        if (style && !style.includes(insertClasses)) {
          div.setAttribute("style",style + insertClasses);
        }
      })
    }, 100)
  })
  return ('');
}

export default SwiperTransiotion;