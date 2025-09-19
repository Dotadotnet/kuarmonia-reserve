

const VisaCardSkeleton = () => {
  return (
    <div
      className="bg-white rounded-2xl max-w-64  overflow-hidden animate-pulse"
      dir="rtl"
    >
      {/* Image Section */}
      <div className="relative h-40 bg-gray-200" />

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-5/6 bg-gray-200 rounded" />
        </div>



      
      </div>
    </div>
  );
};

export default VisaCardSkeleton;
