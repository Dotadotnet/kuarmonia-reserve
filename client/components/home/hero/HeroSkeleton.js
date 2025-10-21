import Container from "@/components/shared/container/Container";
import Skeleton from "@/components/shared/skeleton/Skeleton";

const HeroSkeleton = () => {
  return (
    <section className="bg-no-repeat h-auto bg-white dark:bg-gray-900">
      <Container className="px-1 lg:px-primary">
        <div className="grid md:grid-cols-3 h-fit justify-start grid-cols-1 gap-y-2 md:gap-4">
          {/* Right Section Skeleton */}
          <div className="col-span-2 h-full flex flex-col">
            <div className="w-full h-full rounded-primary relative flex flex-col md:gap-y-8 lg:px-2 lg:py-10 md:pt-4 pb-0 bg-gradient-to-br from-cyan-500 to-blue-500">
              <div className="md:grid md:grid-cols-12 md:py-4 md:gap-4">
                <div className="md:col-span-6 hidden md:flex"></div>
                <div className="md:col-span-6 flex flex-col gap-4 p-8 md:p-4">
                  <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/2 animate-pulse"></div>
                  <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse"></div>
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-4/5 animate-pulse"></div>
                  <div className="h-12 bg-gray-800 dark:bg-gray-700 rounded w-1/3 animate-pulse mt-4"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Left Section Skeleton */}
          <div className="col-span-1 h-full min-h-[450px] w-full flex flex-col relative px-3">
            <div className="w-full relative h-full rounded-primary flex flex-col bg-gradient-to-br from-teal-500 to-blue-600">
              <div className="flex flex-col gap-y-4 justify-start items-center p-4 text-right h-full">
                <div className="h-16 bg-gray-300 dark:bg-gray-600 rounded w-full animate-pulse"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 animate-pulse mt-4"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-60 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSkeleton;