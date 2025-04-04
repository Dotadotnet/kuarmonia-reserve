import React from "react";

const SkeletonProfile = ({ size = "w-32 h-32" }) => {
  return (
    <div className={`absolute top-0 left-0 ${size} transform -translate-x-1/2 translate-y-1/2 z-20`}>
      <div className={`bg-gray-300 animate-pulse rounded-full ${size}`}></div>
    </div>
  );
};

export default SkeletonProfile;
