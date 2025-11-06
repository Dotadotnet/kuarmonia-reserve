import Container from "@/components/shared/container/Container";
import {
  Marriege,
  Investment,
  Passport,
  Legal,
  Building,
  Tourism
} from "@/utils/SaveIcon";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const KeyServices = async ({ services }) => {
  const t = await getTranslations("HomePage");
  return (
    <Container>
      <div className="relative flex mt-6 justify-around flex-wrap">
        <picture className="hidden md:block absolute inset-x-0 top-10">
          <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
          <img src="/assets/home-page/keyservice/step-bg.svg" alt="vector" />
        </picture>
        {services.map((service) => {
          return (
            <Link
              className="m-2"
              key={service.serviceId}
              href={{
                pathname: `/service/${service.slug}/${service.serviceId}`
              }}
            >
              <div
                id={service._id}
                className="relative flex flex-col border hover:border-primary transition-color ease-linear delay-100 cursor-pointer 
                dark:bg-gray-800/70 dark:border-gray-900 dark:text-gray-100 shadow-lg bg-white/80 border-gray-200 
                w-36 rounded-primary dark:hover:border-blue-500 items-center "
              >
                <div className="max-w-[100px] mx-auto">
                  <div className="scale-75">
                  <span  className="" dangerouslySetInnerHTML={{ __html: service?.icon }}></span>
                  </div>
                </div>
                <div className="flex flex-col mt-0 mb-4 items-center justify-center">
                  <h2 className="text-sm text-center px-1 lg:text-base mt-0">
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
};

export default KeyServices;