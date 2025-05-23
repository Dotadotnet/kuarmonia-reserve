import React from "react";

const Space = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      className={"w-7 h-7" + (className ? " " + className : "")}
    xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M3 21V3h18v18zm2-2h6V5H5zm8 0h6v-7h-6zm0-9h6V5h-6z"></path></svg>
  );
};

export default Space;
