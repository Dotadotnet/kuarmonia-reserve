import React from "react";

const SkeletonImage = ({
  showSize = false,
  width = "100%",
  height = "100%",
  borderRadius = "rounded-none",
  className = "",
}) => {
  return (
    <div
      className={`relative ${borderRadius} ${className}`}
      style={{ width: `${width}`, height: `${height}` }}
    >
      <div className={`absolute top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse ${borderRadius}`} />
      {showSize && (
        <div className="absolute inset-0 flex justify-center items-center text-sm text-gray-600">
          {`${width} × ${height}`}
        </div>
      )}
    </div>
  );
};

export default SkeletonImage;
