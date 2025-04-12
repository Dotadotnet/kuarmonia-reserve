
import React from "react";

const Container = ({ children, className }) => {
  return (
    <section
      className={
        " mx-auto max-w-7xl px-primary" + (className ? ` ${className}` : ""+ "") 
      }
    >
      {children}
    </section>
  );
};

export default Container;
