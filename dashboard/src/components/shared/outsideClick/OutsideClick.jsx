import React, { useRef, useEffect, useCallback } from "react";

const OutsideClick = ({ children, onOutsideClick, className }) => {
  const wrapperRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onOutsideClick();
    }
  }, [onOutsideClick]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <section ref={wrapperRef} className={"z-20" + (className ? ` ${className}` : "")}>
      {children}
    </section>
  );
};

export default OutsideClick;
