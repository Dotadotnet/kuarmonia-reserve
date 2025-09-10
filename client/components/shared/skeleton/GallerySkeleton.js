// components/GallerySkeleton.jsx



const SkeletonBox = ({ height = "h-32", width = "w-1/2" }) => (
  <div className={`p-1 md:p-2 ${width}`}>
    <div
      className={`w-full rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${height}`}
    />
  </div>
);

const GallerySkeleton = () => {
  return (
    <div className="container mx-auto h-[50%] px-5 py-2">
      <div className="-m-1 flex flex-wrap md:-m-2">
        {/* Left column */}
        <div className="flex w-1/2 flex-wrap">
          <SkeletonBox />
          <SkeletonBox />
          <SkeletonBox width="w-full" height="h-48" />
        </div>

        {/* Right column */}
        <div className="flex w-1/2 flex-wrap">
          <SkeletonBox width="w-full" height="h-48" />
          <SkeletonBox />
          <SkeletonBox />
        </div>
      </div>
    </div>
  );
};

export default GallerySkeleton;
