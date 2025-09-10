

const SkeletonImage = ({
  showSize = false,
  width = null,
  height = null,
  borderRadius = "rounded-none",
  className = "",
  txtSize = "text-4xl",
}) => {
  return (
    <div
      className={`relative ${borderRadius} w-full h-full ${className} `}
    >
      <div className={`absolute ${borderRadius} flex justify-center items-center top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-600 animate-pulse`}></div>
      {showSize && (
        <div className={` absolute inset-0 mt-30 flex justify-center items-center  text-gray-600 ${txtSize} `}>
           {`${height} × ${width}`}
        </div>
      )}
    </div>
  );
};

export default SkeletonImage;
