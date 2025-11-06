import Container from "@/components/shared/container/Container";

import { Link } from "@/i18n/navigation";

export default function KeyServicesClient({ services }) {

  

  return (
    <Container>
      <div className="relative flex -6justify-around w-full overflow-x-auto scrollbar-hide flex-nowrap overflow-hidden">
        <picture className="hidden md:block absolute inset-x-0 top-10">
          <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
          <img src="/assets/home-page/keyservice/step-bg.svg" alt="vector" />
        </picture>
        {services.map((service) => {
          return (
            <Link
              className="mt-4 mb-8 mx-2 z-40"
              key={service.serviceId}
              href={{
                pathname: `/services/${service.slug}/${service.serviceId}`
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