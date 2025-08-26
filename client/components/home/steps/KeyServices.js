import React from "react";
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

const KeyServices = async ({ params }) => {
  const { locale } = await params;
  const api = `${process.env.NEXT_PUBLIC_API}/service/get-services`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["service"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const services = res.data;
  const t = await getTranslations("HomePage", locale);

  return (
    <Container>
      <div className="relative grid grid-cols-2 pt-8 lg:grid-cols-6 gap-5 sm:gap-16 xl:gap-10">
        <picture className="hidden md:block absolute inset-x-0 top-5">
          <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
          <img src="/assets/home-page/keyservice/step-bg.svg" alt="vector" />
        </picture>
        {services.map((service) => {
          const matchedTranslation =
            service.translations.find(
              (t) => t.translation?.language === locale
            ) || service.translations[0]; 

          const { title, slug } = matchedTranslation?.translation?.fields;

          return (
            <Link
              key={service._id}
              href={{
                pathname: `/service/${service.serviceId}/${slug}`
              }}
            >
              <div
                id={service._id}
                className="relative flex flex-col border hover:border-primary transition-color ease-linear delay-100 cursor-pointer dark:bg-gray-800/70 dark:border-gray-900 dark:text-gray-100 shadow-lg bg-white/80 border-gray-200 w-[150px] lg:w-[170px] p-4 rounded-primary dark:hover:border-blue-500 items-center max-w-xs mx-auto"
              >
                <div className="max-w-[100px] mx-auto">
                  <span dangerouslySetInnerHTML={{ __html: service?.icon }}></span>
                </div>
                <div className="flex flex-col gap-y-8 items-center justify-center">
                  <h2 className="text-sm text-center lg:text-base mt-4">
                    {title}
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
