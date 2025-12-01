import React from 'react';

const LTRText = ({ children, className, ...props }) => {
  return (
    <span 
      style={{ direction: "ltr", unicodeBidi: "isolate" }} 
      className={className}
      {...props}
    >
      {children}
    </span>
  );
};

export default LTRText;