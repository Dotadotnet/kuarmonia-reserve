import Container from "@/components/shared/container/Container";

import { Link } from "@/i18n/navigation";

export default function KeyServicesClient({ services }) {
  if (!services || services.length === 0) {
    // Skeleton loader for empty state
    return (
      <Container>
        <div className="relative flex mt-2 justify-around overflow-x-auto scrollbar-hide flex-nowrap">
          <picture className="hidden md:block absolute inset-x-0 top-10">
            <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
            <img src="/assets/home-page/keyservice/step-bg.svg" alt="vector" />
          </picture>
          {/* Render 4 skeleton items */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="my-4 mx-2 z-40 py-2 px-2 w-fit flex flex-col items-center justify-center rounded-[40px] 
              cursor-pointer flex-shrink-0 animate-pulse"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 mb-2">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600" />
                </div>
              </div>
              <div className="text-center transition-colors duration-300">
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="relative flex mt-6 justify-around w-full overflow-x-auto scrollbar-hide flex-nowrap overflow-hidden">
        <picture className="hidden md:block absolute inset-x-0 top-10">
          <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
          <img src="/assets/home-page/keyservice/step-bg.svg" alt="vector" />
        </picture>
        {services.map((service) => {
          return (
            <Link
              className="my-4 z-40"
              key={service.serviceId}
              href={{
                pathname: `/service/${service.serviceId}/${encodeURIComponent(service.slug.trim())}`
              }}
            >
              <div
                id={service._id}
                className="py-2 px-2  w-fit flex flex-row items-center justify-center rounded-[40px] 
                text-gray-800  dark:text-white cursor-pointer shadow-lg bg-white dark:bg-gray-700 
                hover:shadow-xl dark:hover:text-white transition-colors duration-300 flex-shrink-0"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-500 mr-2">
                  <div className="flex items-center justify-center">
                    <span 
                      className="text-primary dark:text-primary !w-12 !h-12 stroke-[1]" 
                      dangerouslySetInnerHTML={{ __html: service?.icon }}
                    ></span>
                  </div>
                </div>
                <div className="text-center font-vazir transition-colors duration-300 dark:text-gray-100 max-w-xs">
                  <h2 className="text-sm px-1 lg:text-base truncate">
                    {service.title}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}