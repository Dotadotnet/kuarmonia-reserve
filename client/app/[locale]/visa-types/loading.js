import Container from "@/components/shared/container/Container";

const VisaTypesLoading = () => {
  return (
    <Container>
      <div className="py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mx-auto animate-pulse"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              
              {/* Content Skeleton */}
              <div className="p-6">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default VisaTypesLoading;
