import React from "react";

const Chart = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={"w-5 h-5" + (className ? " " + className : "")}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h3v-3H3m5 3h3v-7H8m5 7h3V9h-3m5 12h3V3h-3z"
      ></path>
    </svg>
  );
};

export default Chart;
