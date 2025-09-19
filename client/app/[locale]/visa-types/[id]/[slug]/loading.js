



const VisaContentSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* هدر تصویر */}
      <div className="relative h-[400px] bg-gray-200">
        <div className="absolute right-4 ring-4 ring-white -bottom-12 w-24 h-24 bg-gray-300 rounded-full" />
      </div>

      {/* عنوان و خلاصه */}
      <div className="p-8">
        <div className="h-8 w-1/2 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>

        {/* تگ‌ها */}
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* بلوک‌های محتوا */}
        <div className="space-y-6">
          <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default VisaContentSkeleton;
