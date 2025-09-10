

const SkeletonText = ({ lines = 5, className ,color="gray" }) => {
  return (
    <div
      className={`flex flex-col gap-y-2 ${className} min-w-16 bg-${color}-300 lg:px-4 lg:py-2 px-2 py-1 w-full rounded`}
    >
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`${
            index === lines - 1 ? "w-2/3" : "w-full"
          } lg:h-3 h-2 bg-${color}-500 animate-pulse  rounded py-1`}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonText;
