
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
import Api from "@/utils/api";

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
              className="m-5"
              key={service.serviceId}
              href={{
                pathname: `/service/${service.serviceId}/${encodeURIComponent(service.slug.trim())}`
              }}
            >
              <div
                id={service._id}
              >
                <div className="max-w-[100px] mx-auto">
                  <div className="scale-75">
                  <span  className="" dangerouslySetInnerHTML={{ __html: service?.icon }}></span>
                  </div>
                </div>
                <div className="flex relative -top-4 flex-col mt-0 mb-8 items-center justify-center">
                  <h2 className="text-sm text-center lg:text-base mt-4">
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
